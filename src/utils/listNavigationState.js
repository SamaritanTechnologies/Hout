import { PRODUCT_MAX_PRICE, PRODUCT_MIN_PRICE } from "./const";

const SCROLL_PREFIX = "list-scroll:";
const ADMIN_PRODUCTS_RETURN_KEY = "admin-products-return";
const SHOP_RETURN_KEY = "shop-return";

export const ADMIN_PRODUCT_FILTER_KEYS = [
  "group",
  "type",
  "material",
  "profile",
  "thickness",
  "width",
];

const SHOP_FILTER_PARAMS = [
  "group",
  "product_type",
  "material",
  "profile",
  "durability_class",
  "quality",
  "application",
];

const emptyAdminFilters = () =>
  ADMIN_PRODUCT_FILTER_KEYS.reduce((acc, key) => {
    acc[key] = [];
    return acc;
  }, {});

/** Map shop category names to stable URL / API param names. */
export const shopCategoryToParam = (categoryName = "") => {
  const key = categoryName.toLowerCase();
  if (key === "type") return "product_type";
  if (key === "durability") return "durability_class";
  return key;
};

const shopParamToCategoryHint = (paramName) => {
  if (paramName === "product_type") return "type";
  if (paramName === "durability_class") return "durability";
  return paramName;
};

const parsePositiveIntIds = (values) =>
  values
    .map((value) => Number(value))
    .filter((id) => Number.isFinite(id) && id > 0);

export const parsePageFromParams = (searchParams, { zeroBased = true } = {}) => {
  const raw = Number(searchParams.get("page"));
  if (!Number.isFinite(raw) || raw < 1) {
    return zeroBased ? 0 : 1;
  }
  return zeroBased ? raw - 1 : raw;
};

export const areShopFiltersEqual = (a, b) => {
  if (!a || !b) return false;
  if (a.price?.[0] !== b.price?.[0] || a.price?.[1] !== b.price?.[1]) {
    return false;
  }

  const aKeys = Object.keys(a.selectedFilters || {});
  const bKeys = Object.keys(b.selectedFilters || {});
  if (aKeys.length !== bKeys.length) return false;

  return aKeys.every((key) => {
    const aChoices = [...(a.selectedFilters[key]?.choices || [])].sort();
    const bChoices = [...(b.selectedFilters[key]?.choices || [])].sort();
    if (aChoices.length !== bChoices.length) return false;
    return aChoices.every((id, index) => id === bChoices[index]);
  });
};

export const parseShopFiltersFromParams = (searchParams, categories = []) => {
  const selectedFilters = {};

  categories.forEach((category) => {
    if (!category?.name) return;

    const paramName = shopCategoryToParam(category.name);
    const ids = parsePositiveIntIds(searchParams.getAll(paramName));
    if (!ids.length) return;

    selectedFilters[category.name] = {
      name: category.name,
      name_nl: category.name_nl,
      choices: ids,
    };
  });

  // Before the category list has loaded we still need the right API query, so
  // the IDs are kept under a label that maps back to the same param name.
  if (!categories.length) {
    SHOP_FILTER_PARAMS.forEach((paramName) => {
      const ids = parsePositiveIntIds(searchParams.getAll(paramName));
      if (!ids.length) return;
      const hint = shopParamToCategoryHint(paramName);
      const label = hint.charAt(0).toUpperCase() + hint.slice(1);
      selectedFilters[label] = {
        name: label,
        name_nl: label,
        choices: ids,
      };
    });
  }

  const minPrice = Number(searchParams.get("min_price"));
  const maxPrice = Number(searchParams.get("max_price"));

  return {
    selectedFilters,
    price: [
      Number.isFinite(minPrice) ? minPrice : PRODUCT_MIN_PRICE,
      Number.isFinite(maxPrice) ? maxPrice : PRODUCT_MAX_PRICE,
    ],
  };
};

export const buildShopSearchParams = ({
  filters,
  currentPage,
  searchQuery,
} = {}) => {
  const params = new URLSearchParams();

  if (searchQuery?.trim()) {
    params.set("search", searchQuery.trim());
  }

  if (currentPage > 0) {
    params.set("page", String(currentPage + 1));
  }

  Object.entries(filters?.selectedFilters || {}).forEach(([category, data]) => {
    const paramName = shopCategoryToParam(category);
    data?.choices?.forEach((choiceId) => {
      params.append(paramName, String(choiceId));
    });
  });

  const [minPrice, maxPrice] = filters?.price || [
    PRODUCT_MIN_PRICE,
    PRODUCT_MAX_PRICE,
  ];
  if (minPrice !== PRODUCT_MIN_PRICE) {
    params.set("min_price", String(minPrice));
  }
  if (maxPrice !== PRODUCT_MAX_PRICE) {
    params.set("max_price", String(maxPrice));
  }

  return params;
};

export const parseAdminFiltersFromParams = (searchParams) => {
  const selectedOptions = emptyAdminFilters();

  ADMIN_PRODUCT_FILTER_KEYS.forEach((key) => {
    selectedOptions[key] = parsePositiveIntIds(searchParams.getAll(key));
  });

  return selectedOptions;
};

