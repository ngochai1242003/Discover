import React from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import Dashboard from "./pages/Dashboard/Dashboard"; // Import Dashboard
import './app.css';
import 'boxicons/css/boxicons.min.css';

const App = () => {
  return (
    <div>
      <Routes>
        {routes.map((route) => {
          const Page = route.page;
          const Layout = route.isShowHeader ? DefaultComponent : React.Fragment;

          // Nếu là Dashboard, render các route con
          if (route.path === "/dashboard") {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<Dashboard />}
              >
                {route.children?.map((childRoute) => {
                  const ChildPage = childRoute.page;
                  return (
                    <Route
                      key={childRoute.path}
                      path={childRoute.path}
                      element={<ChildPage />}
                    />
                  );
                })}
              </Route>
            );
          }

          // Route khác
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
};

export default App;
