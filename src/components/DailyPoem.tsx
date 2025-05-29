
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Share2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TypewriterEffect from './TypewriterEffect';
import poemsData from '../data/poems.json';

interface Poem {
  id: number;
  title: string;
  content: string;
  audio_path?: string;
}

const DailyPoem = () => {
  const [dailyPoem, setDailyPoem] = useState<Poem | null>(null);
  const [showFullPoem, setShowFullPoem] = useState(false);

  useEffect(() => {
    // Generate a consistent daily poem based on the current date
    const today = new Date().toDateString();
    const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const randomIndex = seed % poemsData.length;
    
    // Check if we've already shown today's poem
    const storedPoem = localStorage.getItem('dailyPoem');
    const storedDate = localStorage.getItem('dailyPoemDate');
    
    if (storedDate === today && storedPoem) {
      setDailyPoem(JSON.parse(storedPoem));
    } else {
      const selectedPoem = poemsData[randomIndex];
      setDailyPoem(selectedPoem);
      localStorage.setItem('dailyPoem', JSON.stringify(selectedPoem));
      localStorage.setItem('dailyPoemDate', today);
    }
  }, []);

  const sharePoem = () => {
    if (!dailyPoem) return;
    
    const shareText = `قصيدة اليوم: ${dailyPoem.title}\n\n${dailyPoem.content.substring(0, 100)}...\n\nمن ديوان الشاعر حسام عبدالملك`;
    
    if (navigator.share) {
      navigator.share({
        title: `قصيدة اليوم - ${dailyPoem.title}`,
        text: shareText,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText).then(() => {
        console.log('تم نسخ القصيدة');
      });
    }
  };

  if (!dailyPoem) return null;

  const previewText = dailyPoem.content.substring(0, 150);
  const displayText = showFullPoem ? dailyPoem.content : previewText + '...';

  return (
    <motion.div
      className="relative bg-gradient-to-br from-poetry-gold/10 to-poetry-red/10 border-2 border-poetry-gold rounded-xl p-6 mb-8 animate-spotlight-glow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute top-4 left-4">
        <div className="flex items-center space-x-2 space-x-reverse text-poetry-gold text-sm">
          <Calendar size={16} />
          <span>قصيدة اليوم</span>
        </div>
      </div>

      <div className="mt-8">
        <motion.h3
          className="font-rakkas text-2xl md:text-3xl text-poetry-gold mb-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {dailyPoem.title}
        </motion.h3>

        <div className="text-poetry-cream text-lg leading-relaxed text-right font-scheherazade mb-6">
          <TypewriterEffect text={displayText} speed={30} />
        </div>

        <div className="flex justify-center space-x-4 space-x-reverse">
          {!showFullPoem && (
            <Button
              onClick={() => setShowFullPoem(true)}
              variant="outline"
              className="border-poetry-gold text-poetry-gold hover:bg-poetry-gold hover:text-white"
            >
              اقرأ المزيد
            </Button>
          )}
          
          <Button
            onClick={sharePoem}
            variant="outline"
            className="border-poetry-gold text-poetry-gold hover:bg-poetry-gold hover:text-white"
          >
            <Share2 size={16} className="ml-2" />
            شارك القصيدة
          </Button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-poetry-gold/10 rounded-full -translate-y-10 translate-x-10 blur-xl"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-poetry-red/10 rounded-full translate-y-8 -translate-x-8 blur-xl"></div>
    </motion.div>
  );
};

export default DailyPoem;
