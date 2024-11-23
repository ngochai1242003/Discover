import FindDestination from "../components/Destination/findDestination/findDestination";
import ListDestination from "../components/Destination/listDestination/listDestination";
import DetailDestination from "../components/Destination/detailDestination/detailDestination";
import Home from "../pages/HomePage/home";
import NotFundPage from "../pages/NotFoundPage/NotFoundPage";
import SearchResultsPage from "../pages/SearchResultsPage/SearchResultsPage";

export const routes = [
  {
    path: "/",
    page: Home,
    isShowHeader: true,
  },
  {
    path: "*",
    page: NotFundPage,
  },
  {
    path: "/search-results",
    page: SearchResultsPage,
    isShowHeader: true,
  },
  {
    path: "/findDestination",
    page: FindDestination,
    isShowHeader: true,
  },
  {
    path: "/listDestination",
    page: ListDestination,
    isShowHeader: true,
  },
  {
    path: "/detailDestination",
    page: DetailDestination,
    isShowHeader: true,
  },
];