export const buildAdminSearchParams = ({
  selectedOptions,
  currentPage,
  search,
} = {}) => {
  const params = new URLSearchParams();

  if (search?.trim()) {
    params.set("search", search.trim());
  }

  if (currentPage > 0) {
    params.set("page", String(currentPage + 1));
  }

  ADMIN_PRODUCT_FILTER_KEYS.forEach((key) => {
    (selectedOptions?.[key] || []).forEach((id) => {
      params.append(key, String(id));
    });
  });

  return params;
};

/** Order-insensitive comparison so URL sync does not loop on param order. */
export const searchParamsEqual = (a, b) => {
  const aParams = a instanceof URLSearchParams ? a : new URLSearchParams(a);
  const bParams = b instanceof URLSearchParams ? b : new URLSearchParams(b);
  const keys = new Set([...aParams.keys(), ...bParams.keys()]);

  for (const key of keys) {
    const aValues = aParams.getAll(key).slice().sort().join("\0");
    const bValues = bParams.getAll(key).slice().sort().join("\0");
    if (aValues !== bValues) return false;
  }

  return true;
};

/**
 * Leaving a list often scrolls the page to the top before the list unmounts.
 * That top position must not be recorded as "where the user was", so saving is
 * paused for a moment whenever we knowingly navigate away.
 */
let saveLockedUntil = 0;

export const pauseScrollSaving = (ms = 2000) => {
  saveLockedUntil = Date.now() + ms;
};

export const saveScrollPosition = (entryKey, position) => {
  if (!entryKey) return;
  if (Date.now() < saveLockedUntil) return;
  sessionStorage.setItem(
    `${SCROLL_PREFIX}${entryKey}`,
    String(Math.max(Math.round(position) || 0, 0))
  );
};

export const readScrollPosition = (entryKey) => {
  if (!entryKey) return 0;
  const raw = sessionStorage.getItem(`${SCROLL_PREFIX}${entryKey}`);
  const value = Number(raw);
  return Number.isFinite(value) && value > 0 ? value : 0;
};

export const getDashboardScrollElement = () =>
  document.querySelector(".dashboard-content");

export const getCurrentScroll = (element) =>
  element ? element.scrollTop : window.scrollY || 0;

/**
 * Scrolling back to a saved position only works once the list has rendered, and
 * the list depends on an API call. So the position is re-applied every frame
 * until the page is tall enough and its height has settled.
 */
export const restoreScrollPosition = (
  target,
  { getElement, deadlineMs = 5000 } = {}
) => {
  if (!Number.isFinite(target) || target <= 0) return () => {};

  const startedAt = Date.now();
  let frame = null;
  let cancelled = false;
  let lastHeight = -1;
  let stableFrames = 0;

  const cancel = () => {
    if (cancelled) return;
    cancelled = true;
    if (frame !== null) cancelAnimationFrame(frame);
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchstart", cancel);
    window.removeEventListener("keydown", cancel);
  };

  const apply = () => {
    if (cancelled) return;

    const element = getElement ? getElement() : null;
    const scrollHeight = element
      ? element.scrollHeight
      : document.documentElement.scrollHeight;
    const viewport = element ? element.clientHeight : window.innerHeight;
    const maxScroll = Math.max(scrollHeight - viewport, 0);

    if (element) {
      element.scrollTop = Math.min(target, maxScroll);
    } else {
      window.scrollTo(0, Math.min(target, maxScroll));
    }

    stableFrames = scrollHeight === lastHeight ? stableFrames + 1 : 0;
    lastHeight = scrollHeight;

    const settled = maxScroll >= target && stableFrames >= 5;
    if (settled || Date.now() - startedAt > deadlineMs) {
      cancel();
      return;
    }

    frame = requestAnimationFrame(apply);
  };

  window.addEventListener("wheel", cancel, { passive: true, once: true });
  window.addEventListener("touchstart", cancel, { passive: true, once: true });
  window.addEventListener("keydown", cancel, { once: true });

  apply();

  return cancel;
};

const readReturn = (storageKey, fallbackUrl) => {
  try {
    const parsed = JSON.parse(sessionStorage.getItem(storageKey));
    if (parsed?.url) {
      return { url: parsed.url, scroll: Number(parsed.scroll) || 0 };
    }
  } catch (error) {
    // Corrupt or missing entry simply falls back to the plain list URL.
  }
  return { url: fallbackUrl, scroll: 0 };
};

const writeReturn = (storageKey, url, scroll) => {
  sessionStorage.setItem(
    storageKey,
    JSON.stringify({ url, scroll: Math.max(Math.round(scroll) || 0, 0) })
  );
};

/** Spreadable navigate() arguments: `navigate(...target)`. */
const toNavigateTarget = ({ url, scroll }) => [
  url,
  { state: { restoreScroll: scroll } },
];

export const rememberShopReturn = (url, scroll) =>
  writeReturn(SHOP_RETURN_KEY, url, scroll);

export const shopReturnTarget = () =>
  toNavigateTarget(readReturn(SHOP_RETURN_KEY, "/shop-page"));

export const rememberAdminProductsReturn = (url, scroll) =>
  writeReturn(ADMIN_PRODUCTS_RETURN_KEY, url, scroll);

export const adminProductsReturnTarget = () =>
  toNavigateTarget(readReturn(ADMIN_PRODUCTS_RETURN_KEY, "/products"));
