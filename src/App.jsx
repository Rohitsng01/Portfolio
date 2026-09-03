import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Server,
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
  ArrowRight,
  CheckCircle,
  MonitorSmartphone,
  Cpu
,
  Zap} from 'lucide-react';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
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
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'education', 'contact'];
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
      const offset = 80; 
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
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
      return;
    }
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

  const skillsCategories = [
    {
      title: 'Frontend Development',
      description: 'Building responsive, dynamic, and intuitive user interfaces',
      icon: <MonitorSmartphone className="w-6 h-6 mb-3 text-amber-500" />,
      skills: ['React.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS', 'React Router', 'Context API', 'SASS', 'Bootstrap', 'jQuery', 'User Experience (UX)', 'Shopify', 'WordPress Design']
    },
    {
      title: 'Backend Development',
      description: 'Engineering scalable APIs and secure backend architectures',
      icon: <Server className="w-6 h-6 mb-3 text-emerald-500" />,
      skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth', 'Bcrypt', 'Express Validator', 'Socket.io']
    },
    {
      title: 'AI/ML & Databases',
      description: 'Integrating machine learning models and optimizing data storage',
      icon: <Cpu className="w-6 h-6 mb-3 text-blue-500" />,
      skills: ['Python', 'Machine Learning Libraries', 'REST AI API Integration', 'MongoDB', 'MySQL', 'SQL', 'Data Analysis', 'LightGBM']
    }
  ];

  const projects = [
    {
      title: 'AI/ML-Powered Food Platform',
      role: 'Full Stack & AI Engineer',
      description: 'Architected a decoupled microservices platform with a React Native and Node.js core for order management and Stripe payment processing. Engineered a Python ML microservice using LightGBM for demand forecasting, achieving 99.9% availability, alongside a real-time data visualization dashboard.',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['React Native', 'Node.js', 'Python', 'MongoDB', 'LightGBM', 'Stripe', 'JWT/RBAC'],
      link: 'https://github.com/Rohitsng01',
      liveLink: '#',
      highlights: ['LightGBM demand forecasting', 'Stripe payment flows', 'Microservice architecture', 'Real-time dashboard']
    },
    {
      title: 'Uber Clone - Ride-Sharing App',
      role: 'Full Stack Developer',
      description: 'Developed a comprehensive full-stack ride-sharing application. Built a responsive React/Vite frontend and a robust Express.js/MongoDB backend. Implemented Socket.io for real-time driver-passenger matching, dynamic fare calculations, and secure role-based access control with JWT.',
      image: 'https://images.pexels.com/photos/4606346/pexels-photo-4606346.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['React.js', 'Vite', 'Node.js', 'MongoDB', 'Socket.io', 'JWT Auth'],
      link: 'https://github.com/Rohitsng01',
      liveLink: '#',
      highlights: ['Real-time Socket.io matching', 'Dynamic fare calculation algorithms', 'Secure RBAC authentication', 'Complex state management']
    },
    {
      title: 'E-Commerce Frontend',
      role: 'Frontend Developer',
      description: 'Engineered a fully responsive, modern e-commerce user interface with complete product listing, cart, and checkout flows. Integrated REST APIs to fetch and mutate product data dynamically, alongside a secure login/register flow managing JWT tokens natively on the frontend.',
      image: 'https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
      tech: ['React.js', 'JavaScript', 'CSS', 'REST API', 'JWT'],
      link: 'https://github.com/Rohitsng01',
      liveLink: '#',
      highlights: ['Dynamic cart state management', 'RESTful data fetching', 'Secure client-side JWT handling', 'Responsive product grids']
    },
    {
      title: 'Chat Bot',
      role: 'Developer',
      description: 'Engineered an AI-powered conversational application utilizing advanced natural language processing. Integrated custom APIs to provide intelligent, context-aware responses in real-time, all wrapped in a sleek, responsive React interface.',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['React', 'API Integration'],
      link: 'https://github.com/Rohitsng01/Chat_Bot',
      liveLink: 'https://chat-bot-psi-five.vercel.app/',
      highlights: ['Intelligent conversation', 'Responsive UI']
    },
    {
      title: 'AI Assistant',
      role: 'Developer',
      description: 'Developed an advanced virtual assistant designed to optimize daily workflows and task management. Leveraged Node.js and specialized AI APIs to process user queries, returning actionable insights and automated scheduling solutions.',
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['React', 'Node.js', 'AI'],
      link: 'https://github.com/Rohitsng01/Ai-Assistant',
      liveLink: 'https://ai-assistant-lovat-omega.vercel.app/',
      highlights: ['Task management', 'Natural language processing']
    },
    {
      title: 'Currency Control',
      role: 'Developer',
      description: 'Built a dynamic financial web application for real-time currency conversion and exchange rate tracking. Utilized external financial REST APIs to fetch live market data, ensuring users always have accurate and up-to-date conversion metrics.',
      image: 'https://images.pexels.com/photos/259209/pexels-photo-259209.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['React', 'API'],
      link: 'https://github.com/Rohitsng01/Currency_Control',
      liveLink: '#',
      highlights: ['Live exchange rates', 'Currency conversion']
    },
    {
      title: 'Photo Editing',
      role: 'Developer',
      description: 'Created a robust browser-based photo manipulation tool using JavaScript and the HTML5 Canvas API. Implemented custom image filtering algorithms, advanced cropping controls, and responsive resizing capabilities without relying on heavy external libraries.',
      image: 'https://images.pexels.com/photos/3585011/pexels-photo-3585011.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['JavaScript', 'Canvas API'],
      link: 'https://github.com/Rohitsng01/Photo-Editing',
      liveLink: '#',
      highlights: ['Image filters', 'Cropping and resizing']
    },
    {
      title: 'Slider Todo',
      role: 'Developer',
      description: 'Designed a modern, interactive task management dashboard featuring a unique slider-based user interface. Built entirely with React and custom CSS, focusing on micro-interactions and smooth animations to enhance standard task tracking.',
      image: 'https://images.pexels.com/photos/1226398/pexels-photo-1226398.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['React', 'CSS'],
      link: 'https://github.com/Rohitsng01/Slider_Todo',
      liveLink: '#',
      highlights: ['Interactive UI', 'Task management']
    },
    {
      title: 'Food Cart',
      role: 'Developer',
      description: 'Developed a comprehensive frontend simulation of a restaurant ordering and cart management system. Implemented complex state management for the product catalog, enabling dynamic cart updates, price calculations, and item modifications.',
      image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['React', 'State Management'],
      link: 'https://github.com/Rohitsng01/Food_cart',
      liveLink: '#',
      highlights: ['Cart functionality', 'Product catalog']
    }
  ];

    const experience = [
    {
      company: 'BizGroMedia Technologies Pvt Ltd',
      location: 'India | Hybrid',
      role: 'Web Developer',
      duration: 'Jul 2026 – Present',
      description: [
        'Engineered scalable and responsive e-commerce web applications utilizing Shopify, WordPress, and modern frontend frameworks.',
        'Spearheaded the customization of intricate website layouts, ensuring pixel-perfect translation of client design requirements.',
        'Optimized website performance and resolved frontend bottlenecks, reducing page load times by over 30%.',
        'Collaborated closely with cross-functional teams to implement new features and ensure rigorous cross-browser compatibility.'
      ],
      icon: <Code className="w-5 h-5" />
    },
    {
      company: 'QSpiders – Software Testing Training Institute',
      location: 'Great Noida | On-site',
      role: 'Data Analyst',
      duration: 'Apr 2026 – Jul 2026',
      description: [
        'Analyzed complex datasets utilizing Python and SQL to identify key business trends and generate actionable insights.',
        'Executed comprehensive data cleaning, validation, and transformation workflows to maintain high data integrity.',
        'Designed and developed interactive dashboards using advanced visualization tools to present data to stakeholders.',
        'Contributed to data-driven decision-making processes by automating routine reporting tasks and metrics tracking.'
      ],
      icon: <Database className="w-5 h-5" />
    },
    {
      company: 'CodeAlpha',
      location: 'Noida, Uttar Pradesh, India | Remote',
      role: 'Web Development Intern',
      duration: 'Sep 2025 – Dec 2025',
      description: [
        'Designed and developed interactive user interfaces focusing on delivering exceptional User Experience (UX).',
        'Implemented responsive web design principles to ensure seamless functionality across desktop and mobile devices.',
        'Participated in code reviews and adopted best practices for clean, maintainable, and version-controlled code.',
        'Assisted in the integration of frontend components with backend APIs to support dynamic data rendering.'
      ],
      icon: <Code className="w-5 h-5" />
    },
    {
      company: 'Uncody',
      location: 'Work from home | Remote',
      role: 'Frontend Developer',
      duration: 'Jun 2024 – Nov 2024',
      description: [
        'Developed and maintained full-stack web features using the MERN stack (React.js, Node.js, Express.js, and MongoDB).',
        'Built robust RESTful APIs in Node/Express for core application modules and integrated them securely with the React frontend.',
        'Implemented complex CRUD operations, advanced form validations, and efficient data handling mechanisms with MongoDB.',
        'Debugged critical issues, improved overall application performance, and ensured smooth end-to-end user journeys.'
      ],
      icon: <Code className="w-5 h-5" />
    },
    {
      company: 'CSEdge',
      location: 'Virtual Intership | Remote',
      role: 'Web Development Intern',
      duration: 'Apr 2024 – May 2024',
      description: [
        'Contributed to the development of various exciting web projects, gaining hands-on experience with modern JavaScript frameworks.',
        'Collaborated with senior developers to troubleshoot layout issues and implement innovative frontend solutions.',
        'Built reusable UI components and streamlined application state management using React.',
        'Actively participated in agile workflows, daily stand-ups, and sprint planning sessions to deliver tasks on schedule.'
      ],
      icon: <Code className="w-5 h-5" />
    },
    {
      company: 'YPSILON IT SOLUTIONS PRIVATE LIMITED',
      location: 'Indore, Madhya Pradesh, India | On-site',
      role: 'Frontend Developer',
      duration: 'Aug 2023 – Jan 2024',
      description: [
        'Implemented highly responsive and mobile-friendly user interfaces utilizing HTML5, CSS3, SASS, and Bootstrap.',
        'Added dynamic functionality and sophisticated DOM manipulation logic using vanilla JavaScript and jQuery.',
        'Built, maintained, and scaled React.js components, effectively managing state and props for high UI reusability.',
        'Managed projects end-to-end, converting raw UI designs into fully functional frontend integrations while adhering to best practices.'
      ],
      icon: <Code className="w-5 h-5" />
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans ${isDarkMode
      ? 'bg-[#050505] text-slate-200'
      : 'bg-zinc-50 text-slate-900'
      }`}>
      
      {/* Refined Ambient Glow */}
      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none z-0 h-[1000px]">
        <div className="absolute top-[-250px] left-[15%] w-[600px] h-[600px] rounded-full bg-amber-600/5 blur-[120px] animate-pulse-slow"></div>
        <div className="absolute top-[200px] right-[10%] w-[500px] h-[500px] rounded-full bg-zinc-500/10 blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? isDarkMode
          ? 'bg-[#0a0a0a]/80 backdrop-blur-xl shadow-lg border-b border-white/5'
          : 'bg-white/80 backdrop-blur-xl shadow-md border-b border-black/5'
        : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <button 
              onClick={() => scrollToSection('home')} 
              className={`font-black text-2xl tracking-tighter transition-colors ${
                isDarkMode ? 'text-white hover:text-amber-400' : 'text-slate-900 hover:text-amber-600'
              }`}
            >
              ROHIT<span className="text-amber-500">.</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'experience', label: 'Experience' },
                { id: 'skills', label: 'Skills' },
                { id: 'projects', label: 'Projects' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-semibold tracking-wide uppercase transition-all duration-300 relative ${activeSection === item.id
                    ? 'text-amber-500'
                    : isDarkMode
                      ? 'text-slate-400 hover:text-white'
                      : 'text-slate-500 hover:text-slate-900'
                    }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-amber-500"></span>
                  )}
                </button>
              ))}

              <div className="h-5 w-[1px] bg-slate-700/30 dark:bg-white/10 mx-2"></div>

              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all duration-300 ${isDarkMode
                  ? 'text-amber-400 hover:bg-white/5'
                  : 'text-slate-700 hover:bg-black/5'
                  }`}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>

            {/* Mobile menu and theme toggle */}
            <div className="lg:hidden flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={isDarkMode ? 'text-amber-400' : 'text-slate-700'}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={isDarkMode ? 'text-white' : 'text-slate-900'}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {isMenuOpen && (
          <div className={`lg:hidden border-b transition-all duration-300 ${isDarkMode
            ? 'bg-[#0a0a0a]/95 border-white/5 backdrop-blur-xl'
            : 'bg-white/95 border-slate-200 backdrop-blur-xl'
            }`}>
            <div className="px-4 pt-4 pb-8 space-y-4">
              {['home', 'about', 'experience', 'skills', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`block w-full text-left text-lg font-bold uppercase tracking-wider transition-colors ${activeSection === item
                    ? 'text-amber-500'
                    : isDarkMode
                      ? 'text-slate-300 hover:text-white'
                      : 'text-slate-700 hover:text-slate-900'
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-start justify-center">
          <div className="animate-fade-in-up max-w-4xl">
            
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-500 mb-8 font-semibold text-sm tracking-wide">
              <Sparkles className="w-4 h-4" />
              <span>Available for New Opportunities</span>
            </div>

            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-6 leading-[1] tracking-tight flex flex-col">
              <span className={`font-extralight tracking-widest ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                ROHIT
              </span>
              <span className={`font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r ${isDarkMode ? 'from-white via-slate-200 to-slate-500' : 'from-slate-900 via-slate-700 to-slate-500'}`}>
                KUMAR<span className="text-amber-500">.</span>
              </span>
            </h1>

            <p className="text-xl md:text-2xl font-bold tracking-tight mb-6 text-amber-500 uppercase">
              Full Stack Developer | 1+ Year Experience | React.js, Node.js, AI/ML
            </p>
            
            <p className={`text-lg md:text-xl mb-12 max-w-2xl leading-relaxed font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Specialized in building scalable, secure web applications. Combining robust MERN stack architecture with emerging Artificial Intelligence and Machine Learning integrations.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 items-start">
              <button
                onClick={() => scrollToSection('projects')}
                className={`px-8 py-4 rounded-none font-bold transition-all duration-300 flex items-center gap-2 ${
                  isDarkMode 
                  ? 'bg-white text-black hover:bg-slate-200' 
                  : 'bg-black text-white hover:bg-slate-800'
                }`}
              >
                View Projects <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={downloadResume}
                className={`px-8 py-4 border-2 rounded-none font-bold transition-all duration-300 flex items-center gap-2 ${isDarkMode
                  ? 'border-white/20 hover:border-white text-white'
                  : 'border-black/20 hover:border-black text-black'
                  }`}
              >
                Download Resume <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-8 animate-bounce cursor-pointer z-10 hidden md:block" onClick={() => scrollToSection('about')}>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 rotate-90 mb-4">Scroll</span>
            <div className={`w-[1px] h-12 ${isDarkMode ? 'bg-white/20' : 'bg-black/20'}`}></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-32 relative ${isDarkMode ? 'bg-[#080808]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-5 relative">
              <div className="aspect-square bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-3xl absolute inset-0"></div>
              <div className={`relative z-10 p-8 md:p-12 border ${isDarkMode ? 'border-white/10 bg-[#0a0a0a]' : 'border-slate-200 bg-slate-50'} rounded-3xl shadow-2xl`}>
                <h3 className="text-3xl font-black mb-6 leading-tight">Driven by logic.<br/>Inspired by innovation.</h3>
                <div className="space-y-4 font-medium text-sm leading-relaxed">
                  <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
                    Based in Noida, UP, I am a Full Stack Developer with hands-on internship experience in constructing dynamic web architectures utilizing React.js, Node.js, and MongoDB.
                  </p>
                  <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
                    I hold a Master of Computer Applications (MCA) with a specialization in Artificial Intelligence & Machine Learning. My approach merges solid backend systems (REST APIs, JWT, SQL) with clean frontend execution and intelligent data-driven integrations.
                  </p>
                </div>
                
                <div className="flex gap-4 mt-8 pt-8 border-t border-white/10">
                  <a href="https://github.com/Rohitsng01" target="_blank" rel="noopener noreferrer" className={`hover:text-amber-500 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}><Github className="w-5 h-5" /></a>
                  <a href="https://www.linkedin.com/in/rohit-kumar000" target="_blank" rel="noopener noreferrer" className={`hover:text-amber-500 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}><Linkedin className="w-5 h-5" /></a>
                  <a href="mailto:rohitkumarsng01@gmail.com" className={`hover:text-amber-500 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}><Mail className="w-5 h-5" /></a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <h2 className="text-5xl md:text-7xl font-black mb-8 opacity-20 uppercase tracking-tighter">About</h2>
              
              <div className="grid sm:grid-cols-2 gap-6 mt-12">
                <div className={`p-8 rounded-2xl border ${isDarkMode ? 'bg-[#0f0f0f] border-white/5 hover:border-amber-500/30' : 'bg-slate-50 border-slate-200 hover:border-amber-500/50'} transition-all`}>
                  <Code className="w-8 h-8 text-amber-500 mb-6" />
                  <h4 className="text-xl font-bold mb-3">MERN Stack Mastery</h4>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Proficient in building end-to-end applications from responsive React frontends to robust Express/Node backends.
                  </p>
                </div>
                
                <div className={`p-8 rounded-2xl border ${isDarkMode ? 'bg-[#0f0f0f] border-white/5 hover:border-amber-500/30' : 'bg-slate-50 border-slate-200 hover:border-amber-500/50'} transition-all`}>
                  <Cpu className="w-8 h-8 text-amber-500 mb-6" />
                  <h4 className="text-xl font-bold mb-3">AI / ML Integration</h4>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Leveraging Python libraries and REST AI APIs to bring intelligent predictive capabilities to modern web platforms.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-20">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-amber-500 mb-4">Professional Timeline</h2>
            <h3 className="text-4xl md:text-5xl font-black">Work Experience</h3>
          </div>

          <div className="relative border-l border-amber-500/30 ml-4 md:ml-0 md:pl-8 space-y-16">
            {experience.map((exp, idx) => (
              <div key={idx} className="relative pl-8 md:pl-0">
                <div className="absolute -left-[41px] md:-left-[41px] top-1 p-2 bg-[#050505] border border-amber-500 rounded-full text-amber-500 z-10">
                  {exp.icon}
                </div>
                <div className="grid md:grid-cols-12 gap-6">
                  <div className="md:col-span-4">
                    <p className="text-amber-500 font-bold mb-2">{exp.duration}</p>
                    <h4 className="text-2xl font-black mb-1">{exp.role}</h4>
                    <p className={`font-semibold text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{exp.company}</p>
                    <p className={`text-xs mt-1 font-medium ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{exp.location}</p>
                  </div>
                  <div className={`md:col-span-8 p-6 md:p-8 rounded-2xl border ${isDarkMode ? 'bg-[#0a0a0a] border-white/5' : 'bg-white border-slate-200'} shadow-sm`}>
                    <ul className="space-y-4">
                      {exp.description.map((desc, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-amber-500 mr-3 mt-1 flex-shrink-0" />
                          <span className={`text-sm md:text-base font-medium leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-32 ${isDarkMode ? 'bg-[#080808]' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-amber-500 mb-4">Technical Arsenal</h2>
            <h3 className="text-4xl md:text-5xl font-black">Skills & Technologies</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {skillsCategories.map((category) => (
              <div
                key={category.title}
                className={`p-8 md:p-10 rounded-3xl border transition-all duration-300 ${
                  isDarkMode 
                  ? 'bg-[#0a0a0a] border-white/5 hover:border-amber-500/20 hover:bg-[#0f0f0f]' 
                  : 'bg-white border-slate-200 hover:border-amber-500/30'
                }`}
              >
                {category.icon}
                <h4 className="font-black text-2xl mb-2">{category.title}</h4>
                <p className={`text-sm mb-8 font-medium h-10 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{category.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg border transition-all ${
                        isDarkMode 
                        ? 'bg-[#0f0f0f] border-white/10 text-slate-300 hover:bg-amber-500/10 hover:border-amber-500/30 hover:text-amber-500' 
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-600'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Tools & Concepts Badge Section */}
          <div className="mt-16 text-center max-w-4xl mx-auto">
            <p className={`text-sm font-bold uppercase tracking-widest mb-6 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Tools & Concepts</p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Google Maps API', 'Stripe', 'Git & GitHub', 'Postman', 'Linux', 'Agile Environments', 'JWT'].map((tool) => (
                <span key={tool} className={`px-4 py-2 rounded-full text-xs font-bold border ${isDarkMode ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-white border-slate-200 text-slate-700'}`}>
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-20">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-amber-500 mb-4">Portfolio</h2>
            <h3 className="text-4xl md:text-5xl font-black">Featured Projects</h3>
          </div>

          <div className="space-y-24">
            {projects.map((project, idx) => (
              <div key={project.title} className={`grid lg:grid-cols-12 gap-12 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                
                <div className={`lg:col-span-7 ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
                  <div className="relative group rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                    <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-500"></div>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-[400px] object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                    />
                  </div>
                </div>

                <div className={`lg:col-span-5 ${idx % 2 !== 0 ? 'lg:order-1' : ''}`}>
                  <p className="text-amber-500 font-bold text-xs uppercase tracking-widest mb-3">{project.role}</p>
                  <h4 className="text-3xl md:text-4xl font-black mb-6 leading-tight">{project.title}</h4>
                  
                  <div className={`p-6 rounded-2xl mb-6 relative z-20 ${isDarkMode ? 'bg-[#111] border border-white/5' : 'bg-slate-50 border border-slate-200'} shadow-lg -ml-0 lg:-ml-12`}>
                    <p className={`text-sm leading-relaxed font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {project.description}
                    </p>
                  </div>

                  <div className="mb-8">
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {project.highlights.map(hl => (
                        <li key={hl} className="flex items-center text-xs font-semibold text-slate-500">
                          <CheckCircle className="w-3 h-3 mr-2 text-amber-500" /> {hl}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((tech) => (
                      <span key={tech} className={`px-3 py-1 font-bold text-[10px] uppercase tracking-wider rounded ${isDarkMode ? 'bg-white/10 text-white' : 'bg-black/10 text-black'}`}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-6">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-bold hover:text-amber-500 transition-colors uppercase tracking-wider">
                      <Github className="w-4 h-4 mr-2" /> Source Code
                    </a>
                    {project.liveLink && project.liveLink !== '#' && (
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-bold hover:text-amber-500 transition-colors uppercase tracking-wider">
                      <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                    </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications Section */}
      <section id="education" className={`py-32 ${isDarkMode ? 'bg-[#080808]' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-amber-500 mb-4">Academic Background</h2>
            <h3 className="text-4xl md:text-5xl font-black">Education & Certifications</h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Education */}
            <div className="space-y-8">
              <div className="flex items-center space-x-4 mb-8 border-b border-white/10 pb-4">
                <GraduationCap className="w-8 h-8 text-amber-500" />
                <h3 className="text-2xl font-black">Degree Programs</h3>
              </div>

              <div className={`p-8 rounded-2xl border ${isDarkMode ? 'bg-[#0a0a0a] border-white/5' : 'bg-white border-slate-200'} relative overflow-hidden group`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full transition-transform group-hover:scale-110"></div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div>
                    <h4 className="font-black text-xl mb-1">Master of Computer Applications</h4>
                    <p className="text-amber-500 font-bold text-sm">Galgotias University • Noida, UP</p>
                  </div>
                  <span className="text-sm font-bold text-slate-500">2026</span>
                </div>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Specialization in Artificial Intelligence & Machine Learning.
                </p>
              </div>

              <div className={`p-8 rounded-2xl border ${isDarkMode ? 'bg-[#0a0a0a] border-white/5' : 'bg-white border-slate-200'}`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-black text-xl mb-1">Bachelor of Commerce</h4>
                    <p className={`font-bold text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Sainik Degree College • Uttar Pradesh</p>
                  </div>
                </div>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Graduation in Commerce bridging foundational systems and management.
                </p>
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-8">
              <div className="flex items-center space-x-4 mb-8 border-b border-white/10 pb-4">
                <Award className="w-8 h-8 text-amber-500" />
                <h3 className="text-2xl font-black">Certifications</h3>
              </div>

              <div className="grid gap-4 max-h-[800px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-amber-500 scrollbar-track-transparent">
                {[
                  { title: 'Claude Code In Action', org: 'Anthropic', date: 'Aug 2026' },
                  { title: 'India Ai impact Buildthone', org: 'HCL GUVI', date: 'Feb 2026' },
                  { title: 'Web Developer', org: 'CodeAlpha', date: 'Dec 2025' },
                  { title: 'Ai Tool Workshop', org: 'Be10x', date: 'Dec 2025' },
                  { title: 'AWS APAC - Solutions Architecture Job Simulation', org: 'Forage', date: 'Mar 2025' },
                  { title: 'Goldman Sachs - Software Engineering Job Simulation', org: 'Forage', date: 'Feb 2025' },
                  { title: 'C programing Basics', org: 'Simplilearn', date: 'Feb 2025' },
                  { title: 'Introduction to the Fundamental of Databases', org: 'Simplilearn', date: 'Jan 2025' },
                  { title: 'Fundamentals of Responsible Generative AI', org: 'Microsoft', date: 'May 2024' },
                  { title: 'Mastering of JavaScript Fundamentals', org: 'Geekster', date: 'May 2024' },
                  { title: 'Introduction of GitHub copilot', org: 'Microsoft', date: 'May 2024' },
                  { title: 'Introduction of Prompt engineering with GitHub copilot', org: 'Microsoft', date: 'May 2024' },
                  { title: 'Intership complete', org: 'Ypsilon It Solution', date: 'Jan 2024' },
                  { title: 'Frontent UI with React.js', org: 'Universal Informatics', date: 'Oct 2023' },
                  { title: 'Web development', org: 'CSEdge', date: 'May 2024' }
                ].map((cert, i) => (
                  <div key={i} className={`p-5 rounded-xl border flex justify-between items-center transition-colors ${
                    isDarkMode 
                    ? 'bg-[#0a0a0a] border-white/5 hover:border-amber-500/30' 
                    : 'bg-white border-slate-200 hover:border-amber-500/50'
                  }`}>
                    <div>
                      <h5 className="font-bold text-sm">{cert.title}</h5>
                      <p className={`text-xs font-semibold mt-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>{cert.org}</p>
                    </div>
                    {cert.date && <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider min-w-[65px] text-right">{cert.date}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            
            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-amber-500 mb-4">Get In Touch</h2>
              <h3 className="text-5xl md:text-6xl font-black mb-8 leading-tight">Let's build<br/>something<br/>great together.</h3>
              <p className={`text-lg font-medium mb-12 max-w-md ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Currently available for Full Stack development and Data Analysis roles. Feel free to reach out.
              </p>

              <div className="space-y-8">
                <a href="tel:+917543936835" className="flex items-center group">
                  <div className={`p-4 rounded-full mr-4 transition-colors ${isDarkMode ? 'bg-[#111] group-hover:bg-amber-500/10' : 'bg-slate-100 group-hover:bg-amber-50'}`}>
                    <Phone className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold text-slate-500 block mb-1">Phone</span>
                    <span className="text-lg font-bold group-hover:text-amber-500 transition-colors">+91 7543936835</span>
                  </div>
                </a>
                
                <a href="mailto:rohitkumarsng01@gmail.com" className="flex items-center group">
                  <div className={`p-4 rounded-full mr-4 transition-colors ${isDarkMode ? 'bg-[#111] group-hover:bg-amber-500/10' : 'bg-slate-100 group-hover:bg-amber-50'}`}>
                    <Mail className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold text-slate-500 block mb-1">Email</span>
                    <span className="text-lg font-bold group-hover:text-amber-500 transition-colors">rohitkumarsng01@gmail.com</span>
                  </div>
                </a>
              </div>
            </div>

            <div className={`p-8 md:p-12 rounded-3xl border ${isDarkMode ? 'bg-[#0a0a0a] border-white/5' : 'bg-white border-slate-200'}`}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    className={`w-full px-5 py-4 border-b-2 focus:border-amber-500 bg-transparent transition-colors outline-none font-bold ${
                      isDarkMode ? 'border-white/10 text-white placeholder-slate-700' : 'border-slate-200 text-slate-900 placeholder-slate-300'
                    }`}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className={`w-full px-5 py-4 border-b-2 focus:border-amber-500 bg-transparent transition-colors outline-none font-bold ${
                      isDarkMode ? 'border-white/10 text-white placeholder-slate-700' : 'border-slate-200 text-slate-900 placeholder-slate-300'
                    }`}
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                    className={`w-full px-5 py-4 border-b-2 focus:border-amber-500 bg-transparent transition-colors outline-none font-bold resize-none ${
                      isDarkMode ? 'border-white/10 text-white placeholder-slate-700' : 'border-slate-200 text-slate-900 placeholder-slate-300'
                    }`}
                    placeholder="Tell me about your project..."
                  />
                </div>

                {formStatus === 'success' && <p className="text-green-500 font-bold text-sm">Message sent successfully!</p>}
                {formStatus === 'error' && <p className="text-red-500 font-bold text-sm">Error sending message. Please try again.</p>}

                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className={`w-full py-5 font-black uppercase tracking-wider flex items-center justify-center transition-all ${
                    formStatus === 'sending'
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-amber-500 hover:bg-amber-400 text-black'
                  }`}
                >
                  {formStatus === 'sending' ? 'Sending...' : 'Send Message'} <Send className="w-5 h-5 ml-3" />
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 border-t mt-12 ${isDarkMode ? 'border-white/5 bg-[#050505]' : 'border-slate-200 bg-zinc-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            © 2026 Rohit Kumar.
          </p>
          <div className="flex gap-6">
            <a href="https://github.com/Rohitsng01" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-amber-500 transition-colors"><Github className="w-5 h-5" /></a>
            <a href="https://www.linkedin.com/in/rohit-kumar000" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-amber-500 transition-colors"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;