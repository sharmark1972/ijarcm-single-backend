'use client';

import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import Link from 'next/link';
import {
  ArrowRight,
  FileText,
  Users,
  Download,
  Globe,
  Shield,
  Zap,
  BookOpen,
  Target,
  Clock,
  Search,
  CheckCircle2,
  Library,
  Link2,
  Database,
  BarChart3,
  Users2,
  BookMarked,
  GraduationCap,
  Map
} from 'lucide-react';
import DynamicSEO from '@/components/DynamicSEO';
import { WebsiteSchema, OrganizationSchema } from '@/components/SchemaMarkup';
import OurLeadership from '@/components/OurLeadership';
import AnnouncementsDisplay from '@/components/AnnouncementsDisplay';
import VisitorCounter from '@/components/VisitorCounter';
import VisitorAnalytics from '@/components/VisitorAnalytics';
import PublicationStatistics from '@/components/PublicationStatistics';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import IssueDisplay, { IssueDisplayProps } from '@/components/IssueDisplay';
import IndexingDatabases from '@/components/IndexingDatabases';

interface LatestPaper {
  id: string;
  title: string;
  abstract: string;
  authors: string[];
  publishedAt: string;
  issuePublishDate?: string;
  downloads: number;
  category: string;
}

interface Stats {
  totalPapers: number;
  totalAuthors: number;
  totalDownloads: number;
  totalReviews: number;
}

interface EditorialBoardMember {
  id: string;
  name: string;
  title?: string;
  institution?: string;
  expertise?: string;
  imageUrl?: string;
  position?: string;
}

interface ImpactFactor {
  year: number;
  value: number;
  certificatePath?: string;
}

