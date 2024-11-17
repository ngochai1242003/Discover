import Auth from "../components/Auth/Login";
import FilterResultsPage from "../pages/FilterResultsPage/FilterResultsPage";
import Home from "../pages/HomePage/home";
import NotFundPage from "../pages/NotFoundPage/NotFoundPage";
import SearchResultsPage from "../pages/SearchResultsPage/SearchResultsPage";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import DestinationDetail from "../components/DestinationDetail/DestinationDetail";

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
    },
    {
        path: "/login",
        page: Login,
        isShowHeader: false  
    },
    {
        path: "/register",
        page: Register,
        isShowHeader: false  
    },
    {
        path: "/destination-detail/:id",
        page: DestinationDetail,
        isShowHeader: true  
    }

]