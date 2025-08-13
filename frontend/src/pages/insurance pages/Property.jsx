import React from 'react';
import { Link } from 'react-router-dom';
import InsuranceCard from './InsuranceCard';

const Property = () => {
  const propertyPolicies = [
    {
      id: 1,
      name: "Home Shield Plus",
      provider: "HomeSecure",
      premium: "₹3,000/year",
      coverage: "₹50,00,000",
      features: ["Fire & lightning", "Natural calamities", "Burglary & theft"],
      rating: 4.4
    },
    {
      id: 2,
      name: "Renter's Protection",
      provider: "RentalCover",
      premium: "₹1,500/year",
      coverage: "₹10,00,000",
      features: ["Content insurance", "Liability coverage", "Alternative accommodation"],
      rating: 4.2
    }
  ];

  return (
    <div className="bg-gradient-to-br from-[#e0f2fe] via-[#c7d2fe] to-[#a5b4fc] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-800 mb-4">Property Insurance</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Protect your home and valuable possessions against unforeseen damages and losses.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {propertyPolicies.map(policy => (
            <InsuranceCard key={policy.id} policy={policy} />
          ))}
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Property Insurance Benefits</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Protection against fire, explosion, lightning, and natural disasters</li>
            <li>Coverage for burglary, theft, and housebreaking</li>
            <li>Optional coverage for earthquakes and floods</li>
            <li>Some policies cover temporary accommodation costs if home becomes uninhabitable</li>
          </ul>
          <div className="mt-6">
            <Link 
              to="/compare?type=property" 
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Compare Property Policies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;