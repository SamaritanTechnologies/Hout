import React, { useEffect, useMemo, useState } from "react";
import { getProducts } from "../../redux/actions/userActions";
import ProductCard from "../Common/ProductCard";
import { useVat } from "../../providers";
import { getCheapestVariant } from "../../utils/vat";

// Responses are ~300kB, so a short-lived cache keeps paging back and forth and
// returning from a product page instant instead of re-downloading the page.
const CACHE_TTL_MS = 60_000;
const responseCache = new Map();

const readCache = (key) => {
  const entry = responseCache.get(key);
  if (!entry) return null;

  if (Date.now() - entry.storedAt > CACHE_TTL_MS) {
    responseCache.delete(key);
    return null;
  }

  return entry.value;
};

const writeCache = (key, value) => {
  responseCache.set(key, { value, storedAt: Date.now() });
};

const buildQuery = ({ filters, currentPage, pageSize, searchQuery }) => {
  const queryParams = new URLSearchParams();

  queryParams.append("min_price", filters.price[0]);
  queryParams.append("max_price", filters.price[1]);

  Object.entries(filters.selectedFilters).forEach(([category, data]) => {
    const key = category.toLowerCase();
    const paramName =
      key === "type"
        ? "product_type"
        : key === "durability"
        ? "durability_class"
        : key;

    data.choices?.forEach((choiceId) => {
      queryParams.append(paramName, choiceId);
    });
  });

  queryParams.append("is_active_webshop", "true");
  queryParams.append("page", currentPage + 1); // API uses 1-based indexing
  queryParams.append("page_size", pageSize);

  if (searchQuery && searchQuery.trim() !== "") {
    queryParams.append("search", searchQuery.trim());
  }

  return queryParams.toString();
};

const ProductsList = ({
  filters,
  currentPage,
  pageSize,
  setTotalItems,
  searchQuery,
}) => {
  const { includeVAT, rate } = useVat();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadToken, setReloadToken] = useState(0);

  // The VAT mode is deliberately not part of this key: the API returns net and
  // gross prices in every response, so switching modes is a pure render change
  // and must never trigger another request.
  const query = useMemo(
    () => buildQuery({ filters, currentPage, pageSize, searchQuery }),
    [filters, currentPage, pageSize, searchQuery]
  );

  useEffect(() => {
    const cached = readCache(query);
    if (cached) {
      setProducts(cached.products);
      setTotalItems(cached.totalItems);
      setIsLoading(false);
      return undefined;
    }

    const controller = new AbortController();
    let active = true;

    setIsLoading(true);

    getProducts(query, { signal: controller.signal })
      .then((data) => {
        if (!active) return;

        const activeProducts = (data.results || []).filter(
          (product) => product.is_active_webshop !== false
        );
        const totalItems = data.count || 0;

        writeCache(query, { products: activeProducts, totalItems });
        setProducts(activeProducts);
        setTotalItems(totalItems);
      })
      .catch((error) => {
        if (!active || controller.signal.aborted) return;
        console.error("Error fetching products:", error);
        setProducts([]);
        setTotalItems(0);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    // Abort in-flight work so a slower earlier response can never overwrite the
    // results of a newer one.
    return () => {
      active = false;
      controller.abort();
    };
  }, [query, reloadToken, setTotalItems]);

  const refreshProducts = () => {
    responseCache.delete(query);
    setReloadToken((token) => token + 1);
  };

  return (
    <div className="w-full pt-24 max-w-[915px] mx-auto px-4">
      {isLoading ? (
        <div className="flex items-center justify-center gap-2 py-20 text-gray-700">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
          <span>Loading products...</span>
        </div>
      ) : products?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-7">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              minimumPrice={getCheapestVariant(product.lengths, {
                includeVAT,
                rate,
              })}
              fetchProduct={refreshProducts}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500 text-lg font-medium">
          🚫 No products found.
        </div>
      )}
    </div>
  );
};

export default ProductsList;
