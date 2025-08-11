// src/pages/insurance.jsx
import React from 'react';

const insuranceData = [
  {
    type: 'Health Insurance',
    description: 'Covers medical expenses like hospital visits, surgeries, and prescriptions.',
    coverage: 'Up to ₹10,00,000/year',
    policies: ['Individual Plan', 'Family Floater', 'Critical Illness'],
  },
  {
    type: 'Life Insurance',
    description: 'Provides financial support to family in case of the insured’s death.',
    coverage: 'Up to ₹1 Cr. lump sum',
    policies: ['Term Life', 'Whole Life', 'Endowment Plans'],
  },
  {
    type: 'Vehicle Insurance',
    description: 'Covers damages to your vehicle or third-party liabilities.',
    coverage: 'Up to ₹5,00,000 + Third-party cover',
    policies: ['Comprehensive', 'Third-Party', 'Own Damage'],
  },
  {
    type: 'Property Insurance',
    description: 'Protects home or commercial property against fire, theft, or natural disasters.',
    coverage: 'Up to ₹50,00,000 property value',
    policies: ['Fire Insurance', 'Burglary Cover', 'Natural Calamity Cover'],
  },
  {
    type: 'Business Insurance',
    description: 'Covers business operations from potential losses or liabilities.',
    coverage: 'Custom coverage based on business size',
    policies: ['Liability Cover', 'Property Loss', 'Employee Insurance'],
  },
  {
    type: 'Travel Insurance',
    description: 'Covers unexpected travel issues like trip cancellation, lost baggage, or emergencies.',
    coverage: 'Up to ₹10,00,000 trip cover',
    policies: ['International', 'Domestic', 'Student Travel Insurance'],
  },
];

const Insurance = () => {
  return (
    <div className="bg-gradient-to-br from-[#e0f2fe] via-[#c7d2fe] to-[#a5b4fc] py-10 min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6 text-indigo-700 text-center">
          Explore Insurance Options
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insuranceData.map((insurance, index) => (
            <div key={index} className="bg-white shadow-md rounded-xl p-6 space-y-3 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">{insurance.type}</h2>
              <p className="text-gray-600">{insurance.description}</p>
              <p className="text-gray-700 font-medium">
                Coverage: <span className="text-green-600">{insurance.coverage}</span>
              </p>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {insurance.policies.map((policy, i) => (
                  <li key={i}>{policy}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Insurance;
