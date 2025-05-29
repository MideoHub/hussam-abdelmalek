
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Book, FileText, Mail } from 'lucide-react';
import DailyPoem from '../components/DailyPoem';
import SocialIcons from '../components/SocialIcons';
import AdBanner from '../components/AdBanner';
import DonationButton from '../components/DonationButton';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-amber-100">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="h-px bg-poetry-gold flex-1 max-w-32"></div>
            <h1 className="text-5xl md:text-6xl font-rakkas text-poetry-gold mx-6">
              حسام عبدالملك
            </h1>
            <div className="h-px bg-poetry-gold flex-1 max-w-32"></div>
          </div>
          <p className="text-xl md:text-2xl font-scheherazade text-amber-200/80">
            شاعر مصري معاصر
          </p>
        </motion.div>

        {/* Profile Section */}
        <motion.div
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-gray-800 rounded-lg p-8 border-2 border-poetry-gold/30">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-right">
                <div className="w-64 h-72 mx-auto md:mx-0 rounded-lg overflow-hidden border-2 border-poetry-gold/50">
                  <img
                    src="/assets/images/hossam-abdelmalek.jpg"
                    alt="حسام عبدالملك"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-scheherazade font-bold text-amber-100 mb-4">
                    حسام وليد عبدالملك
                  </h2>
                  <p className="text-lg md:text-xl font-scheherazade text-amber-200 leading-relaxed">
                    شاعر مصري وُلد بمحافظة المنوفية عام ٢٠٠٤ م
                  </p>
                </div>
                <div>
                  <p className="text-base md:text-lg font-scheherazade text-amber-200/90 leading-relaxed">
                    اشتهر حُسام عبد الملك بقصائده المتنوعة، ما بين وطنه وذاته المُشتتة ومحبوبته التي أخذت لقب
                    (الحلوة)، وكانت مصدر إلهام كبير له. أعطت له بعد فراقها مسارًا مختلفًا لشكل ومواضيع قصائده
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Daily Poem Section */}
        <DailyPoem />

        {/* Ad Banner */}
        <AdBanner slot="home-middle" className="my-8" />

        {/* Quick Navigation */}
        <motion.div
          className="max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-scheherazade text-center text-amber-100 mb-6">
            استكشف المحتوى
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/poems">
              <Button className="w-full bg-gray-800 border-2 border-poetry-gold/30 text-amber-100 hover:border-poetry-gold hover:bg-gray-700 py-6">
                <FileText className="w-6 h-6 mb-2" />
                <span className="font-scheherazade text-lg">القصائد</span>
              </Button>
            </Link>
            <Link to="/books">
              <Button className="w-full bg-gray-800 border-2 border-poetry-gold/30 text-amber-100 hover:border-poetry-gold hover:bg-gray-700 py-6">
                <Book className="w-6 h-6 mb-2" />
                <span className="font-scheherazade text-lg">الكتب</span>
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="w-full bg-gray-800 border-2 border-poetry-gold/30 text-amber-100 hover:border-poetry-gold hover:bg-gray-700 py-6">
                <Mail className="w-6 h-6 mb-2" />
                <span className="font-scheherazade text-lg">تواصل معنا</span>
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Social Media Section */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-xl font-scheherazade text-amber-100 mb-6">
            تابعنا على منصات التواصل
          </h3>
          <SocialIcons />
        </motion.div>

        {/* Donation Section */}
        <DonationButton />
      </div>
    </div>
  );
};

export default Home;
