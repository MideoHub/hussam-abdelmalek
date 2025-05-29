
import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const DonationButton = () => {
  const [isDismissed, setIsDismissed] = useState(false);

  // Check if user has already dismissed the donation prompt permanently
  const checkDismissed = () => {
    return localStorage.getItem('donation-dismissed') === 'true';
  };

  const handleDismiss = () => {
    localStorage.setItem('donation-dismissed', 'true');
    setIsDismissed(true);
  };

  if (checkDismissed() || isDismissed) {
    return null;
  }

  return (
    <div className="text-center my-6">
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            className="bg-transparent border-poetry-gold text-poetry-gold hover:bg-poetry-gold hover:text-gray-900"
          >
            <Heart className="w-4 h-4 ml-2" />
            ادعم حسام
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-gray-800 text-amber-100 border-poetry-gold">
          <DialogHeader>
            <DialogTitle className="font-scheherazade text-xl text-center">
              ادعم الشاعر حسام عبدالملك
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <p className="mb-4 font-scheherazade">
              إذا كنت تستمتع بالشعر، يمكنك دعم حسام بتبرع صغير
            </p>
            <div className="space-y-4">
              {/* PayPal Donation Button - Replace with actual PayPal button */}
              <div className="bg-yellow-500 text-black p-4 rounded-lg">
                <p className="text-sm mb-2">PayPal Donation</p>
                <p className="text-xs">Replace this with actual PayPal donation button</p>
                <p className="text-xs">paypal.me/YourPayPalUsername</p>
              </div>
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handleDismiss}
                  className="bg-transparent border-gray-500 text-gray-400 hover:bg-gray-700"
                >
                  لا تظهر مرة أخرى
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent border-poetry-gold text-poetry-gold hover:bg-poetry-gold hover:text-gray-900"
                >
                  ربما لاحقاً
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DonationButton;
