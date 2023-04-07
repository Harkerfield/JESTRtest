import "./App.css";
import theme from "tailwindcss/defaultTheme";

import React, { useContext, useState, useEffect } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import FooterBar from "./components/footerBar/footerBar";
// import NavBarLayout from './components/navBarLayout/NavBarLayout.js'
import NavBar from "./components/navBar/navBar.js";
import NotFound from "./pages/notFound/NotFound.js";
import Home from "./pages/home/Home.js";
import Schedule from "./pages/schedule/Schedule.js";
import LocationList from "./pages/locationList/LocationList.js";
import GeoLocationConverter from "./pages/geoLocationConverter/GeoLocationConverter.js";
export const jestrContext = React.createContext();

const App = () => {
  const [options, setOptions] = useState({
    userRoll: "admin",
    threatsUrl:
      "http://localhost:3001/_api/web/lists/GetByTitle('Threats')/items",
    reservationsUrl:
      "http://localhost:3001/_api/web/lists/GetByTitle('Reservations')/items",
    theme: "adminTheme",
  });

  return (

    <div className="page-container">
      <div className="content-wrap">
      <NavBar />
      <jestrContext.Provider value={{ options, setOptions }}>
        <Routes>
          {/* <Route path="/" element={<Nav />}> */}
            <Route index element={<Home />} />
            <Route path="/Schedule" element={<Schedule />} />
            <Route path="/LocationList" element={<LocationList />} />
            <Route
              path="/GeoLocationConverter"
              element={<GeoLocationConverter />}
            />
            <Route path="*" element={<NotFound />}
             />
          {/* </Route> */}
        </Routes>
      </jestrContext.Provider>
      </div>
      <FooterBar />
    </div>
  );
};

export default App;
