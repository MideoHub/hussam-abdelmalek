
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import AdBanner from '../components/AdBanner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace with actual Formspree endpoint or Supabase function
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "تم إرسال الرسالة بنجاح",
          description: "شكراً لتواصلك معنا. سنرد عليك قريباً.",
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast({
        title: "خطأ في الإرسال",
        description: "حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
              تواصل معنا
            </h1>
            <div className="h-px bg-poetry-gold flex-1 max-w-20"></div>
          </div>
        </motion.div>

        {/* Ad Banner */}
        <AdBanner slot="contact-top" className="mb-8" />

        <div className="max-w-2xl mx-auto">
          <motion.div
            className="bg-gray-800 rounded-lg p-8 border-2 border-poetry-gold/30"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-center mb-8">
              <Mail className="w-16 h-16 text-poetry-gold mx-auto mb-4" />
              <h2 className="text-2xl font-scheherazade text-amber-100 mb-2">
                أرسل رسالة للشاعر
              </h2>
              <p className="text-amber-200/80 font-scheherazade">
                نحن نحب سماع آرائكم وتعليقاتكم حول الشعر
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-amber-100 font-scheherazade mb-2">
                  الاسم *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-poetry-gold/30 rounded-lg text-amber-100 focus:outline-none focus:border-poetry-gold"
                  placeholder="اكتب اسمك هنا"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-amber-100 font-scheherazade mb-2">
                  البريد الإلكتروني *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-poetry-gold/30 rounded-lg text-amber-100 focus:outline-none focus:border-poetry-gold"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-amber-100 font-scheherazade mb-2">
                  موضوع الرسالة *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-poetry-gold/30 rounded-lg text-amber-100 focus:outline-none focus:border-poetry-gold"
                  placeholder="موضوع رسالتك"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-amber-100 font-scheherazade mb-2">
                  الرسالة *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-700 border border-poetry-gold/30 rounded-lg text-amber-100 focus:outline-none focus:border-poetry-gold resize-none"
                  placeholder="اكتب رسالتك هنا..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-poetry-gold text-gray-900 hover:bg-poetry-gold/80 py-3 text-lg font-scheherazade"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 ml-2"></div>
                    جاري الإرسال...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Send className="w-5 h-5 ml-2" />
                    إرسال الرسالة
                  </div>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-gray-800/50 rounded-lg p-6 border border-poetry-gold/20">
              <MessageSquare className="w-8 h-8 text-poetry-gold mx-auto mb-3" />
              <h3 className="text-lg font-scheherazade text-amber-100 mb-2">
                طرق التواصل الأخرى
              </h3>
              <p className="text-amber-200/80 font-scheherazade text-sm">
                يمكنك أيضاً التواصل معنا عبر منصات التواصل الاجتماعي
              </p>
            </div>
          </motion.div>

          {/* Back Button */}
          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
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
    </div>
  );
};

export default Contact;
