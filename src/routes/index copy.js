import Auth from "../components/Auth/Login";
import FilterResultsPage from "../pages/FilterResultsPage/FilterResultsPage";
import Home from "../pages/HomePage/home";
import NotFundPage from "../pages/NotFoundPage/NotFoundPage";
import SearchResultsPage from "../pages/SearchResultsPage/SearchResultsPage";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import DestinationDetail from "../components/DestinationDetail/DestinationDetail";
import VerifyOtp from "../components/Auth/VerifyOtp";
import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardUser from "../components/DashboardUser/DashboardUser";
import DashboardDestination from "../components/DashboardDestination/DashboardDestination";

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
        path: "/verify",
        page: VerifyOtp,
        isShowHeader: false  
    },
    {
        path: "/destination-detail/:id",
        page: DestinationDetail,
        isShowHeader: true  
    },
    {
        path: "/dashboard",
        page: Dashboard,
        isShowHeader: false  
    },
    {
        path: "/dashboard-user",
        page: DashboardUser,
        isShowHeader: false  
    },
    {
        path: "/dashboard-destination",
        page: DashboardDestination,
        isShowHeader: false  
    }

]