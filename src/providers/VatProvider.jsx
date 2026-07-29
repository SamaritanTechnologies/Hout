import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getVatRate } from "../redux/actions/productActions";
import { parsePrice } from "../utils/helper";
import { DEFAULT_VAT_RATE, VAT_MODE_STORAGE_KEY } from "../utils/vat";

const VatContext = createContext(null);

const readStoredMode = () => {
  try {
    return window.localStorage.getItem(VAT_MODE_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
};

export const VatProvider = ({ children }) => {
  const [includeVAT, setIncludeVAT] = useState(readStoredMode);
  const [rate, setRate] = useState(DEFAULT_VAT_RATE);

  useEffect(() => {
    let active = true;

    getVatRate()
      .then((data) => {
        const fetched = parsePrice(data?.rate);
        if (active && fetched > 0) {
          setRate(fetched);
        }
      })
      .catch(() => {
        // Keep the statutory default so prices stay consistent if the rate
        // endpoint is unavailable.
      });

    return () => {
      active = false;
    };
  }, []);

  // The choice has to survive navigation, otherwise moving from the shop to a
  // product page silently reverts the customer to net prices.
  useEffect(() => {
    try {
      window.localStorage.setItem(VAT_MODE_STORAGE_KEY, String(includeVAT));
    } catch {
      // Private browsing modes can reject writes; the in-memory value still works.
    }
  }, [includeVAT]);

  const toggleVAT = useCallback(() => setIncludeVAT((prev) => !prev), []);

  const value = useMemo(
    () => ({ includeVAT, setIncludeVAT, toggleVAT, rate }),
    [includeVAT, toggleVAT, rate]
  );

  return <VatContext.Provider value={value}>{children}</VatContext.Provider>;
};

export const useVat = () => {
  const context = useContext(VatContext);

  if (!context) {
    return {
      includeVAT: false,
      setIncludeVAT: () => {},
      toggleVAT: () => {},
      rate: DEFAULT_VAT_RATE,
    };
  }

  return context;
};
