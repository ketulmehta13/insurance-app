import React ,{ useEffect } from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      

      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
      
      <div className="prose prose-indigo">
        <p className="mb-6">
          We are committed to ensuring the privacy and confidentiality of your personal information. 
          By accessing and using our website, you consent to the terms of this privacy policy.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Information Collection:</h2>

        <h3 className="text-xl font-medium mb-3">Personal Information:</h3>
        <p className="mb-6">
          We may collect personal information such as your name, contact details, email address, 
          and other relevant information when you voluntarily provide it to us through website forms, 
          email communications, or other means.
        </p>

        <h3 className="text-xl font-medium mb-3">Non-Personal Information:</h3>
        <p className="mb-6">
          We may also collect non-personal information such as your IP address, browser type, 
          operating system, and website usage data through cookies and similar technologies. 
          This information is used to analyze trends, administer the website, track user movements, 
          and gather demographic information.
        </p>

        <h3 className="text-xl font-medium mb-3">Information Sharing:</h3>
        <p className="mb-6">
          We do not sell, trade, or rent your personal information to third parties. However, 
          we may share your personal information with trusted service providers who assist us in 
          operating our website and delivering services to you. These service providers are obligated 
          to keep your information confidential and use it only for the purposes specified by us.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;