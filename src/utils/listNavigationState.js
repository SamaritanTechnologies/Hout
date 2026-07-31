import {
  PRODUCT_MAX_PRICE,
  PRODUCT_MIN_PRICE,
} from "./const";

const SHOP_SCROLL_KEY = "list-scroll:/shop-page";
const ADMIN_PRODUCTS_SCROLL_KEY = "list-scroll:/products";
const ADMIN_PRODUCTS_RETURN_KEY = "admin-products-return-url";

export const ADMIN_PRODUCT_FILTER_KEYS = [
  "group",
  "type",
  "material",
  "profile",
  "thickness",
  "width",
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

  // Fallback when categories have not loaded yet: keep IDs keyed by param hint
  // so a later pass with category metadata can enrich names.
  if (!categories.length) {
    const knownParams = [
      "group",
      "product_type",
      "material",
      "profile",
      "durability_class",
      "quality",
      "application",
    ];
    knownParams.forEach((paramName) => {
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
  existingParams,
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

  // Preserve any unrelated params (e.g. future flags) that we do not own.
  if (existingParams) {
    existingParams.forEach((value, key) => {
      if (
        key === "search" ||
        key === "page" ||
        key === "min_price" ||
        key === "max_price" ||
        [
          "group",
          "product_type",
          "material",
          "profile",
          "durability_class",
          "quality",
          "application",
        ].includes(key)
      ) {
        return;
      }
      if (!params.has(key)) params.append(key, value);
    });
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

export const areAdminFiltersEqual = (a, b) =>
  ADMIN_PRODUCT_FILTER_KEYS.every((key) => {
    const aValues = [...(a?.[key] || [])].sort();
    const bValues = [...(b?.[key] || [])].sort();
    if (aValues.length !== bValues.length) return false;
    return aValues.every((id, index) => id === bValues[index]);
  });

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

export const saveWindowScroll = (key = SHOP_SCROLL_KEY) => {
  sessionStorage.setItem(key, String(window.scrollY || 0));
};

export const restoreWindowScroll = (key = SHOP_SCROLL_KEY) => {
  const raw = sessionStorage.getItem(key);
  if (raw == null) return false;
  const y = Number(raw);
  if (!Number.isFinite(y)) return false;
  window.scrollTo(0, y);
  return true;
};

export const saveDashboardScroll = (key = ADMIN_PRODUCTS_SCROLL_KEY) => {
  const el = document.querySelector(".dashboard-content");
  const y = el ? el.scrollTop : window.scrollY || 0;
  sessionStorage.setItem(key, String(y));
};

export const restoreDashboardScroll = (key = ADMIN_PRODUCTS_SCROLL_KEY) => {
  const raw = sessionStorage.getItem(key);
  if (raw == null) return false;
  const y = Number(raw);
  if (!Number.isFinite(y)) return false;

  const el = document.querySelector(".dashboard-content");
  if (el) {
    el.scrollTo(0, y);
  } else {
    window.scrollTo(0, y);
  }
  return true;
};

export const rememberAdminProductsReturnUrl = (url) => {
  sessionStorage.setItem(ADMIN_PRODUCTS_RETURN_KEY, url);
};

export const getAdminProductsReturnUrl = () =>
  sessionStorage.getItem(ADMIN_PRODUCTS_RETURN_KEY) || "/products";

const ADMIN_PRODUCTS_RESTORE_SCROLL_FLAG = "admin-products-restore-scroll";

export const markAdminProductsScrollRestore = () => {
  sessionStorage.setItem(ADMIN_PRODUCTS_RESTORE_SCROLL_FLAG, "1");
};

export const consumeAdminProductsScrollRestore = () => {
  const shouldRestore =
    sessionStorage.getItem(ADMIN_PRODUCTS_RESTORE_SCROLL_FLAG) === "1";
  if (shouldRestore) {
    sessionStorage.removeItem(ADMIN_PRODUCTS_RESTORE_SCROLL_FLAG);
  }
  return shouldRestore;
};

const SHOP_RETURN_KEY = "shop-return-url";

export const rememberShopReturnUrl = (url) => {
  sessionStorage.setItem(SHOP_RETURN_KEY, url);
};

export const getShopReturnUrl = () =>
  sessionStorage.getItem(SHOP_RETURN_KEY) || "/shop-page";

export const SHOP_SCROLL_STORAGE_KEY = SHOP_SCROLL_KEY;
export const ADMIN_PRODUCTS_SCROLL_STORAGE_KEY = ADMIN_PRODUCTS_SCROLL_KEY;
