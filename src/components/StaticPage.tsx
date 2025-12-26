/**
 * StaticPage
 * About, Privacy, Terms, and Contact pages.
 */

import { type FormEvent, useEffect, useMemo, useState } from 'react'
import { AdUnit } from '@/components/AdUnit'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export type StaticPageType = 'about' | 'privacy' | 'terms' | 'contact'

interface StaticPageProps {
  page: StaticPageType
}

type PageSection = {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

type PageDefinition = {
  title: string
  description: string
  lastUpdated?: string
  sections: PageSection[]
}

const LAST_UPDATED = '26 December 2025'

const pages: Record<StaticPageType, PageDefinition> = {
  about: {
    title: 'About ANQR',
    description:
      'ANQR is a browser-based QR code generator focused on fast creation, high-quality exports, and practical safety checks.',
    sections: [
      {
        heading: 'What you can do',
        paragraphs: [
          'ANQR helps you create QR codes for common payloads (URLs, text, Wi-Fi, email, SMS, vCard) and export them for print or screen use.',
          'It includes style controls, overlay options, and quality tooling so you can balance aesthetics with scan reliability.',
        ],
        bullets: [
          'Generate QR codes in your browser with configurable error correction, version, size, margin, and colours.',
          'Export formats designed for real-world use (for example, PNG and SVG) and predictable sizing.',
          'Optional overlay/image workflows and quality checks to help keep the code scannable.',
        ],
      },
      {
        heading: 'How ANQR handles your data',
        paragraphs: [
          'ANQR is designed to work locally in your browser. The text you type to encode is used to render the QR code on your device.',
          'If you choose to load an overlay image from a remote URL, your browser will request that image from its host (just like opening any image on the web).',
        ],
      },
      {
        heading: 'Advertising',
        paragraphs: [
          'To keep the tool free, ANQR may display advertising. Advertising partners may use cookies or similar technologies to show and measure ads. See the Privacy Policy for details.',
        ],
      },
      {
        heading: 'Trademark notice',
        paragraphs: [
          'QR Code® is a registered trademark of DENSO WAVE INCORPORATED. ANQR is an independent tool and is not affiliated with DENSO WAVE.',
        ],
      },
    ],
  },

  privacy: {
    title: 'Privacy Policy',
    description:
      'This Privacy Policy explains what information ANQR collects and how it is used when you access the site.',
    lastUpdated: LAST_UPDATED,
    sections: [
      {
        heading: 'Summary',
        paragraphs: [
          'ANQR is designed to generate QR codes in your browser. We do not ask you to create an account to use the generator.',
          'We may use advertising services (including Google AdSense) that collect information through cookies or similar technologies to serve and measure ads.',
        ],
      },
      {
        heading: 'Information you provide',
        paragraphs: [
          'If you contact us, we may collect the information you submit (for example, your name, email address, and message). We use this information only to respond and provide support.',
        ],
      },
      {
        heading: 'Information collected automatically',
        paragraphs: [
          'When you visit the site, certain information may be collected automatically by the website, hosting provider, and advertising partners. This can include IP address, device and browser information, pages viewed, approximate location, and interaction data.',
        ],
      },
      {
        heading: 'Advertising and cookies (Google AdSense)',
        paragraphs: [
          'We may display ads served by Google and other third-party vendors. These vendors may use cookies to serve ads based on prior visits to this and other websites.',
          'Google\'s use of advertising cookies enables it and its partners to serve ads based on your visits. You can learn more about how Google uses information from sites that use its services at: https://policies.google.com/technologies/partner-sites',
          'You can manage ad personalisation in Google\'s Ads Settings: https://adssettings.google.com',
        ],
      },
      {
        heading: 'Analytics',
        paragraphs: [
          'ANQR may use basic analytics to understand performance and improve usability. If analytics are enabled, they are used in aggregate and are not intended to identify you personally.',
        ],
      },
      {
        heading: 'Data retention',
        paragraphs: [
          'We retain contact form submissions only as long as needed to respond, maintain records of support interactions, and comply with legal obligations.',
        ],
      },
      {
        heading: 'Your choices',
        bullets: [
          'You can usually control cookies through your browser settings (including deleting or blocking cookies).',
          'You can opt out of personalised advertising as described above.',
          'If you do not want to provide contact information, you can choose not to use the contact form.',
        ],
      },
      {
        heading: 'Children\'s privacy',
        paragraphs: [
          'ANQR is a general-audience tool and is not directed at children. If you believe a child has provided personal information through our contact form, please contact us so we can take appropriate action.',
        ],
      },
      {
        heading: 'Changes to this policy',
        paragraphs: [
          'We may update this Privacy Policy from time to time. The “Last updated” date at the top of this page indicates when it was most recently revised.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: [
          'For privacy questions, please use the Contact page or email: hello@aldous.info',
        ],
      },
    ],
  },

  terms: {
    title: 'Terms of Service',
    description:
      'These Terms of Service govern your access to and use of ANQR. By using the site, you agree to these terms.',
    lastUpdated: LAST_UPDATED,
    sections: [
      {
        heading: 'Using the service',
        paragraphs: [
          'You may use ANQR for lawful purposes only. You are responsible for the content you encode and for how you use any QR codes you generate.',
        ],
        bullets: [
          'Do not use ANQR to create or distribute QR codes that facilitate phishing, malware, fraud, harassment, or illegal activity.',
          'Do not attempt to disrupt, reverse engineer, or interfere with the operation or security of the site.',
          'Do not misuse the service in a way that could degrade performance for other users.',
        ],
      },
      {
        heading: 'Content and ownership',
        paragraphs: [
          'You retain ownership of the content you encode into QR codes. ANQR does not claim ownership of your data.',
          'The ANQR interface, branding, and code are protected by applicable intellectual property laws.',
        ],
      },
      {
        heading: 'No warranties',
        paragraphs: [
          'ANQR is provided on an “as is” and “as available” basis. We do not guarantee that QR codes generated will scan in every environment, on every device, or with every scanner application.',
          'You should test your QR codes in the conditions where they will be used (print size, lighting, screen type, distance, and camera quality).',
        ],
      },
      {
        heading: 'Limitation of liability',
        paragraphs: [
          'To the maximum extent permitted by law, ANQR and its operators will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenue, data, or goodwill arising from your use of the service.',
        ],
      },
      {
        heading: 'Third-party services and links',
        paragraphs: [
          'The site may include links to third-party websites or load resources from third-party hosts (for example, images). We are not responsible for third-party content, policies, or practices.',
          'Advertising is delivered by third-party partners who may collect information as described in the Privacy Policy.',
        ],
      },
      {
        heading: 'Changes and availability',
        paragraphs: [
          'We may update the service, change features, or discontinue the service at any time without notice.',
          'We may update these Terms from time to time. The “Last updated” date at the top of this page indicates when they were most recently revised.',
        ],
      },
      {
        heading: 'Governing law',
        paragraphs: [
          'These Terms are governed by the laws of Victoria, Australia, without regard to conflict of laws principles.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: [
          'Questions about these Terms can be sent to: hello@aldous.info',
        ],
      },
    ],
  },

  contact: {
    title: 'Contact',
    description:
      'Send feedback, report a bug, or ask a question. We read every message, but response times can vary.',
    sections: [
      {
        heading: 'Email',
        paragraphs: [
          'For general enquiries and support: hello@aldous.info',
        ],
      },
      {
        heading: 'Contact form',
        paragraphs: [
          'If the contact form is available on your current hosting setup, you can send a message below. If it does not submit successfully, email is the most reliable option.',
        ],
      },
    ],
  },
}

function usePageTitle(page: StaticPageType, title: string) {
  useEffect(() => {
    document.title = `${title} | ANQR`
  }, [page, title])
}

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [botField, setBotField] = useState('')

  const encodedBody = useMemo(() => {
    const data: Record<string, string> = {
      'form-name': 'contact',
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
      'bot-field': botField,
    }
    return new URLSearchParams(data).toString()
  }, [form, botField])

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodedBody,
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
      setBotField('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border bg-card p-6">
        <h3 className="text-base font-semibold text-foreground">Message sent</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Thanks — we received your message. If you do not hear back, email us at{' '}
          <a className="text-primary hover:underline" href="mailto:hello@aldous.info">
            hello@aldous.info
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <form
      name="contact"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      className="rounded-xl border bg-card p-6"
    >
      {/* Netlify form detection */}
      <input type="hidden" name="form-name" value="contact" />
      <div className="hidden">
        <label>
          Do not fill this out if you are human: <input name="bot-field" value={botField} onChange={(e) => setBotField(e.target.value)} />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground" htmlFor="contact-name">
            Name
          </label>
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
            placeholder="Your name"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground" htmlFor="contact-email">
            Email
          </label>
          <Input
            id="contact-email"
            name="email"
            autoComplete="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
            placeholder="you@example.com"
            required
          />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="contact-subject">
          Subject
        </label>
        <Input
          id="contact-subject"
          name="subject"
          value={form.subject}
          onChange={(e) => setForm((s) => ({ ...s, subject: e.target.value }))}
          placeholder="What can we help with?"
          required
        />
      </div>

      <div className="mt-4 space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="contact-message">
          Message
        </label>
        <Textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
          placeholder="Tell us what you are trying to do, and include any error messages if relevant."
          rows={6}
          required
        />
      </div>

      {status === 'error' && (
        <p className="mt-4 text-sm text-red-600">
          We could not submit the form from this browser/session. Please email{' '}
          <a className="text-primary hover:underline" href="mailto:hello@aldous.info">
            hello@aldous.info
          </a>
          .
        </p>
      )}

      <div className="mt-6 flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          By sending a message, you agree that we can use your details to respond. See the Privacy Policy.
        </p>
        <Button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending...' : 'Send message'}
        </Button>
      </div>
    </form>
  )
}

