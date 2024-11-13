import { Fragment, useState } from "react";
import { Route, Routes } from "react-router-dom";
// import DestinationList from "./components/destinationList/destinationList";
import { routes } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import './app.css'

const App = () => {
  return (
    <div>
      <Routes>
        {routes.map((route) => {
          const Page = route.page;
          const Layout = route.isShowHeader ? DefaultComponent : Fragment;
          return (
            <Route key={route.path}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              } />
          );
        })}
        {/* <Route path="/list" element={<DestinationList />} /> */}
      </Routes>
    </div>
  );
};

export default App;
