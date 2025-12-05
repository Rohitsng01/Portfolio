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
  Globe,
  User,
  Briefcase,
  Send,
  Menu,
  X,
  Sun,
  Moon,
  Download
} from 'lucide-react';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

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
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Resume.pdf';
    link.download = 'RohitKumarCV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
      return;
    }

    try {
      // Simulate sending (replace with actual email service like EmailJS, Formspree, etc.)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For now, just open email client as fallback
      const mailtoLink = `mailto:rohitkumarsng01@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}%0D%0A%0D%0AFrom: ${encodeURIComponent(formData.email)}`;
      window.location.href = mailtoLink;
      
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };
  
  const skills = [
    { name: 'React', level: 80, icon: <Code className="w-5 h-5" /> },
    { name: 'Java-Script', level: 80, icon: <Code className="w-5 h-5" /> },
    { name: 'Mongo-DB', level: 85, icon: <Database className="w-5 h-5" /> },
    { name: 'Node Js', level: 80, icon: <Globe className="w-5 h-5" /> },
    { name: 'Express.Js', level: 78, icon: <Globe className="w-5 h-5" /> },
    { name: 'Tailwindcss', level: 70, icon: <Palette className="w-5 h-5" /> }
  ];

  const projects = [
    {
      title: 'Bar Management System',
      description: 'Interactive bar and restaurant management application with modern UI, menu display, ordering system, and responsive design. Built with React and deployed on Vercel.',
      image: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['React', 'JavaScript', 'CSS', 'Vercel'],
      link: 'https://github.com/Rohitsng01',
      liveLink: 'https://bar-mocha.vercel.app/'
    },
    {
      title: 'Portfolio Website',
      description: 'Personal portfolio website built with React, TypeScript, and Tailwind CSS. Features dark/light mode, smooth animations, responsive design, and interactive sections.',
      image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      link: 'https://github.com/Rohitsng01/Portfolio',
      liveLink: '#'
    },
    {
      title: 'Full-Stack Web Application',
      description: 'Modern full-stack application with authentication, real-time data updates, and RESTful API. Built with MERN stack showcasing end-to-end development skills.',
      image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['React', 'Node.js', 'MongoDB', 'Express'],
      link: 'https://github.com/Rohitsng01',
      liveLink: '#'
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode
      ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white'
      : 'bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 text-gray-900'
      }`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? isDarkMode
          ? 'bg-slate-900/95 backdrop-blur-md shadow-lg'
          : 'bg-white/95 backdrop-blur-md shadow-lg'
        : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className={`font-bold text-xl bg-gradient-to-r ${isDarkMode
              ? 'from-blue-400 to-purple-400'
              : 'from-blue-600 to-purple-600'
              } bg-clip-text text-transparent`}>
              Portfolio
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeSection === item.toLowerCase()
                      ? isDarkMode
                        ? 'text-blue-400 bg-blue-400/10'
                        : 'text-blue-600 bg-blue-100'
                      : isDarkMode
                        ? 'text-gray-300 hover:text-white hover:bg-white/10'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                  >
                    {item}
                  </button>
                ))}

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-lg transition-all duration-200 ${isDarkMode
                    ? 'text-gray-300 hover:text-white hover:bg-white/10'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                {/* Resume Download */}
                <button
                  onClick={downloadResume}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${isDarkMode
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
                    } transform hover:scale-105 shadow-lg hover:shadow-xl`}
                >
                  <Download className="w-4 h-4" />
                  <span>Resume</span>
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-md transition-colors ${isDarkMode
                  ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden backdrop-blur-md ${isDarkMode
            ? 'bg-slate-800/95'
            : 'bg-white/95'
            }`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`block px-3 py-2 text-base font-medium rounded-md w-full text-left transition-colors ${isDarkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                >
                  {item}
                </button>
              ))}

              {/* Mobile Theme Toggle and Resume */}
              <div className="flex space-x-2 px-3 py-2">
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-full transition-colors duration-200 focus:outline-none border-0 ${isDarkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button
                  onClick={downloadResume}
                  className={`flex-1 p-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${isDarkMode
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    }`}
                >
                  <Download className="w-4 h-4" />
                  <span className="text-sm">Resume</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className={`absolute inset-0 ${isDarkMode
          ? 'bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20'
          : 'bg-gradient-to-br from-blue-200/30 via-purple-200/30 to-pink-200/30'
          }`}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className={`bg-gradient-to-r ${isDarkMode
                ? 'from-blue-400 via-purple-400 to-pink-400'
                : 'from-blue-600 via-purple-600 to-pink-600'
                } bg-clip-text text-transparent`}>
                Rohit Kumar
              </span>
            </h1>
            <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
              Full-Stack Developer & UI/UX Designer crafting exceptional digital experiences with modern technologies
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection('projects')}
                className={`px-8 py-4 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl ${isDarkMode
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
                  }`}
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`px-8 py-4 border-2 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 ${isDarkMode
                  ? 'border-white/20 hover:bg-white/10 text-white'
                  : 'border-gray-300 hover:bg-gray-100 text-gray-700'
                  }`}
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className={`w-6 h-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 ${isDarkMode ? 'bg-slate-800/50' : 'bg-white/50'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className={`bg-gradient-to-r ${isDarkMode
                ? 'from-blue-400 to-purple-400'
                : 'from-blue-600 to-purple-600'
                } bg-clip-text text-transparent`}>
                About Me
              </span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
              Passionate about creating digital solutions that make a difference
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Hi, I'm Rohit Kumar!</h3>
              <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                I am a Full-Stack Developer specializing in building modern, scalable, and user-friendly web applications. With hands-on experience in React.js, Node.js, MongoDB, and Tailwind CSS, I enjoy translating ideas into interactive, high-performance solutions.
              </p>
              <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                When I'm not coding, I explore new design trends, contribute to open-source projects, and mentor aspiring developers. I am passionate about clean code, innovative design, and leveraging technology to solve real-world problems.
              </p>
              <div className="flex space-x-4">
                <a href="https://github.com/Rohitsng01" className={`p-3 rounded-lg transition-colors ${isDarkMode
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-blue-500 hover:bg-blue-600'
                  } text-white`}>
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/rohit-kumar000/" className={`p-3 rounded-lg transition-colors ${isDarkMode
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-blue-500 hover:bg-blue-600'
                  } text-white`}>
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="mailto:rohitkumarsng01@gmail.com" className={`p-3 rounded-lg transition-colors ${isDarkMode
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-blue-500 hover:bg-blue-600'
                  } text-white`}>
                  <Mail className="w-5 h-5" />
                </a>
              </div>

            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className={`p-6 rounded-xl backdrop-blur-sm border transition-colors ${isDarkMode
                ? 'bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-white/10'
                : 'bg-gradient-to-br from-blue-100/50 to-purple-100/50 border-gray-200'
                }`}>
                <User className={`w-8 h-8 mb-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                <h4 className="font-semibold text-lg mb-2">6+ Months</h4>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Internship Experience</p>
              </div>

              <div className={`p-6 rounded-xl backdrop-blur-sm border transition-colors ${isDarkMode
                ? 'bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-white/10'
                : 'bg-gradient-to-br from-purple-100/50 to-pink-100/50 border-gray-200'
                }`}>
                <Briefcase className={`w-8 h-8 mb-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'
                  }`} />
                <h4 className="font-semibold text-lg mb-2">5+ Projects</h4>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Academic & Personal Projects</p>
              </div>

              <div className={`p-6 rounded-xl backdrop-blur-sm border transition-colors ${isDarkMode
                ? 'bg-gradient-to-br from-pink-600/20 to-orange-600/20 border-white/10'
                : 'bg-gradient-to-br from-pink-100/50 to-orange-100/50 border-gray-200'
                }`}>
                <Code className={`w-8 h-8 mb-4 ${isDarkMode ? 'text-pink-400' : 'text-pink-600'
                  }`} />
                <h4 className="font-semibold text-lg mb-2">10+ Technologies</h4>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Hands-on with React, Node.js, MongoDB, Tailwind CSS & more</p>
              </div>

              <div className={`p-6 rounded-xl backdrop-blur-sm border transition-colors ${isDarkMode
                ? 'bg-gradient-to-br from-orange-600/20 to-yellow-600/20 border-white/10'
                : 'bg-gradient-to-br from-orange-100/50 to-yellow-100/50 border-gray-200'
                }`}>
                <Globe className={`w-8 h-8 mb-4 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'
                  }`} />
                <h4 className="font-semibold text-lg mb-2">Learning & Growth</h4>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Passionate fresher eager to contribute and grow in tech industry</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className={`bg-gradient-to-r ${isDarkMode
                ? 'from-purple-400 to-pink-400'
                : 'from-purple-600 to-pink-600'
                } bg-clip-text text-transparent`}>
                Skills & Expertise
              </span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
              Key technologies and tools I use to create robust and scalable web applications
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className={`p-6 rounded-xl backdrop-blur-sm border transition-all duration-300 group ${isDarkMode
                  ? 'bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-white/10 hover:border-purple-500/50'
                  : 'bg-gradient-to-br from-white/50 to-gray-50/50 border-gray-200 hover:border-purple-400/50'
                  }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center mb-4">
                  <div className={`p-2 rounded-lg mr-3 transition-colors ${isDarkMode
                    ? 'bg-purple-600/20 group-hover:bg-purple-600/30'
                    : 'bg-purple-100 group-hover:bg-purple-200'
                    }`}>
                    {skill.icon}
                  </div>
                  <h3 className="font-semibold text-lg">{skill.name}</h3>
                </div>
                <div className={`w-full rounded-full h-2 ${isDarkMode ? 'bg-slate-600/30' : 'bg-gray-200'
                  }`}>
                  <div
                    className={`h-2 rounded-full transition-all duration-1000 ease-out ${isDarkMode
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600'
                      }`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>{skill.level}% Proficiency</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 ${isDarkMode ? 'bg-slate-800/30' : 'bg-gray-50/50'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className={`bg-gradient-to-r ${isDarkMode
                ? 'from-pink-400 to-orange-400'
                : 'from-pink-600 to-orange-600'
                } bg-clip-text text-transparent`}>
                Featured Projects
              </span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
              Some of my recent work demonstrating full-stack development, responsive design, and modern UI/UX
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.title}
                className={`group relative overflow-hidden rounded-xl backdrop-blur-sm border transition-all duration-300 ${isDarkMode
                  ? 'bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-white/10 hover:border-pink-500/50'
                  : 'bg-gradient-to-br from-white/50 to-gray-50/50 border-gray-200 hover:border-pink-400/50'
                  }`}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className={`font-semibold text-xl mb-2 transition-colors ${isDarkMode
                    ? 'group-hover:text-pink-400'
                    : 'group-hover:text-pink-600'
                    }`}>
                    {project.title}
                  </h3>
                  <p className={`text-sm mb-4 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${isDarkMode
                          ? 'bg-pink-600/20 text-pink-300'
                          : 'bg-pink-100 text-pink-700'
                          }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center font-medium hover:underline ${isDarkMode
                        ? 'text-pink-400 hover:text-pink-300'
                        : 'text-pink-600 hover:text-pink-500'
                      }`}
                    >
                      <Github className="mr-1 w-4 h-4" />
                      Code
                    </a>
                    {project.liveLink && project.liveLink !== '#' && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center font-medium hover:underline ${isDarkMode
                          ? 'text-pink-400 hover:text-pink-300'
                          : 'text-pink-600 hover:text-pink-500'
                        }`}
                      >
                        <ExternalLink className="mr-1 w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className={`bg-gradient-to-r ${isDarkMode
                ? 'from-orange-400 to-red-400'
                : 'from-orange-600 to-red-600'
                } bg-clip-text text-transparent`}>
                Get In Touch
              </span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
              Interested in collaborating or hiring? Let's connect and create something amazing together.
            </p>

          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <h3 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>Let's Connect</h3>
                <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                  I'm always interested in hearing about new projects and opportunities.
                  Whether you're a company looking to hire, or you're a fellow developer
                  wanting to collaborate, I'd love to hear from you.
                </p>

                <div className="space-y-4">
                  <a href="mailto:rohitkumarsng01@gmail.com" className="flex items-center space-x-4 group">
                    <div className={`p-3 rounded-lg transition-colors group-hover:bg-orange-200 ${isDarkMode
                      ? 'bg-orange-600/20 group-hover:bg-orange-600/40'
                      : 'bg-orange-100 group-hover:bg-orange-200'
                      }`}>
                      <Mail className={`w-5 h-5 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'
                        }`} />
                    </div>
                    <span className={`group-hover:underline cursor-pointer ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      rohitkumarsng01@gmail.com
                    </span>
                  </a>

                  <a href="https://github.com/Rohitsng01" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 group">
                    <div className={`p-3 rounded-lg transition-colors group-hover:bg-orange-200 ${isDarkMode
                      ? 'bg-orange-600/20 group-hover:bg-orange-600/40'
                      : 'bg-orange-100 group-hover:bg-orange-200'
                      }`}>
                      <Github className={`w-5 h-5 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'
                        }`} />
                    </div>
                    <span className={`group-hover:underline cursor-pointer ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      github.com/Rohitsng01
                    </span>
                  </a>
                  <a href="https://www.linkedin.com/in/rohit-kumar000/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 group">
                    <div className={`p-3 rounded-lg transition-colors group-hover:bg-orange-200 ${isDarkMode
                      ? 'bg-orange-600/20 group-hover:bg-orange-600/40'
                      : 'bg-orange-100 group-hover:bg-orange-200'
                      }`}>
                      <Linkedin className={`w-5 h-5 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'
                        }`} />
                    </div>
                    <span className={`group-hover:underline cursor-pointer ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      linkedin.com/in/rohit-kumar000
                    </span>
                  </a>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors ${isDarkMode
                      ? 'bg-slate-800/50 border-white/10 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors ${isDarkMode
                      ? 'bg-slate-800/50 border-white/10 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors resize-none ${isDarkMode
                      ? 'bg-slate-800/50 border-white/10 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                    placeholder="Tell me about your project..."
                  />
                </div>
                {formStatus === 'success' && (
                  <div className="p-4 rounded-lg bg-green-500/20 border border-green-500/50 text-green-400 text-sm">
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                {formStatus === 'error' && (
                  <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 text-sm">
                    Please fill out all fields.
                  </div>
                )}
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className={`w-full px-8 py-4 rounded-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center space-x-2 text-white ${
                    formStatus === 'sending' 
                      ? 'bg-gray-500 cursor-not-allowed' 
                      : isDarkMode
                        ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700'
                        : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
                  }`}
                >
                  <span>{formStatus === 'sending' ? 'Sending...' : 'Send Message'}</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 border-t ${isDarkMode
        ? 'border-white/10 bg-slate-900/50'
        : 'border-gray-200 bg-gray-50/50'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              © 2025 Rohit Kumar. Built with React, TypeScript & Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;