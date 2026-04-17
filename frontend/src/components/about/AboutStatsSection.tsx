import React from 'react';
import { Building2, Users, MapPin, CheckCircle } from 'lucide-react';

const AboutStatsSection: React.FC = () => {
  const stats = [
    { icon: Building2, value: '2,450+', label: 'Properties' },
    { icon: Users,     value: '12k+',   label: 'Happy Clients' },
    { icon: MapPin,    value: '18',      label: 'Major Cities' },
    { icon: CheckCircle, value: '98%',   label: 'Match Rate' }
  ];

  return (
    <section className="bg-white border-y border-[#E6E0DA] py-20">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
              {/* Icon */}
              <div className="flex items-center justify-center mb-5">
                <stat.icon className="w-8 h-8 text-[#111827]" strokeWidth={1.5} />
              </div>
              
              {/* Value */}
              <div className="font-space-mono font-bold text-4xl text-[#111827] mb-2">
                {stat.value}
              </div>
              
              {/* Label */}
              <div className="font-red-hat text-xs text-[#5A5856] uppercase tracking-[1.5px] font-bold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStatsSection;