export function StaticPage({ page }: StaticPageProps) {
  const def = pages[page]
  usePageTitle(page, def.title)

  return (
    <main className="min-h-[200px] flex-1 flex bg-muted/30 overflow-hidden transition-all duration-300">
      {/* Left ad column */}
      <div className="hidden lg:flex flex-col items-end justify-center w-[160px] border-r bg-muted/10 flex-shrink-0">
        <AdUnit slot="static-left" width={160} height={600} format="vertical" />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto bg-background scrollbar-hide">
        <article className="max-w-3xl mx-auto px-6 py-12">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">{def.title}</h1>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed">{def.description}</p>
            {def.lastUpdated && (
              <p className="mt-3 text-sm text-muted-foreground">Last updated: {def.lastUpdated}</p>
            )}
          </header>

          <div className="space-y-10">
            {def.sections.map((section) => (
              <section key={section.heading} className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">{section.heading}</h2>

                {section.paragraphs?.map((p, idx) => (
                  <p key={idx} className="text-base text-muted-foreground leading-relaxed">
                    {p}
                  </p>
                ))}

                {section.bullets && section.bullets.length > 0 && (
                  <ul className="list-disc pl-5 space-y-2 text-base text-muted-foreground">
                    {section.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {page === 'contact' && <ContactForm />}
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <a href="/" className="text-sm text-primary hover:underline">
              Back to generator
            </a>
          </div>
        </article>
      </div>

      {/* Right ad column */}
      <div className="hidden lg:flex flex-col items-start justify-center w-[160px] border-l bg-muted/10 flex-shrink-0">
        <AdUnit slot="static-right" width={160} height={600} format="vertical" />
      </div>
    </main>
  )
}

export default StaticPage
