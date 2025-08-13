import React from 'react';
import { Link } from 'react-router-dom';
import InsuranceCard from './InsuranceCard';

const Vehicle = () => {
  const vehiclePolicies = [
    {
      id: 1,
      name: "Comprehensive Car Protect",
      provider: "AutoShield",
      premium: "₹5,000/year",
      coverage: "IDV ₹8,00,000",
      features: ["Zero depreciation", "Engine protection", "Roadside assistance"],
      rating: 4.6
    },
    {
      id: 2,
      name: "Two-Wheeler Secure",
      provider: "BikeCare",
      premium: "₹2,000/year",
      coverage: "IDV ₹1,50,000",
      features: ["Accessories cover", "Personal accident cover", "Third-party liability"],
      rating: 4.4
    }
  ];

  return (
    <div className="bg-gradient-to-br from-[#e0f2fe] via-[#c7d2fe] to-[#a5b4fc] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-800 mb-4">Vehicle Insurance</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Protect your car, bike, or other vehicles against accidents, theft, and third-party liabilities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {vehiclePolicies.map(policy => (
            <InsuranceCard key={policy.id} policy={policy} />
          ))}
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Vehicle Insurance Coverage</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Mandatory as per Motor Vehicles Act for all vehicles on Indian roads</li>
            <li>Covers own damage to vehicle and third-party liabilities</li>
            <li>Optional add-ons like zero depreciation, engine protection, etc.</li>
            <li>Cashless repairs at network garages across India</li>
          </ul>
          <div className="mt-6">
            <Link 
              to="/compare?type=vehicle" 
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Compare Vehicle Policies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vehicle;