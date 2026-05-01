import React, { useEffect, Suspense, lazy } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useSEO } from '../hooks/useSEO';
import HeroSection from '../components/home/HeroSection';
import CuratedListingsSection from '../components/home/CuratedListingsSection';
import WhyChooseSection from '../components/about/WhyChooseSection';
import ConsultationSection from '../components/home/ConsultationSection';

const YouTubeGrid = lazy(() => import('../components/home/YouTubeGrid'));
const FaqSection = lazy(() => import('../components/home/FaqSection'));

const HomePage: React.FC = () => {
  const location = useLocation();

  useSEO({
    title: 'Premium Real Estate Platform',
    description: 'Haven Homes offers AI-powered property search, location trends analysis, and investment insights to find your perfect property in India.',
  });

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="bg-white min-h-screen">
      {/* Sticky Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}

      {/* Curated Listings Section */}
      <CuratedListingsSection />

      <ConsultationSection />
      <WhyChooseSection />
      <Suspense fallback={<div className="h-40 flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin"></div></div>}>
        <YouTubeGrid />
        <FaqSection />
      </Suspense>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
