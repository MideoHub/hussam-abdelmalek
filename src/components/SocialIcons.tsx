
import { motion } from 'framer-motion';
import { Facebook, Instagram, Youtube } from 'lucide-react';

const SocialIcons = () => {
  const socialLinks = [
    { 
      href: 'https://www.facebook.com', 
      icon: Facebook, 
      label: 'فيسبوك',
      color: 'hover:text-blue-400' 
    },
    { 
      href: 'https://www.instagram.com/husam.waled', 
      icon: Instagram, 
      label: 'إنستغرام',
      color: 'hover:text-pink-400' 
    },
    { 
      href: 'https://www.tiktok.com/@husam.waled', 
      icon: () => (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ), 
      label: 'تيك توك',
      color: 'hover:text-black' 
    },
    { 
      href: 'https://www.youtube.com/@husamabdelmalek', 
      icon: Youtube, 
      label: 'يوتيوب',
      color: 'hover:text-red-500' 
    },
  ];

  return (
    <motion.div
      className="border-t border-b border-poetry-cream/20 py-8 my-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4 }}
    >
      <h3 className="text-center text-poetry-gold font-rakkas text-2xl mb-6">
        تابعني على
      </h3>
      
      <div className="flex justify-center gap-6">
        {socialLinks.map(({ href, icon: Icon, label, color }, index) => (
          <motion.a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 rounded-full bg-poetry-gold/10 text-poetry-gold transition-all duration-300 ${color} hover:bg-poetry-gold/20 hover:scale-110`}
            aria-label={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 + index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Icon className="w-8 h-8" />
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default SocialIcons;
