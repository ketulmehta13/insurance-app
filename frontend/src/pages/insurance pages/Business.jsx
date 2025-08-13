import React from 'react';
import { Link } from 'react-router-dom';
import InsuranceCard from './InsuranceCard';

const Business = () => {
  const businessPolicies = [
    {
      id: 1,
      name: "Small Business Shield",
      provider: "EnterpriseCover",
      premium: "₹10,000/year",
      coverage: "₹50,00,000",
      features: ["Property damage", "Liability coverage", "Business interruption"],
      rating: 4.5
    },
    {
      id: 2,
      name: "Professional Liability Protect",
      provider: "ProCover",
      premium: "₹15,000/year",
      coverage: "₹1,00,00,000",
      features: ["Errors & omissions", "Legal defense costs", "Data breach coverage"],
      rating: 4.6
    },
    {
      id: 3,
      name: "Retail Business Plan",
      provider: "ShopSecure",
      premium: "₹8,000/year",
      coverage: "₹25,00,000",
      features: ["Inventory protection", "Glass breakage", "Money insurance"],
      rating: 4.3
    },
    {
      id: 4,
      name: "Cyber Risk Insurance",
      provider: "DigitalShield",
      premium: "₹20,000/year",
      coverage: "₹2,00,00,000",
      features: ["Data recovery", "Ransomware protection", "Regulatory fines"],
      rating: 4.7
    }
  ];

  return (
    <div className="bg-gradient-to-br from-[#e0f2fe] via-[#c7d2fe] to-[#a5b4fc] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-800 mb-4">Business Insurance</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Comprehensive protection for your business against various risks and liabilities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {businessPolicies.map(policy => (
            <InsuranceCard key={policy.id} policy={policy} />
          ))}
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Business Insurance Coverage</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Common Coverages:</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Property damage (buildings, equipment, inventory)</li>
                <li>General liability (customer injuries, property damage)</li>
                <li>Business interruption (lost income due to covered events)</li>
                <li>Professional liability (errors and omissions)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Specialized Policies:</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Workers' compensation (employee injuries)</li>
                <li>Commercial auto (company vehicles)</li>
                <li>Cyber liability (data breaches, cyber attacks)</li>
                <li>Directors and officers (management liability)</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Who Needs Business Insurance?</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-1">Small Businesses</h4>
                <p className="text-sm text-gray-700">Protect your physical assets and liability exposures</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-1">Professionals</h4>
                <p className="text-sm text-gray-700">Coverage for service errors and omissions</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-1">Online Businesses</h4>
                <p className="text-sm text-gray-700">Protection against cyber risks and data breaches</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Link 
              to="/compare?type=business" 
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition text-center"
            >
              Compare Business Policies
            </Link>
            <Link 
              to="/business-calculator" 
              className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition text-center"
            >
              Calculate Business Needs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Business;