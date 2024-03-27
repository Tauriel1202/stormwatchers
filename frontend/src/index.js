import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/master.css";
import "./css/small.css";

import Home from "./js/home";
import Weather from "./js/weatherInfo";
import Prep from "./js/prep";
import Past from "./js/past";
import Lstorms from "./js/lstorms";
import Watch from "./js/watch";
import Printables from "./js/printables";
import Account from "./js/account";
import InfoTemplate from "./js/infoTemplate";
import Form from './js/form';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/stormprep" element={<Prep />} />
        <Route path="/pastweather" element={<Past />} />
        <Route path="/legendarystorms" element={<Lstorms />} />
        <Route path="/stormwatch" element={<Watch />} />
        <Route path="/printables" element={<Printables />} />
        <Route path="/account" element={<Account />} />
        <Route path="/weather/summary" element={<InfoTemplate />} />
        <Route path="/account/form" element={<Form />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
