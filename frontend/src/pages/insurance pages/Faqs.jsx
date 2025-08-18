import React ,{useEffect}from 'react';
import { Link } from 'react-router-dom';

const FAQ = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-sm font-bold mb-6 text-center">
        <span>FAQs</span>
      </div>

      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Life Insurance</h2>
          <ul className="space-y-2 pl-5">
            <li className="list-disc">Mediclaim</li>
            <li className="list-disc">Vehicle Insurance</li>
            <li className="list-disc">General Insurance</li>
            <li className="list-disc">Mutual Funds</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FAQ;