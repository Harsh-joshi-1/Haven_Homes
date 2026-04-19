import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Youtube, Facebook, Share2, Plus, X } from 'lucide-react';

const SocialFloatingDrawer: React.FC = () => {
  const socials = [
    {
      name: 'Instagram',
      image: 'https://res.cloudinary.com/dp4xt0bve/image/upload/f_webp,q_auto/v1776449354/Pngtree_instagram_icon_vector_8704817.png',
      url: 'https://www.instagram.com/havenhomespunjab?igsh=MTVsM3Ixd3JnM21hcg==',
      color: 'bg-white'
    },
    {
      name: 'YouTube',
      image: 'https://res.cloudinary.com/dp4xt0bve/image/upload/f_webp,q_auto/v1776449455/Pngtree_youtube_social_media_3d_stereo_8704808.png',
      url: 'https://youtube.com/@haven_homes_punjab?si=2LAcMfZd2jWVkDNN',
      color: 'bg-white'
    },
    {
      name: 'Facebook',
      image: 'https://res.cloudinary.com/dp4xt0bve/image/upload/f_webp,q_auto/v1776489495/facebook-logo-png-2320.png',
      url: 'https://www.facebook.com/share/1F8iGtz8gA/',
      color: 'bg-white'
    }
  ];

  return (
    <div className="fixed right-2 top-1/2 -translate-y-1/2 mt-[-102px] z-[9999] flex flex-col gap-4">
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
          className={`${social.color} w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all ${social.name === 'Facebook' ? 'p-0 overflow-hidden' : 'p-2.5'} border border-gray-100`}
          title={social.name}
        >
          <img
            src={social.image}
            alt={social.name}
            className={`w-full h-full ${social.name === 'Facebook' ? 'object-cover' : 'object-contain'}`}
          />
        </motion.a>
      ))}
    </div>
  );
};

export default SocialFloatingDrawer;
