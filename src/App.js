import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// User Layout
import UserLayout from "./User/UserLayout";
import Home from "./User/Home";
import About from "./User/About";
import Client from "./User/Client";
import Gallery from "./User/Gallery";
import Contact from "./User/Contact";
import Career from "./User/Career";
import ApplyForm from "./User/ApplyForm";

import Biotech from "./User/biotech";
import Chemicals from "./User/Chemicals";
import Dairy from "./User/Dairy";
import Cements from "./User/Cements";
import Sugar from "./User/Sugar";
import RenewableEnergy from "./User/RenewableEnergy";
import Pulp from "./User/Pulp";
import Water from "./User/Water";
import ChimneyAviationLight from "./User/ChimneyAviationLight";

import TurnkeySolutions from "./User/TurnkeySolutions";
import EngineeringService from "./User/EngineeringService";
import FieldInstrumentation from "./User/FieldInstrumentation";
import ElectricalControlPanel from "./User/ElectricalControlPanel";
import AutomationService from "./User/AutomationService";

// Admin Layout
import Sidebar from "./Admin/Sidebar";
import Dashboard from "./Admin/Components/Dashboard";

import GalleryMaster from "./Admin/Components/GalleryMaster";
import BannerMaster from "./Admin/Components/BannerMaster";
import ClientMaster from "./Admin/Components/ClientMaster";
import TestimonialMaster from "./Admin/Components/TestimonialMaster";
import FooterMaster from "./Admin/Components/FooterMaster";
import CertificationMaster from "./Admin/Components/CertificationMaster";
import NewsMaster from "./Admin/Components/NewsMaster";
import JobMaster from "./Admin/Components/JobMaster";
import CandidateMaster from "./Admin/Components/CandidateMaster";
import AboutUsMaster from "./Admin/Components/AboutUsMaster";

import CategoryMaster from "./Admin/Components/CategoryMaster";
import ServiceMaster from "./Admin/Components/ServiceMaster";
import WhyChooseUs from "./Admin/Components/WhyChooseUs";
import StatMaster from "./Admin/Components/StatMaster";
import AccrediationMaster from "./Admin/Components/AccrediationMaster";
import ImageMaster from "./Admin/Components/ImageMaster";
const App = () => {
  return (
    <Router>
      <Routes>

        {/* USER ROUTES */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="clients" element={<Client />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contact" element={<Contact />} />
          <Route path="career" element={<Career />} />

          <Route path="apply-form" element={<ApplyForm />} />

          <Route path="turnkey-solution" element={<TurnkeySolutions />} />
          <Route path="engineering-service-solution" element={<EngineeringService />} />
          <Route path="field-instrumentation-solution" element={<FieldInstrumentation />} />
          <Route path="electrical-control-panel-solution" element={<ElectricalControlPanel />} />
          <Route path="automation-service" element={<AutomationService />} />



          <Route path="biotech-pharma" element={<Biotech/>} />
          <Route path="chemicals-api" element={<Chemicals/>} />
          <Route path="dairy-brewery-food-beverage" element={<Dairy/>} />
          <Route path="mmm-cement" element={<Cements/>} />
          <Route path="sugar-ethanol-distillery-oil-gas" element={<Sugar/>} />
          <Route path="renewable-energy" element={<RenewableEnergy/>} />
          <Route path="pulp-paper-textile" element={<Pulp/>} />
          <Route path="water-and-wastewater-treatment" element={<Water/>} />
          <Route path="Chimney-Aviation-Light" element={<ChimneyAviationLight/>} />
          




















        </Route>

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<Sidebar />}>
          <Route index element={<Dashboard />} />
         
           <Route path="gallery-master" element={<GalleryMaster />} />
            <Route path="banner-master" element={<BannerMaster />} />
            <Route path="client-master" element={<ClientMaster />} />
            <Route path="testimonial-master" element={<TestimonialMaster />} />
            <Route path="footer-master" element={<FooterMaster />} />
<Route path="certification-master" element={<CertificationMaster />} />
<Route path="job-master" element={<JobMaster />} />
<Route path="candidate-master" element={<CandidateMaster />} />
<Route path="aboutus-master" element={<AboutUsMaster />} />


<Route path="news-master" element={<NewsMaster/>} />
<Route path="category-master" element={<CategoryMaster/>} />
<Route path="service-master" element={<ServiceMaster/>} />

<Route path="whychooseus-master" element={<WhyChooseUs/>} />
<Route path="stats-master" element={<StatMaster/>} />
<Route path="accrediation-master" element={<AccrediationMaster/>} />
<Route path="image-master" element={<ImageMaster/>} />






{/* <Route path="turnkey-master" element={<TurnkeyMaster/>} />
<Route path="engineering-master" element={<EngineeringMaster/>} />
<Route path="automation-master" element={<AutomationMaster/>} />
<Route path="controlpanel-master" element={<ControlpanelMaster/>} />
<Route path="fieldinstrument-master" element={<FieldInstrument/>} /> */}










        </Route>

      </Routes>
    </Router>
  );
};

export default App;


// sdfghjk