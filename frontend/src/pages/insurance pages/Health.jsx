import React from 'react';
import { Link } from 'react-router-dom';
import InsuranceCard from './InsuranceCard';

const Health = () => {
  const healthPolicies = [
    {
      id: 1,
      name: "Comprehensive Health Plus",
      provider: "HealthSecure",
      premium: "₹1,200/month",
      coverage: "₹10,00,000",
      features: ["Cashless hospitalization", "Pre-existing conditions", "Maternity cover"],
      rating: 4.8
    },
    {
      id: 2,
      name: "Family Health Shield",
      provider: "FamilyCare",
      premium: "₹2,500/month",
      coverage: "₹15,00,000 (Family floater)",
      features: ["Cover for 2 adults + 3 children", "Daycare procedures", "Annual health checkup"],
      rating: 4.6
    }
  ];

  return (
    <div className="bg-gradient-to-br from-[#e0f2fe] via-[#c7d2fe] to-[#a5b4fc] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-800 mb-4">Health Insurance</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Comprehensive medical coverage for you and your family with cashless hospitalization across India's top hospitals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {healthPolicies.map(policy => (
            <InsuranceCard key={policy.id} policy={policy} />
          ))}
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Why Choose Health Insurance?</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Coverage for hospitalization expenses including room rent, ICU charges, and doctor fees</li>
            <li>Pre and post hospitalization expenses covered (typically 30-60 days)</li>
            <li>Daycare procedures coverage (no need for 24-hour hospitalization)</li>
            <li>Tax benefits under Section 80D of the Income Tax Act</li>
          </ul>
          <div className="mt-6">
            <Link 
              to="/compare?type=health" 
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Compare Health Policies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Health;