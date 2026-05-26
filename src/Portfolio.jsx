import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ExternalLink, Zap, Users, Briefcase, BookOpen, ArrowRight, Calendar, Tag, Search, Linkedin, Twitter, Facebook, Mail, Loader } from 'lucide-react';

export default function Portfolio() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedBlogPost, setSelectedBlogPost] = useState(null);
  const [blogSearchTerm, setBlogSearchTerm] = useState('');
  const [wordPressPosts, setWordPressPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState(null);

  // Fetch WordPress posts on component mount
  useEffect(() => {
    fetchWordPressPosts();
  }, []);

  const fetchWordPressPosts = async () => {
    try {
      setPostsLoading(true);
      // Using CORS proxy to bypass CORS restrictions
      const corsProxy = 'https://api.allorigins.win/raw?url=';
      const wordPressUrl = 'https://theboldn.wordpress.com/wp-json/wp/v2/posts?per_page=20&_embed';
      const proxyUrl = corsProxy + encodeURIComponent(wordPressUrl);
      
      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      
      // Transform WordPress posts to match our format
      const transformedPosts = data.map(post => ({
        id: post.id,
        title: post.title.rendered,
        excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 150),
        date: new Date(post.date).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        category: post.categories && post.categories.length > 0 ? 'Article' : 'Insights',
        content: post.content.rendered,
        image: post._embedded && post._embedded['wp:featuredmedia'] 
          ? post._embedded['wp:featuredmedia'][0].source_url 
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        link: post.link,
        isWordPress: true
      }));
      
      setWordPressPosts(transformedPosts);
      setPostsError(null);
    } catch (error) {
      console.error('Error fetching WordPress posts:', error);
      setPostsError('Could not load blog posts. Please try again later.');
      setWordPressPosts([]);
    } finally {
      setPostsLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (page, postId = null) => {
    setCurrentPage(page);
    setSelectedBlogPost(postId);
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  };

  const projects = [
    {
      title: 'Lucid Hub',
      subtitle: 'Leadership Development Platform',
      description: 'Founded & lead a transformative platform delivering "Inspire. Empower. Transform." through leadership curricula.',
      icon: Zap,
      tags: ['Leadership', 'Curriculum Design', 'Digital Products'],
      color: 'from-emerald-500 to-teal-600'
    },
    {
      title: 'Project Aqua',
      subtitle: 'Distribution Planning & Strategy',
      description: 'Led comprehensive distribution planning for bottled water production across Lagos & Ogun States.',
      icon: Briefcase,
      tags: ['Project Management', 'Strategy', 'Logistics'],
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'RCCG Central Missions Board',
      subtitle: 'Executive Assistant & Skills Development',
      description: 'Executive Assistant managing strategic initiatives and skills development programs.',
      icon: Users,
      tags: ['Strategy', 'Leadership', 'Community'],
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Avodah Finance',
      subtitle: 'Account Officer & Compliance',
      description: 'Produced comprehensive corporate disclosure & compliance documentation.',
      icon: BookOpen,
      tags: ['Finance', 'Compliance', 'Strategy'],
      color: 'from-amber-500 to-orange-600'
    }
  ];

  const expertise = [
    {
      category: 'Leadership Development',
      items: ['Curriculum Design', 'Facilitation', 'Coach Training', 'Organizational Change']
    },
    {
      category: 'Project Management',
      items: ['Scope & WBS', 'Resource Planning', 'Risk Management', 'Stakeholder Communication']
    },
    {
      category: 'Strategic Planning',
      items: ['Business Strategy', 'Distribution Planning', 'Market Analysis', 'Implementation']
    },
    {
      category: 'Content & Design',
      items: ['Video Editing', 'Social Media Strategy', 'Visual Design', 'Digital Products']
    }
  ];

  const certifications = [
    'Google Project Management Professional Certificate',
    'DSA Certification',
    'DEXA Certification',
    'Exford Global Certification'
  ];

  // Filter blog posts
  const filteredPosts = wordPressPosts.filter(post =>
    post.title.toLowerCase().includes(blogSearchTerm.toLowerCase())
  );

  // Selected blog post
  const viewingPost = selectedBlogPost ? wordPressPosts.find(p => p.id === selectedBlogPost) : null;

  // Page Components
  const HomePage = () => (
    <div>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-fadeInUp w-full">
          <h1 className="text-5xl sm:text-7xl font-bold leading-tight">
            <span className="block text-white mb-2">Inspire.</span>
            <span className="block bg-gradient-to-r from-emerald-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Empower. Transform.
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Leadership strategist, project management expert, and founder of Lucid Hub. I develop leaders, deliver strategic initiatives, and create transformative experiences through education and innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <button
              onClick={() => navigateTo('work')}
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 transform hover:scale-105"
            >
              View My Work
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="px-8 py-3 border-2 border-emerald-400 rounded-lg font-semibold text-emerald-400 hover:bg-emerald-400 hover:text-slate-900 transition-all duration-300"
            >
              Get in Touch
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-emerald-400" size={32} />
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Featured Work</h2>
          <p className="text-center text-gray-400 mb-16">Explore key projects that showcase strategic thinking and execution</p>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {projects.slice(0, 2).map((project, idx) => {
              const Icon = project.icon;
              return (
                <div
                  key={idx}
                  className="group bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-8 hover:border-emerald-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 transform hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${project.color} p-2.5 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-emerald-400 text-sm font-semibold mb-4">{project.subtitle}</p>
                  <p className="text-gray-400 leading-relaxed mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs bg-emerald-400/10 text-emerald-300 px-3 py-1 rounded-full border border-emerald-400/30">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => navigateTo('work')}
            className="w-full py-3 border-2 border-emerald-400 rounded-lg font-semibold text-emerald-400 hover:bg-emerald-400 hover:text-slate-900 transition-all duration-300 flex items-center justify-center gap-2"
          >
            View All Projects <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Latest Insights</h2>
          <p className="text-center text-gray-400 mb-16">Thoughts on leadership, strategy, and growth</p>
          
          {postsLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader className="animate-spin text-emerald-400" size={32} />
              <span className="ml-3 text-gray-400">Loading your blog posts...</span>
            </div>
          ) : postsError ? (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-6 text-center text-red-400">
              {postsError}
            </div>
          ) : wordPressPosts.length > 0 ? (
            <>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {wordPressPosts.slice(0, 3).map(post => (
                  <div
                    key={post.id}
                    onClick={() => navigateTo('blog', post.id)}
                    className="cursor-pointer group bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl overflow-hidden hover:border-blue-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 transform hover:-translate-y-1"
                  >
                    <div
                      className="h-32 bg-gradient-to-br group-hover:scale-110 transition-transform duration-300 bg-cover bg-center"
                      style={typeof post.image === 'string' && post.image.startsWith('http') 
                        ? { backgroundImage: `url(${post.image})` }
                        : { background: post.image }
                      }
                    ></div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Tag size={14} className="text-emerald-400" />
                        <span className="text-xs font-semibold text-emerald-400">{post.category}</span>
                      </div>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2">{post.title}</h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar size={12} />
                        {post.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigateTo('blog')}
                className="w-full py-3 border-2 border-blue-400 rounded-lg font-semibold text-blue-400 hover:bg-blue-400 hover:text-slate-900 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Read All Articles <ArrowRight size={18} />
              </button>
            </>
          ) : (
            <div className="text-center text-gray-400">No blog posts found.</div>
          )}
        </div>
      </section>
    </div>
  );

  const AboutPage = () => (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        <div>
          <h1 className="text-5xl font-bold mb-8">About Me</h1>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                I'm a Project Manager and Executive Strategist with a passion for leadership development. As the founder and team lead of Lucid Hub, I create educational experiences that inspire growth and transformation.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                With expertise spanning from strategic planning to content creation, I help organizations and individuals unlock their potential through clarity, intentional design, and transformative learning.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                My background in Library and Information Science informs my approach to knowledge architecture and strategic communication. I hold multiple PM certifications and actively teach leadership development across organizations and communities.
              </p>
            </div>
            <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-400/20 rounded-xl p-8 space-y-4">
              <h3 className="text-2xl font-bold text-emerald-400 mb-6">Current Roles</h3>
              <div className="space-y-4">
                <div className="border-l-2 border-emerald-400 pl-4">
                  <p className="font-semibold text-white">Team Lead & Founder</p>
                  <p className="text-gray-400">Lucid Hub - Leadership Development</p>
                </div>
                <div className="border-l-2 border-blue-400 pl-4">
                  <p className="font-semibold text-white">Account Officer</p>
                  <p className="text-gray-400">Avodah Finance</p>
                </div>
                <div className="border-l-2 border-cyan-400 pl-4">
                  <p className="font-semibold text-white">Executive Assistant</p>
                  <p className="text-gray-400">RCCG Central Missions Board</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expertise */}
        <div>
          <h2 className="text-4xl font-bold mb-12">Expertise & Skills</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {expertise.map((area, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 hover:border-blue-400/50 transition-colors duration-300"
              >
                <h3 className="text-lg font-bold mb-4 text-blue-400">{area.category}</h3>
                <ul className="space-y-2">
                  {area.items.map(item => (
                    <li key={item} className="text-gray-400 flex items-start">
                      <span className="text-emerald-400 mr-3 mt-0.5">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-gradient-to-r from-emerald-500/5 to-blue-500/5 border border-slate-700 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-6">Certifications</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {certifications.map(cert => (
              <div key={cert} className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                {cert}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const WorkPage = () => (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-8">Projects & Work</h1>
        <p className="text-gray-400 text-lg mb-16">Strategic initiatives and transformative projects I've led</p>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => {
            const Icon = project.icon;
            return (
              <div
                key={idx}
                className="group bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-8 hover:border-emerald-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 transform hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${project.color} p-2.5 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-emerald-400 text-sm font-semibold mb-4">{project.subtitle}</p>
                <p className="text-gray-400 leading-relaxed mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs bg-emerald-400/10 text-emerald-300 px-3 py-1 rounded-full border border-emerald-400/30">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const BlogPage = () => (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">Insights & Articles</h1>
        <p className="text-gray-400 text-lg mb-12">From The Bold N - Leadership, Strategy & Growth</p>

        {/* Search */}
        <div className="relative mb-12">
          <Search className="absolute left-4 top-4 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search articles..."
            value={blogSearchTerm}
            onChange={(e) => setBlogSearchTerm(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-colors"
          />
        </div>

        {/* Blog Grid */}
        {postsLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader className="animate-spin text-emerald-400" size={32} />
            <span className="ml-3 text-gray-400">Loading articles...</span>
          </div>
        ) : postsError ? (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-6 text-center text-red-400">
            {postsError}
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <div
                key={post.id}
                onClick={() => navigateTo('blog', post.id)}
                className="cursor-pointer group bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl overflow-hidden hover:border-blue-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 transform hover:-translate-y-1"
              >
                <div
                  className="h-40 bg-gradient-to-br group-hover:scale-110 transition-transform duration-300 bg-cover bg-center"
                  style={typeof post.image === 'string' && post.image.startsWith('http')
                    ? { backgroundImage: `url(${post.image})` }
                    : { background: post.image }
                  }
                ></div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag size={14} className="text-emerald-400" />
                    <span className="text-xs font-semibold text-emerald-400">{post.category}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar size={12} />
                    {post.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="col-span-3 text-center text-gray-400 py-12">
            No articles found matching your search.
          </div>
        )}
      </div>
    </div>
  );

  const BlogPostPage = () => {
    if (!viewingPost) return null;

    return (
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigateTo('blog')}
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors mb-8"
          >
            ← Back to Articles
          </button>

          <article className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Tag size={16} className="text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-400">{viewingPost.category}</span>
              </div>
              <h1 className="text-5xl font-bold mb-4">{viewingPost.title}</h1>
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar size={16} />
                {viewingPost.date}
              </div>
            </div>

            {typeof viewingPost.image === 'string' && viewingPost.image.startsWith('http') ? (
              <img
                src={viewingPost.image}
                alt={viewingPost.title}
                className="w-full h-64 object-cover rounded-xl"
              />
            ) : (
              <div
                className="h-64 rounded-xl bg-gradient-to-br"
                style={{ background: viewingPost.image }}
              ></div>
            )}

            <div className="prose prose-invert max-w-none text-gray-300 space-y-6 leading-relaxed">
              <div 
                dangerouslySetInnerHTML={{ __html: viewingPost.content }}
                className="text-lg whitespace-pre-wrap prose-p:text-gray-300 prose-h2:text-white prose-h3:text-white prose-strong:text-emerald-300 prose-a:text-blue-400 prose-a:hover:text-blue-300"
              />
            </div>

            <div className="border-t border-slate-700 pt-8 mt-12">
              <p className="text-gray-400 mb-4">Share this article:</p>
              <div className="flex gap-4">
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(viewingPost.link)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-blue-500/10 rounded-lg text-blue-400 hover:bg-blue-500/20 transition-colors"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(viewingPost.link)}&text=${encodeURIComponent(viewingPost.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-blue-400/10 rounded-lg text-blue-400 hover:bg-blue-400/20 transition-colors"
                >
                  <Twitter size={20} />
                </a>
                <a 
                  href={viewingPost.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                >
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  };

  const ContactPage = () => (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 text-center">Let's Connect</h1>
        <p className="text-xl text-gray-300 text-center mb-16">
          Whether you're looking to develop leaders, execute strategic initiatives, or explore opportunities for collaboration.
        </p>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-12 space-y-8">
          <div className="space-y-4">
            <label className="text-sm font-semibold text-gray-300">Email</label>
            <a href="mailto:contact@gcrown.com" className="block text-2xl font-bold text-emerald-400 hover:text-emerald-300 transition-colors">
              contact@gcrown.com
            </a>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>

          <div className="space-y-4">
            <label className="text-sm font-semibold text-gray-300">Location</label>
            <p className="text-xl text-white">Lagos, Nigeria</p>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>

          <div className="space-y-4">
            <label className="text-sm font-semibold text-gray-300">Connect With Me</label>
            <div className="flex gap-4 flex-wrap">
              <a href="https://linkedin.com/in/g-crown" target="_blank" rel="noopener noreferrer" className="p-4 bg-blue-500/10 rounded-lg hover:bg-blue-500/20 text-blue-400 transition-colors hover:scale-110 transform duration-300">
                <Linkedin size={24} />
              </a>
              <a href="https://twitter.com/gcrown_" target="_blank" rel="noopener noreferrer" className="p-4 bg-blue-400/10 rounded-lg hover:bg-blue-400/20 text-blue-400 transition-colors hover:scale-110 transform duration-300">
                <Twitter size={24} />
              </a>
              <a href="https://facebook.com/g.crown" target="_blank" rel="noopener noreferrer" className="p-4 bg-blue-600/10 rounded-lg hover:bg-blue-600/20 text-blue-500 transition-colors hover:scale-110 transform duration-300">
                <Facebook size={24} />
              </a>
              <a href="https://wa.me/234XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="p-4 bg-green-500/10 rounded-lg hover:bg-green-500/20 text-green-400 transition-colors hover:scale-110 transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              </a>
              <a href="mailto:contact@gcrown.com" className="p-4 bg-red-500/10 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors hover:scale-110 transform duration-300">
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-x-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-slate-950/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => navigateTo('home')}
              className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              G.Crown
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8">
              {[
                { page: 'home', label: 'Home' },
                { page: 'about', label: 'About' },
                { page: 'work', label: 'Work' },
                { page: 'blog', label: 'Blog' },
                { page: 'contact', label: 'Contact' }
              ].map(item => (
                <button
                  key={item.page}
                  onClick={() => navigateTo(item.page)}
                  className={`font-medium transition-colors duration-300 ${
                    currentPage === item.page ? 'text-emerald-400' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-slate-900 border-t border-slate-700 py-4 space-y-3 animate-slideDown">
              {[
                { page: 'home', label: 'Home' },
                { page: 'about', label: 'About' },
                { page: 'work', label: 'Work' },
                { page: 'blog', label: 'Blog' },
                { page: 'contact', label: 'Contact' }
              ].map(item => (
                <button
                  key={item.page}
                  onClick={() => navigateTo(item.page)}
                  className="block w-full text-left px-4 py-2 text-gray-300 hover:text-emerald-400 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Page Content */}
      <div className="relative z-10">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'work' && <WorkPage />}
        {currentPage === 'blog' && selectedBlogPost ? <BlogPostPage /> : <BlogPage />}
        {currentPage === 'contact' && <ContactPage />}
      </div>

      {/* Floating Profile Card - Bottom Right (Compact & Interactive) */}
      <div className="fixed bottom-8 right-8 z-30 group">
        {/* Main Floating Button */}
        <div className="relative w-16 h-16">
          {/* Expanded Card (shows on hover) */}
          <div className="absolute bottom-0 right-0 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-4 origin-bottom-right">
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-1 shadow-2xl">
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-6 space-y-4">
                {/* Avatar Circle */}
                <div className="flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center shadow-lg">
                    <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-2xl font-bold text-emerald-400">
                      GC
                    </div>
                  </div>
                </div>

                {/* Name */}
                <div className="text-center space-y-1">
                  <h3 className="text-base font-bold text-white">Olugbenga Stephen Oke</h3>
                  <p className="text-xs text-emerald-400 font-semibold">Leadership Strategist & PM</p>
                  <p className="text-xs text-gray-400">Founder, Lucid Hub</p>
                </div>

                {/* Quick Bio */}
                <p className="text-xs text-gray-300 text-center leading-relaxed">
                  Inspiring leaders through strategy and intentional growth.
                </p>

                {/* Social Links */}
                <div className="flex justify-center gap-2 flex-wrap">
                  <a
                    href="https://www.linkedin.com/in/olugbengastephenoke"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-blue-500/20 rounded-lg text-blue-400 hover:bg-blue-500/40 transition-all duration-300 transform hover:scale-110"
                    title="LinkedIn"
                  >
                    <Linkedin size={16} />
                  </a>
                  <a
                    href="https://twitter.com/gcrown_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-blue-400/20 rounded-lg text-blue-300 hover:bg-blue-400/40 transition-all duration-300 transform hover:scale-110"
                    title="Twitter"
                  >
                    <Twitter size={16} />
                  </a>
                  <a
                    href="https://www.facebook.com/gbenga.stephen.773?mibextid=ZbWKwL"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-blue-600/20 rounded-lg text-blue-500 hover:bg-blue-600/40 transition-all duration-300 transform hover:scale-110"
                    title="Facebook"
                  >
                    <Facebook size={16} />
                  </a>
                  <a
                    href="https://wa.me/2348088372925"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-green-500/20 rounded-lg text-green-400 hover:bg-green-500/40 transition-all duration-300 transform hover:scale-110"
                    title="WhatsApp"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  </a>
                  <a
                    href="mailto:contact@gcrown.com"
                    className="p-2 bg-red-500/20 rounded-lg text-red-400 hover:bg-red-500/40 transition-all duration-300 transform hover:scale-110"
                    title="Email"
                  >
                    <Mail size={16} />
                  </a>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => navigateTo('contact')}
                  className="w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 text-xs"
                >
                  Get In Touch
                </button>
              </div>
            </div>
          </div>

          {/* Compact Avatar Button (always visible) */}
          <button
            onClick={() => navigateTo('contact')}
            className="w-full h-full rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 p-1 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-110 transform"
            title="Connect with G.Crown"
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-xl font-bold text-white hover:scale-95 transition-transform">
              GC
            </div>
          </button>
        </div>

        {/* Hover Indicator */}
        <div className="absolute -top-8 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-800 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap">
          Connect
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-700 py-8 px-4 text-center text-gray-400 bg-slate-950/50 backdrop-blur-sm">
        <p>© 2024 G.Crown. Crafted with purpose and precision. Blog powered by <a href="https://theboldn.wordpress.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300">The Bold N</a>.</p>
      </footer>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px) translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
