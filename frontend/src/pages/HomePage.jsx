import React, { useState } from "react";
import Hero from "../components/Hero";
import InsuranceCategories from "./insurance pages/InsuranceCategories";
import { Link } from "react-router-dom";

const HomePage = () => {
  // Initial testimonials state
  const [testimonials, setTestimonials] = useState([
    
    {
      id: 1,
      name: "Michael Chen",
      role: "Family Man",
      content:
        "The health insurance comparison tool made it so easy to find coverage for my entire family. Great service and expert advice!",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Emily Davis",
      role: "Young Professional",
      content:
        "As a first-time insurance buyer, I was overwhelmed. The advisors at InsureWise made everything clear and simple. Highly recommend!",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
    },
  ]);

  // State to handle feedback form visibility and inputs
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [newFeedback, setNewFeedback] = useState({
    name: "",
    role: "",
    content: "",
    rating: 5,
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFeedback((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const feedback = {
      id: testimonials.length + 1,
      name: newFeedback.name || "Anonymous",
      role: newFeedback.role || "Customer",
      content: newFeedback.content,
      rating: newFeedback.rating,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        newFeedback.name || "Anon"
      )}&background=4f46e5&color=fff&size=64`,
    };
    setTestimonials((prev) => [feedback, ...prev]);
    // Reset form and close
    setNewFeedback({ name: "", role: "", content: "", rating: 5 });
    setShowFeedbackForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-[#c7d2fe] to-[#a5b4fc]">
      {/* Hero + Categories */}
      <Hero />
      <InsuranceCategories />

      {/* Feedback Form Modal */}
      {showFeedbackForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              onClick={() => setShowFeedbackForm(false)}
              aria-label="Close feedback form"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4">Submit Your Feedback</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={newFeedback.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="text"
                name="role"
                value={newFeedback.role}
                onChange={handleChange}
                placeholder="Your Role (optional)"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <textarea
                name="content"
                value={newFeedback.content}
                onChange={handleChange}
                required
                placeholder="Your Feedback"
                className="w-full border border-gray-300 rounded px-3 py-2 resize-none"
                rows={4}
              />
              <label className="block">
                Rating:
                <select
                  name="rating"
                  value={newFeedback.rating}
                  onChange={handleChange}
                  className="ml-2 border border-gray-300 rounded px-2 py-1"
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-2xl shadow-2xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                What Our Customers Say
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Real stories from our satisfied clients about how InsureWise
                made insurance easy and accessible.
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
                        <span key={i} className="text-yellow-400 text-lg">
                          ★
                        </span>
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
                      <h4 className="font-semibold text-gray-800">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
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
              Join thousands of satisfied customers who found the right coverage
              with expert help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Get Started Free
              </Link>
              <button
                onClick={() => setShowFeedbackForm(true)}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Add Feedback
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
