import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Cookie, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const GDPRBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('gdpr-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('gdpr-consent', 'accepted');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('gdpr-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="max-w-4xl mx-auto p-6 bg-card/95 backdrop-blur-sm border border-border/50">
        <div className="flex items-start gap-4">
          <Cookie className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-2">
              We value your privacy
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              We use cookies to enhance your experience, analyze site traffic, and personalize content. 
              By clicking "Accept All", you consent to our use of cookies. Read our{' '}
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link to="/cookies" className="text-primary hover:underline">
                Cookie Policy
              </Link>{' '}
              for more information.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={acceptCookies} size="sm">
                Accept All
              </Button>
              <Button onClick={declineCookies} variant="outline" size="sm">
                Decline
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/cookies">
                  Manage Preferences
                </Link>
              </Button>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={declineCookies}
            className="flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default GDPRBanner;