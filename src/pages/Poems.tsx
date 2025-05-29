
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Play, Pause, Volume2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import TypewriterEffect from '../components/TypewriterEffect';
import AdBanner from '../components/AdBanner';
import poemsData from '../data/poems.json';

const Poems = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedPoem, setExpandedPoem] = useState<number | null>(null);
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const filteredPoems = useMemo(() => {
    if (!searchTerm) return poemsData;
    const lowerSearchTerm = searchTerm.toLowerCase();
    return poemsData.filter(
      (poem) =>
        poem.title.toLowerCase().includes(lowerSearchTerm) ||
        poem.content.toLowerCase().includes(lowerSearchTerm)
    );
  }, [searchTerm]);

  const highlightTerm = (text: string, term: string) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<mark class="bg-poetry-gold text-gray-900 px-1 rounded">$1</mark>');
  };

  const togglePoem = (poemId: number) => {
    setExpandedPoem(expandedPoem === poemId ? null : poemId);
  };

  const toggleAudio = (poemId: number) => {
    setPlayingAudio(playingAudio === poemId ? null : poemId);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-amber-100">
      <div className="container mx-auto px-4 py-8">
        {/* Title Section */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="h-px bg-poetry-gold flex-1 max-w-20"></div>
            <h1 className="text-4xl md:text-5xl font-rakkas text-poetry-gold mx-6">
              القصائد
            </h1>
            <div className="h-px bg-poetry-gold flex-1 max-w-20"></div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="max-w-md mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="البحث في القصائد..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-800 border-poetry-gold/30 text-amber-100 placeholder:text-amber-400/60 pr-10 font-scheherazade"
              dir="rtl"
            />
          </div>
        </motion.div>

        {/* Ad Banner */}
        <AdBanner slot="poems-middle" className="mb-8" />

        {/* Poems List */}
        <div className="space-y-4">
          {filteredPoems.length > 0 ? (
            filteredPoems.map((poem, index) => (
              <motion.div
                key={poem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <Card className="bg-gray-800 border-poetry-gold/30 hover:border-poetry-gold transition-all duration-300">
                  <CardContent className="p-6">
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => togglePoem(poem.id)}
                    >
                      <h3
                        className="text-xl font-scheherazade font-bold text-amber-100"
                        dangerouslySetInnerHTML={{
                          __html: highlightTerm(poem.title, searchTerm),
                        }}
                      />
                      <div className="flex items-center gap-2">
                        {poem.audio_path && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleAudio(poem.id);
                            }}
                            className="text-poetry-gold hover:text-amber-100"
                          >
                            {playingAudio === poem.id ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
                          </Button>
                        )}
                        <motion.div
                          animate={{ rotate: expandedPoem === poem.id ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <svg className="w-5 h-5 text-poetry-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </motion.div>
                      </div>
                    </div>

                    <motion.div
                      initial={false}
                      animate={{
                        height: expandedPoem === poem.id ? 'auto' : 0,
                        opacity: expandedPoem === poem.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-poetry-gold/20 mt-4">
                        <div
                          className="text-amber-200 font-scheherazade leading-relaxed whitespace-pre-line text-right"
                          dir="rtl"
                        >
                          {expandedPoem === poem.id ? (
                            <TypewriterEffect
                              text={highlightTerm(poem.content, searchTerm)}
                              speed={30}
                            />
                          ) : null}
                        </div>
                        {poem.audio_path && (
                          <div className="flex items-center gap-2 mt-4 text-sm text-amber-400">
                            <Volume2 className="w-4 h-4" />
                            <span className="font-scheherazade">متوفر بالصوت</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xl text-amber-400 font-scheherazade">
                لا توجد قصائد تطابق البحث
              </p>
              <p className="text-amber-200/60 mt-2 font-scheherazade">
                جرب البحث بكلمات مختلفة
              </p>
            </motion.div>
          )}
        </div>

        {/* Bottom Navigation */}
        <motion.div
          className="flex justify-center gap-4 mt-12"
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

export default Poems;
