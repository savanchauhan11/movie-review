import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <video
            autoPlay
            loop
            muted
            className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
            src="https://www.w3schools.com/howto/rain.mp4"
          ></video>
          <div className="relative z-10 text-center px-6">
            <h1 className="text-6xl md:text-7xl font-bold text-yellow-500 mb-4 tracking-wide">
              SPOILERS
            </h1>
            <p className="text-gray-300 text-xl md:text-2xl max-w-2xl mx-auto">
              Where films come alive! <br />
              Discover, review, and experience movies like never before.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto py-20 px-6 relative">
          <h2 className="text-4xl font-bold text-yellow-400 text-center mb-12">
            Our Story
          </h2>

          <div className="relative border-l border-yellow-500 ml-8">
            {[
              {
                year: "2022",
                title: "The Idea Sparked",
                desc: "Spoilers was born from a simple idea — to connect movie lovers globally and provide a platform for reviews, ratings, and recommendations."
              },
              {
                year: "2023",
                title: "Platform Launch",
                desc: "We launched the platform with curated movie collections, user reviews, and interactive features."
              },
              {
                year: "2024",
                title: "Community Growth",
                desc: "Thousands of movie enthusiasts joined, making Spoilers a thriving community for cinephiles everywhere."
              }
            ].map((item, idx) => (
              <div key={idx} className="mb-10 ml-8 relative">
                <div className="absolute -left-5 top-0 w-3 h-3 bg-yellow-500 rounded-full"></div>
                <p className="text-yellow-500 font-bold">{item.year}</p>
                <h3 className="text-2xl font-semibold mt-1 mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative bg-gray-800 py-32 px-6 text-center overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-yellow-500/5 -skew-y-6 transform"></div>
          <h2 className="text-4xl font-bold text-yellow-400 mb-6 relative z-10">
            Our Mission
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto relative z-10">
            To create a cinematic experience online, connecting movie lovers 
            everywhere. Every film, every review, every moment matters.  
            Spoilers is your stage to explore the art of cinema.
          </p>
        </section>

        <section className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Discover",
              desc: "Find your next favorite film with our curated collections and user reviews.",
              color: "bg-yellow-500/20"
            },
            {
              title: "Review",
              desc: "Share your opinions and ratings to help the community.",
              color: "bg-yellow-400/20"
            },
            {
              title: "Connect",
              desc: "Engage with fellow movie lovers through discussions and recommendations.",
              color: "bg-yellow-300/20"
            }
          ].map((card, idx) => (
            <div
              key={idx}
              className={`${card.color} p-8 rounded-2xl shadow-lg backdrop-blur-sm hover:scale-105 transition-transform duration-300`}
            >
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">{card.title}</h3>
              <p className="text-gray-300">{card.desc}</p>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
