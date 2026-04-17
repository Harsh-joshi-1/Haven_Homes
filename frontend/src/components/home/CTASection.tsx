import React from 'react';
import { Link } from 'react-router-dom';

const CTASection: React.FC = () => {
  return (
    <section className="bg-[#D4755B] py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <img
        src="/src/images/Abstract architectural texture with light and shadow.png"
        alt="Background Texture"
        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
      />
      <div className="absolute top-0 left-1/4 w-96" />

      <div className="max-w-[1280px] mx-auto px-8 text-center relative z-10">
        <h2 className="font-fraunces text-5xl text-white mb-6 font-bold">
          Ready to Find Your Dream Home?
        </h2>

        <div className="flex gap-4 justify-center">
          <Link to="/properties" className="bg-white text-[#1C1B1A] font-red-hat font-bold text-lg px-10 py-4 rounded-xl shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)] hover:bg-[#F8F6F6] transition-all inline-block uppercase tracking-widest">
            Browse Properties
          </Link>
          <Link to="/contact" className="border-2 border-white/30 text-white font-red-hat font-bold text-lg px-10 py-4 rounded-xl hover:bg-white hover:text-[#1C1B1A] transition-all inline-block uppercase tracking-widest">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
