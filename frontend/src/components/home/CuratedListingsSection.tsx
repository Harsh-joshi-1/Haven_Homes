import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { propertiesAPI, appointmentsAPI } from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';
import PropertyCard from '../properties/PropertyCard';
import { toast } from 'sonner';

interface Property {
  _id: string;
  title: string;
  location: string;
  price: number;
  image: string[];
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  facing?: string;
  length?: number;
  breadth?: number;
  city?: string;
  instagramLink?: string;
  youtubeLink?: string;
}

const fallbackImages = [
  "https://images.unsplash.com/photo-1622015663381-d2e05ae91b72?w=800&fm=webp&q=80",
  "https://images.unsplash.com/photo-1695067440629-b5e513976100?w=800&fm=webp&q=80",
  "https://images.unsplash.com/photo-1738168279272-c08d6dd22002?w=800&fm=webp&q=80",
  "https://images.unsplash.com/photo-1769428003672-296f923d19b2?w=800&fm=webp&q=80",
  "https://images.unsplash.com/photo-1761509386107-9baefe0073f2?w=800&fm=webp&q=80",
];

const CuratedListingsSection: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    fullName: '',
    email: '',
    phone: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleBookingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (properties.length === 0) {
      toast.error('No properties available to associate with this request.');
      return;
    }

    setSubmitting(true);
    try {
      await appointmentsAPI.schedule({
        propertyId: properties[0]._id, // Associate with first featured property
        name: bookingData.fullName,
        email: bookingData.email,
        phone: bookingData.phone,
        message: 'General consultation request from the home page.',
      });

      toast.success('Consultation Request Submitted!', {
        description: "We'll contact you shortly to schedule your call."
      });
      setBookingData({ fullName: '', email: '', phone: '' });
    } catch (err: any) {
      console.error('Failed to schedule consultation:', err);
      toast.error('Submission Failed', {
        description: err.response?.data?.message || 'Please try again later.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data } = await propertiesAPI.getAll();
        if (data.success && data.property) {
          setProperties(data.property.slice(0, 5));
        }
      } catch (err) {
        console.error('Failed to fetch featured properties:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  return (
    <section className="bg-white pt-12 pb-24 border-t border-[#E5E7EB]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">

        {/* Section Header with Explore link */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="font-red-hat text-xs uppercase tracking-[2px] text-[#6B7280] mb-2 font-bold">Featured Listings</p>
            <h2 className="font-fraunces font-bold text-3xl sm:text-4xl lg:text-5xl text-[#111827]">Our Premium Selection</h2>
          </div>
          <Link
            to="/properties"
            className="hidden sm:inline-flex items-center gap-2 font-red-hat text-sm font-bold text-[#111827] border-b-2 border-[#111827] pb-1 hover:text-[#4B5563] hover:border-[#4B5563] transition-colors uppercase tracking-widest"
          >
            Explore All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Explore link */}
        <Link
          to="/properties"
          className="sm:hidden flex items-center gap-2 font-red-hat text-sm font-bold text-[#111827] mb-8 uppercase tracking-widest"
        >
          Explore All Properties
          <ArrowRight className="w-4 h-4" />
        </Link>

        {/* Properties Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-[#F3F4F6] rounded-2xl h-[300px] mb-4" />
                <div className="h-5 bg-[#F3F4F6] rounded w-3/4 mb-2" />
                <div className="h-4 bg-[#F3F4F6] rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property, index) => (
              <PropertyCard
                key={property._id}
                id={property._id}
                image={property.image?.[0] || fallbackImages[index % fallbackImages.length]}
                name={property.title}
                price={formatPrice(property.price)}
                location={property.location}
                city={property.city}
                beds={property.beds}
                baths={property.baths}
                length={property.length}
                breadth={property.breadth}
                type={property.type}
                facing={property.facing}
                sqft={property.sqft}
                tags={property.type ? [property.type] : []}
                instagramLink={property.instagramLink}
                youtubeLink={property.youtubeLink}
              />
            ))}
          </div>
        )}
      </div>

      <div id="consultation-section" className="w-full flex flex-col lg:flex-row mt-24">
        {/* Left Side Images */}
        <div className="lg:w-1/2 relative bg-gray-100 min-h-[400px]">
          <div className="absolute inset-0">
            <img src="https://res.cloudinary.com/dp4xt0bve/image/upload/f_webp,q_80/v1776423229/Hero_Section.jpg" className="w-full h-1/2 object-cover opacity-80" alt="House top" />
            <img src="https://res.cloudinary.com/dp4xt0bve/image/upload/f_webp,q_80/v1776423229/Happy_Homeowners_1.jpg" className="w-full h-1/2 object-cover" alt="House bottom" />
          </div>
          <div className="absolute bottom-6 right-6 flex gap-4">
            <button className="w-10 h-10 rounded-full border border-white flex items-center justify-center text-white backdrop-blur-sm bg-black/20 hover:bg-black/40">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full border border-white flex items-center justify-center text-white backdrop-blur-sm bg-black/20 hover:bg-black/40">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="lg:w-1/2 bg-[#1C1B1A] text-white px-8 sm:px-16 py-16 flex flex-col justify-center">
          <h2 className="font-fraunces font-bold text-white text-3xl sm:text-4xl lg:text-5xl mb-12 tracking-tight leading-tight">
            Still haven't found what you're looking for?
          </h2>
          <form onSubmit={handleBookingSubmit} className="space-y-6">
            <div>
              <label className="block font-red-hat text-xs uppercase tracking-widest mb-2 opacity-60 font-bold">Full Name</label>
              <input
                type="text"
                name="fullName"
                required
                value={bookingData.fullName}
                onChange={handleBookingInputChange}
                placeholder="Enter your full name"
                className="w-full bg-[#2A2928] border-none rounded-lg p-4 font-red-hat text-sm text-white placeholder-gray-500 focus:ring-1 focus:ring-white outline-none"
              />
            </div>
            <div>
              <label className="block font-red-hat text-xs uppercase tracking-widest mb-2 opacity-60 font-bold">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={bookingData.email}
                onChange={handleBookingInputChange}
                placeholder="your.email@example.com"
                className="w-full bg-[#2A2928] border-none rounded-lg p-4 font-red-hat text-sm text-white placeholder-gray-500 focus:ring-1 focus:ring-white outline-none"
              />
            </div>
            <div>
              <label className="block font-red-hat text-xs uppercase tracking-widest mb-2 opacity-60 font-bold">Phone Number</label>
              <input
                type="tel"
                name="phone"
                required
                value={bookingData.phone}
                onChange={handleBookingInputChange}
                placeholder="+91 98765 43210"
                className="w-full bg-[#2A2928] border-none rounded-lg p-4 font-red-hat text-sm text-white placeholder-gray-500 focus:ring-1 focus:ring-white outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="bg-white text-[#1C1B1A] font-manrope font-bold py-4 px-10 rounded-xl hover:bg-gray-100 transition-colors inline-block uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Requesting...' : 'Request a Call'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CuratedListingsSection;
