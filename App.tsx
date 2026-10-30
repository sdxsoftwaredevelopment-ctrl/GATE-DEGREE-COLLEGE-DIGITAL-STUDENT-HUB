import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Building2,
  CalendarDays,
  CheckCircle2,
  FileText,
  GraduationCap,
  Inbox,
  LayoutGrid,
  Link2,
  MapPin,
  Menu,
  MessageSquareText,
  Phone,
  School,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  X,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import FloatingContactButtons from './FloatingContactButtons';

type Course = {
  name: string;
  description: string;
  duration: string;
};

type Notice = {
  id: number;
  title: string;
  category: string;
  date: string;
  isImportant: boolean;
  description: string;
};

type ExamItem = {
  id: number;
  title: string;
  department: string;
  semester: string;
  subject: string;
  date: string;
  start: string;
  end: string;
  venue: string;
};

type Material = {
  id: number;
  title: string;
  department: string;
  semester: string;
  subject: string;
};

type Job = {
  id: number;
  company: string;
  title: string;
  location: string;
  eligibility: string;
  deadline: string;
  link: string;
};

type Scholarship = {
  id: number;
  name: string;
  eligibility: string;
  amount: string;
  deadline: string;
  link: string;
  expired: boolean;
};

type Department = {
  id: number;
  name: string;
  code: string;
  description: string;
};

type EventItem = {
  id: number;
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  description: string;
};

type GalleryItem = {
  id: number;
  title: string;
  category: string;
  image: string;
};

type FeedbackItem = {
  id: number;
  category: string;
  subject: string;
  message: string;
  author: string;
  status: string;
};

type ContactSettings = {
  phoneNumber: string;
  phoneEnabled: boolean;
  whatsappNumber: string;
  whatsappEnabled: boolean;
  email: string;
  landline: string;
  address: string;
  mapsUrl: string;
};

type LinkItem = {
  id: number;
  title: string;
  url: string;
  category: string;
};

const courseList: Course[] = [
  { name: 'B.Com Honours – Computer Applications', description: 'Business, accounting and digital systems for commerce-focused careers.', duration: '3 years' },
  { name: 'B.Sc Honours – Computer Science', description: 'Technology, programming and applied computing foundations for modern digital careers.', duration: '3 years' },
  { name: 'B.Sc Honours – Biotechnology', description: 'Life sciences blended with applied biotechnology research and practical learning.', duration: '3 years' },
  { name: 'BBA Honours – General', description: 'Business management, leadership and entrepreneurship insights for students.', duration: '3 years' },
  { name: 'BCA Honours – Artificial Intelligence', description: 'AI, machine learning and intelligent systems for future-ready digital roles.', duration: '3 years' },
  { name: 'BCA Honours – Data Science', description: 'Data analysis, decision-making and analytics focused on real-world insights.', duration: '3 years' },
];

const studentHubFeatures = [
  { title: 'College Notices', icon: FileText, href: '/student/notices' },
  { title: 'Exams & Assignments', icon: CalendarDays, href: '/student/exams' },
  { title: 'Study Materials', icon: BookOpen, href: '/student/materials' },
  { title: 'Placements & Jobs', icon: Briefcase, href: '/student/jobs' },
  { title: 'Scholarships', icon: Star, href: '/student/scholarships' },
  { title: 'Departments', icon: Building2, href: '/departments' },
  { title: 'Student Feedback', icon: MessageSquareText, href: '/feedback' },
  { title: 'Important Links', icon: Link2, href: '/important-links' },
  { title: 'Events', icon: CalendarDays, href: '/events' },
];

const notices: Notice[] = [
  { id: 1, title: 'Demo Notice', category: 'Academic', date: '2026-10-12', isImportant: true, description: 'Demo notice for student updates and event communication. This content is for demonstration only and should be replaced by verified college notices.' },
  { id: 2, title: 'Semester End Schedule', category: 'Exam', date: '2026-10-18', isImportant: false, description: 'Sample exam calendar placeholder. Official dates should be published by authorized college staff.' },
  { id: 3, title: 'Cultural Club Registration', category: 'Student Life', date: '2026-10-15', isImportant: false, description: 'Demo activity for the student digital hub only. Information will be updated by authorized college staff.' },
];

