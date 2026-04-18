import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Youtube, Facebook, Share2, Plus, X } from 'lucide-react';

const SocialFloatingDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const socials = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/havenhomespunjab?igsh=MTVsM3Ixd3JnM21hcg==',
      color: 'bg-[#E1306C]'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://youtube.com/@haven_homes_punjab?si=2LAcMfZd2jWVkDNN',
      color: 'bg-[#FF0000]'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://www.facebook.com/share/1F8iGtz8gA/',
      color: 'bg-[#1877F2]'
    }
  ];

  return (
    <div className="fixed bottom-[166px] sm:bottom-[98px] right-6 z-[9999] flex flex-col items-center gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="flex flex-col gap-3 mb-2"
          >
            {socials.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, x: -5 }}
                className={`${social.color} text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all`}
                title={social.name}
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`${isOpen ? 'bg-[#1C1B1A]' : 'bg-white'} text-white w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-2xl z-10 transition-colors overflow-hidden border border-gray-100`}
      >
        {isOpen ? (
          <X className="w-8 h-8" />
        ) : (
          <img
            src="https://res.cloudinary.com/dp4xt0bve/image/upload/f_auto,q_auto/v1776503378/5fcc6ea0-0671-42e8-87d5-7c05987ac1d7.png"
            alt="Socials"
            className="w-full h-full object-cover"
          />
        )}
      </motion.button>
    </div>
  );
};

export default SocialFloatingDrawer;
