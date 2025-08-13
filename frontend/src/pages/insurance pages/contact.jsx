// src/pages/Contact.jsx
import React from 'react';
import { Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-700 mb-6">
        We'd love to hear from you! Reach out with any questions or support needs.
      </p>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Clock className="w-5 h-5 text-blue-600" />
          <span>Available Digitally: 24 x 7</span>
        </div>
        <div className="flex items-center space-x-3">
          <Clock className="w-5 h-5 text-blue-600" />
          <span>Phone Support: 11:00am - 6:00pm</span>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Email</h2>
          <p>support@pradvisors.com</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
