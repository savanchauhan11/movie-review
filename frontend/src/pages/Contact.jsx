import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-yellow-500 mb-6 text-center">
          Contact Us
        </h1>
        <p className="text-gray-300 text-lg mb-8 text-center">
          Have questions, suggestions, or just want to say hi?  
          Fill out the form below!
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="p-3 w-full bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="p-3 w-full bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            rows="5"
            className="p-3 w-full bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded-lg transition-colors duration-300">
            Send Message
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}
