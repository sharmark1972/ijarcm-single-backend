// Certificate Types and Constants

// IJARCM default ISSN (kept for backward compatibility)
export const ISSN_PRINT = '2455-0116';
export const ISSN_ONLINE = '2395-6410';

export interface JournalInfo {
  id: string;
  name: string;
  abbreviation: string;
  website?: string | null;
  issnPrint?: string | null;
  issnOnline?: string | null;
  origin?: string | null;
  doiAllotted: boolean;
  isDefault: boolean;
  isActive: boolean;
}

// Template types
export type CertificateTemplate = 'classic' | 'modern' | 'elegant';

export const CERTIFICATE_TEMPLATES = [
  { id: 'classic' as CertificateTemplate, name: 'Royal Gold & Burgundy', description: 'Prestigious classic design with ornate gold flourishes and burgundy accents - ideal for formal academic recognition' },
  { id: 'modern' as CertificateTemplate, name: 'Royal Navy Blue', description: 'Premium corporate theme with sophisticated navy blue gradients and silver accents - perfect for professional portfolios' },
  { id: 'elegant' as CertificateTemplate, name: 'Emerald & Gold', description: 'Distinguished academic theme with rich emerald tones and gold embellishments - suited for scholarly achievements' },
];

export interface CertificateProps {
  certificateNumber: string;
  authorName: string;
  title: string;
  institution: string;
  issuedAt: string;
  type: 'PUBLICATION' | 'PARTICIPATION' | 'REVIEW' | 'AWARD' | 'CONFERENCE';
  isPreview?: boolean;
  showDownload?: boolean;
  conferenceName?: string;
  conferenceDates?: string;
  topic?: string;
  venue?: string;
  prize?: string;
  customDate?: string;
  template?: CertificateTemplate;
  conferenceParticipationType?: 'participation' | 'presentation' | 'both';
  journal?: JournalInfo | null;
}
