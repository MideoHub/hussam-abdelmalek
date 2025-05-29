
import { useEffect, useRef } from 'react';

interface AdBannerProps {
  slot: string;
  format?: string;
  responsive?: boolean;
  className?: string;
}

const AdBanner = ({ 
  slot, 
  format = 'auto', 
  responsive = true, 
  className = '' 
}: AdBannerProps) => {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      // Only load ads if AdSense is available
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (error) {
      console.log('AdSense not yet configured');
    }
  }, []);

  return (
    <div className={`ad-container my-6 ${className}`}>
      <div className="text-xs text-gray-400 text-center mb-2">إعلان</div>
      <ins
        ref={adRef}
        className="adsbygoogle block"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with actual AdSense client ID
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
};

export default AdBanner;
