import React from 'react';
import { Lightbulb, Eye, Award } from 'lucide-react';

const AboutValuesSection: React.FC = () => {
  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We challenge the status quo of real estate, blending traditional service with cutting-edge technology to redefine what\'s possible.'
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'No hidden data, no obscured histories. We believe in complete clarity, empowering you to make decisions with absolute confidence.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'From the first search to the final signature, we curate an experience of uncompromising quality and refined elegance.'
    }
  ];

  return (
    <section className="bg-[#FAF8F4] py-24">
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-red-hat text-xs uppercase tracking-[2px] text-[#5A5856] mb-4 font-bold">
            Our Ethos
          </p>
          <h2 className="font-fraunces text-4xl font-bold text-[#1C1B1A]">
            Driven by Purpose
          </h2>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div 
              key={index}
              className="bg-white border border-[#E6E0DA] rounded-3xl p-8 text-center hover:shadow-xl hover:border-[#D4755B]/20 transition-all duration-300"
            >
              {/* Icon Circle */}
              <div className="w-14 h-14 bg-[#1C1B1A] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <value.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3 className="font-fraunces text-xl font-bold text-[#1C1B1A] mb-4">
                {value.title}
              </h3>

              {/* Description */}
              <p className="font-red-hat text-sm leading-6 text-[#5A5856] font-medium">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValuesSection;