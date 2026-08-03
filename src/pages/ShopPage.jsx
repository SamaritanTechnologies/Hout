import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import rightArrow from "../assets/shopPage/rightArrow.svg";
import { XMarkIcon } from "@heroicons/react/24/outline";
import filter from "../assets/shopPage/filter.svg";
import ProductsList from "../components/ShopComponents/ProductsList";
import Filters from "../components/ShopComponents/Filters";
import QualitySection from "../components/Common/QualitySection";
import Switch from "../components/Common/Switch";
import {
  Link,
  useLocation,
  useNavigationType,
  useSearchParams,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Pagination from "../components/Common/Pagination";
import {
  PRODUCT_MAX_PRICE,
  PRODUCT_MIN_PRICE,
  PRODUCT_PAGE_SIZE,
} from "../utils/const";
import { useTranslation } from "react-i18next";
import { getWebshopImage } from "../redux/actions/dashboardActions";
import { scrollToTop } from "../utils/helper";
import { useVat } from "../providers";
import {
  areShopFiltersEqual,
  buildShopSearchParams,
  getCurrentScroll,
  parsePageFromParams,
  parseShopFiltersFromParams,
  readScrollPosition,
  rememberShopReturn,
  restoreScrollPosition,
  saveScrollPosition,
  searchParamsEqual,
} from "../utils/listNavigationState";

export const ShopPage = () => {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigationType = useNavigationType();
  const searchQuery = searchParams.get("search");
  const currentLang = i18n.language;
  const [wallpaper, setWallpaper] = useState("");
  const [filterKey, setFilterKey] = useState(0);
  const { productCategories } = useSelector((state) => state.admin);

  const translatedCategories = useMemo(
    () => [
      t("s_group"),
      t("s_type"),
      t("s_material"),
      t("s_profile"),
      t("s_durability"),
      t("s_quality"),
      t("s_application"),
    ],
    [i18n.language, t]
  );

  const [categoryData, setCategoryData] = useState({});
  const { includeVAT, toggleVAT } = useVat();
  const [filters, setFilters] = useState(() =>
    parseShopFiltersFromParams(searchParams, [])
  );
  const filtersRef = useRef(filters);
  filtersRef.current = filters;
  const debounceTimer = useRef(null);
  const [currentPage, setCurrentPage] = useState(() =>
    parsePageFromParams(searchParams)
  );
  const currentPageRef = useRef(currentPage);
  currentPageRef.current = currentPage;
  const pageSize = PRODUCT_PAGE_SIZE;
  const [totalItems, setTotalItems] = useState(0);
  const didHydrateFilters = useRef(false);
  const skipPageResetRef = useRef(true);

  // Paging is the one list change that earns its own history entry, so Back
  // walks page by page instead of leaving the shop altogether.
  const historyActionRef = useRef("replace");
  const adoptedFromUrlRef = useRef(false);
  const lastLocationKeyRef = useRef(location.key);

  // Read during render so the scroll listener cannot overwrite it first.
  const restoreTargetRef = useRef(null);
  if (restoreTargetRef.current === null) {
    restoreTargetRef.current =
      Number(location.state?.restoreScroll) || readScrollPosition(location.key);
  }

  useEffect(() => {
    // Even if categories never load, eventually treat filter changes as user-driven.
    const timer = setTimeout(() => {
      skipPageResetRef.current = false;
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const fetchExistingImage = async () => {
    try {
      const res = await getWebshopImage();
      if (res) {
        setWallpaper(res);
      }
    } catch (error) {
      console.error("Error fetching existing image:", error);
    }
  };

  useEffect(() => {
    fetchExistingImage();
  }, []);

  useEffect(() => {
    const initialData = translatedCategories.reduce((acc, category) => {
      const foundCategory = productCategories?.find((c) => {
        const nameMatch = c.name?.toLowerCase() === category.toLowerCase();
        const nameNlMatch = c.name_nl?.toLowerCase() === category.toLowerCase();
        return nameMatch || nameNlMatch;
      });

      acc[category] = foundCategory || { name: category, choices: [] };
      return acc;
    }, {});

    setCategoryData(initialData);
  }, [productCategories, translatedCategories]);

  const categoryArray = Object.values(categoryData);

  // Re-parse filters with real category metadata once categories are loaded.
  useEffect(() => {
    if (didHydrateFilters.current) return;
    if (!productCategories?.length) return;

    setFilters(parseShopFiltersFromParams(searchParams, productCategories));
    didHydrateFilters.current = true;
    // Allow user-driven filter changes to reset pagination after hydration.
    const timer = setTimeout(() => {
      skipPageResetRef.current = false;
    }, 350);
    return () => clearTimeout(timer);
  }, [productCategories, searchParams]);

  // Keep the URL in sync so browser Back restores filters + page.
  const listUrl = useMemo(() => {
    const params = buildShopSearchParams({
      filters,
      currentPage,
      searchQuery,
    }).toString();
    return `/shop-page${params ? `?${params}` : ""}`;
  }, [filters, currentPage, searchQuery]);

  // Back/Forward between shop pages swaps the URL without remounting this page,
  // so the popped URL has to be read back into state.
  useEffect(() => {
    if (lastLocationKeyRef.current === location.key) return;
    lastLocationKeyRef.current = location.key;
    if (navigationType !== "POP") return;

    const stateParams = buildShopSearchParams({
      filters: filtersRef.current,
      currentPage: currentPageRef.current,
      searchQuery,
    });
    if (searchParamsEqual(stateParams, searchParams)) return;

    adoptedFromUrlRef.current = true;
    setCurrentPage(parsePageFromParams(searchParams));

    const urlFilters = parseShopFiltersFromParams(
      searchParams,
      productCategories || []
    );
    if (!areShopFiltersEqual(filtersRef.current, urlFilters)) {
      // Remounting Filters replays its initial values back at us; that echo
      // must not be mistaken for the user changing a filter.
      skipPageResetRef.current = true;
      setFilters(urlFilters);
      setFilterKey((prev) => prev + 1);
      setTimeout(() => {
        skipPageResetRef.current = false;
      }, 350);
    }

    const target = readScrollPosition(location.key);
    if (target > 0) {
      restoreScrollPosition(target);
    } else {
      scrollToTop();
    }
  }, [location.key, navigationType, searchParams, searchQuery, productCategories]);

  useEffect(() => {
    // A Back/Forward navigation already carries the correct values in the URL.
    if (adoptedFromUrlRef.current) {
      adoptedFromUrlRef.current = false;
      return;
    }

    const next = buildShopSearchParams({
      filters,
      currentPage,
      searchQuery,
    });
    const action = historyActionRef.current;
    historyActionRef.current = "replace";

    if (!searchParamsEqual(next, searchParams)) {
      setSearchParams(next, { replace: action !== "push" });
    }
  }, [filters, currentPage, searchQuery, searchParams, setSearchParams]);

  // Track scroll so both browser Back and the breadcrumb can return to it.
  useEffect(() => {
    let ticking = false;

    const persist = () => {
      ticking = false;
      const position = getCurrentScroll();
      saveScrollPosition(location.key, position);
      rememberShopReturn(listUrl, position);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(persist);
    };

    persist();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.key, listUrl]);

  useEffect(() => restoreScrollPosition(restoreTargetRef.current), []);

  const [filterDrawer, setFilterDrawer] = useState(false);
  const filterToggler = () => setFilterDrawer((prev) => !prev);

  const handleFilterChange = useCallback((newFilters) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      const next = {
        selectedFilters: newFilters.selectedFilters,
        price: newFilters.price,
      };

      if (areShopFiltersEqual(filtersRef.current, next)) return;

      setFilters(next);
      if (!skipPageResetRef.current) {
        setCurrentPage(0);
      }
    }, 300);
  }, []);

  const initialFiltersMemo = useMemo(
    () => ({
      selectedFilters: filters.selectedFilters,
      price: filters.price,
    }),
    [filters.selectedFilters, filters.price]
  );

  const handlePageChange = ({ selected }) => {
    if (selected === currentPage) return;
    historyActionRef.current = "push";
    setCurrentPage(selected);
    scrollToTop();
  };

  // Resetting filters intentionally leaves the VAT preference alone: it is a
  // display choice the customer made, not a search filter.
  const handleResetFilters = () => {
    setFilters({
      selectedFilters: {},
      price: [PRODUCT_MIN_PRICE, PRODUCT_MAX_PRICE],
    });
    setCurrentPage(0);
    setFilterKey((prev) => prev + 1);
  };

  return (
    <>
      <nav aria-label="breadcrumb" className="">
        <div
          className=" flex justify-center items-center"
          style={{
            backgroundImage: `url(${wallpaper?.image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            minHeight: "500px",
            width: "100%",
          }}
        >
          <div className="w-[320px] m-auto text-center bg-transparentGray text-white py-[35px] rounded-lg">
            <h1 className="text-white text-48 font-medium">
              {currentLang == "en"
                ? wallpaper?.heading_en
                : wallpaper?.heading_nl}
            </h1>
            <ol className="flex items-center justify-center gap-x-3 pt-5 font-medium text-white">
              <li>
                <Link to="/" className="cursor-pointer">
                  Home
                </Link>
              </li>
              <li>
                <img src={rightArrow} alt="right arrow" />
              </li>
              <li className="font-light">Shop</li>
            </ol>
          </div>
        </div>
      </nav>

      <section className="flex justify-between sm:flex-col xs:flex-col items-center py-[36px] font-poppins bg-[#F4F5F7] xl:px-[80px] lg:px-[50px] md:px-[40px]">
        <div className="flex items-center gap-x-6 md:gap-x-5 xs:gap-x-4 font-footer1">
          <div
            className="flex lg:hidden xl:hidden items-center gap-3 cursor-pointer"
            onClick={filterToggler}
            role="button"
            aria-pressed={filterDrawer}
          >
            <img
              src={filter}
              className="md:size-5 xs:size-5 mb-[1px]"
              alt="filter icon"
            />
            <h4 className="prop text-xl sm:text-16 xs:text-14 xs:leading-[22px] font-footer1 text-[#111727]">
              Filter
            </h4>
          </div>
          <button
            onClick={handleResetFilters}
            className="p-2 rounded-lg text-white bg-[#FBD232]"
          >
            {t("s_reset_filter_button")}
          </button>
          <div className="pops md:text-14 sm:text-14 xs:text-12">
            {t("s_showing_results_text", {
              start: currentPage * pageSize + 1,
              end: Math.min((currentPage + 1) * pageSize, totalItems),
              total: totalItems,
            })}
          </div>
        </div>

        <div className="sm:pt-4 xs:pt-4">
          <div className="flex gap-x-6 md:gap-x-5 items-center font-footer1">
            <div className="pops md:text-14 sm:text-14 xs:text-12">
              {t("s_show_prices")}
            </div>

            <div className="pops md:text-14 sm:text-14 xs:text-12">
              {t("s_excl_vat")}
            </div>

            <div className="recPasswrd">
              <Switch optional checked={includeVAT} onChange={toggleVAT} />
            </div>
            <div className="pops md:text-14 sm:text-14 xs:text-12">
              {t("s_incl_vat")}
            </div>
          </div>
        </div>
      </section>

      <section className="flex items-start pb-[200px] md:flex-col sm:flex-col xs:flex-col">
        <div
          className={`${
            filterDrawer ? "open-filter-drawer" : ""
          } assortment-filters bg-white py-4 w-full shadow-xl max-w-[300px] transition-transform duration-300 ease-in-out`}
        >
          <div
            className="close-menu xl:hidden lg:hidden flex justify-end"
            onClick={filterToggler}
          >
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </div>
          <Filters
            key={filterKey}
            categories={categoryArray}
            onFilterChange={handleFilterChange}
            initialFilters={initialFiltersMemo}
          />
        </div>
        <div className="flex flex-col w-full gap-10">
          <ProductsList
            searchQuery={searchQuery}
            filters={filters}
            currentPage={currentPage}
            pageSize={pageSize}
            setTotalItems={setTotalItems}
          />

          {totalItems > pageSize && (
            <Pagination
              pageCount={Math.ceil(totalItems / pageSize)}
              onPageChange={handlePageChange}
              forcePage={currentPage}
            />
          )}
        </div>
      </section>
      <QualitySection />
    </>
  );
};
