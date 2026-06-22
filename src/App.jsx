import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Palette,
  Database,
  User,
  Briefcase,
  Send,
  Menu,
  X,
  Sun,
  Moon,
  Download,
  GraduationCap,
  Award,
  Phone,
  Layers,
  Sparkles,
  TrendingUp,
  BarChart3,
  Monitor,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');

  // Interactive Stepper State
  const [activeStep, setActiveStep] = useState(0);

  // Interactive Dashboard State
  const [dashboardTimeframe, setDashboardTimeframe] = useState('Weekly');
  const [hoveredPoint, setHoveredPoint] = useState(null);

  useEffect(() => {
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    // Save theme preference and apply to document
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['home', 'about', 'process', 'skills', 'dashboard', 'projects', 'education', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // height of fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Rohit-Kumar-Resume.pdf';
    link.download = 'Rohit-Kumar-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
      return;
    }

    try {
      // Using Web3Forms to send email directly to inbox
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '83a39a42-0aa6-4294-9160-df351ae2f702',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact from ${formData.name}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  // Modern Full-Stack, Backend, UI/UX & Data Skills list
  const skillsCategories = [
    {
      title: 'Full-Stack & Backend (Node)',
      description: 'Building secure, debugged REST APIs and databases',
      skills: [
        { name: 'Node.js & Express.js', level: 88 },
        { name: 'MongoDB & Mongoose ODM', level: 85 },
        { name: 'REST APIs & JWT Security', level: 90 },
        { name: 'Socket.io (WebSockets)', level: 80 },
        { name: 'System Debugging & Testing', level: 92 },
        { name: 'Git & Version Control', level: 88 }
      ]
    },
    {
      title: 'Product & UI/UX Design',
      description: 'Designing user journeys, design systems, and responsive wireframes',
      skills: [
        { name: 'Figma & Adobe XD', level: 90 },
        { name: 'Wireframing & Prototyping', level: 95 },
        { name: 'User Research & Personas', level: 85 },
        { name: 'Design Systems & UI Kits', level: 90 },
        { name: 'Information Architecture', level: 88 },
        { name: 'Usability Testing', level: 85 }
      ]
    },
    {
      title: 'Data Analysis & Python',
      description: 'Parsing datasets and designing business intelligence reports',
      skills: [
        { name: 'Python (Pandas, NumPy)', level: 82 },
        { name: 'Power BI Dashboards', level: 90 },
        { name: 'SQL Query Optimization', level: 85 },
        { name: 'Data Visualization & Charts', level: 88 },
        { name: 'Machine Learning (LightGBM)', level: 75 },
        { name: 'Excel & Data Cleaning', level: 88 }
      ]
    }
  ];

  // Design Process Stepper Data
  const designSteps = [
    {
      title: '01. Empathize & Research',
      subtitle: 'Understanding User Pain-points',
      description: 'Deep diving into user environments via surveys, interviews, and competitive audits. This ensures product designs solve verified user problems rather than relying on design assumptions.',
      methods: ['User Surveys', 'Empathy Maps', 'Persona Building', 'Market Audits'],
      accent: 'from-blue-500 to-indigo-500',
      icon: <User className="w-6 h-6" />
    },
    {
      title: '02. Define & Structure',
      subtitle: 'Mapping Information Architecture',
      description: 'Framing problem statements and mapping product layouts. Organising pages logically guarantees users find what they need intuitively in under three clicks.',
      methods: ['User Flows', 'Information Architecture', 'Card Sorting', 'Sitemaps'],
      accent: 'from-indigo-500 to-purple-500',
      icon: <Layers className="w-6 h-6" />
    },
    {
      title: '03. Ideate & Wireframe',
      subtitle: 'Creating Interface Blueprints',
      description: 'Sketching rapid layouts and building mid-fidelity digital wireframes. Early alignment on layouts speeds up prototyping and helps test navigation flow.',
      methods: ['Paper Sketches', 'Lo-Fi Wireframes', 'Grid Layouts', 'Rapid Iterations'],
      accent: 'from-purple-500 to-pink-500',
      icon: <Palette className="w-6 h-6" />
    },
    {
      title: '04. High-Fidelity UI Design',
      subtitle: 'High-Fidelity Visual Prototypes',
      description: 'Designing polished screens in Figma. Building strict design systems with clean typography scales, accessible HSL palettes, and fluid component libraries for high-end feel.',
      methods: ['Figma Prototypes', 'Design Systems', 'WCAG Accessibility', 'Micro-interactions'],
      accent: 'from-pink-500 to-red-500',
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      title: '05. Develop & Validate',
      subtitle: 'Frontend Code & Data Analytics',
      description: 'Engineering responsive frontends in React and Tailwind CSS. Setting up tracking schemas to analyze usability metrics, user behavior, and bounce rates for iterative optimization.',
      methods: ['React / TypeScript', 'Tailwind CSS', 'Performance Tuning', 'Analytics Audits'],
      accent: 'from-red-500 to-orange-500',
      icon: <Code className="w-6 h-6" />
    }
  ];

  // Dashboard Visualizations Data
  const dashboardData = {
    Daily: [
      { label: 'Mon', value: 120, sentiment: 94 },
      { label: 'Tue', value: 150, sentiment: 95 },
      { label: 'Wed', value: 180, sentiment: 97 },
      { label: 'Thu', value: 140, sentiment: 96 },
      { label: 'Fri', value: 210, sentiment: 98 },
      { label: 'Sat', value: 250, sentiment: 99 },
      { label: 'Sun', value: 230, sentiment: 98 },
    ],
    Weekly: [
      { label: 'Week 1', value: 1200, sentiment: 94.2 },
      { label: 'Week 2', value: 1540, sentiment: 95.8 },
      { label: 'Week 3', value: 1980, sentiment: 97.5 },
      { label: 'Week 4', value: 2210, sentiment: 98.4 },
    ],
    Monthly: [
      { label: 'Jan', value: 4500, sentiment: 91.5 },
      { label: 'Feb', value: 5200, sentiment: 93.2 },
      { label: 'Mar', value: 6100, sentiment: 94.8 },
      { label: 'Apr', value: 7400, sentiment: 96.1 },
      { label: 'May', value: 8900, sentiment: 97.7 },
      { label: 'Jun', value: 10400, sentiment: 98.4 },
    ]
  };

  // Reframe projects to focus heavily on UI/UX, Product Design, and Data Analysis
  const projects = [
    {
      title: 'AI/ML Food Delivery & Logistics Platform',
      role: 'MCA Capstone (Final Year Project)',
      description: 'Designed and architected the backend API, JWT security layer, and database models for a decoupled microservices platform. Integrates a React Native mobile client, an Express API, and a Python Flask ML microservice (using LightGBM) to forecast kitchen inventory demand and dispatch drivers.',
      image: 'https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['Final Project', 'Node.js', 'Express', 'Python (Flask)', 'MongoDB', 'React Native', 'LightGBM'],
      link: 'https://github.com/Rohitsng01/Final_Project',
      liveLink: '#',
      designHighlights: ['Decoupled microservice architecture', 'JWT security & RBAC authentication', 'Stripe payment integration flows', 'LightGBM model metrics forecasting']
    },
    {
      title: 'Uber Ride-Sharing & Geolocation App',
      role: 'Full-Stack Developer & Interaction Designer',
      description: 'Developed a full-stack taxi-booking application clone. Mapped out user booking paths and driver profiles, built a React frontend using responsive mobile-first grids, engineered a Node.js socket server for real-time geolocation tracking, and integrated Google Maps Autocomplete and Distance Matrix API.',
      image: 'https://images.pexels.com/photos/4606346/pexels-photo-4606346.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['Uber Project', 'React.js', 'Node.js', 'Express', 'Socket.io', 'Google Maps API', 'MongoDB'],
      link: 'https://github.com/Rohitsng01',
      liveLink: '#',
      designHighlights: ['Real-time geolocation map tracking', 'Vite & Tailwind frontend design', 'Google Maps Autocomplete forms', 'Socket.io event state synchronization']
    },
    {
      title: 'Signal - AI Sentiment & Data Dashboard',
      role: 'Lead UI/UX & Data Engineer',
      description: 'Designed and engineered an end-to-end data analytics application. Conducted competitive user audits, built interactive layout prototypes in Figma, and implemented a sleek glassmorphic React interface featuring dynamic SVG charts to track sentiment indicators from data streams.',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['UI/UX Design', 'React.js', 'Python', 'Tailwind CSS', 'Data Visualization', 'NLP'],
      link: 'https://github.com/Rohitsng01/sentiment-dashboard',
      liveLink: '#',
      designHighlights: ['Interactive SVG chart library', 'User personas & task flows', 'Figma layout system', 'Sleek data-filtering UI']
    },
    {
      title: 'JARVIS AI Assistant',
      role: 'Conversational UX & Frontend Developer',
      description: 'An accessibility-first voice assistant. Designed screen-reader compatible layouts and high-feedback chat panels. Implemented speech processing algorithms to process user commands, presenting real-time system responses via dynamic wave animations.',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['Conversational UI', 'React.js', 'Web Speech API', 'Tailwind CSS', 'Vercel'],
      link: 'https://github.com/Rohitsng01/Ai-Assistant',
      liveLink: 'https://ai-assistant-lovat-omega.vercel.app/',
      designHighlights: ['Accessibility layout compliance', 'Voice waveform state designs', 'Intuitive non-verbal status cues']
    },
    {
      title: 'Bar Mocha Coffee Shop System',
      role: 'Product Designer & Frontend Developer',
      description: 'A responsive order management panel designed to minimize ordering friction. Conducted usability audits to design an optimized ordering flow, reducing checkout steps by 40% using intuitive state updates and visual cards.',
      image: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['React.js', 'Responsive UX', 'CSS Grid', 'Vercel'],
      link: 'https://github.com/Rohitsng01/bar',
      liveLink: 'https://bar-mocha.vercel.app/',
      designHighlights: ['Frictionless 3-step checkout', 'Mobile-first layout grid', 'Micro-interactions for order edits']
    },
    {
      title: 'AI Chatbot Application',
      role: 'UI/UX & API Integrator',
      description: 'A minimalist chatbot interface leveraging Gemini API. Created a gorgeous dark theme visual architecture, emphasizing conversational bubble typography, smooth chat-scrolling physics, and typing status visual indicators.',
      image: 'https://d1y41eupgbwbb2.cloudfront.net/images/blog/top-ai-chatbot-development-companies.webp',
      tech: ['React.js', 'JavaScript', 'Gemini API', 'Tailwind CSS'],
      link: 'https://github.com/Rohitsng01/Chat_Bot',
      liveLink: 'https://chat-bot-five-gules.vercel.app/',
      designHighlights: ['Fluid typing status indicators', 'Highly readable font scale', 'Contrast-compliant dark UI']
    },
    {
      title: 'Web Music Player',
      role: 'Interface Designer & Frontend Developer',
      description: 'A sleek audio streaming dashboard utilizing modern glassmorphism. Designed matching visual themes based on active album arts, featuring an interactive audio progress slider and responsive playlists cached locally.',
      image: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['React.js', 'HTML5 Audio', 'Local Storage', 'Glassmorphism'],
      link: 'https://github.com/Rohitsng01/CodeAlpha_age_calculator',
      liveLink: 'https://music-player-lilac-ten.vercel.app/',
      designHighlights: ['Glassmorphic navigation panel', 'Smooth volume & tracking dials', 'Album color-bleed backdrop effects']
    }
  ];

  // Helper for generating SVG coordinates for the dashboard line chart
  const getSvgCoordinates = (data) => {
    if (!data.length) return '';
    const maxVal = Math.max(...data.map(d => d.value));
    const minVal = Math.min(...data.map(d => d.value)) * 0.9;
    const valRange = maxVal - minVal || 1;
    const width = 500;
    const height = 140;

    const points = data.map((d, index) => {
      const x = (index / (data.length - 1)) * (width - 40) + 20;
      const y = height - ((d.value - minVal) / valRange) * (height - 30) - 15;
      return { x, y };
    });

    // Generate line path (M = Move to, L = Line to)
    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    
    // Generate area path that closes at bottom of chart
    const areaPath = `${linePath} L ${points[points.length - 1].x} 140 L ${points[0].x} 140 Z`;

    return { linePath, areaPath, points };
  };

  const currentChartData = dashboardData[dashboardTimeframe];
  const { linePath, areaPath, points } = getSvgCoordinates(currentChartData);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode
      ? 'bg-[#0f172a] text-slate-100'
      : 'bg-slate-50 text-slate-900'
      }`}>
      
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none z-0 h-[1000px]">
        <div className="absolute top-[-200px] left-[10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] animate-pulse-slow"></div>
        <div className="absolute top-[300px] right-[10%] w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[130px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? isDarkMode
          ? 'bg-slate-950/85 backdrop-blur-md shadow-lg border-b border-white/5'
          : 'bg-white/85 backdrop-blur-md shadow-md border-b border-black/5'
        : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <button 
              onClick={() => scrollToSection('home')} 
              className={`font-extrabold text-2xl bg-gradient-to-r ${isDarkMode
                ? 'from-blue-400 via-purple-400 to-pink-400'
                : 'from-blue-600 via-purple-600 to-pink-600'
                } bg-clip-text text-transparent`}
            >
              Rohit Kumar
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'process', label: 'Process' },
                { id: 'skills', label: 'Skills' },
                { id: 'dashboard', label: 'Dashboard' },
                { id: 'projects', label: 'Projects' },
                { id: 'education', label: 'Education' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 relative ${activeSection === item.id
                    ? isDarkMode
                      ? 'text-purple-400'
                      : 'text-purple-600'
                    : isDarkMode
                      ? 'text-slate-400 hover:text-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className={`absolute bottom-[-2px] left-3 right-3 h-[2px] rounded-full ${isDarkMode ? 'bg-purple-500' : 'bg-purple-600'}`}></span>
                  )}
                </button>
              ))}

              <div className="h-6 w-[1px] bg-slate-700/30 dark:bg-white/10 mx-2"></div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2.5 rounded-xl border transition-all duration-200 ${isDarkMode
                  ? 'text-yellow-400 border-white/10 bg-slate-900 hover:bg-slate-800'
                  : 'text-purple-600 border-slate-200 bg-white hover:bg-slate-100'
                  }`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Resume Download */}
              <button
                onClick={downloadResume}
                className={`px-4 py-2.5 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 ${isDarkMode
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-purple-500/15 hover:shadow-purple-500/25'
                  : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-purple-500/10 hover:shadow-purple-500/20'
                  } transform hover:translate-y-[-2px] shadow-lg`}
              >
                <Download className="w-4 h-4" />
                <span>Resume</span>
              </button>
            </div>

            {/* Mobile menu and theme toggle */}
            <div className="lg:hidden flex items-center space-x-3">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg border transition-colors ${isDarkMode
                  ? 'text-yellow-400 border-white/10 bg-slate-900'
                  : 'text-purple-600 border-slate-200 bg-white'
                  }`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-lg border transition-colors ${isDarkMode
                  ? 'text-slate-400 border-white/10 hover:text-white bg-slate-900'
                  : 'text-slate-600 border-slate-200 hover:text-slate-900 bg-white'
                  }`}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {isMenuOpen && (
          <div className={`lg:hidden border-b transition-all duration-200 ${isDarkMode
            ? 'bg-slate-950/95 border-white/5 backdrop-blur-lg'
            : 'bg-white/95 border-slate-200 backdrop-blur-lg'
            }`}>
            <div className="px-2 pt-2 pb-6 space-y-2">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'process', label: 'Design Process' },
                { id: 'skills', label: 'Skills' },
                { id: 'dashboard', label: 'Analytics Dashboard' },
                { id: 'projects', label: 'Projects' },
                { id: 'education', label: 'Education' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block px-4 py-3 text-base font-semibold rounded-lg w-full text-left transition-colors ${activeSection === item.id
                    ? isDarkMode
                      ? 'text-purple-400 bg-slate-900'
                      : 'text-purple-600 bg-slate-100'
                    : isDarkMode
                      ? 'text-slate-300 hover:bg-slate-900'
                      : 'text-slate-700 hover:bg-slate-100'
                    }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-4 border-t border-slate-700/20 dark:border-white/5">
                <button
                  onClick={downloadResume}
                  className="w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col justify-between relative overflow-hidden pt-28 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center relative z-10 flex-1 flex flex-col justify-center items-center">
          <div className="animate-fade-in-up">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 mb-6 font-semibold text-sm backdrop-blur-md shadow-lg shadow-purple-500/5">
              <Sparkles className="w-4 h-4" />
              <span>Available for Full-Stack, Product Design & Data Roles</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black mb-8 leading-none tracking-tight">
              <span className={`bg-gradient-to-r ${isDarkMode
                ? 'from-blue-400 via-indigo-400 via-purple-400 to-pink-400'
                : 'from-blue-600 via-indigo-600 via-purple-600 to-pink-600'
                } bg-clip-text text-transparent`}>
                Rohit Kumar
              </span>
            </h1>

            <p className="text-xl md:text-3xl font-extrabold mb-4 tracking-tight">
              Full-Stack Developer • Product Designer • Data Analyst
            </p>
            
            <p className={`text-base md:text-lg mb-10 max-w-3xl mx-auto font-medium leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Engineering robust Node.js backend environments and writing clean, highly debugged full-stack code. Crafting interactive product designs in Figma and building Python & Power BI data dashboards for actionable insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => scrollToSection('projects')}
                className="w-full sm:w-auto px-8 py-4.5 rounded-full font-bold text-white transition-all duration-300 shadow-lg transform hover:translate-y-[-2px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-purple-500/20 hover:shadow-purple-500/35"
              >
                Explore Case Studies
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`w-full sm:w-auto px-8 py-4.5 border-2 rounded-full font-bold transition-all duration-300 transform hover:translate-y-[-2px] ${isDarkMode
                  ? 'border-white/10 hover:border-white/20 bg-slate-900/50 hover:bg-slate-800/50 text-white'
                  : 'border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>

        {/* Floating Product Design Wireframe Mockup Canvas */}
        <div className="relative mx-auto mt-4 w-[85%] max-w-[850px] aspect-[16/7] rounded-t-2xl border-x border-t border-white/10 bg-slate-950/80 backdrop-blur-xl shadow-2xl p-4 hidden md:flex flex-col z-10 overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-slate-500 font-semibold pl-2">figma_design_canvas.fig</span>
            </div>
            <div className="flex items-center space-x-3 text-xs text-slate-500">
              <span className="px-2 py-0.5 rounded bg-white/5">85% Zoom</span>
              <span className="font-semibold text-purple-400">Desktop Frame</span>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-12 gap-4">
            {/* Figma Left Sidebar Mock */}
            <div className="col-span-3 border-r border-white/5 pr-3 hidden lg:block space-y-3">
              <div className="h-4 bg-white/5 rounded w-3/4"></div>
              <div className="h-3 bg-white/5 rounded w-1/2"></div>
              <div className="space-y-1.5 pt-2">
                <div className="h-3 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded px-1.5 py-0.5 text-[9px] font-semibold flex items-center"><Layers className="w-2.5 h-2.5 mr-1" /> HeroSection</div>
                <div className="h-3 bg-white/5 rounded w-4/5"></div>
                <div className="h-3 bg-white/5 rounded w-3/4"></div>
                <div className="h-3 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded px-1.5 py-0.5 text-[9px] font-semibold flex items-center"><Layers className="w-2.5 h-2.5 mr-1" /> AnalyticsDashboard</div>
                <div className="h-3 bg-white/5 rounded w-2/3"></div>
              </div>
            </div>
            {/* Figma Artboard Content Mock */}
            <div className="col-span-12 lg:col-span-9 flex flex-col justify-between">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl border border-white/5 bg-white/5 space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400"><Monitor className="w-4 h-4" /></div>
                  <div className="h-4 bg-white/10 rounded w-4/5"></div>
                  <div className="h-2 bg-white/5 rounded w-3/4"></div>
                </div>
                <div className="p-3 rounded-xl border border-purple-500/20 bg-purple-500/5 space-y-2 relative">
                  <span className="absolute top-1 right-1 text-[8px] px-1 bg-purple-500 text-white rounded">Active</span>
                  <div className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400"><Palette className="w-4 h-4" /></div>
                  <div className="h-4 bg-white/10 rounded w-4/5"></div>
                  <div className="h-2 bg-white/5 rounded w-3/4"></div>
                </div>
                <div className="p-3 rounded-xl border border-white/5 bg-white/5 space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400"><BarChart3 className="w-4 h-4" /></div>
                  <div className="h-4 bg-white/10 rounded w-4/5"></div>
                  <div className="h-2 bg-white/5 rounded w-3/4"></div>
                </div>
              </div>
              
              {/* Figma bottom ruler mockup */}
              <div className="flex items-center justify-between text-[10px] text-slate-600 border-t border-white/5 pt-2 mt-2">
                <span>X: 1420px</span>
                <span>Y: 820px</span>
                <span>W: 1920px</span>
                <span>H: 1080px</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer z-10 md:hidden" onClick={() => scrollToSection('about')}>
          <ChevronDown className={`w-7 h-7 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-28 relative ${isDarkMode ? 'bg-slate-900/40' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className={`bg-gradient-to-r ${isDarkMode
                ? 'from-blue-400 to-purple-400'
                : 'from-blue-600 to-purple-600'
                } bg-clip-text text-transparent`}>
                About Me
              </span>
            </h2>
            <div className="h-1.5 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
            <p className={`text-lg max-w-2xl mx-auto font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Bridging the gap between creative visual designs and logical code implementation.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h3 className={`text-3xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Hi, I'm Rohit Kumar!
              </h3>
              <p className={`leading-relaxed text-base font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                I am a versatile **Full-Stack Developer, Product Designer, and Data Analyst** with a solid computer science backing, having completed my **Master of Computer Applications (MCA)** with an AI/ML specialization.
              </p>
              <p className={`leading-relaxed text-base font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                I specialize in engineering robust Node.js backend environments, writing clean, highly debugged full-stack code in React, and optimizing databases. I combine this engineering foundation with a strong design-centric philosophy, crafting user personas, wireframes, and prototypes in Figma.
              </p>
              <p className={`leading-relaxed text-base font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Additionally, I leverage my AI/ML training to conduct advanced data analytics. By scripting Python workflows (Pandas/NumPy) and designing interactive Power BI dashboards, I translate complex datasets into clear, actionable product insights.
              </p>
              
              <div className="flex space-x-4 pt-4">
                <a 
                  href="https://github.com/Rohitsng01" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`p-3.5 rounded-xl transition-all duration-200 hover:scale-105 border ${isDarkMode
                    ? 'bg-slate-900 border-white/5 hover:bg-slate-800 text-white'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                    } shadow-md`}
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/rohit-kumar000/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`p-3.5 rounded-xl transition-all duration-200 hover:scale-105 border ${isDarkMode
                    ? 'bg-slate-900 border-white/5 hover:bg-slate-800 text-white'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                    } shadow-md`}
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="mailto:rohitkumarsng01@gmail.com" 
                  className={`p-3.5 rounded-xl transition-all duration-200 hover:scale-105 border ${isDarkMode
                    ? 'bg-slate-900 border-white/5 hover:bg-slate-800 text-white'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                    } shadow-md`}
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="p-6 rounded-2xl glass-card glass-card-hover border shadow-lg">
                <User className="w-9 h-9 text-blue-500 mb-4" />
                <h4 className="font-extrabold text-2xl mb-1 text-slate-800 dark:text-white">6+ Months</h4>
                <p className={`text-sm font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Internship Experience
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-500 mt-2 font-medium">
                  Developing robust Node backends, debugging REST APIs, and styling UIs.
                </p>
              </div>

              <div className="p-6 rounded-2xl glass-card glass-card-hover border shadow-lg">
                <Briefcase className="w-9 h-9 text-purple-500 mb-4" />
                <h4 className="font-extrabold text-2xl mb-1 text-slate-800 dark:text-white">5+ Projects</h4>
                <p className={`text-sm font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Design & Dev Portfolios
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-500 mt-2 font-medium">
                  Uber sockets, ML delivery systems, and sentiment databases.
                </p>
              </div>

              <div className="p-6 rounded-2xl glass-card glass-card-hover border shadow-lg">
                <Palette className="w-9 h-9 text-pink-500 mb-4" />
                <h4 className="font-extrabold text-2xl mb-1 text-slate-800 dark:text-white">Figma & Dev</h4>
                <p className={`text-sm font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Design Systems Focus
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-500 mt-2 font-medium">
                  Experienced with wireframes, user testing, and component react scales.
                </p>
              </div>

              <div className="p-6 rounded-2xl glass-card glass-card-hover border shadow-lg">
                <Database className="w-9 h-9 text-orange-500 mb-4" />
                <h4 className="font-extrabold text-2xl mb-1 text-slate-800 dark:text-white">Data & Analytics</h4>
                <p className={`text-sm font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Python & Power BI
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-500 mt-2 font-medium">
                  Applying ML algorithms, Python scripts, and Power BI dashboards.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Interactive UX Design Process Section */}
      <section id="process" className="py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className={`bg-gradient-to-r ${isDarkMode
                ? 'from-purple-400 to-pink-400'
                : 'from-purple-600 to-pink-600'
                } bg-clip-text text-transparent`}>
                My Design & Dev Process
              </span>
            </h2>
            <div className="h-1.5 w-20 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-6"></div>
            <p className={`text-lg max-w-2xl mx-auto font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              How I solve complex product problems, from initial user empathy to polished frontend code.
            </p>
          </div>

          {/* Stepper Tabs */}
          <div className="flex overflow-x-auto lg:flex-wrap lg:justify-center gap-3 mb-10 pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {designSteps.map((step, index) => (
              <button
                key={step.title}
                onClick={() => setActiveStep(index)}
                className={`px-5 py-3.5 rounded-xl font-bold transition-all duration-300 border flex items-center space-x-2.5 flex-shrink-0 ${activeStep === index
                  ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-600/25 scale-[1.03]'
                  : isDarkMode
                    ? 'bg-slate-900 border-white/5 hover:border-white/10 text-slate-300'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
              >
                <div className={`p-1.5 rounded-lg ${activeStep === index ? 'bg-white/20' : 'bg-slate-700/10'}`}>
                  {step.icon}
                </div>
                <span className="text-sm">{step.title.split('. ')[1]}</span>
              </button>
            ))}
          </div>

          {/* Step Detail Content */}
          <div className="max-w-4xl mx-auto">
            <div className={`p-6 sm:p-8 md:p-10 rounded-3xl border shadow-xl relative overflow-hidden transition-all duration-300 glass-card`}>
              
              {/* Subtle background glow matching active step */}
              <div className={`absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-br ${designSteps[activeStep].accent} opacity-[0.06] blur-3xl pointer-events-none`}></div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-700/20 dark:border-white/5 mb-8">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-widest text-purple-400">Phase 0{activeStep + 1}</span>
                  <h3 className="text-2xl font-black mt-1">{designSteps[activeStep].title}</h3>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-0.5">{designSteps[activeStep].subtitle}</p>
                </div>
                <div className={`px-4 py-2 rounded-full font-bold text-xs bg-gradient-to-r ${designSteps[activeStep].accent} text-white self-start md:self-auto`}>
                  Methodology
                </div>
              </div>

              <p className={`text-base md:text-lg mb-8 leading-relaxed font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {designSteps[activeStep].description}
              </p>

              <div>
                <h4 className="font-extrabold text-sm uppercase tracking-wider text-slate-400 mb-4 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Key Tasks & Deliverables:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {designSteps[activeStep].methods.map((method) => (
                    <div key={method} className="flex items-center space-x-2">
                      <ArrowRight className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                      <span className="text-sm font-semibold text-slate-500 dark:text-slate-300">{method}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-28 ${isDarkMode ? 'bg-slate-900/30' : 'bg-slate-100/50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className={`bg-gradient-to-r ${isDarkMode
                ? 'from-blue-400 to-indigo-400'
                : 'from-blue-600 to-indigo-600'
                } bg-clip-text text-transparent`}>
                Skills & Expertise
              </span>
            </h2>
            <div className="h-1.5 w-20 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-6"></div>
            <p className={`text-lg max-w-2xl mx-auto font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Key frameworks, methodologies, and technical languages I specialize in.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillsCategories.map((category, idx) => (
              <div
                key={category.title}
                className={`p-8 rounded-2xl glass-card border shadow-lg flex flex-col justify-between ${
                  idx === 2 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  <h3 className="font-extrabold text-xl mb-2 text-slate-800 dark:text-white">{category.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 font-semibold">{category.description}</p>
                  
                  <div className="space-y-5">
                    {category.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between text-xs mb-1.5 font-bold">
                          <span className="text-slate-700 dark:text-slate-300">{skill.name}</span>
                          <span className="text-purple-400">{skill.level}%</span>
                        </div>
                        <div className={`w-full rounded-full h-2 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-1000 ease-out"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Mock Data Analytics Dashboard Widget */}
      <section id="dashboard" className="py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className={`bg-gradient-to-r ${isDarkMode
                ? 'from-blue-400 via-indigo-400 to-purple-400'
                : 'from-blue-600 via-indigo-600 to-purple-600'
                } bg-clip-text text-transparent`}>
                Interactive Analytics Panel
              </span>
            </h2>
            <div className="h-1.5 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
            <p className={`text-lg max-w-2xl mx-auto font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              An interactive demonstration showing how I design and build data dashboards to measure UX success.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Dashboard Mock Window */}
            <div className="rounded-3xl border border-white/10 dark:border-white/5 bg-slate-900/60 backdrop-blur-xl shadow-2xl p-4 sm:p-6 md:p-8 text-slate-100 relative">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/5 mb-8">
                <div>
                  <span className="text-[10px] uppercase font-extrabold tracking-widest text-indigo-400">Live Interactive Mock</span>
                  <h3 className="text-xl font-bold flex items-center mt-0.5"><TrendingUp className="w-5 h-5 mr-2 text-indigo-400" /> User Signal Analytics</h3>
                </div>
                
                {/* Timeframe Toggle Buttons */}
                <div className="flex bg-slate-950 p-1.5 rounded-xl border border-white/5 self-end sm:self-auto">
                  {(['Daily', 'Weekly', 'Monthly']).map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setDashboardTimeframe(t);
                        setHoveredPoint(null);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${dashboardTimeframe === t
                        ? 'bg-purple-600 text-white'
                        : 'text-slate-400 hover:text-slate-200'
                        }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Top Summary Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="p-4.5 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Total Analyzed Signals</span>
                  <div className="text-2xl font-black mt-1 text-slate-100">142,390</div>
                  <span className="text-[10px] text-green-400 flex items-center mt-1.5 font-bold"><TrendingUp className="w-3 h-3 mr-0.5" /> +12.4% vs last period</span>
                </div>
                <div className="p-4.5 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-[10px] uppercase font-bold text-slate-400">UX CSAT Score</span>
                  <div className="text-2xl font-black mt-1 text-slate-100">4.82 / 5.0</div>
                  <span className="text-[10px] text-green-400 flex items-center mt-1.5 font-bold"><CheckCircle className="w-3 h-3 mr-0.5" /> 98% positive sentiment</span>
                </div>
                <div className="p-4.5 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Signal Accuracy</span>
                  <div className="text-2xl font-black mt-1 text-slate-100">98.44%</div>
                  <span className="text-[10px] text-slate-400 flex items-center mt-1.5 font-bold"><Database className="w-3 h-3 mr-0.5" /> Checked via ML models</span>
                </div>
              </div>

              {/* Chart Canvas */}
              <div className="relative p-3 rounded-2xl bg-slate-950/60 border border-white/5 mb-4">
                <svg viewBox="0 0 500 150" className="w-full h-44 overflow-visible">
                  <defs>
                    <linearGradient id="glowArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(168, 85, 247, 0.25)" />
                      <stop offset="100%" stopColor="rgba(168, 85, 247, 0)" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal grid lines */}
                  <line x1="20" y1="20" x2="480" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
                  <line x1="20" y1="60" x2="480" y2="60" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
                  <line x1="20" y1="100" x2="480" y2="100" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
                  <line x1="20" y1="140" x2="480" y2="140" stroke="rgba(255,255,255,0.1)" />

                  {/* Shaded Area */}
                  {areaPath && <path d={areaPath} fill="url(#glowArea)" />}

                  {/* Line stroke */}
                  {linePath && <path d={linePath} fill="none" stroke="rgba(168, 85, 247, 0.95)" strokeWidth="2.5" />}

                  {/* Data interactive nodes */}
                  {points.map((p, i) => (
                    <g key={i}>
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={hoveredPoint?.index === i ? 6 : 4}
                        fill="rgba(168, 85, 247, 1)"
                        stroke="white"
                        strokeWidth="1.5"
                        className="cursor-pointer transition-all"
                        onMouseEnter={() => setHoveredPoint({ index: i, x: p.x, y: p.y, label: currentChartData[i].label, value: currentChartData[i].value })}
                      />
                    </g>
                  ))}
                </svg>

                {/* Custom Chart Tooltip */}
                {hoveredPoint && (
                  <div 
                    className="absolute bg-slate-900 border border-purple-500/30 p-2.5 rounded-lg shadow-xl text-left pointer-events-none z-20"
                    style={{ 
                      left: `${(hoveredPoint.x / 500) * 100}%`, 
                      top: `${(hoveredPoint.y / 150) * 100 - 35}%`,
                      transform: 'translateX(-50%)'
                    }}
                  >
                    <div className="text-[9px] uppercase font-extrabold text-slate-400">{hoveredPoint.label}</div>
                    <div className="text-xs font-black text-purple-400 mt-0.5">{hoveredPoint.value} Signals</div>
                    <div className="text-[9px] text-green-400 font-bold mt-0.5">Sentiment: {currentChartData[hoveredPoint.index].sentiment}%</div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between items-center px-4 text-[10px] text-slate-500 font-bold">
                <span>* Hover over data points to check specific period metrics</span>
                <span>Specialization: AI/ML</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-28 relative ${isDarkMode ? 'bg-slate-900/50' : 'bg-slate-100/50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className={`bg-gradient-to-r ${isDarkMode
                ? 'from-pink-400 to-orange-400'
                : 'from-pink-600 to-orange-600'
                } bg-clip-text text-transparent`}>
                Featured Case Studies
              </span>
            </h2>
            <div className="h-1.5 w-20 bg-gradient-to-r from-pink-500 to-orange-500 mx-auto rounded-full mb-6"></div>
            <p className={`text-lg max-w-2xl mx-auto font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Academic, personal, and research projects designed with meticulous UX care and robust implementations.
            </p>
          </div>

          {/* Horizontal Scrollable Projects Container */}
          <div className="relative">
            <div className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-transparent hover:scrollbar-thumb-pink-600 -mx-4 px-4 sm:mx-0 sm:px-0">
              {projects.map((project) => (
                <div
                  key={project.title}
                  className={`group relative overflow-hidden rounded-3xl backdrop-blur-sm border transition-all duration-300 flex-shrink-0 w-[88vw] sm:w-[450px] snap-center ${isDarkMode
                    ? 'bg-slate-900/40 border-white/5 hover:border-pink-500/30'
                    : 'bg-white border-slate-200 hover:border-pink-400/30'
                    } hover:shadow-2xl shadow-md flex flex-col justify-between`}
                >
                  <div>
                    {/* Project Header Image */}
                    <div className="aspect-[16/9] overflow-hidden relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-pink-500 text-white shadow-md">
                          {project.role}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 md:p-8">
                      <h3 className={`font-extrabold text-2xl mb-3.5 transition-colors ${isDarkMode
                        ? 'group-hover:text-pink-400'
                        : 'group-hover:text-pink-600'
                        }`}>
                        {project.title}
                      </h3>
                      <p className={`text-sm mb-6 leading-relaxed font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {project.description}
                      </p>

                      {/* Design Highlights Badge Section */}
                      <div className="mb-6">
                        <h4 className="text-[10px] uppercase font-extrabold tracking-wider text-slate-500 mb-2">Design Case Highlights</h4>
                        <div className="flex flex-col gap-1.5">
                          {project.designHighlights.map((dh) => (
                            <div key={dh} className="flex items-center text-xs text-slate-400 dark:text-slate-300 font-semibold">
                              <CheckCircle className="w-3.5 h-3.5 mr-2 text-green-500 flex-shrink-0" />
                              <span>{dh}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tech Stacks */}
                      <div className="flex flex-wrap gap-2 mb-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${isDarkMode
                              ? 'bg-pink-600/10 text-pink-300 border border-pink-500/10'
                              : 'bg-pink-50 text-pink-700 border border-pink-100'
                              }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 pt-0 border-t border-slate-700/10 dark:border-white/5 flex gap-4 mt-auto">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center font-bold text-sm transition-colors ${isDarkMode
                        ? 'text-pink-400 hover:text-pink-300'
                        : 'text-pink-600 hover:text-pink-500'
                      }`}
                    >
                      <Github className="mr-1.5 w-4 h-4" />
                      Code Repository
                    </a>
                    {project.liveLink && project.liveLink !== '#' && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center font-bold text-sm transition-colors ${isDarkMode
                          ? 'text-pink-400 hover:text-pink-300'
                          : 'text-pink-600 hover:text-pink-500'
                        }`}
                      >
                        <ExternalLink className="mr-1.5 w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education & Certifications Section */}
      <section id="education" className={`py-28 ${isDarkMode ? 'bg-slate-900/40' : 'bg-slate-100/50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className={`bg-gradient-to-r ${isDarkMode
                ? 'from-green-400 to-blue-400'
                : 'from-green-600 to-blue-600'
                } bg-clip-text text-transparent`}>
                Education & Credentials
              </span>
            </h2>
            <div className="h-1.5 w-20 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full mb-6"></div>
            <p className={`text-lg max-w-2xl mx-auto font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Academic qualifications, certifications, and industry simulations.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Education column */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-4">
                <GraduationCap className="w-8 h-8 text-green-500" />
                <h3 className="text-2xl font-extrabold">Education</h3>
              </div>

              <div className="p-5 sm:p-8 rounded-2xl glass-card border shadow-lg space-y-6 relative overflow-hidden">
                <div className={`p-5 rounded-xl border transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/20'
                    : 'bg-green-50/40 border-green-200'
                }`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-extrabold text-xl mb-1 text-slate-900 dark:text-white">Master of Computer Applications (MCA)</h4>
                      <p className="text-sm font-semibold text-green-600 dark:text-green-400">Galgotias University • Noida, UP</p>
                    </div>
                    <span className="px-3 py-1 rounded bg-green-500/20 text-green-700 dark:text-green-400 font-extrabold text-[10px] uppercase">Completed</span>
                  </div>
                  <p className={`text-xs mt-3.5 font-medium leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    Specialized in **Artificial Intelligence & Machine Learning**. Acquired solid skills in data modeling, statistical data analysis, and predictive model generation, integrating AI components with intuitive frontend UI controls.
                  </p>
                </div>

                <div className={`p-5 rounded-xl border transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-slate-950/40 border-white/5'
                    : 'bg-white border-slate-200'
                }`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-extrabold text-lg mb-1 text-slate-900 dark:text-white">Bachelor of Commerce (B.Com)</h4>
                      <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Sainik Degree College • Uttar Pradesh</p>
                    </div>
                    <span className="px-3 py-1 rounded bg-slate-500/10 text-slate-500 dark:text-slate-400 font-extrabold text-[10px] uppercase">Completed</span>
                  </div>
                  <p className={`text-xs mt-3.5 font-medium leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    Gained solid foundations in financial management, quantitative data accounting, and business systems.
                  </p>
                </div>
              </div>
            </div>

            {/* Certifications column */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-4">
                <Award className="w-8 h-8 text-blue-500" />
                <h3 className="text-2xl font-extrabold">Professional Credentials</h3>
              </div>

              <div className="p-5 sm:p-8 rounded-2xl glass-card border shadow-lg max-h-[460px] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent space-y-4">
                
                <a 
                  href="https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/pmnMSL4QiQ9JCgE3W/kkE9HyeNcw6rwCRGw_pmnMSL4QiQ9JCgE3W_E9zRp6GWW5Gw8TE5y_1741622222475_completion_certificate.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`block p-4.5 rounded-xl border-l-4 border-l-orange-500 transition-all duration-300 hover:scale-[1.02] cursor-pointer shadow-md ${
                    isDarkMode 
                      ? 'bg-slate-950/40 border-y border-r border-white/5 hover:bg-slate-900/80' 
                      : 'bg-white border-y border-r border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <h4 className="font-extrabold mb-1 text-sm text-slate-900 dark:text-white">AWS APAC - Solutions Architecture Simulation</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold">Forage • Issued Mar 2025</p>
                  <p className="text-[10px] mt-1.5 font-bold text-orange-500 dark:text-orange-400">Credential ID: b6FRjBjBXEh7LPjKR</p>
                </a>

                <a 
                  href="https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/MBA4MnZTNFEoJZGnk/NPdeQ43o8P9HJmJzg_MBA4MnZTNFEoJZGnk_E9zRp6GWW5Gw8TE5y_1738901852221_completion_certificate.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`block p-4.5 rounded-xl border-l-4 border-l-blue-600 transition-all duration-300 hover:scale-[1.02] cursor-pointer shadow-md ${
                    isDarkMode 
                      ? 'bg-slate-950/40 border-y border-r border-white/5 hover:bg-slate-900/80' 
                      : 'bg-white border-y border-r border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <h4 className="font-extrabold mb-1 text-sm text-slate-900 dark:text-white">Goldman Sachs - Software Engineering Simulation</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold">Forage • Issued Feb 2025</p>
                  <p className="text-[10px] mt-1.5 font-bold text-blue-500 dark:text-blue-400">Credential ID: BvJzop9LEycGhYBy7</p>
                </a>

                <div className={`p-4.5 rounded-xl border-l-4 border-l-purple-500 shadow-md ${
                  isDarkMode 
                    ? 'bg-slate-950/40 border-y border-r border-white/5' 
                    : 'bg-white border-y border-r border-slate-200'
                }`}>
                  <h4 className="font-extrabold mb-1 text-sm text-slate-900 dark:text-white">UI Developer Intern Certification</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold">Ypsilson IT Solutions • Issued Jan 2024</p>
                  <p className="text-[10px] mt-1.5 font-bold text-purple-500 dark:text-purple-400">Credential ID: YPS/202401/6860</p>
                </div>

                <div className={`p-4.5 rounded-xl border-l-4 border-l-cyan-400 shadow-md ${
                  isDarkMode 
                    ? 'bg-slate-950/40 border-y border-r border-white/5' 
                    : 'bg-white border-y border-r border-slate-200'
                }`}>
                  <h4 className="font-extrabold mb-1 text-sm text-slate-900 dark:text-white">Frontend UI with React.js Certification</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold">Universal Informatics • Issued Oct 2023</p>
                </div>

                <div className={`p-4.5 rounded-xl border-l-4 border-l-yellow-400 shadow-md ${
                  isDarkMode 
                    ? 'bg-slate-950/40 border-y border-r border-white/5' 
                    : 'bg-white border-y border-r border-slate-200'
                }`}>
                  <h4 className="font-extrabold mb-1 text-sm text-slate-900 dark:text-white">Mastering of JavaScript Fundamentals</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold">Geekster • Issued May 2024</p>
                </div>

                <div className={`p-4.5 rounded-xl border-l-4 border-l-green-500 shadow-md ${
                  isDarkMode 
                    ? 'bg-slate-950/40 border-y border-r border-white/5' 
                    : 'bg-white border-y border-r border-slate-200'
                }`}>
                  <h4 className="font-extrabold mb-1 text-sm text-slate-900 dark:text-white">Fundamentals of Responsible Generative AI</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold">Microsoft Certified • Issued May 2024</p>
                </div>

                <a 
                  href="https://learn.microsoft.com/en-us/users/rohitkumar-4621/achievements/hrz4jpd8" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`block p-4.5 rounded-xl border-l-4 border-l-sky-500 transition-all duration-300 hover:scale-[1.02] cursor-pointer shadow-md ${
                    isDarkMode 
                      ? 'bg-slate-950/40 border-y border-r border-white/5 hover:bg-slate-900/80' 
                      : 'bg-white border-y border-r border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <h4 className="font-extrabold mb-1 text-sm text-slate-900 dark:text-white">Prompt Engineering with GitHub Copilot</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold">Microsoft Certified • Issued May 2024</p>
                </a>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className={`bg-gradient-to-r ${isDarkMode
                ? 'from-orange-400 to-red-400'
                : 'from-orange-600 to-red-600'
                } bg-clip-text text-transparent`}>
                Let's Collaborate
              </span>
            </h2>
            <div className="h-1.5 w-20 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full mb-6"></div>
            <p className={`text-lg max-w-2xl mx-auto font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Interested in hiring me for a design role or developer position? Let's connect!
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-12 gap-12 items-stretch">
              
              {/* Contact Info */}
              <div className="md:col-span-5 space-y-6 flex flex-col justify-between">
                <div>
                  <h3 className={`text-2xl font-extrabold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    Get In Touch
                  </h3>
                  <p className={`leading-relaxed text-sm font-semibold mb-8 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    I'm currently seeking Product Designer, UI/UX Designer, and Frontend Engineer positions. Feel free to reach out via form, email, or telephone.
                  </p>
                </div>

                <div className="space-y-4">
                  
                  <a href="tel:+917543936835" className="flex items-center space-x-4 group">
                    <div className={`p-3.5 rounded-xl transition-colors ${isDarkMode
                      ? 'bg-orange-600/10 group-hover:bg-orange-600/20 border border-orange-500/10'
                      : 'bg-orange-50 group-hover:bg-orange-100 border border-orange-200'
                      }`}>
                      <Phone className={`w-5 h-5 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-extrabold text-slate-500 block">Phone</span>
                      <span className={`text-sm font-bold group-hover:underline ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        +91 7543936835
                      </span>
                    </div>
                  </a>

                  <a href="mailto:rohitkumarsng01@gmail.com" className="flex items-center space-x-4 group">
                    <div className={`p-3.5 rounded-xl transition-colors ${isDarkMode
                      ? 'bg-orange-600/10 group-hover:bg-orange-600/20 border border-orange-500/10'
                      : 'bg-orange-50 group-hover:bg-orange-100 border border-orange-200'
                      }`}>
                      <Mail className={`w-5 h-5 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-extrabold text-slate-500 block">Email</span>
                      <span className={`text-sm font-bold group-hover:underline ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        rohitkumarsng01@gmail.com
                      </span>
                    </div>
                  </a>

                  <a href="https://github.com/Rohitsng01" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 group">
                    <div className={`p-3.5 rounded-xl transition-colors ${isDarkMode
                      ? 'bg-orange-600/10 group-hover:bg-orange-600/20 border border-orange-500/10'
                      : 'bg-orange-50 group-hover:bg-orange-100 border border-orange-200'
                      }`}>
                      <Github className={`w-5 h-5 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-extrabold text-slate-500 block">GitHub</span>
                      <span className={`text-sm font-bold group-hover:underline ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        github.com/Rohitsng01
                      </span>
                    </div>
                  </a>

                  <a href="https://www.linkedin.com/in/rohit-kumar000/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 group">
                    <div className={`p-3.5 rounded-xl transition-colors ${isDarkMode
                      ? 'bg-orange-600/10 group-hover:bg-orange-600/20 border border-orange-500/10'
                      : 'bg-orange-50 group-hover:bg-orange-100 border border-orange-200'
                      }`}>
                      <Linkedin className={`w-5 h-5 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-extrabold text-slate-500 block">LinkedIn</span>
                      <span className={`text-sm font-bold group-hover:underline ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        linkedin.com/in/rohit-kumar000
                      </span>
                    </div>
                  </a>

                </div>
              </div>

              {/* Form panel */}
              <div className="md:col-span-7">
                <form onSubmit={handleSubmit} className="p-5 sm:p-8 rounded-2xl glass-card border shadow-lg space-y-6">
                  <div>
                    <label htmlFor="name" className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className={`w-full px-4 py-3.5 border rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors ${isDarkMode
                        ? 'bg-slate-950 border-white/5 text-white placeholder-slate-500'
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                        }`}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className={`w-full px-4 py-3.5 border rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors ${isDarkMode
                        ? 'bg-slate-950 border-white/5 text-white placeholder-slate-500'
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                        }`}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                      Message Context
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleFormChange}
                      required
                      className={`w-full px-4 py-3.5 border rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors resize-none ${isDarkMode
                        ? 'bg-slate-950 border-white/5 text-white placeholder-slate-500'
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                        }`}
                      placeholder="Write your project or role details here..."
                    />
                  </div>

                  {formStatus === 'success' && (
                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-semibold">
                      Message sent successfully! I will get back to you shortly.
                    </div>
                  )}
                  {formStatus === 'error' && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold">
                      An error occurred. Please ensure all fields are filled.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className={`w-full py-4 rounded-xl font-bold transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 text-white ${
                      formStatus === 'sending' 
                        ? 'bg-slate-700 cursor-not-allowed' 
                        : isDarkMode
                          ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 shadow-orange-500/15 hover:shadow-orange-500/25'
                          : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
                    }`}
                  >
                    <span>{formStatus === 'sending' ? 'Sending Message...' : 'Send Message'}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 border-t ${isDarkMode
        ? 'border-white/5 bg-slate-950/80'
        : 'border-slate-200 bg-slate-100'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center">
            <p className={`text-xs font-semibold ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
              © 2026 Rohit Kumar. Designed in Figma, built with React, TypeScript & Tailwind CSS.
            </p>
            <p className={`text-xs font-semibold ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
              Specialization: Artificial Intelligence & Machine Learning
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;