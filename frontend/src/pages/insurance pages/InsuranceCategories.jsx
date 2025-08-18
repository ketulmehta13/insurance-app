import React from 'react';
import { Link } from 'react-router-dom';

const InsuranceCategories = () => {
  const categories = [
    {
      id: 1,
      title: 'Health Insurance',
      description: 'Comprehensive medical coverage for you and your family',
      icon: '❤️',
      color: 'red',
      link: '/insurance/health'
    },
    {
      id: 2,
      title: 'Life Insurance',
      description: 'Secure your family\'s financial future with life coverage',
      icon: '👤',
      color: 'blue',
      link: '/insurance/life'
    },
    {
      id: 3,
      title: 'Vehicle Insurance',
      description: 'Protect your car, bike, and other vehicles',
      icon: '🚗',
      color: 'green',
      link: '/insurance/vehicle'
    },
    {
      id: 4,
      title: 'Property Insurance',
      description: 'Safeguard your home and valuable possessions',
      icon: '🏠',
      color: 'purple',
      link: '/insurance/property'
    },
    {
      id: 5,
      title: 'Business Insurance',
      description: 'Comprehensive protection for your business',
      icon: '💼',
      color: 'orange',
      link: '/insurance/business'
    },
    {
      id: 6,
      title: 'Travel Insurance',
      description: 'Stay protected during your travels worldwide',
      icon: '✈️',
      color: 'teal',
      link: '/insurance/travel'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      red: 'bg-red-100 text-red-600 hover:bg-red-200',
      blue: 'bg-blue-100 text-blue-600 hover:bg-blue-200',
      green: 'bg-green-100 text-green-600 hover:bg-green-200',
      purple: 'bg-purple-100 text-purple-600 hover:bg-purple-200',
      orange: 'bg-orange-100 text-orange-600 hover:bg-orange-200',
      teal: 'bg-teal-100 text-teal-600 hover:bg-teal-200'
    };
    return colorMap[color] || 'bg-gray-100 text-gray-600 hover:bg-gray-200';
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Insurance Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive range of insurance products designed to protect what matters most to you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  {categories.map((category) => (
    <Link
      key={category.id}
      to={category.link}
      className="group bg-white p-8 rounded-xl 
                 shadow-[0_10px_20px_rgba(99,102,241,0.15)] 
                 hover:shadow-[0_12px_24px_rgba(99,102,241,0.2)] 
                 transition-all duration-300 border border-gray-100 hover:border-gray-200"
    >
      <div className={`w-16 h-16 rounded-lg ${getColorClasses(category.color)} flex items-center justify-center text-2xl mb-6`}>
        {category.icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
        {category.title}
      </h3>
      <p className="text-gray-600 leading-relaxed">
        {category.description}
      </p>
      <div className="mt-6 text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
        Learn More →
      </div>
    </Link>
  ))}
</div>

        <div className="text-center mt-12">
          <Link
            to="/compare"
            className="inline-flex items-center bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Compare All Policies
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InsuranceCategories;
