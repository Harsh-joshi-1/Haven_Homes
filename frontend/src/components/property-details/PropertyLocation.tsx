import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

interface PropertyLocationProps {
  address?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  location?: string;
  propertyName?: string;
  googleMapLink?: string;
}

function getEmbedUrl(link: string | undefined, fallbackAddress: string): string | null {
  const trimmed = (link || '').trim();

  // If there's no link provided, fallback to the address
  if (!trimmed) {
    if (fallbackAddress) {
      return `https://maps.google.com/maps?q=${encodeURIComponent(fallbackAddress)}&output=embed`;
    }
    return null;
  }

  // Extract src from iframe tag if they pasted the whole embed HTML snippet
  const iframeMatch = trimmed.match(/src="([^"]+)"/);
  if (iframeMatch) {
    return iframeMatch[1];
  }

  // If it's already an embed link
  if (trimmed.includes('/maps/embed')) return trimmed;

  // Extract place from regular Google Maps URL
  const placeMatch = trimmed.match(/\/maps\/place\/([^/@?]+)/);
  if (placeMatch) {
    const query = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '));
    return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  }

  // Extract from @lat,lng format
  const coordMatch = trimmed.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (coordMatch) {
    return `https://maps.google.com/maps?q=${coordMatch[1]},${coordMatch[2]}&output=embed`;
  }

  // Extract from q= parameter
  const qMatch = trimmed.match(/[?&]q=([^&]+)/);
  if (qMatch) {
    return `https://maps.google.com/maps?q=${qMatch[1]}&output=embed`;
  }

  // If it's a short link or another unparseable HTTP url, 
  // an iframe embed of `q=URL` will just result in a blank World Map.
  // In this edge case, we MUST fallback to the textual location address,
  // while the "Open in Maps" button above will still take the user exactly to their provided link.
  if (trimmed.startsWith('http')) {
    if (fallbackAddress) {
      return `https://maps.google.com/maps?q=${encodeURIComponent(fallbackAddress)}&output=embed`;
    }
  }

  // For anything else, use it directly as the query
  return `https://maps.google.com/maps?q=${encodeURIComponent(trimmed)}&output=embed`;
}

const PropertyLocation: React.FC<PropertyLocationProps> = ({ address, city, state, zipcode, location, propertyName, googleMapLink }) => {
  const displayTitle = city || location?.split(',').pop()?.trim() || 'Location';
  const displayAddress = address
    ? `${address}, ${city || ''}, ${state || ''} ${zipcode || ''}`.replace(/,\s*,/g, ',').replace(/\s+/g, ' ').trim()
    : location || '';

  const embedUrl = getEmbedUrl(googleMapLink, displayAddress);
  const hasMap = !!embedUrl;
  
  return (
    <div className="mb-12">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 bg-[#D4755B] rounded-full" />
        <h2 className="font-fraunces font-bold text-2xl text-[#1C1B1A]">
          Location
        </h2>
      </div>

      {/* Address Card */}
      <div className="bg-white border border-[#E6E0DA] rounded-xl p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-[rgba(212,117,91,0.1)] rounded-full flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-[#D4755B]" />
          </div>
          <div className="flex-1">
            <h3 className="font-red-hat font-bold text-base text-[#1C1B1A] mb-1">
              {displayTitle}
            </h3>
            <p className="font-red-hat font-medium text-sm text-[#5A5856] leading-relaxed">
              {displayAddress}
            </p>
          </div>
          {googleMapLink && (
            <a
              href={googleMapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#D4755B] hover:text-[#B86851] font-red-hat text-sm font-bold shrink-0 transition-colors"
            >
              Open in Maps
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Map / Placeholder */}
      <div className="relative aspect-[690/280] rounded-xl overflow-hidden border border-[#E6E0DA] bg-gray-100">
        {hasMap ? (
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map — ${propertyName || displayTitle}`}
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          /* Placeholder when no map link */
          <div className="absolute inset-0 bg-gradient-to-br from-[#F5F1E8] to-[#E6E0DA] flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center shadow-sm">
              <MapPin className="w-8 h-8 text-[#D4755B]/60" />
            </div>
            <p className="font-manrope text-sm text-[#64748B]">
              Map not available for this property
            </p>
            <p className="font-manrope text-xs text-[#94A3B8]">
              Contact us for directions
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyLocation;