import FilterResultsPage from "../pages/FilterResultsPage/FilterResultsPage";
import Home from "../pages/HomePage/home";
import NotFundPage from "../pages/NotFoundPage/NotFoundPage";
import SearchResultsPage from "../pages/SearchResultsPage/SearchResultsPage";

export const routes = [
    {
        path: '/',
        page: Home,
        isShowHeader: true
    },
    {
        path: "*",
        page: NotFundPage
    },
    {
        path: '/search-results',
        page: SearchResultsPage,
        isShowHeader: true
    },
    {
        path: '/filter-results',
        page: FilterResultsPage,
        isShowHeader: true
    }

]