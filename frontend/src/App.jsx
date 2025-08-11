import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ComparePage from './pages/ComparePage';
import Dashboard from './pages/Dashboard';
import Insurance from './pages/insurance';
import Health from './pages/Health';
import Life from './pages/Life';
import Vehicle from './pages/Vehicle';
import Travel from './pages/Travel';
import Property from './pages/Property';
import Business from './pages/Business';
import Contact from './pages/contact';
import PrivacyPolicy from './pages/privacypolicy';
import FAQ from './pages/Faqs';
import RegisterPage from './pages/RegisterPage';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        {/* Routes with header and footer */}
        <Route path="/*" element={
          <>
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/compare" element={<ComparePage />} />
                <Route path="/dashboard" element={<Dashboard />} />
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
                 <Route path="/register" element={<RegisterPage/>} />

              </Routes>
            </main>
            <Footer />
          </>
        } />
        
        
       
        
      </Routes>
    </div>
  );
};

export default App;