import React from "react";
import Hero from "../components/Hero";
import InsuranceCategories from "./insurance pages/InsuranceCategories";
import { Link } from "react-router-dom";

const HomePage = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Small Business Owner",
      content:
        "InsureWise helped me find the perfect business insurance policy. The advisor was knowledgeable and saved me over $200 per month!",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Family Man",
      content:
        "The health insurance comparison tool made it so easy to find coverage for my entire family. Great service and expert advice!",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Emily Davis",
      role: "Young Professional",
      content:
        "As a first-time insurance buyer, I was overwhelmed. The advisors at InsureWise made everything clear and simple. Highly recommend!",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-[#c7d2fe] to-[#a5b4fc]">
      {/* Hero + Categories */}
      <Hero />
      <InsuranceCategories />

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-2xl shadow-2xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                What Our Customers Say
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Real stories from our satisfied clients about how InsureWise made insurance easy and accessible.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300"
                >
                  <div className="flex items-center mb-3">
                    <span className="text-2xl text-blue-500 mr-2">“</span>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-lg">★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-10 rounded-2xl shadow-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Ready to Find Your Perfect Insurance Policy?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who found the right coverage with expert help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Get Started Free
              </Link>
              <Link
                to="/advisers"
                className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition"
              >
                Talk to an Expert
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
