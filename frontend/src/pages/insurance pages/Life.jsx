import React from 'react';
import { Link } from 'react-router-dom';
import InsuranceCard from './InsuranceCard';

const Life = () => {
  const lifePolicies = [
    {
      id: 1,
      name: "Term Life Secure",
      provider: "LifeGuard",
      premium: "₹500/month",
      coverage: "₹1,00,00,000",
      features: ["20-year term", "Accidental death benefit", "Critical illness rider"],
      rating: 4.7
    },
    {
      id: 2,
      name: "Whole Life Plan",
      provider: "FutureSecure",
      premium: "₹1,200/month",
      coverage: "Lifetime coverage",
      features: ["Savings component", "Loan facility", "Bonus additions"],
      rating: 4.5
    }
  ];

  return (
    <div className="bg-gradient-to-br from-[#e0f2fe] via-[#c7d2fe] to-[#a5b4fc] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-800 mb-4">Life Insurance</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Secure your family's financial future with comprehensive life coverage plans.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {lifePolicies.map(policy => (
            <InsuranceCard key={policy.id} policy={policy} />
          ))}
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Key Benefits of Life Insurance</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Financial security for your family in case of unfortunate events</li>
            <li>Tax benefits under Section 80C and 10(10D) of Income Tax Act</li>
            <li>Some policies offer savings and investment components</li>
            <li>Optional riders for critical illness, accidental death, and disability</li>
          </ul>
          <div className="mt-6">
            <Link 
              to="/compare?type=life" 
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Compare Life Policies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Life;