interface Announcement {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export default function HomePage() {
  const [latestPapers, setLatestPapers] = useState<LatestPaper[]>([]);
  const [latestIssue, setLatestIssue] = useState<IssueDisplayProps | null>(null);
  const [upcomingIssue, setUpcomingIssue] = useState<IssueDisplayProps | null>(null);
  const [stats, setStats] = useState<Stats>({
    totalPapers: 0,
    totalAuthors: 0,
    totalDownloads: 0,
    totalReviews: 0
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [editorialBoard, setEditorialBoard] = useState<EditorialBoardMember[]>([]);
  const [impactFactor, setImpactFactor] = useState<ImpactFactor | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useVisitorTracking();

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3004';
      const [homeResponse, boardResponse, announcementsResponse] = await Promise.all([
        fetch(`${apiUrl}/api/home`, {
          headers: {
            'x-site-slug': 'ijarcm'
          }
        }),
        fetch(`${apiUrl}/api/editorial-board?isActive=true`, {
          headers: {
            'x-site-slug': 'ijarcm'
          }
        }),
        fetch(`${apiUrl}/api/announcements?isPublished=true&limit=4`, {
          headers: {
            'x-site-slug': 'ijarcm'
          }
        })
      ]);

      if (!homeResponse.ok) throw new Error('Failed to fetch home data');
      const data = await homeResponse.json();
      setStats(data.stats);
      setLatestPapers(data.latestPapers);
      setLatestIssue(data.latestIssue);
      setUpcomingIssue(data.upcomingIssue);

      if (boardResponse.ok) {
        const boardData = await boardResponse.json();
        setEditorialBoard(boardData);
      }

      if (data.currentImpactFactor) {
        setImpactFactor(data.currentImpactFactor);
      }

      if (announcementsResponse.ok) {
        const announcementsData = await announcementsResponse.json();
        const annList = Array.isArray(announcementsData) ? announcementsData : announcementsData.announcements || [];
        setAnnouncements(annList.slice(0, 4));
      }
    } catch (error) {
      console.error('Error fetching home data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DynamicSEO 
        title="IJARCM - International Journal of Academic Research in Commerce and Management"
        description="Premier academic journal publishing rigorous peer-reviewed research in commerce, management, and technology."
        keywords={['commerce', 'management', 'research journal', 'academic publishing', 'IJARCM', 'peer review']}
        ogImage="https://ijrcam.com/og-image.jpg"
        canonicalUrl="https://ijrcam.com"
      />
      <WebsiteSchema 
        name="IJARCM"
        url="https://ijrcam.com"
        description="Premier academic journal publishing rigorous peer-reviewed research in commerce, management, and technology."
        publisher="IJARCM"
      />
      <OrganizationSchema 
        name="IJARCM"
        url="https://ijrcam.com"
        logo="https://ijrcam.com/ijarcm-logo.svg"
        description="IJARCM - International Journal of Academic Research in Commerce and Management"
        contactPoint={{
          email: "editor@ijrcam.com",
          contactType: "Editorial Office"
        }}
      />
      
      <div className="min-h-screen bg-white font-sans">
        
        {/* Hero Section */}
        <section className="relative bg-white border-b border-slate-200 overflow-hidden">
          {/* Background decorators */}
          <div className="pointer-events-none absolute -top-40 -right-40 w-[800px] h-[800px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(232,240,254,.55) 0%, transparent 65%)' }} />
          <div className="pointer-events-none absolute bottom-16 -left-24 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(230,245,236,.35) 0%, transparent 65%)' }} />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

              {/* Left column */}
              <div className="lg:col-span-8 space-y-6">
                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase" style={{ background: '#e8f0fe', color: '#1B2F6E' }}>Peer-Reviewed</span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase" style={{ background: '#e6f5ec', color: '#1a7a40' }}>Open Access</span>
<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase" style={{ background: '#f0eafc', color: '#6b4dc0' }}>Crossref / DOI</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-slate-900 leading-tight">
                  International Journal of <br className="hidden md:block" />
                  <span className="text-slate-700">Academic Research in Commerce & Management</span>
                </h1>

                <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
                  A premier international journal dedicated to publishing rigorous, peer-reviewed research that shapes the future of business and technology.
                </p>

                <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4 items-center">
                  <Link
                    href="/submit"
                    className="inline-flex items-center justify-center px-6 py-3 text-white rounded-md font-medium text-lg shadow-sm transition-colors"
                    style={{ background: '#1B2F6E' }}
                  >
                    Submit Manuscript
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>

                  <Link
                    href="/library"
                    className="inline-flex items-center justify-center px-6 py-3 bg-white rounded-md font-medium text-lg border-2 transition-colors"
                    style={{ color: '#1B2F6E', borderColor: '#1B2F6E' }}
                  >
                    Browse Archive
                  </Link>

                  <Link
                    href="/submission-guidelines"
                    className="text-lg font-medium border-b transition-colors"
                    style={{ color: '#666', borderColor: '#ccc' }}
                  >
                    Author Guidelines →
                  </Link>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-200 max-w-lg">
                  <div>
                    <div className="text-3xl font-bold text-slate-900">{stats.totalPapers.toLocaleString()}+</div>
                    <div className="text-sm text-slate-500 font-medium">Published Papers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-slate-900">{stats.totalAuthors.toLocaleString()}+</div>
                    <div className="text-sm text-slate-500 font-medium">Authors</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-slate-900">12+</div>
                    <div className="text-sm text-slate-500 font-medium">Indexing</div>
                  </div>
                </div>
              </div>

              {/* Right column — Current Issue card */}
              <div className="lg:col-span-4">
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-lg relative top-2">
                  <div className="text-xs font-bold uppercase tracking-widest mb-4 pb-3 border-b border-slate-100" style={{ color: '#1B2F6E', letterSpacing: '.12em' }}>Current Issue</div>

                  {loading ? (
                    <div className="space-y-3 animate-pulse">
                      <div className="h-5 bg-secondary rounded w-3/4"></div>
                      <div className="h-4 bg-secondary rounded w-1/2"></div>
                      <div className="h-20 bg-secondary rounded"></div>
                      <div className="h-4 bg-secondary rounded w-full"></div>
                      <div className="h-4 bg-secondary rounded w-5/6"></div>
                      <div className="h-9 bg-secondary rounded"></div>
                    </div>
                  ) : latestIssue ? (
                    <>
                      <div className="font-serif font-bold text-lg text-slate-900 mb-1">
                        Volume {latestIssue.volume}, Issue {latestIssue.issue}
                      </div>
                      <div className="text-sm text-slate-400 mb-5">{latestIssue.year}</div>

                      <div className="bg-slate-50 rounded-lg p-4 mb-4 grid grid-cols-3 gap-2 text-center">
                        <div>
                          <div className="text-2xl font-bold" style={{ color: '#1B2F6E' }}>{latestIssue.paperCount ?? '—'}</div>
                          <div className="text-xs text-slate-400 uppercase tracking-wide mt-1">Articles</div>
                        </div>
                        <div className="border-x border-slate-200">
                          <div className="text-2xl font-bold" style={{ color: '#0d7c66' }}>{stats.totalReviews ?? '—'}</div>
                          <div className="text-xs text-slate-400 uppercase tracking-wide mt-1">Reviews</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold" style={{ color: '#6b4dc0' }}>{stats.totalDownloads?.toLocaleString() ?? '—'}</div>
                          <div className="text-xs text-slate-400 uppercase tracking-wide mt-1">Downloads</div>
                        </div>
                      </div>

                      <div className="text-sm text-slate-500 leading-loose mb-4">
                        Avg. 30-40 days to decision<br />
                        Free to read &amp; download<br />
                        DOI assigned on acceptance
                      </div>

                      <Link
                        href="/issues"
                        className="block w-full text-center text-white font-semibold py-2.5 rounded-md transition-colors text-sm"
                        style={{ background: '#1B2F6E' }}
                      >
                        View Current Issue →
                      </Link>
                      <Link
                        href="/issues"
                        className="block text-center text-xs text-slate-400 mt-3 hover:text-slate-600 transition-colors"
                      >
                        Browse All Volumes →
                      </Link>
                    </>
                  ) : (
                    <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
                      <h3 className="font-serif font-bold text-lg text-slate-900 mb-4 border-b border-slate-100 pb-2">Editorial Leadership</h3>
                      <OurLeadership />
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Stats Bar */}
          <div className="bg-primary">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
              <div className="px-8 py-6 text-center border-r border-white/10">
                <div className="text-3xl font-bold text-white">{stats.totalPapers.toLocaleString()}+</div>
                <div className="text-xs uppercase tracking-widest text-white/50 mt-1.5">Articles Published</div>
              </div>
              <div className="px-8 py-6 text-center md:border-r border-white/10">
                <div className="text-3xl font-bold text-white">{stats.totalAuthors.toLocaleString()}+</div>
                <div className="text-xs uppercase tracking-widest text-white/50 mt-1.5">Authors Worldwide</div>
              </div>
              <div className="px-8 py-6 text-center border-r border-white/10 border-t md:border-t-0">
                <div className="text-3xl font-bold text-white">30-40</div>
                <div className="text-xs uppercase tracking-widest text-white/50 mt-1.5">Days to Decision</div>
              </div>
              <div className="px-8 py-6 text-center border-t md:border-t-0">
                <div className="text-3xl font-bold text-white">6+</div>
                <div className="text-xs uppercase tracking-widest text-white/50 mt-1.5">Indexing Databases</div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Research Section */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Header */}
            <div className="flex justify-between items-baseline mb-6">
              <div>
                <h2 className="text-3xl font-serif font-bold text-slate-900 mb-1">Latest Research</h2>
                <div className="w-10 h-0.5 bg-primary rounded"></div>
              </div>
              <Link href="/library" className="text-sm font-semibold hover:opacity-80 transition-opacity" style={{ color: '#1B2F6E' }}>
                View All Articles →
              </Link>
            </div>

            {/* Filter Tabs */}
            {(() => {
              const tabs = ['all', ...Array.from(new Set(latestPapers.map(p => p.category).filter(Boolean)))];
              return (
                <div className="flex border-b border-slate-200 mb-7 overflow-x-auto">
                  {tabs.map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className="whitespace-nowrap px-5 py-2.5 text-sm font-medium border-b-2 transition-colors"
                      style={{
                        borderColor: activeTab === tab ? '#1B2F6E' : 'transparent',
                        color: activeTab === tab ? '#1B2F6E' : '#666',
                        fontWeight: activeTab === tab ? 600 : 400,
                        background: 'none',
                      }}
                    >
                      {tab === 'all' ? 'All Articles' : tab}
                    </button>
                  ))}
                </div>
              );
            })()}

            {loading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-80 bg-white rounded-lg animate-pulse border border-slate-200" />
                <div className="flex flex-col gap-4">
                  {[1, 2, 3].map(i => <div key={i} className="h-24 bg-white rounded-lg animate-pulse border border-slate-200" />)}
                </div>
              </div>
            ) : (() => {
              const filtered = activeTab === 'all'
                ? latestPapers
                : latestPapers.filter(p => p.category === activeTab);
              const papers = filtered.length > 0 ? filtered : latestPapers;
              const featured = papers[0];
              const recent = papers.slice(1, 4);

              const isNew = (date: string) => {
                const d = new Date(date);
                return (Date.now() - d.getTime()) < 30 * 24 * 60 * 60 * 1000;
              };

              return (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

                  {/* Featured article */}
                  {featured && (
                    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          <span className="text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full text-white" style={{ background: '#1B2F6E' }}>
                            {featured.category}
                          </span>
                          {isNew(featured.issuePublishDate || featured.publishedAt) && (
                            <span className="text-xs font-bold uppercase tracking-wide px-2 py-1 rounded-full" style={{ background: '#e6f5ec', color: '#1a7a40' }}>New</span>
                          )}
                          <span className="text-xs text-slate-400">
                            {new Date(featured.issuePublishDate || featured.publishedAt).getFullYear()}
                          </span>
                        </div>
                        <h3 className="font-serif font-bold text-xl text-slate-900 leading-snug mb-2">
                          {featured.title}
                        </h3>
                        <p className="text-sm text-slate-500 italic mb-3">{featured.authors.join(', ')}</p>
                        <div
                          className="text-sm text-slate-600 leading-relaxed mb-5 line-clamp-3"
                          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(featured.abstract) }}
                        />
                        <div className="flex items-center justify-between flex-wrap gap-3">
                          <Link
                            href={`/papers/${featured.id}`}
                            className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white rounded-md transition-opacity hover:opacity-90"
                            style={{ background: '#1B2F6E' }}
                          >
                            Read Full Paper
                          </Link>
                          <div className="flex items-center gap-1 text-xs text-slate-400">
                            <Download className="w-3 h-3" />
                            {featured.downloads}+ downloads
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Recent articles */}
                  <div className="flex flex-col gap-3">
                    {recent.map(paper => (
                      <div key={paper.id} className="flex bg-white rounded-lg border border-slate-200 overflow-hidden hover:border-slate-300 hover:shadow-sm transition-all">
                        <div className="w-1 flex-shrink-0" style={{ background: '#1B2F6E' }} />
                        <div className="p-4 flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className="text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full text-white" style={{ background: '#1B2F6E' }}>
                              {paper.category}
                            </span>
                            {isNew(paper.issuePublishDate || paper.publishedAt) && (
                              <span className="text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full" style={{ background: '#e6f5ec', color: '#1a7a40' }}>New</span>
                            )}
                            <span className="text-xs text-slate-400">
                              {new Date(paper.issuePublishDate || paper.publishedAt).getFullYear()}
                            </span>
                          </div>
                          <h4 className="font-serif font-semibold text-sm text-slate-900 leading-snug mb-1 line-clamp-2">{paper.title}</h4>
                          <p className="text-xs text-slate-500 italic mb-2">{paper.authors.join(', ')}</p>
                          <div className="flex justify-between items-center">
                            <Link href={`/papers/${paper.id}`} className="text-xs font-semibold hover:opacity-80" style={{ color: '#1B2F6E' }}>
                              Read Article →
                            </Link>
                            <span className="text-xs text-slate-300">{paper.downloads}+ downloads</span>
                          </div>
                        </div>
                      </div>
                    ))}

                    <Link
                      href="/library"
                      className="flex items-center justify-center gap-2 bg-white border-2 border-dashed border-slate-200 rounded-lg py-4 text-sm font-semibold transition-colors hover:border-slate-400"
                      style={{ color: '#1B2F6E' }}
                    >
                      Browse Full Archive →
                    </Link>
                  </div>

                </div>
              );
            })()}
          </div>
        </section>

