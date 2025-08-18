import React from "react";
import { Link } from "react-router-dom";
// import LiveChatWidget from "../pages/LiveChatWidget";

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Find the Perfect{" "}
            <span className="text-indigo-600">Insurance Policy</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Get expert advice, compare policies, and make informed decisions.
            Protect what matters most with trusted guidance from certified
            advisers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/insurances"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition"
            >
              Explore Insurance Options
            </Link>
            {/* <button
              // onClick={() => window.$crisp?.push(["do", "chat:open"])}
              aria-label="Talk to an Adviser live chat"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold border-2 border-indigo-600 hover:bg-gray-100 transition"
            >
              Talk to an Adviser
            </button> */}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: "🛡️", label: "Policies Sold", value: "50K+" },
            { icon: "👥", label: "Expert Advisers", value: "200+" },
            { icon: "📈", label: "Satisfaction Rate", value: "98%" },
            { icon: "🏆", label: "Years Experience", value: "5+" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900">
                {stat.value}
              </div>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      {/* <LiveChatWidget /> */}
    </section>
  );
};

export default Hero;