const exams: ExamItem[] = [
  { id: 1, title: 'Mid Semester Examination', department: 'Computer Science', semester: 'Semester 5', subject: 'Operating Systems', date: '2026-11-03', start: '09:30 AM', end: '11:30 AM', venue: 'Room 204' },
  { id: 2, title: 'Assignment Submission', department: 'BBA', semester: 'Semester 3', subject: 'Business Communication', date: '2026-11-08', start: '10:00 AM', end: '01:00 PM', venue: 'Seminar Hall' },
];

const materials: Material[] = [
  { id: 1, title: 'Data Structures Notes', department: 'Computer Science', semester: 'Semester 5', subject: 'Data Structures' },
  { id: 2, title: 'Financial Accounting Workbook', department: 'Commerce', semester: 'Semester 2', subject: 'Financial Accounting' },
];

const jobs: Job[] = [
  { id: 1, company: 'Demo Tech Partner', title: 'Junior Software Trainee', location: 'Hyderabad', eligibility: 'BCA / B.Sc Computer Science students', deadline: '2026-11-15', link: '#' },
  { id: 2, company: 'Sample Consulting', title: 'Business Analyst Intern', location: 'Remote', eligibility: 'Open to BBA and B.Com students', deadline: '2026-11-20', link: '#' },
];

const scholarships: Scholarship[] = [
  { id: 1, name: 'Merit Scholarship', eligibility: 'High academic achievers', amount: '₹10,000', deadline: '2026-10-20', link: '#', expired: false },
  { id: 2, name: 'Need Based Aid', eligibility: 'Economically disadvantaged students', amount: '₹5,000', deadline: '2026-09-15', link: '#', expired: true },
];

const departments: Department[] = [
  { id: 1, name: 'Computer Science', code: 'CS', description: 'Academic Programs focused on software, systems, AI and data-driven learning.' },
  { id: 2, name: 'Biotechnology', code: 'BT', description: 'Applied research and practical training in life sciences and biotechnology.' },
  { id: 3, name: 'Commerce', code: 'COM', description: 'Business and commerce education with practical exposure to finance and economics.' },
  { id: 4, name: 'Management', code: 'MBA', description: 'Leadership, entrepreneurship and organisational skills for future professionals.' },
];

const eventsList: EventItem[] = [
  { id: 1, title: 'Sample Workshop', category: 'Workshops', date: '2026-11-07', time: '10:00 AM', venue: 'Main Auditorium', description: 'Demo event content only. Replace with official college event details as approved.' },
  { id: 2, title: 'Campus Fest', category: 'Cultural', date: '2026-11-25', time: '09:00 AM', venue: 'College Grounds', description: 'Sample cultural event demonstration for the portal.' },
];

