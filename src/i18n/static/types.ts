/**
 * Types for static page content
 * Used by StaticPage component and translation files
 */

export type PageSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type PageDefinition = {
  title: string;
  description: string;
  lastUpdated?: string;
  sections: PageSection[];
};

export type StaticPageType = 'about' | 'guide' | 'guide' | 'learn' | 'privacy' | 'terms' | 'contact';

// Shared constants
export const LAST_UPDATED = '1 January 2026';
export const CONTACT_EMAIL = 'email@anqr.link';
