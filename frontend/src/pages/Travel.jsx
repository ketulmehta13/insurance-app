import React from 'react';
import { Link } from 'react-router-dom';
import InsuranceCard from '../components/InsuranceCard';

const Travel = () => {
  const travelPolicies = [
    {
      id: 1,
      name: "International Travel Shield",
      provider: "GlobalCover",
      premium: "₹500/trip",
      coverage: "$100,000 medical",
      features: ["Trip cancellation", "Lost baggage", "Medical evacuation"],
      rating: 4.5
    },
    {
      id: 2,
      name: "Domestic Travel Protect",
      provider: "IndiaTravel",
      premium: "₹200/trip",
      coverage: "₹2,00,000 medical",
      features: ["Flight delay", "Accidental death", "Hospital cash"],
      rating: 4.3
    }
  ];

  return (
    <div className="bg-gradient-to-br from-[#e0f2fe] via-[#c7d2fe] to-[#a5b4fc] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-800 mb-4">Travel Insurance</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Stay protected during your domestic and international travels with comprehensive coverage.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {travelPolicies.map(policy => (
            <InsuranceCard key={policy.id} policy={policy} />
          ))}
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Why Travel Insurance?</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Covers medical emergencies abroad where your regular health insurance may not work</li>
            <li>Protection against trip cancellations, delays, and interruptions</li>
            <li>Coverage for lost, stolen, or damaged baggage and personal belongings</li>
            <li>24/7 worldwide assistance services including emergency evacuation</li>
          </ul>
          <div className="mt-6">
            <Link 
              to="/compare?type=travel" 
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Compare Travel Policies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Travel;