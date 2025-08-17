import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ComparePage from "./pages/ComparePage";
import Insurance from "./pages/insurance";
import Health from "./pages/insurance pages/Health";
import Life from "./pages/insurance pages/Life";
import Vehicle from "./pages/insurance pages/Vehicle";
import Travel from "./pages/insurance pages/Travel";
import Property from "./pages/insurance pages/Property";
import Business from "./pages/insurance pages/Business";
import Contact from "./pages/insurance pages/contact";
import PrivacyPolicy from "./pages/privacypolicy";
import FAQ from "./pages/insurance pages/Faqs";
import RegisterPage from "./pages/RegisterPage";
import DashboardHome from "./components/adminmanage/DashboardHome";
import DashboardLayout from "./components/adminmanage/DashboardLayout";
import AddFamilyHead from "./components/clientmanage/Addfamilyhead";
import AddFamilyMember from "./components/clientmanage/AddFamilyMember";
import AddFirm from "./components/clientmanage/AddFirm";
import ManageClients from "./components/clientmanage/ManageClients";
import ClientManagement from "./components/Clientmanage/Clientmanagement";
import TrashManagement from "./components/clientmanage/TrashManagement";
import AddNewPolicy from './components/policymanage/AddNewPoilcy';
import RenewalPolicy from './components/policymanage/RenewalPolicy';
import ManagePolicy from './components/policymanage/ManagePolicy';
import DeletedPolicies from './components/policymanage/DeletedPolicies';
import SubAgentManagement from './components/subagent/SubAgentManagement';
import AddSubAgent from "./components/subagent/AddSubAgent";
import ManageSubAgents from "./components/subagent/ManageSubAgents"
import InsuranceManagement from "./components/insurancemanage/InsuranceManagement";
import ViewClient from "./components/clientmanage/ViewClientPage";
import EditClient from "./components/clientmanage/EditClientPage";
import EditPolicy from "./components/policymanage/EditPolicy";
import ViewPolicy from "./components/policymanage/ViewPolicy";
import ViewSubAgent from "./components/subagent/ViewSubAgent";
import EditSubAgent from "./components/subagent/EditSubAgent";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>

      

        {/* admin dashboard  */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />

          {/* client manage */}
          <Route path="addfamilyhead" element={<AddFamilyHead />} />
          <Route path="addfamilymember" element={<AddFamilyMember />} />
          <Route path="addfirm" element={<AddFirm />} />
          <Route path="manageclient" element={<ManageClients />} />
          <Route path="clientmanage" element={<ClientManagement />} />
          <Route path="trashmanage" element={<TrashManagement />} />

          {/* Corrected Routes for View and Edit */}
          <Route path="client/view/:clientType/:clientId" element={<ViewClient />} />
          <Route path="client/edit/:clientType/:clientId" element={<EditClient />} />


          {/* policy management */}
          <Route path="policymanagement/addnewpolicy" element={<AddNewPolicy />} />
          <Route path="policymanagement/renewalpolicy" element={<RenewalPolicy />} />
          <Route path="policymanagement/managepolicy" element={<ManagePolicy />} />
          <Route path="policymanagement/deletedpolicies" element={<DeletedPolicies />} />

          {/* --- NEW ROUTES FOR VIEW AND EDIT POLICY --- */}
            <Route path="policy/view/:policyId" element={<ViewPolicy />} />
            <Route path="policy/edit/:policyId" element={<EditPolicy />} />

          {/* Sub Agent Management */}
          <Route path="subagentmanagement" element={<SubAgentManagement />} />
          <Route path="subagentmanagement/addsubagent" element={<AddSubAgent />} />
          <Route path="subagentmanagement/managesubagents" element={<ManageSubAgents />} />
          {/* --- NEW ROUTES FOR VIEW AND EDIT SUB-AGENT --- */}
            <Route path="subagent/view/:agentId" element={<ViewSubAgent />} />
            <Route path="subagent/edit/:agentId" element={<EditSubAgent />} />

          {/* Insurance Management */}
          <Route path="insurancemanagement" element={<InsuranceManagement />} />



        </Route>

        {/* Routes with header and footer */}
        <Route
          path="/*"
          element={
            <>
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />

                  <Route path="/compare" element={<ComparePage />} />
                  <Route path="/customerdashboard" element={<Dashboard />} />

                  <Route path="/insurances" element={<Insurance />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/insurance/health" element={<Health />} />
                  <Route path="/insurance/life" element={<Life />} />
                  <Route path="/insurance/vehicle" element={<Vehicle />} />
                  <Route path="/insurance/travel" element={<Travel />} />
                  <Route path="/insurance/property" element={<Property />} />
                  <Route path="/insurance/business" element={<Business />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