const galleryItems: GalleryItem[] = [
  { id: 1, title: 'Campus View', category: 'Campus', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80' },
  { id: 2, title: 'Workshop Session', category: 'Workshops', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80' },
  { id: 3, title: 'Student Activity', category: 'Student Activities', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80' },
  { id: 4, title: 'Sports Day', category: 'Sports', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80' },
];

const feedbackItems: FeedbackItem[] = [
  { id: 1, category: 'Academic', subject: 'Study Materials', message: 'Students would benefit from timely access to course-related resources.', author: 'Anonymous Student', status: 'Received' },
  { id: 2, category: 'Campus Life', subject: 'Event Scheduling', message: 'This is a sample student feedback card for demonstration purposes only.', author: 'Student', status: 'Reviewed' },
];

const importantLinks: LinkItem[] = [
  { id: 1, title: 'Official College Website', url: 'https://degree.gatetirupati.com/', category: 'Reference' },
  { id: 2, title: 'Student Portal', url: '#', category: 'Student Services' },
];

const socialLinks = [
  { platform: 'Instagram', title: 'Instagram', url: '#', icon: 'IG' },
  { platform: 'Facebook', title: 'Facebook', url: '#', icon: 'f' },
  { platform: 'YouTube', title: 'YouTube', url: '#', icon: '▶' },
];

const defaultContactSettings: ContactSettings = {
  phoneNumber: '+91 99892 94144',
  phoneEnabled: true,
  whatsappNumber: '919989294144',
  whatsappEnabled: false,
  email: 'gate.college@yahoo.com',
  landline: '0877-2286423',
  address: '6-2-86, Old Maternity Hospital Rd, Bhavani Nagar, Tirupati, Andhra Pradesh 517501',
  mapsUrl: 'https://maps.google.com/?q=6-2-86,+Old+Maternity+Hospital+Rd,+Bhavani+Nagar,+Tirupati,+Andhra+Pradesh+517501',
};

const adminSidebar = [
  'Dashboard',
  'Notices',
  'Exams',
  'Materials',
  'Jobs',
  'Scholarships',
  'Departments',
  'Events',
  'Gallery',
  'Feedback',
  'Important Links',
  'Social Links',
  'Contact Settings',
  'Settings',
  'Logout',
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [contactSettings] = useState<ContactSettings>(defaultContactSettings);

  const filteredNotices = useMemo(() => {
    return notices.filter((notice) => {
      const query = search.toLowerCase();
      return !query || notice.title.toLowerCase().includes(query) || notice.description.toLowerCase().includes(query);
    });
  }, [search]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <FloatingContactButtons settings={contactSettings} />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/student/notices" element={<NoticesPage search={search} setSearch={setSearch} filteredNotices={filteredNotices} />} />
          <Route path="/student/exams" element={<ExamsPage />} />
          <Route path="/student/materials" element={<MaterialsPage />} />
          <Route path="/student/jobs" element={<JobsPage />} />
          <Route path="/student/scholarships" element={<ScholarshipsPage />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/important-links" element={<ImportantLinksPage />} />
          <Route path="/contact" element={<ContactPage settings={contactSettings} />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/contact-settings" element={<AdminContactSettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

function Navbar({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (value: boolean) => void }) {
  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Courses', to: '/courses' },
    { label: 'Student Hub', to: '#', children: [
      { label: 'Notices', to: '/student/notices' },
      { label: 'Exams & Assignments', to: '/student/exams' },
      { label: 'Study Materials', to: '/student/materials' },
      { label: 'Placements & Jobs', to: '/student/jobs' },
      { label: 'Scholarships', to: '/student/scholarships' },
      { label: 'Departments', to: '/departments' },
      { label: 'Student Feedback', to: '/feedback' },
      { label: 'Important Links', to: '/important-links' },
    ] },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Events', to: '/events' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-lg font-bold text-white">G</div>
          <div>
            <div className="text-sm font-bold uppercase tracking-[0.2em] text-brand-700">GATE</div>
            <div className="text-xs text-slate-600">Digital Student Hub</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="group relative">
                <button className="flex items-center gap-1 text-sm font-medium text-slate-700 transition hover:text-brand-700">
                  {link.label}
                  <span className="text-xs">▾</span>
                </button>
                <div className="absolute left-0 top-full hidden min-w-[220px] rounded-xl border border-slate-200 bg-white p-3 shadow-soft group-hover:block">
                  {link.children.map((child) => (
                    <NavLink key={child.label} to={child.to} className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-brand-700">
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink key={link.label} to={link.to} className="text-sm font-medium text-slate-700 transition hover:text-brand-700">
                {link.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link to="/admin/login" className="rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-100">
            Admin Login
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg border border-slate-200 p-2 text-slate-700 lg:hidden"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-slate-200 bg-white lg:hidden"
          >
            <div className="mx-auto max-w-7xl space-y-2 px-4 py-4">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="rounded-lg border border-slate-200 p-3">
                    <div className="mb-2 text-sm font-semibold text-slate-700">{link.label}</div>
                    <div className="space-y-1">
                      {link.children.map((child) => (
                        <NavLink key={child.label} to={child.to} className="block rounded-md px-2 py-2 text-sm text-slate-700 hover:bg-slate-50" onClick={() => setMenuOpen(false)}>
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                ) : (
                  <NavLink key={link.label} to={link.to} className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50" onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </NavLink>
                ),
              )}
              <Link to="/admin/login" className="mt-3 block rounded-lg bg-brand-600 px-4 py-2 text-center text-sm font-semibold text-white" onClick={() => setMenuOpen(false)}>
                Admin Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-20 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 font-bold text-white">G</div>
            <div>
              <div className="text-lg font-bold text-white">GATE Digital Student Hub</div>
              <div className="text-sm text-slate-400">Student digital platform</div>
            </div>
          </div>
          <p className="max-w-md text-sm text-slate-300">A student-centred digital portal for academic information, resources, events and opportunities. This is not the official college website unless authorized by the management.</p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Quick Links</h3>
          <ul className="space-y-3 text-sm text-slate-300">
            {['Home', 'About', 'Courses', 'Student Hub', 'Gallery', 'Events', 'Contact'].map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Student Hub</h3>
          <ul className="space-y-3 text-sm text-slate-300">
            {['Notices', 'Exams', 'Materials', 'Jobs', 'Scholarships', 'Connect'].map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Contact</h3>
          <ul className="space-y-3 text-sm text-slate-300">
            <li>Phone: +91 99892 94144</li>
            <li>Email: gate.college@yahoo.com</li>
            <li>Address: Tirupati, Andhra Pradesh</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mb-8 max-w-2xl">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">{eyebrow}</p>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      <p className="mt-3 text-base text-slate-600">{description}</p>
    </div>
  );
}

function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-brand-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(58,157,255,0.38),transparent_40%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="flex flex-col justify-center">
            <span className="mb-4 inline-flex w-fit rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-sky-200">GATE Degree College, Tirupati</span>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">Learn. Grow. Achieve.</h1>
            <p className="mt-6 max-w-xl text-lg text-slate-200">Your digital gateway to academic information, opportunities, events and student resources.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/courses" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200">Explore Courses <ArrowRight size={16} /></Link>
              <Link to="/student/notices" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">Student Hub</Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-200">
              <div className="flex items-center gap-2"><CheckCircle2 className="text-emerald-300" size={18} /> Student friendly</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="text-emerald-300" size={18} /> Verified public information</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="text-emerald-300" size={18} /> Modern portal</div>
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="show" variants={fadeUp} className="flex items-center justify-center">
            <div className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-soft">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"
                alt="Academic campus"
                className="h-[520px] w-full rounded-[1.5rem] object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Why students choose us" title="A trusted campus experience" description="Accessible information, guided support and a digital-first model for learning and engagement." />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: School, title: 'Academic Guidance', description: 'Clear access to notices, exams, resources and academic links in one place.' },
            { icon: Users, title: 'Student Support', description: 'Structured updates and community-friendly tools for student engagement.' },
            { icon: ShieldCheck, title: 'Verified Information', description: 'Public college information and official contact references remain carefully managed.' },
          ].map((feature) => (
            <motion.div key={feature.title} whileHover={{ y: -4 }} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700"><feature.icon size={22} /></div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Student Hub" title="Essential campus services" description="Everything students need is grouped into focused sections for faster access and improved visibility." />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {studentHubFeatures.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.title} to={item.href} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:border-brand-200 hover:bg-brand-50">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700"><Icon size={20} /></div>
                    <ArrowRight size={18} className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-brand-700" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="About the college" title="Academic excellence with a student-first focus" description="GATE Degree College, Tirupati is a learning environment shaped around discipline, growth and opportunity." />
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6 text-slate-700">
          <p>The institution is dedicated to nurturing students through quality education, practical learning and campus experiences that prepare them for life beyond the classroom.</p>
          <p>Public information is referenced only from the official college website and is used responsibly to keep the portal relevant without presenting it as an official website unless authorized.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: 'Vision', body: 'To create confident, capable graduates ready for professional and personal growth.' },
              { title: 'Mission', body: 'To deliver quality education, skill development and responsible community engagement.' },
              { title: 'Student Development', body: 'Promote student participation, confidence and readiness for future challenges.' },
              { title: 'Skill Development', body: 'Encourage practical learning, digital literacy and career-building experiences.' },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
                <h3 className="mb-2 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-soft">
          <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80" alt="Students in a college setting" className="h-full min-h-[420px] w-full rounded-2xl object-cover" />
        </div>
      </div>
    </main>
  );
}

function CoursesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Courses" title="Academic programs" description="Officially listed course names are presented here for student information and easy discovery." />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {courseList.map((course) => (
          <motion.article key={course.name} whileHover={{ y: -4 }} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Program</span>
              <span className="text-sm text-slate-500">{course.duration}</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900">{course.name}</h3>
            <p className="mt-3 text-slate-600">{course.description}</p>
            <button className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">Learn More <ArrowRight size={16} /></button>
          </motion.article>
        ))}
      </div>
    </main>
  );
}

function NoticesPage({ search, setSearch, filteredNotices }: { search: string; setSearch: (value: string) => void; filteredNotices: Notice[] }) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="College Notices" title="Latest updates" description="Search and review notices using categories and dates. Demo entries are clearly labelled for demonstration purposes only." />
      <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none ring-0 transition focus:border-brand-300 focus:bg-white" placeholder="Search notices" aria-label="Search notices" />
        </div>
        <div className="flex gap-2 text-xs font-medium text-slate-600">
          <span className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-700">Important</span>
          <span className="rounded-full bg-brand-50 px-2.5 py-1 text-brand-700">Academic</span>
        </div>
      </div>
      <div className="space-y-4">
        {filteredNotices.map((notice) => (
          <article key={notice.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  {notice.isImportant && <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-red-700">Important</span>}
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">{notice.category}</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{notice.title}</h3>
              </div>
              <span className="text-sm text-slate-500">{notice.date}</span>
            </div>
            <p className="mt-4 text-slate-600">{notice.description}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">View Details</button>
              <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Download PDF</button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

function ExamsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Exams & Assignments" title="Academic schedule" description="Examination and assignment information should be published only when officially confirmed by the department." />
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th className="px-4 py-3 font-semibold">Title</th>
              <th className="px-4 py-3 font-semibold">Department</th>
              <th className="px-4 py-3 font-semibold">Semester</th>
              <th className="px-4 py-3 font-semibold">Subject</th>
              <th className="px-4 py-3 font-semibold">Date</th>
              <th className="px-4 py-3 font-semibold">Venue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-600">
            {exams.map((exam) => (
              <tr key={exam.id}>
                <td className="px-4 py-4 font-medium text-slate-900">{exam.title}</td>
                <td className="px-4 py-4">{exam.department}</td>
                <td className="px-4 py-4">{exam.semester}</td>
                <td className="px-4 py-4">{exam.subject}</td>
                <td className="px-4 py-4">{exam.date}</td>
                <td className="px-4 py-4">{exam.venue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

function MaterialsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Study Materials" title="Course resources" description="Materials and support content can be uploaded using Supabase Storage with PDF validation and access controls." />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {materials.map((material) => (
          <div key={material.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700"><FileText size={20} /></div>
            <h3 className="text-lg font-semibold text-slate-900">{material.title}</h3>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <p>Department: {material.department}</p>
              <p>Semester: {material.semester}</p>
              <p>Subject: {material.subject}</p>
            </div>
            <div className="mt-5 flex gap-3">
              <button className="rounded-full bg-brand-600 px-3 py-2 text-sm font-semibold text-white">View</button>
              <button className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700">Download</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

function JobsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Placements & Jobs" title="Career opportunities" description="Only verified opportunities should be published in this section. Sample entries are clearly marked as demo data." />
      <div className="space-y-5">
        {jobs.map((job) => (
          <div key={job.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">{job.company}</p>
                <h3 className="mt-2 text-2xl font-bold text-slate-900">{job.title}</h3>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">{job.location}</span>
            </div>
            <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
              <div><span className="font-semibold text-slate-900">Eligibility:</span> {job.eligibility}</div>
              <div><span className="font-semibold text-slate-900">Deadline:</span> {job.deadline}</div>
              <div><span className="font-semibold text-slate-900">Type:</span> Internship / Placement</div>
            </div>
            <a href={job.link} className="mt-5 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">Apply Now</a>
          </div>
        ))}
      </div>
    </main>
  );
}

function ScholarshipsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Scholarships" title="Financial support" description="Expired scholarships are visually distinguished to help students quickly identify current opportunities." />
      <div className="space-y-5">
        {scholarships.map((scholarship) => (
          <div key={scholarship.id} className={`rounded-2xl border p-6 shadow-soft ${scholarship.expired ? 'border-slate-200 bg-slate-100 opacity-75' : 'border-slate-200 bg-white'}`}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">{scholarship.name}</h3>
                <p className="mt-2 text-slate-600">{scholarship.eligibility}</p>
              </div>
              {scholarship.expired && <span className="rounded-full bg-slate-500 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">Expired</span>}
            </div>
            <div className="mt-4 flex flex-wrap gap-6 text-sm text-slate-600">
              <div><span className="font-semibold text-slate-900">Amount:</span> {scholarship.amount}</div>
              <div><span className="font-semibold text-slate-900">Deadline:</span> {scholarship.deadline}</div>
            </div>
            <a href={scholarship.link} className="mt-5 inline-flex rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">Apply</a>
          </div>
        ))}
      </div>
    </main>
  );
}

function DepartmentsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Departments" title="Academic departments" description="Public department information is shown here without exposing private faculty details." />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {departments.map((department) => (
          <div key={department.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 font-bold">{department.code}</div>
            <h3 className="text-xl font-semibold text-slate-900">{department.name}</h3>
            <p className="mt-3 text-sm text-slate-600">{department.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

function GalleryPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Gallery" title="Campus memories" description="Responsive gallery with category filters and lightbox concept for browsing official approved campus media." />
      <div className="mb-8 flex flex-wrap gap-3 text-sm">
        {['Campus', 'Workshops', 'Cultural', 'Sports', 'Student Activities', 'Placement Events'].map((category) => (
          <button key={category} className="rounded-full border border-slate-200 bg-white px-4 py-2 font-medium text-slate-700 hover:border-brand-200 hover:text-brand-700">{category}</button>
        ))}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {galleryItems.map((item) => (
          <div key={item.id} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
            <img src={item.image} alt={item.title} className="h-72 w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
            <div className="p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">{item.category}</div>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

function EventsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Events" title="Campus events and activities" description="Events are grouped by category and updated when authorized information is available." />
      <div className="space-y-5">
        {eventsList.map((event) => (
          <div key={event.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-700">{event.category}</span>
                <h3 className="mt-3 text-2xl font-bold text-slate-900">{event.title}</h3>
              </div>
              <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Register</button>
            </div>
            <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
              <div><span className="font-semibold text-slate-900">Date:</span> {event.date}</div>
              <div><span className="font-semibold text-slate-900">Time:</span> {event.time}</div>
              <div><span className="font-semibold text-slate-900">Venue:</span> {event.venue}</div>
            </div>
            <p className="mt-4 text-slate-600">{event.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

function FeedbackPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Student Feedback" title="Share your voice" description="Public feedback is shown for demonstrative needs. The system should support student submissions while keeping private feedback protected." />
      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
        <form className="grid gap-5 md:grid-cols-2">
          <input className="rounded-xl border border-slate-200 px-4 py-3 text-sm" placeholder="Category" aria-label="Feedback category" />
          <input className="rounded-xl border border-slate-200 px-4 py-3 text-sm" placeholder="Subject" aria-label="Feedback subject" />
          <textarea className="md:col-span-2 min-h-[120px] rounded-xl border border-slate-200 px-4 py-3 text-sm" placeholder="Describe your feedback" aria-label="Feedback message" />
          <button type="button" className="md:col-span-2 inline-flex w-fit rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700">Submit Feedback</button>
        </form>
      </div>

      <div className="space-y-4">
        {feedbackItems.map((item) => (
          <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-700">{item.category}</span>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">{item.subject}</h3>
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{item.status}</span>
            </div>
            <p className="mt-4 text-slate-600">{item.message}</p>
            <p className="mt-3 text-sm font-medium text-slate-500">{item.author}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

function ImportantLinksPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Important Links" title="Useful references" description="Important links are displayed in a simple and accessible format that supports quick navigation." />
      <div className="grid gap-5 md:grid-cols-2">
        {importantLinks.map((link) => (
          <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition hover:border-brand-200 hover:bg-brand-50">
            <div className="mb-2 inline-flex rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-700">{link.category}</div>
            <h3 className="text-xl font-semibold text-slate-900">{link.title}</h3>
          </a>
        ))}
      </div>
    </main>
  );
}

function ContactPage({ settings }: { settings: ContactSettings }) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Contact" title="Reach out to GATE" description="Official contact details are displayed with clear actions for calling, emailing or locating the college." />
      <div className="grid gap-6 lg:grid-cols-3">
        {[
          { icon: Phone, title: 'Call', value: settings.phoneNumber, action: `tel:${settings.phoneNumber.replace(/\D/g, '')}` },
          { icon: Inbox, title: 'Email', value: settings.email, action: `mailto:${settings.email}` },
          { icon: MapPin, title: 'Location', value: settings.address, action: settings.mapsUrl },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700"><item.icon size={20} /></div>
            <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-4 text-slate-600">{item.value}</p>
            {item.title === 'Location' ? (
              <a href={item.action} target="_blank" rel="noreferrer" className="mt-5 inline-flex rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white">Get Directions</a>
            ) : (
              <a href={item.action} className="mt-5 inline-flex rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white">{item.title === 'Call' ? 'Call Now' : 'Email Us'}</a>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
        <iframe
          className="h-[420px] w-full border-0"
          title="College map"
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps?q=6-2-86%20Old%20Maternity%20Hospital%20Rd%2C%20Bhavani%20Nagar%2C%20Tirupati%2C%20Andhra%20Pradesh%20517501&output=embed"
        />
      </div>
    </main>
  );
}

function AdminLoginPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft lg:grid-cols-2">
        <div className="bg-gradient-to-br from-brand-700 to-brand-900 p-8 text-white">
          <h2 className="text-3xl font-bold">Admin Access</h2>
          <p className="mt-4 text-sky-100">Secure sign-in for authorized staff and administrators to manage student communications and content.</p>
        </div>
        <div className="p-8">
          <h3 className="text-2xl font-bold text-slate-900">Login</h3>
          <div className="mt-6 space-y-4">
            <input className="w-full rounded-xl border border-slate-200 px-4 py-3" placeholder="Email" aria-label="Email" />
            <input className="w-full rounded-xl border border-slate-200 px-4 py-3" type="password" placeholder="Password" aria-label="Password" />
            <Link to="/admin/dashboard" className="inline-flex rounded-full bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700">Sign In</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function AdminDashboardPage() {
  const stats = [
    { label: 'Total Notices', value: '18' },
    { label: 'Total Exams', value: '12' },
    { label: 'Total Materials', value: '26' },
    { label: 'Total Jobs', value: '8' },
    { label: 'Total Scholarships', value: '5' },
    { label: 'Total Events', value: '9' },
    { label: 'Total Gallery Images', value: '42' },
    { label: 'Total Feedback', value: '37' },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Admin Dashboard</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Overview</h1>
        </div>
        <Link to="/admin/contact-settings" className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white">Contact Settings</Link>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
            <div className="text-sm text-slate-500">{stat.label}</div>
            <div className="mt-3 text-3xl font-bold text-slate-900">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
        <h2 className="text-xl font-semibold text-slate-900">Admin sidebar</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {adminSidebar.map((item) => (
            <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">{item}</div>
          ))}
        </div>
      </div>
    </main>
  );
}

function AdminContactSettingsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Contact Settings" title="Manage public contact settings" description="This allows administrators to safely control the floating phone and WhatsApp buttons without hard-coding a number in multiple components." />
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
        <div className="grid gap-5 md:grid-cols-2">
          <input className="rounded-xl border border-slate-200 px-4 py-3" placeholder="Official phone" defaultValue="+91 99892 94144" />
          <input className="rounded-xl border border-slate-200 px-4 py-3" placeholder="WhatsApp-enabled phone" defaultValue="919989294144" />
          <input className="rounded-xl border border-slate-200 px-4 py-3" placeholder="Landline" defaultValue="0877-2286423" />
          <input className="rounded-xl border border-slate-200 px-4 py-3" placeholder="Email" defaultValue="gate.college@yahoo.com" />
          <textarea className="md:col-span-2 min-h-[110px] rounded-xl border border-slate-200 px-4 py-3" placeholder="Address" defaultValue="6-2-86, Old Maternity Hospital Rd, Bhavani Nagar, Tirupati, Andhra Pradesh 517501" />
          <input className="md:col-span-2 rounded-xl border border-slate-200 px-4 py-3" placeholder="Google Maps URL" defaultValue="https://maps.google.com/?q=..." />
          <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700"><input type="checkbox" checked readOnly /> WhatsApp enabled</label>
          <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700"><input type="checkbox" checked readOnly /> Phone button enabled</label>
        </div>
        <button className="mt-6 inline-flex rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700">Save Settings</button>
      </div>
    </main>
  );
}

function NotFoundPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 text-center">
      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-soft">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-700"><LayoutGrid size={28} /></div>
        <h1 className="text-4xl font-bold text-slate-900">Page not found</h1>
        <p className="mt-3 text-slate-600">The page you are looking for could not be located. Use the navigation to continue.</p>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white">Back to Home</Link>
      </div>
    </main>
  );
}

export default App;
