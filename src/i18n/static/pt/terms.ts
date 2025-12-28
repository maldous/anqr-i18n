import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const terms: PageDefinition = {
  title: 'Termos de Serviço',
  description: 'Ao acessar ou usar o site, você concorda em cumprir estes termos.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Aceitação dos termos',
      paragraphs: [
        `Ao acessar ou usar o ANQR (anqr.link), você concorda em estar vinculado aos Termos de Serviço e à Política de Privacidade. Se não concordar com estes termos, não use o site.`,
        `Podemos atualizar estes Termos de tempos em tempos. O uso contínuo após alterações constitui aceitação dos novos termos.`
      ]
    },
    {
      heading: 'Elegibilidade',
      paragraphs: [
        `You must be at least 13 years of age to use ANQR. By using the site, you represent that you meet this age requirement. If you are under 18, you represent that you have your parent or guardian's permission to use the site.`
      ]
    },
    {
      heading: 'Uso permitido',
      paragraphs: [
        `You may use ANQR for lawful purposes only. You are solely responsible for the content you encode into QR codes and for how you use any QR codes you generate.`
      ]
    },
    {
      heading: 'Conduta proibida',
      paragraphs: [
        'You agree not to:'
      ],
      bullets: [
        `Use ANQR to create QR codes that facilitate phishing, malware distribution, fraud, scams, harassment, defamation, or any illegal activity.`,
        `Encode content that infringes intellectual property rights, violates privacy, or contains illegal material.`,
        'Attempt to disrupt, overload, or interfere with the operation or security of the site.',
        'Reverse engineer, decompile, or attempt to extract source code from the site.',
        `Use automated tools (bots, scrapers) to access the site in a manner that degrades performance for other users.`,
        'Circumvent or disable any security or access control features.',
        'Impersonate any person or entity or misrepresent your affiliation.'
      ]
    },
    {
      heading: 'Propriedade intelectual',
      paragraphs: [
        `You retain ownership of the content you encode into QR codes. ANQR does not claim ownership of your data.`,
        `The ANQR name, logo, interface design, and underlying code are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works without our permission.`,
        `QR Code® is a registered trademark of DENSO WAVE INCORPORATED. ANQR is not affiliated with DENSO WAVE.`
      ]
    },
    {
      heading: 'Licença de conteúdo do usuário',
      paragraphs: [
        `By using ANQR, you grant us no rights to your content — all QR code generation happens locally on your device and we do not access, store, or transmit your encoded data.`
      ]
    },
    {
      heading: 'Serviços de terceiros e publicidade',
      paragraphs: [
        `The site displays advertisements through Google AdSense and may include links to third-party websites. We are not responsible for third-party content, services, or privacy practices.`,
        `Your interactions with advertisers and third parties are solely between you and them. See our Privacy Policy for information about advertising data practices.`
      ]
    },
    {
      heading: 'Isenção de garantias',
      paragraphs: [
        `ANQR IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.`,
        `We do not warrant that: (a) the site will be uninterrupted, secure, or error-free; (b) QR codes will scan in all environments, on all devices, or with all scanner applications; (c) the site will meet your requirements.`,
        `You should always test QR codes in the conditions where they will be used (print size, lighting, screen type, distance, camera quality).`
      ]
    },
    {
      heading: 'Limitação de responsabilidade',
      paragraphs: [
        `TO THE MAXIMUM EXTENT PERMITTED BY LAW, ANQR AND ITS OPERATORS, AFFILIATES, AND LICENSORS SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOSS OF PROFITS, REVENUE, DATA, GOODWILL, USE, OR OTHER INTANGIBLE LOSSES, ARISING FROM OR RELATED TO YOUR ACCESS TO OR USE OF (OR INABILITY TO ACCESS OR USE) THE SERVICE.`,
        `YOU EXPRESSLY UNDERSTAND AND AGREE THAT YOUR USE OF THE SERVICE IS AT YOUR SOLE RISK. THE SERVICE IS PROVIDED FREE OF CHARGE, AND ACCORDINGLY, YOU AGREE THAT ANQR AND ITS OPERATORS SHALL HAVE NO LIABILITY TO YOU WHATSOEVER FOR ANY DAMAGES OR LOSSES. IN NO EVENT SHALL OUR TOTAL AGGREGATE LIABILITY EXCEED ZERO DOLLARS ($0 AUD).`,
        `YOU AGREE TO RELEASE, WAIVE, AND DISCHARGE ANY AND ALL CLAIMS, DEMANDS, AND CAUSES OF ACTION AGAINST ANQR AND ITS OPERATORS ARISING FROM YOUR USE OF THE SERVICE.`,
        `SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES OR LIMITATIONS OF LIABILITY. IN SUCH JURISDICTIONS, OUR LIABILITY SHALL BE LIMITED TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW.`
      ]
    },
    {
      heading: 'Indenização',
      paragraphs: [
        `You agree to indemnify, defend, and hold harmless ANQR, its operators, affiliates, and their respective officers, directors, employees, and agents from any claims, damages, losses, liabilities, costs, and expenses (including legal fees) arising from: (a) your use of the site; (b) your violation of these Terms; (c) your violation of any third-party rights; (d) any content you encode into QR codes.`
      ]
    },
    {
      heading: 'Resolução de disputas',
      paragraphs: [
        `Any dispute arising from these Terms or your use of ANQR shall first be attempted to be resolved through informal negotiation by contacting ${CONTACT_EMAIL}.`,
        `If informal resolution fails, disputes shall be resolved through binding arbitration in Victoria, Australia, except that either party may seek injunctive relief in court for intellectual property violations.`
      ]
    },
    {
      heading: 'Renúncia a ação coletiva',
      paragraphs: [
        `TO THE EXTENT PERMITTED BY LAW, YOU AGREE THAT ANY DISPUTE RESOLUTION PROCEEDINGS WILL BE CONDUCTED ONLY ON AN INDIVIDUAL BASIS AND NOT IN A CLASS, CONSOLIDATED, OR REPRESENTATIVE ACTION.`
      ]
    },
    {
      heading: 'Lei aplicável',
      paragraphs: [
        `These Terms are governed by the laws of Victoria, Australia, without regard to conflict of laws principles. You consent to the exclusive jurisdiction of the courts located in Victoria, Australia.`
      ]
    },
    {
      heading: 'Alterações e disponibilidade',
      paragraphs: [
        `We may modify, suspend, or discontinue the site (or any part of it) at any time without notice or liability.`,
        `We may update these Terms at any time. The "Last updated" date indicates when they were most recently revised. Continued use after changes constitutes acceptance.`
      ]
    },
    {
      heading: 'Separabilidade',
      paragraphs: [
        `If any provision of these Terms is held invalid or unenforceable, that provision will be enforced to the maximum extent permissible, and the remaining provisions will remain in full force and effect.`
      ]
    },
    {
      heading: 'Renúncia',
      paragraphs: [
        `Our failure to enforce any right or provision of these Terms shall not be deemed a waiver of such right or provision.`
      ]
    },
    {
      heading: 'Acordo integral',
      paragraphs: [
        `These Terms, together with our Privacy Policy, constitute the entire agreement between you and ANQR regarding your use of the site and supersede any prior agreements.`
      ]
    },
    {
      heading: 'Força maior',
      paragraphs: [
        `We shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including natural disasters, war, terrorism, riots, government actions, or internet/infrastructure failures.`
      ]
    },
    {
      heading: 'Contato',
      paragraphs: [
        `Questions about these Terms can be sent to: ${CONTACT_EMAIL}`
      ]
    }
  ]
};

export default terms;