        {/* Submissions Open CTA */}
        <section style={{ background: 'linear-gradient(135deg, #1B2F6E 0%, #0f1f4a 100%)' }} className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              {upcomingIssue && (
                <div className="text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
                  Call for Papers — Volume {upcomingIssue.volume}, Issue {upcomingIssue.issue}
                </div>
              )}
              <h2 className="font-serif font-bold text-2xl text-white mb-2">Submissions Now Open</h2>
              <p className="text-white/70 text-sm">
                {upcomingIssue
                  ? <>Submission deadline: <strong className="text-white">{new Date(upcomingIssue.publicationDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</strong> &nbsp;·&nbsp; Fast-track peer review available &nbsp;·&nbsp; DOI on every article</>
                  : <>Fast-track peer review available &nbsp;·&nbsp; DOI assigned on acceptance &nbsp;·&nbsp; Free to publish</>
                }
              </p>
            </div>
            <div className="flex flex-col gap-3 items-start flex-none">
              <Link
                href="/submit"
                className="inline-flex items-center px-6 py-3 bg-white font-bold text-sm rounded-md hover:bg-slate-100 transition-colors whitespace-nowrap"
                style={{ color: '#1B2F6E' }}
              >
                Submit Manuscript →
              </Link>
              <Link
                href="/submission-guidelines"
                className="text-xs text-white/60 hover:text-white transition-colors px-1"
              >
                Download Author Guidelines →
              </Link>
            </div>
          </div>
        </section>

        {/* Aims & Scope + Author Guidelines */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Aims & Scope */}
            <div>
              <h2 className="font-serif font-bold text-2xl text-slate-900 mb-1">Aims & Scope</h2>
              <div className="w-9 h-0.5 bg-primary rounded mb-5"></div>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                The International Journal of Academic Research in Commerce & Management (IJARCM) is a peer-reviewed, open-access journal dedicated to publishing original, high-quality research in all areas of commerce and management sciences.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mb-5">
                The journal welcomes contributions from researchers, academics, and practitioners worldwide, fostering an interdisciplinary exchange of knowledge that bridges theoretical insights with practical applications.
              </p>
              <div className="bg-white rounded-lg p-5 border border-slate-200">
                <div className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-3">Journal Focus Areas Include:</div>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    'Business Strategy & Policy',
                    'Financial Management',
                    'Marketing & Consumer Research',
                    'Organizational Behavior',
                    'Supply Chain & Logistics',
                    'Digital Economy & E-Commerce',
                    'Banking, Insurance & Finance',
                    'International Trade & Business'
                  ].map((area) => (
                    <div key={area} className="text-sm text-slate-700 flex items-center gap-2">
                      <span style={{ color: '#1B2F6E' }} className="font-bold">✓</span>
                      {area}
                    </div>
                  ))}
                </div>
              </div>
              <Link href="/about" className="inline-block mt-4 text-sm font-semibold hover:opacity-80" style={{ color: '#1B2F6E' }}>
                Read Full Aims & Scope →
              </Link>
            </div>

