
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AdBanner from '../components/AdBanner';
import DonationButton from '../components/DonationButton';
import { trackBookDownload } from '../utils/analytics';

const books = [
  {
    id: 1,
    title: 'بعيداً عن الضجيج',
    image: '/assets/images/soon.png',
    pdf: '/assets/books/بعيداً_عن_الضجيج.pdf',
    description: 'مجموعة شعرية تتناول الهروب من صخب الحياة اليومية'
  },
  {
    id: 2,
    title: 'ديوان الحلوة',
    image: '/assets/images/soon.png',
    pdf: null,
    description: 'ديوان شعري مخصص للحبيبة التي ألهمت الشاعر'
  },
];

const Books = () => {
  const handleDownload = (book: typeof books[0]) => {
    trackBookDownload(book.title);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-amber-100">
      <div className="container mx-auto px-4 py-8">
        {/* Title Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="h-px bg-poetry-gold flex-1 max-w-20"></div>
            <h1 className="text-4xl md:text-5xl font-rakkas text-poetry-gold mx-6">
              الكتب والدواوين
            </h1>
            <div className="h-px bg-poetry-gold flex-1 max-w-20"></div>
          </div>
        </motion.div>

        {/* Ad Banner */}
        <AdBanner slot="books-top" className="mb-8" />

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {books.map((book, index) => (
            <motion.div
              key={book.id}
              className="bg-gray-800 rounded-lg overflow-hidden border-2 border-poetry-gold/30 hover:border-poetry-gold transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(215, 162, 120, 0.2)' }}
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src={book.image}
                  alt={`غلاف ${book.title}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-scheherazade font-bold text-amber-100 mb-2">
                  {book.title}
                </h3>
                <p className="text-amber-200/80 text-sm mb-4 font-scheherazade">
                  {book.description}
                </p>
                <div className="flex items-center justify-between">
                  {book.pdf ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="bg-poetry-gold text-gray-900 hover:bg-poetry-gold/80 border-poetry-gold"
                        >
                          <Download className="w-4 h-4 ml-2" />
                          تحميل
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-800 text-amber-100 border-poetry-gold">
                        <DialogHeader>
                          <DialogTitle className="font-scheherazade text-xl">
                            تحميل "{book.title}"
                          </DialogTitle>
                        </DialogHeader>
                        <div className="text-center py-4">
                          <p className="mb-4 font-scheherazade">
                            اضغط على الزر أدناه لبدء التحميل
                          </p>
                          <a
                            href={book.pdf}
                            download
                            onClick={() => handleDownload(book)}
                            className="inline-flex items-center px-4 py-2 bg-poetry-gold text-gray-900 rounded-lg hover:bg-poetry-gold/80 transition-colors"
                          >
                            <Download className="w-4 h-4 ml-2" />
                            تحميل PDF
                          </a>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <div className="flex items-center text-amber-200/60">
                      <Book className="w-4 h-4 ml-2" />
                      <span className="font-scheherazade">قريباً</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Donation Section */}
        <DonationButton />

        {/* Bottom Navigation */}
        <motion.div
          className="flex justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            variant="outline"
            className="bg-transparent border-poetry-gold text-poetry-gold hover:bg-poetry-gold hover:text-gray-900"
            onClick={() => window.history.back()}
          >
            العودة
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Books;
