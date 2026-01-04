/**
 * WelcomeModal Component
 *
 * A splash screen / welcome dialog shown to new visitors or when content has been updated.
 * Only shown on web (not native apps). Tracks last seen version in localStorage.
 */

import { Capacitor } from '@capacitor/core';
import {
  Check,
  Globe,
  Image,
  Palette,
  QrCode,
  Settings,
  Share2,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { languages } from '@/i18n';

// Increment this version whenever you want to show the modal again to all users
const WELCOME_VERSION = '2026.01.04';
const STORAGE_KEY = 'anqr-welcome-seen';

interface WelcomeModalProps {
  onClose?: () => void;
}

export function WelcomeModal({ onClose }: WelcomeModalProps) {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Check if we should show the modal
  useEffect(() => {
    // Skip on native platforms - they have their own onboarding
    if (Capacitor.isNativePlatform()) return;

    const lastSeen = localStorage.getItem(STORAGE_KEY);
    if (lastSeen !== WELCOME_VERSION) {
      // Small delay for smoother page load
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsClosing(true);
    localStorage.setItem(STORAGE_KEY, WELCOME_VERSION);
    // Wait for animation to complete
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      onClose?.();
    }, 200);
  };

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible && !isClosing) {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, isClosing]);

  if (!isVisible) return null;

  // Select a subset of language flags to display
  const featuredLanguages = languages.slice(0, 12);
  const remainingCount = languages.length - featuredLanguages.length;

  const features = [
    { icon: QrCode, title: t('1427'), desc: t('1428') },
    { icon: Image, title: t('1429'), desc: t('1430') },
    { icon: Palette, title: t('1431'), desc: t('1432') },
    { icon: Zap, title: t('1433'), desc: t('1434') },
    { icon: Settings, title: t('1435'), desc: t('1436') },
    { icon: Share2, title: t('1437'), desc: t('1438') },
  ];

  const updates = [
    t('1440'),
    t('1441'),
    t('1442'),
    t('1443'),
  ];

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center p-4 transition-all duration-200 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(4px)' }}
      onClick={handleDismiss}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleDismiss();
      }}
      role="button"
      tabIndex={0}
    >
      <div
        className={`bg-card border rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col transition-all duration-200 ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-title"
      >
        {/* Header */}
        <div className="relative px-6 pt-6 pb-4 border-b bg-gradient-to-br from-primary/5 to-primary/10">
          <button
            type="button"
            onClick={handleDismiss}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
            aria-label={t('59')}
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-xl bg-primary text-primary-foreground">
              <QrCode className="h-8 w-8" />
            </div>
            <div>
              <h1 id="welcome-title" className="text-2xl font-bold text-foreground">
                {t('1423')}
              </h1>
              <p className="text-sm text-muted-foreground">{t('1424')}</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">{t('1425')}</p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {/* Features Grid */}
          <section>
            <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              {t('1426')}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <feature.icon className="h-5 w-5 text-primary mb-2" />
                  <h3 className="text-xs font-medium text-foreground mb-1">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground leading-snug">{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* What's New */}
          <section>
            <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              {t('1439')}
            </h2>
            <ul className="space-y-2">
              {updates.map((update, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{update}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Languages */}
          <section>
            <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              {t('1444')}
            </h2>
            <div className="flex flex-wrap gap-2 items-center">
              {featuredLanguages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    i18n.changeLanguage(lang.code);
                  }}
                  className={`px-2 py-1 rounded-md text-sm transition-colors ${
                    i18n.language === lang.code || i18n.language.startsWith(lang.code.split('-')[0])
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                  title={lang.nativeName}
                >
                  <span className="mr-1">{lang.flag}</span>
                  <span className="text-xs">{lang.nativeName.split(' ')[0]}</span>
                </button>
              ))}
              {remainingCount > 0 && (
                <span className="text-xs text-muted-foreground px-2">
                  +{remainingCount} {t('1445')}
                </span>
              )}
            </div>
          </section>

          {/* Quick Start */}
          <section className="bg-muted/30 rounded-lg p-4">
            <h2 className="text-sm font-semibold text-foreground mb-2">
              {t('1446')}
            </h2>
            <ol className="text-sm text-muted-foreground space-y-1">
              <li>
                <span className="font-medium text-foreground">1.</span> {t('1447')}
              </li>
              <li>
                <span className="font-medium text-foreground">2.</span> {t('1448')}
              </li>
              <li>
                <span className="font-medium text-foreground">3.</span> {t('1449')}
              </li>
            </ol>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-muted/30 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">{t('1450')}</p>
          <Button size="sm" onClick={handleDismiss}>
            {t('1451')}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeModal;
