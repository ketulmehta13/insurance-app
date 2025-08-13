import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const InsuranceCard = ({ policy }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{policy.name}</h3>
            <p className="text-gray-600">{policy.provider}</p>
          </div>
          <div className="flex items-center bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
            <Star className="w-4 h-4 fill-current mr-1" />
            <span>{policy.rating}</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-500">Premium</p>
          <p className="text-lg font-semibold text-indigo-600">{policy.premium}</p>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-500">Coverage</p>
          <p className="text-lg font-semibold">{policy.coverage}</p>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">Key Features</p>
          <ul className="space-y-1">
            {policy.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2"></span>
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex space-x-3">
          <Link
            to={`/policy/${policy.id}`}
            className="flex-1 bg-indigo-600 text-white text-center py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            View Details
          </Link>
          <button className="flex-1 border border-indigo-600 text-indigo-600 py-2 rounded-lg font-medium hover:bg-indigo-50 transition">
            Get Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsuranceCard;