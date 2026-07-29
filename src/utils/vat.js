// Extension included so this module also resolves under plain Node (see
// scripts/verify-vat.mjs), not just through Vite.
import { parsePrice } from "./price.js";

export const VAT_MODE_STORAGE_KEY = "hout:prices-include-vat";
export const DEFAULT_VAT_RATE = 21;

// The API stores four denormalised price columns per variant. A large share of
// rows were written before a VAT rate was configured, so their `*_in_vat`
// column still holds the net amount and the price would not change when the
// customer switches to inclusive prices. Correct rows never drift further than
// a rounding cent from `ex * (1 + rate)`, so anything beyond this tolerance is
// treated as stale and recomputed from the net price.
const STALE_VAT_TOLERANCE = 0.02;

/**
 * Applies VAT in integer cents so the result matches the backend's decimal
 * half-up rounding exactly, including amounts that land on half a cent.
 */
export const applyVat = (exVatPrice, rate) => {
  const netCents = Math.round(parsePrice(exVatPrice) * 100);
  const grossCents = Math.round((netCents * (100 + parsePrice(rate))) / 100);
  return grossCents / 100;
};

/**
 * Returns the gross price for a net price, preferring the value stored by the
 * backend and falling back to a recomputed one when that value is missing or
 * predates the current VAT rate.
 */
export const resolveInclusivePrice = (exVatPrice, storedInVatPrice, rate) => {
  const expected = applyVat(exVatPrice, rate);
  const stored = parsePrice(storedInVatPrice);

  if (!stored) {
    return expected;
  }

  return Math.abs(stored - expected) <= STALE_VAT_TOLERANCE
    ? stored
    : expected;
};

const PRICE_FIELDS = {
  discounted: {
    exVat: "discounted_price_ex_vat",
    inVat: "discounted_price_in_vat",
  },
  full: {
    exVat: "full_price_ex_vat",
    inVat: "full_price_in_vat",
  },
};

/**
 * Resolves a single variant price in the currently selected VAT mode. Every
 * price shown to a customer must go through here so that one toggle can never
 * disagree with another part of the page.
 */
export const getVariantPrice = (
  variant,
  { includeVAT = false, rate = DEFAULT_VAT_RATE, discounted = true } = {}
) => {
  if (!variant) {
    return 0;
  }

  const fields = discounted ? PRICE_FIELDS.discounted : PRICE_FIELDS.full;
  const exVat = parsePrice(variant[fields.exVat]);

  if (!includeVAT) {
    return exVat;
  }

  return resolveInclusivePrice(exVat, variant[fields.inVat], rate);
};

/**
 * Picks the variant a product card should advertise: the cheapest one by the
 * price actually rendered, so the "from" price matches the amount on screen
 * even when only some variants are discounted.
 */
export const getCheapestVariant = (lengths, options = {}) => {
  if (!Array.isArray(lengths) || lengths.length === 0) {
    return null;
  }

  return lengths.reduce((cheapest, variant) =>
    getVariantPrice(variant, options) < getVariantPrice(cheapest, options)
      ? variant
      : cheapest
  );
};

export const hasDiscount = (variant) =>
  Boolean(variant) &&
  parsePrice(variant.discount) > 0 &&
  parsePrice(variant.discounted_price_ex_vat) <
    parsePrice(variant.full_price_ex_vat);
