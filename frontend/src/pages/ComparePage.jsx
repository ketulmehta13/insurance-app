
import React, { useState } from 'react';
import { Search, Filter, Check, X, Star } from 'lucide-react';

const ComparePage = () => {
  const [selectedPolicies, setSelectedPolicies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const policies = [
    {
      id: 1,
      name: 'Premium Health Plus',
      company: 'HealthFirst Insurance',
      category: 'health',
      premium: '$299/month',
      coverage: '$500,000',
      deductible: '$1,000',
      claimRatio: '95%',
      rating: 4.8,
      features: ['Emergency Care', 'Prescription Drugs', 'Mental Health', 'Preventive Care'],
      popular: true
    },
    {
      id: 2,
      name: 'Family Life Secure',
      company: 'LifeGuard Corp',
      category: 'life',
      premium: '$89/month',
      coverage: '$1,000,000',
      deductible: 'N/A',
      claimRatio: '98%',
      rating: 4.9,
      features: ['Term Life', 'Accidental Death', 'Disability Rider', 'Child Coverage'],
      popular: false
    },
    {
      id: 3,
      name: 'Complete Vehicle Protection',
      company: 'AutoSafe Insurance',
      category: 'vehicle',
      premium: '$156/month',
      coverage: '$50,000',
      deductible: '$500',
      claimRatio: '92%',
      rating: 4.6,
      features: ['Collision Coverage', 'Comprehensive', 'Roadside Assistance', 'Rental Car'],
      popular: true
    },
    {
      id: 4,
      name: 'Essential Health Basic',
      company: 'Budget Health Co',
      category: 'health',
      premium: '$149/month',
      coverage: '$200,000',
      deductible: '$2,500',
      claimRatio: '88%',
      rating: 4.2,
      features: ['Basic Coverage', 'Emergency Care', 'Generic Drugs', 'Annual Checkup'],
      popular: false
    }
  ];

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterCategory === 'all' || policy.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  const handlePolicySelect = (policy) => {
    if (selectedPolicies.find(p => p.id === policy.id)) {
      setSelectedPolicies(selectedPolicies.filter(p => p.id !== policy.id));
    } else if (selectedPolicies.length < 3) {
      setSelectedPolicies([...selectedPolicies, policy]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-[#c7d2fe] to-[#a5b4fc] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Compare Insurance Policies</h1>
          <p className="text-lg text-gray-600">
            Find the perfect policy by comparing features, prices, and benefits side by side.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white p-6 rounded-xl shadow-xl mb-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search policies or companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="all">All Categories</option>
                <option value="health">Health Insurance</option>
                <option value="life">Life Insurance</option>
                <option value="vehicle">Vehicle Insurance</option>
                <option value="property">Property Insurance</option>
              </select>
            </div>
          </div>
        </div>

        {/* Selected Policies for Comparison */}
        {selectedPolicies.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Selected for Comparison ({selectedPolicies.length}/3)
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {selectedPolicies.map((policy) => (
                <div key={policy.id} className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-blue-900">{policy.name}</h3>
                    <button
                      onClick={() => handlePolicySelect(policy)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-sm text-blue-700">{policy.company}</p>
                  <p className="text-lg font-bold text-blue-900 mt-2">{policy.premium}</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Compare Selected Policies
              </button>
            </div>
          </div>
        )}

        {/* Policies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPolicies.map((policy) => {
            const isSelected = selectedPolicies.find(p => p.id === policy.id);
            return (
              <div
                key={policy.id}
                className={`bg-white rounded-lg shadow-md p-6 transition-all duration-200 hover:shadow-lg ${
                  isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {policy.name}
                    </h3>
                    <p className="text-gray-600">{policy.company}</p>
                  </div>
                  {policy.popular && (
                    <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Popular
                    </span>
                  )}
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{policy.rating}</span>
                  </div>
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="text-sm text-green-600">{policy.claimRatio} claim ratio</span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Premium:</span>
                    <span className="font-semibold text-blue-600">{policy.premium}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Coverage:</span>
                    <span className="font-semibold">{policy.coverage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Deductible:</span>
                    <span className="font-semibold">{policy.deductible}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {policy.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                    {policy.features.length > 3 && (
                      <li className="text-sm text-blue-600">
                        +{policy.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handlePolicySelect(policy)}
                    disabled={selectedPolicies.length >= 3 && !isSelected}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                      isSelected
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : selectedPolicies.length >= 3
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                  >
                    {isSelected ? 'Remove' : 'Compare'}
                  </button>
                  <button className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredPolicies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No policies found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparePage;