            {/* Author Guidelines */}
            <div>
              <h2 className="font-serif font-bold text-2xl text-slate-900 mb-1">Author Guidelines</h2>
              <div className="w-9 h-0.5 bg-primary rounded mb-5"></div>
              <div className="space-y-3 mb-5">
                {[
                  { num: '1', title: 'Prepare Your Manuscript', desc: '4,000–8,000 words · APA 7th edition · Structured abstract (250 words max) · 5–7 keywords' },
                  { num: '2', title: 'Format & Plagiarism Check', desc: 'Use IJARCM template · Ensure originality (<15% similarity) · Include all declarations' },
                  { num: '3', title: 'Submit Online', desc: 'Upload via our submission portal · Receive acknowledgment within 24 hours' },
                  { num: '4', title: 'Double-Blind Peer Review', desc: 'Reviewed by 2 independent experts · Decision within 30-40 days · Detailed feedback provided' },
                  { num: '5', title: 'Publication & DOI Assignment', desc: 'Accepted papers published within 2 weeks · DOI via Crossref · Free to read & download' }
                ].map((step) => (
                  <div key={step.num} className="flex gap-3 bg-white border border-slate-200 rounded-lg p-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs" style={{ background: '#1B2F6E' }}>
                      {step.num}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-slate-900 mb-1">{step.title}</div>
                      <div className="text-xs text-slate-500">{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  href="/submission-guidelines"
                  className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white text-xs font-semibold rounded-md hover:opacity-90 transition-opacity"
                >
                  Download Guidelines (PDF)
                </Link>
                <Link
                  href="/submit"
                  className="inline-flex items-center justify-center px-4 py-2 bg-white border-2 border-primary text-primary text-xs font-semibold rounded-md hover:bg-slate-50 transition-colors"
                >
                  Use Manuscript Template
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* Journal Impact & Metrics */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-9">
              <h2 className="font-serif font-bold text-2xl text-slate-900 mb-1">Journal Impact & Metrics</h2>
              <p className="text-sm text-slate-600">Demonstrating academic reach and scholarly influence</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* H-Index */}
              <div className="rounded-lg p-6 text-center border-2" style={{ background: '#e8f0fe', borderColor: '#d0dff8' }}>
                <div className="text-4xl font-bold" style={{ color: '#1B2F6E', lineHeight: '1' }}>H-12</div>
                <div className="text-xs font-bold uppercase tracking-wider mt-1.5 mb-1.5" style={{ color: '#1B2F6E' }}>H-Index</div>
                <div className="text-sm text-slate-600 leading-relaxed">Google Scholar citation index</div>
              </div>

              {/* Acceptance Rate */}
              <div className="rounded-lg p-6 text-center border-2" style={{ background: '#e6f5ec', borderColor: '#c0e8cc' }}>
                <div className="text-4xl font-bold" style={{ color: '#0d7c66', lineHeight: '1' }}>60%</div>
                <div className="text-xs font-bold uppercase tracking-wider mt-1.5 mb-1.5" style={{ color: '#0d7c66' }}>Acceptance Rate</div>
                <div className="text-sm text-slate-600 leading-relaxed">Rigorous double-blind review</div>
              </div>

              {/* Review Time */}
              <div className="rounded-lg p-6 text-center border-2" style={{ background: '#f0eafc', borderColor: '#d8c8f5' }}>
                <div className="text-4xl font-bold" style={{ color: '#6b4dc0', lineHeight: '1' }}>30-40d</div>
                <div className="text-xs font-bold uppercase tracking-wider mt-1.5 mb-1.5" style={{ color: '#6b4dc0' }}>Avg Review Time</div>
                <div className="text-sm text-slate-600 leading-relaxed">Days to first decision</div>
              </div>

              {/* Citations */}
              <div className="rounded-lg p-6 text-center border-2" style={{ background: '#fff8e6', borderColor: '#f0d8a0' }}>
                <div className="text-4xl font-bold" style={{ color: '#b06800', lineHeight: '1' }}>1,240+</div>
                <div className="text-xs font-bold uppercase tracking-wider mt-1.5 mb-1.5" style={{ color: '#b06800' }}>Citations</div>
                <div className="text-sm text-slate-600 leading-relaxed">Total Crossref citations</div>
              </div>

              {/* Impact Factor */}
              <div className="rounded-lg p-6 text-center border-2" style={{ background: '#fee8e8', borderColor: '#f8c8c8' }}>
                <div className="text-4xl font-bold" style={{ color: '#c0392b', lineHeight: '1' }}>
                  {impactFactor ? impactFactor.value.toFixed(2) : '—'}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider mt-1.5 mb-1.5" style={{ color: '#c0392b' }}>Impact Factor</div>
                <div className="text-sm text-slate-600 leading-relaxed">
                  {impactFactor ? `Year ${impactFactor.year}` : 'Latest available'}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Editorial Board */}
        <section className="py-16 border-b" style={{ background: '#f5f7fc', borderTopColor: '#e0e8f2', borderBottomColor: '#e0e8f2' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-baseline mb-8">
              <div>
                <h2 className="text-2xl font-serif font-bold text-slate-900 mb-1">Editorial Board</h2>
                <div style={{ width: '40px', height: '3px', background: '#1B2F6E', borderRadius: '2px' }}></div>
              </div>
              <Link href="/editorial-board" className="text-sm font-semibold" style={{ color: '#1B2F6E' }}>
                View Full Board →
              </Link>
            </div>

            {editorialBoard.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {editorialBoard.slice(0, 6).map((member) => {
                  const positionColorMap: { [key: string]: { bg: string; gradient: string; text: string } } = {
                    'EDITOR_IN_CHIEF': { bg: '#1a56d9', gradient: 'linear-gradient(135deg, #1a56d9, #0d3da8)', text: '#1a56d9' },
                    'ASSOCIATE_EDITOR': { bg: '#0d7c66', gradient: 'linear-gradient(135deg, #0d7c66, #096651)', text: '#0d7c66' },
                    'SECTION_EDITOR': { bg: '#6b4dc0', gradient: 'linear-gradient(135deg, #6b4dc0, #5038a0)', text: '#6b4dc0' },
                    'MEMBER': { bg: '#b06800', gradient: 'linear-gradient(135deg, #b06800, #8c5200)', text: '#b06800' },
                    'ADVISORY_BOARD': { bg: '#c0392b', gradient: 'linear-gradient(135deg, #c0392b, #962b20)', text: '#c0392b' },
                    'INTERNATIONAL_BOARD_MEMBER': { bg: '#0a7c8c', gradient: 'linear-gradient(135deg, #0a7c8c, #086070)', text: '#0a7c8c' }
                  };

                  const colors = positionColorMap[member.position || 'MEMBER'] || positionColorMap['MEMBER'];
                  const initials = member.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

                  return (
                    <div key={member.id} className="bg-white border border-slate-200 rounded-lg p-5 flex gap-4 items-start hover:shadow-md transition-all" style={{ borderRadius: '10px' }}>
                      {/* Avatar */}
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          background: member.imageUrl ? 'none' : colors.gradient,
                          backgroundImage: member.imageUrl ? `url(${member.imageUrl})` : 'none',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flex: 'none',
                          fontSize: '16px',
                          fontWeight: '700',
                          color: '#fff'
                        }}
                      >
                        {!member.imageUrl && initials}
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '8.5px', fontWeight: '700', color: colors.text, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '4px' }}>
                          {(member.position || 'MEMBER').replace(/_/g, ' ')}
                        </div>
                        <div style={{ fontFamily: 'Lora, Georgia, serif', fontSize: '15px', fontWeight: '700', color: '#0d1628', marginBottom: '2px' }}>
                          {member.name}
                        </div>
                        <div style={{ fontSize: '12px', color: '#777', lineHeight: '1.5' }}>
                          {member.institution && <div>{member.institution}</div>}
                          {member.expertise && <div>{member.expertise}</div>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-slate-500">Editorial board members loading...</p>
              </div>
            )}
          </div>
        </section>

{/* Why Choose Us */}
        {/* <section className="py-16 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Journal Features</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                 We are committed to the highest standards of academic publishing.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Globe, title: 'Global Reach', desc: 'Connecting researchers from over 50 countries.' },
                { icon: Shield, title: 'Rigorous Peer Review', desc: 'Double-blind review process ensuring quality and objectivity.' },
                { icon: Zap, title: 'Rapid Publication', desc: 'Efficient processing with an average turnaround of 4-6 weeks.' },
                { icon: BookOpen, title: 'Open Access', desc: 'Free unrestricted access to all published research.' },
                { icon: Target, title: 'High Visibility', desc: 'Indexed in major academic databases for maximum citation.' },
                { icon: CheckCircle2, title: 'Ethical Standards', desc: 'Strict adherence to COPE guidelines for publication ethics.' }
              ].map((feature, index) => (
                <div key={index} className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
                  <feature.icon className="w-8 h-8 text-slate-700 mb-4" />
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Announcements */}
        {/* <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-serif font-bold text-slate-900">Announcements</h2>
             </div>
             <AnnouncementsDisplay targetAudience="ALL" limit={3} showDismiss={false} />
          </div>
        </section> */}

        {/* Publication Stats */}
        {/* <PublicationStatistics /> */}

        {/* CTA */}
        {/* <section className="py-16 bg-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Submit Your Research Today
            </h2>
            <p className="text-slate-300 mb-8 text-lg">
              Join our community of scholars and contribute to the global body of knowledge.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/submit"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-slate-900 rounded-md hover:bg-slate-100 transition-colors font-bold"
              >
                Start Submission
              </Link>
              <Link
                href="/submission-guidelines"
                className="inline-flex items-center justify-center px-8 py-3 border border-slate-600 text-white rounded-md hover:bg-slate-800 transition-colors"
              >
                Read Guidelines
              </Link>
            </div>
          </div>
        </section> */}

        {/* News & Announcements + Quick Information */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

              {/* News & Announcements */}
              <div>
                <h2 className="font-serif font-bold text-xl text-slate-900 mb-1">News & Announcements</h2>
                <div style={{ width: '36px', height: '3px', background: '#1B2F6E', borderRadius: '2px', marginBottom: '24px' }}></div>

                <div className="space-y-4">
                  {announcements.length > 0 ? (
                    announcements.map((announcement) => (
                      <div key={announcement.id} className="flex gap-4">
                        <div className="flex-none text-right min-w-20">
                          <div style={{ fontSize: '10px', fontWeight: '600', color: '#888', background: '#f0f2f8', padding: '3px 8px', borderRadius: '4px', display: 'inline-block', letterSpacing: '.03em' }}>
                            {new Date(announcement.createdAt).toLocaleDateString('en-US', { year: '2-digit', month: 'short' }).toUpperCase()}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '14.5px', fontWeight: '600', color: '#0d1628', marginBottom: '5px', lineHeight: '1.4' }}>
                            {announcement.title}
                          </div>
                          <div style={{ fontSize: '12.5px', color: '#666', lineHeight: '1.65', marginBottom: '8px' }}>
                            {announcement.description}
                          </div>
                          <Link href="#" style={{ fontSize: '12.5px', color: '#1B2F6E', fontWeight: '600' }}>
                            Read more →
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500">No announcements yet</p>
                  )}
                </div>
              </div>

              {/* Quick Information */}
              <div>
                <h2 className="font-serif font-bold text-xl text-slate-900 mb-1">Quick Information</h2>
                <div style={{ width: '36px', height: '3px', background: '#1B2F6E', borderRadius: '2px', marginBottom: '24px' }}></div>

                <div className="space-y-3 mb-7">
                  {/* Publication Frequency */}
                  <div style={{ background: '#f5f7fc', borderRadius: '8px', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '3px solid #1a56d9' }}>
                    <div style={{ fontSize: '13.5px', color: '#444', fontWeight: '500' }}>Publication Frequency</div>
                    <div style={{ fontSize: '13.5px', color: '#0d1628', fontWeight: '700' }}>Quarterly (4/yr)</div>
                  </div>

                  {/* APC */}
                  <div style={{ background: '#f5f7fc', borderRadius: '8px', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '3px solid #0d7c66' }}>
                    <div style={{ fontSize: '13.5px', color: '#444', fontWeight: '500' }}>Article Processing Charge</div>
                    <div style={{ fontSize: '13.5px', color: '#0d7c66', fontWeight: '700' }}>Free (No APC)</div>
                  </div>

                  {/* License */}
                  <div style={{ background: '#f5f7fc', borderRadius: '8px', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '3px solid #6b4dc0' }}>
                    <div style={{ fontSize: '13.5px', color: '#444', fontWeight: '500' }}>License Type</div>
                    <div style={{ fontSize: '13.5px', color: '#0d1628', fontWeight: '700' }}>CC BY-NC 4.0</div>
                  </div>

                  {/* ISSN Print */}
                  <div style={{ background: '#f5f7fc', borderRadius: '8px', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '3px solid #b06800' }}>
                    <div style={{ fontSize: '13.5px', color: '#444', fontWeight: '500' }}>ISSN Print</div>
                    <div style={{ fontSize: '13.5px', color: '#0d1628', fontWeight: '700', fontFamily: 'monospace' }}>2455-0116</div>
                  </div>

                  {/* ISSN Online */}
                  <div style={{ background: '#f5f7fc', borderRadius: '8px', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '3px solid #c0392b' }}>
                    <div style={{ fontSize: '13.5px', color: '#444', fontWeight: '500' }}>ISSN Online</div>
                    <div style={{ fontSize: '13.5px', color: '#0d1628', fontWeight: '700', fontFamily: 'monospace' }}>2395-6410</div>
                  </div>

                  {/* Founded */}
                  <div style={{ background: '#f5f7fc', borderRadius: '8px', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '3px solid #0a7c8c' }}>
                    <div style={{ fontSize: '13.5px', color: '#444', fontWeight: '500' }}>Founded</div>
                    <div style={{ fontSize: '13.5px', color: '#0d1628', fontWeight: '700' }}>2014</div>
                  </div>
                </div>

                {/* Newsletter */}
                <div style={{ background: 'linear-gradient(135deg, #f0f4fd, #e8f0fe)', borderRadius: '10px', padding: '22px', border: '1px solid #d0dff8' }}>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#0d1628', marginBottom: '4px' }}>Stay Updated</div>
                  <div style={{ fontSize: '12.5px', color: '#556', marginBottom: '14px' }}>Get new articles and announcements in your inbox.</div>
                  <div className="flex gap-2">
                    <input type="email" placeholder="Enter your email address" className="flex-1 px-3.5 py-2.5 border border-slate-300 rounded-md text-sm outline-none focus:border-slate-400" />
                    <button style={{ background: '#1B2F6E', color: '#fff', border: 'none', padding: '10px 18px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', borderRadius: '5px', whiteSpace: 'nowrap' }} className="hover:opacity-90">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Indexed & Abstracted In */}
        <section className="py-12 border-t border-b" style={{ background: '#f5f7fc', borderTopColor: '#e0e8f2', borderBottomColor: '#e0e8f2' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-serif font-bold text-2xl text-slate-900 mb-1">Indexed & Abstracted In</h2>
              <p className="text-xs text-slate-500">Ensuring maximum visibility and accessibility of published research</p>
            </div>
            <div className="grid grid-cols-5 gap-3 w-full">
              {[
                { icon: Library, name: 'Google Scholar', bgColor: '#e8f0fe', iconColor: '#1a56d9' },
                { icon: Database, name: 'UGC Portal', bgColor: '#fff8e6', iconColor: '#b06800' },
                { icon: Link2, name: 'Crossref / DOI', bgColor: '#e6f5ec', iconColor: '#0d7c66' },
                { icon: BookMarked, name: 'EBSCO', bgColor: '#f0eafc', iconColor: '#6b4dc0' },
                { icon: FileText, name: 'DOAJ', bgColor: '#e0f5f5', iconColor: '#0a7c8c' },
                { icon: BarChart3, name: 'J-Gate', bgColor: '#fee8e8', iconColor: '#c0392b' },
                { icon: Globe, name: 'ResearchGate', bgColor: '#eef5e8', iconColor: '#0d7c66' },
                { icon: Users2, name: 'EuroPub', bgColor: '#e8eef5', iconColor: '#1a56d9' },
                { icon: GraduationCap, name: 'Academia.edu', bgColor: '#f5e8f5', iconColor: '#6b4dc0' },
                { icon: Map, name: 'ROAD', bgColor: '#f0f2f8', iconColor: '#555' }
              ].map((db, index) => (
                <div key={index} className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col items-center gap-3 hover:border-slate-300 hover:shadow-sm transition-all">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: db.bgColor }}>
                    <db.icon className="w-5 h-5" style={{ color: db.iconColor }} />
                  </div>
                  <span className="text-sm font-semibold text-slate-700 text-center">{db.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
