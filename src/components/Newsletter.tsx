
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      // Replace with actual Mailchimp API endpoint or Supabase function
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast({
          title: "تم الاشتراك بنجاح!",
          description: "شكراً لانضمامك إلى قائمتنا البريدية",
        });
        setEmail('');
      } else {
        throw new Error('Newsletter signup failed');
      }
    } catch (error) {
      toast({
        title: "خطأ في الاشتراك",
        description: "حدث خطأ أثناء الاشتراك. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="max-w-md mx-auto my-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-gray-800 rounded-lg p-6 border-2 border-poetry-gold/30">
        <div className="text-center mb-4">
          <Mail className="w-8 h-8 text-poetry-gold mx-auto mb-2" />
          <h3 className="text-lg font-scheherazade text-amber-100 mb-1">
            النشرة البريدية
          </h3>
          <p className="text-sm text-amber-200/80 font-scheherazade">
            احصل على آخر القصائد والأخبار
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ادخل بريدك الإلكتروني"
              className="w-full px-4 py-3 bg-gray-700 border border-poetry-gold/30 rounded-lg text-amber-100 focus:outline-none focus:border-poetry-gold"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-poetry-gold text-gray-900 hover:bg-poetry-gold/80"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 ml-2"></div>
                جاري الاشتراك...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Send className="w-4 h-4 ml-2" />
                اشترك الآن
              </div>
            )}
          </Button>
        </form>
      </div>
    </motion.div>
  );
};

export default Newsletter;
