/**
 * StaticPage Component
 * Displays About, Privacy, Terms, and Contact pages with placeholder content
 */

import { AdPlaceholder } from '@/components/AdPlaceholder'

export type StaticPageType = 'about' | 'privacy' | 'terms' | 'contact'

interface StaticPageProps {
  page: StaticPageType
}

const pageContent: Record<StaticPageType, { title: string; content: string[] }> = {
  about: {
    title: 'About ANQR',
    content: [
      'ANQR is an advanced QR code generator that combines powerful features with an intuitive interface. Our mission is to make QR code creation accessible to everyone while providing professional-grade tools for designers and developers.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    content: [
      'Your privacy is important to us. This Privacy Policy explains how ANQR collects, uses, and protects your information when you use our service.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl aliquam nunc, vitae aliquam nisl nunc vitae nisl. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
      'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
    ],
  },
  terms: {
    title: 'Terms of Service',
    content: [
      'By using ANQR, you agree to these Terms of Service. Please read them carefully before using our service.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.',
      'Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.',
    ],
  },
  contact: {
    title: 'Contact Us',
    content: [
      'We would love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. You can contact us at hello@aldous.info for any inquiries.',
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
    ],
  },
}

export function StaticPage({ page }: StaticPageProps) {
  const { title, content } = pageContent[page]

  return (
    <main className="min-h-[200px] flex-1 flex bg-muted/30 overflow-hidden transition-all duration-300">
      {/* Left ad column - matches Preview/Gallery exactly */}
      <div className="hidden lg:flex flex-col items-end justify-center w-[160px] border-r bg-muted/10 flex-shrink-0">
        <AdPlaceholder slot="static-left" width={160} height={600} format="vertical" />
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-y-auto bg-background scrollbar-hide">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold mb-8 text-foreground">{title}</h1>
          <div className="space-y-6">
            {content.map((paragraph, index) => (
              <p key={index} className="text-base text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          
          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-border">
            <a 
              href="#" 
              className="text-sm text-primary hover:underline"
            >
              ← Back to Editor
            </a>
          </div>
        </div>
      </div>

      {/* Right ad column - matches Preview/Gallery exactly */}
      <div className="hidden lg:flex flex-col items-start justify-center w-[160px] border-l bg-muted/10 flex-shrink-0">
        <AdPlaceholder slot="static-right" width={160} height={600} format="vertical" />
      </div>
    </main>
  )
}

export default StaticPage
