import React from "react";
import insurance1 from "../../assets/insurance1.jpg";
import insurance2 from "../../assets/insurance2.jpg";

const AboutUs = () => {
  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center py-8 overflow-hidden">
      {/* Animated floating dots */}
      <svg
        className="absolute left-8 top-8 w-16 h-16 opacity-20 animate-floatY pointer-events-none"
        fill="none"
        viewBox="0 0 100 100"
        style={{ zIndex: 0 }}
      >
        <circle cx="20" cy="20" r="4" fill="#6366f1" />
        <circle cx="60" cy="40" r="3" fill="#6366f1" />
        <circle cx="80" cy="70" r="2" fill="#818cf8" />
        <circle cx="40" cy="80" r="2" fill="#a5b4fc" />
      </svg>
      <svg
        className="absolute right-8 top-8 w-16 h-16 opacity-20 animate-floatY pointer-events-none"
        fill="none"
        viewBox="0 0 100 100"
        style={{ zIndex: 0 }}
      >
        <circle cx="20" cy="20" r="3" fill="#a5b4fc" />
        <circle cx="70" cy="30" r="4" fill="#6366f1" />
        <circle cx="85" cy="60" r="2" fill="#818cf8" />
        <circle cx="60" cy="90" r="2" fill="#6366f1" />
      </svg>
      {/* Main Content */}
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center z-10">
        {/* Left: Illustration with overlay to hide text */}
        <div className="flex-1 flex justify-center items-start mb-8 md:mb-0 relative">
          <img
            src={insurance1}
            alt="Insurance Globe"
            className="w-full max-w-md h-auto rounded-2xl shadow-lg"
            style={{ background: "rgba(99,102,241,0.08)" }}
          />
        </div>
        {/* Right: Text Content */}
        <div className="flex-1 px-0 md:px-10">
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-indigo-700 underline mb-2">
                OUR VISION
              </h2>
              <ul className="list-disc list-inside text-gray-800 space-y-2">
                <li>
                  Our vision is to be the premier destination for insurance
                  solutions, recognised for our commitment to client
                  satisfaction and industry leadership.
                </li>
                <li>
                  We aim to leverage technology and innovation to transform the
                  insurance experience, making it simple, accessible, and
                  personalised.
                </li>
                <li>
                  Our vision includes being a trusted advisor, empowering
                  clients with knowledge, and providing them with customised
                  coverage options that protect what matters most to them.
                </li>
                <li>
                  We strive to continuously enhance our services, stay ahead of
                  industry trends, and exceed client expectations.
                </li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-bold text-indigo-700 underline mb-2">
                OUR MISSION
              </h2>
              <ul className="list-disc list-inside text-gray-800 space-y-2">
                <li>
                  Our mission is to provide exceptional insurance services
                  tailored to the unique needs of our clients.
                </li>
                <li>
                  We prioritize trust, transparency, and personalized attention,
                  ensuring our clients' peace of mind and protection.
                </li>
                <li>
                  We strive for seamless customer experiences, from policy
                  selection to claims support, building long-term relationships
                  based on reliability and exceptional service.
                </li>
                <li>
                  Our most important mission is to build lifelong relationships
                  with our clients, not only to earn money but to create a
                  prestigious life for each other.
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
      <style>{`
        .animate-floatY {
          animation: floatY 4s infinite ease-in-out alternate;
        }
        @keyframes floatY {
          from { transform: translateY(0);}
          to { transform: translateY(24px);}
        }
      `}</style>
    </div>
  );
};

export default AboutUs;
