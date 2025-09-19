'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Tutorial,
  Documentation,
  FAQItem,
  VideoGuide,
  SupportTicket,
  SearchResult,
  Announcement
} from '@/types/help';
import {
  searchHelp,
  calculateTutorialProgress,
  formatVideoDuration,
  getPopularFAQs,
  getTicketPriorityColor,
  getTicketStatusColor,
  getAnnouncementIcon
} from '@/lib/help-utils';
import {
  Search,
  BookOpen,
  PlayCircle,
  HelpCircle,
  MessageSquare,
  ChevronRight,
  ChevronDown,
  Star,
  Clock,
  User,
  Filter,
  X,
  Plus,
  Send,
  Paperclip,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Share2,
  Download,
  ExternalLink,
  Award,
  TrendingUp,
  Zap,
  Info,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Play,
  Pause,
  SkipForward,
  Volume2,
  Maximize,
  Home
} from 'lucide-react';

export default function HelpPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [documentation, setDocumentation] = useState<Documentation[]>([]);
  const [faqs, setFAQs] = useState<FAQItem[]>([]);
  const [videos, setVideos] = useState<VideoGuide[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoGuide | null>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    description: '',
    category: 'question' as const,
    priority: 'medium' as const
  });
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadHelpContent();
  }, []);

  const loadHelpContent = async () => {
    try {
      const [tutorialsRes, docsRes, faqsRes, videosRes, ticketsRes, announcementsRes] = await Promise.all([
        fetch('/api/help/tutorials'),
        fetch('/api/help/documentation'),
        fetch('/api/help/faqs'),
        fetch('/api/help/videos'),
        fetch('/api/help/tickets'),
        fetch('/api/help/announcements')
      ]);

      if (tutorialsRes.ok) setTutorials(await tutorialsRes.json());
      if (docsRes.ok) setDocumentation(await docsRes.json());
      if (faqsRes.ok) setFAQs(await faqsRes.json());
      if (videosRes.ok) setVideos(await videosRes.json());
      if (ticketsRes.ok) setTickets(await ticketsRes.json());
      if (announcementsRes.ok) setAnnouncements(await announcementsRes.json());
    } catch (error) {
      console.error('Failed to load help content:', error);
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const results = searchHelp(searchQuery, {
      tutorials,
      documentation,
      faqs,
      videos
    });

    setSearchResults(results);
    if (results.length > 0) {
      setActiveTab('search');
    }
  };

  const startTutorial = (tutorial: Tutorial) => {
    setSelectedTutorial(tutorial);
    // In production, this would launch the interactive tutorial
    alert(`Starting tutorial: ${tutorial.title}`);
  };

  const submitTicket = async () => {
    if (!newTicket.subject || !newTicket.description) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch('/api/help/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTicket)
      });

      if (response.ok) {
        alert('Support ticket submitted successfully');
        setNewTicket({
          subject: '',
          description: '',
          category: 'question',
          priority: 'medium'
        });
        loadHelpContent();
      }
    } catch (error) {
      console.error('Failed to submit ticket:', error);
      alert('Failed to submit ticket');
    }
  };

  const popularFAQs = getPopularFAQs(faqs, 5);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
                <HelpCircle className="w-10 h-10 text-blue-600" />
                Help Center
              </h1>
              <p className="text-gray-600 mt-2">
                Get help, find answers, and learn how to use LessonCraft Studio
              </p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Contact Support
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search for help articles, tutorials, FAQs..."
              className="w-full px-4 py-3 pl-12 pr-32 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-2 px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Announcements */}
      {announcements.length > 0 && announcements[0].active && (
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getAnnouncementIcon(announcements[0].type)}</span>
                <div>
                  <span className="font-semibold">{announcements[0].title}</span>
                  <span className="ml-2 text-gray-700">{announcements[0].content}</span>
                  {announcements[0].link && (
                    <a href={announcements[0].link.url} className="ml-2 text-blue-600 hover:underline">
                      {announcements[0].link.text} →
                    </a>
                  )}
                </div>
              </div>
              {announcements[0].dismissible && (
                <button className="text-gray-500 hover:text-gray-700">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Quick Links */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => setActiveTab('tutorials')}
            className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <BookOpen className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="font-semibold mb-1">Tutorials</h3>
            <p className="text-sm text-gray-600">Step-by-step guides</p>
          </button>
          
          <button
            onClick={() => setActiveTab('videos')}
            className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <PlayCircle className="w-8 h-8 text-red-600 mb-3" />
            <h3 className="font-semibold mb-1">Video Guides</h3>
            <p className="text-sm text-gray-600">Watch and learn</p>
          </button>

          <button
            onClick={() => setActiveTab('faq')}
            className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <HelpCircle className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-semibold mb-1">FAQs</h3>
            <p className="text-sm text-gray-600">Common questions</p>
          </button>

          <button
            onClick={() => setActiveTab('support')}
            className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <MessageSquare className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-semibold mb-1">Support</h3>
            <p className="text-sm text-gray-600">Get personal help</p>
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: Home },
              { id: 'search', label: `Search Results (${searchResults.length})`, icon: Search, show: searchResults.length > 0 },
              { id: 'tutorials', label: 'Tutorials', icon: BookOpen },
              { id: 'documentation', label: 'Documentation', icon: BookOpen },
              { id: 'videos', label: 'Videos', icon: PlayCircle },
              { id: 'faq', label: 'FAQs', icon: HelpCircle },
              { id: 'support', label: 'Support', icon: MessageSquare }
            ].filter(tab => tab.show !== false).map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Getting Started */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
                <div className="grid grid-cols-3 gap-4">
                  {tutorials.filter(t => t.category === 'getting-started').slice(0, 3).map(tutorial => (
                    <div key={tutorial.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">{tutorial.title}</h3>
                        {tutorial.interactive && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">Interactive</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{tutorial.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {tutorial.duration} min
                        </span>
                        <button
                          onClick={() => startTutorial(tutorial)}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Start →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular FAQs */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                <div className="space-y-3">
                  {popularFAQs.map(faq => (
                    <div key={faq.id} className="border rounded-lg p-4">
                      <button
                        onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                        className="w-full flex items-center justify-between text-left"
                      >
                        <span className="font-medium">{faq.question}</span>
                        {expandedFAQ === faq.id ? (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                      {expandedFAQ === faq.id && (
                        <div className="mt-3 text-gray-600">
                          {faq.answer}
                          <div className="flex items-center gap-4 mt-3">
                            <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                              <ThumbsUp className="w-4 h-4" />
                              Helpful ({faq.helpful.yes})
                            </button>
                            <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                              <ThumbsDown className="w-4 h-4" />
                              Not helpful ({faq.helpful.no})
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Videos */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Featured Videos</h2>
                <div className="grid grid-cols-3 gap-4">
                  {videos.slice(0, 3).map(video => (
                    <div key={video.id} className="group cursor-pointer" onClick={() => setSelectedVideo(video)}>
                      <div className="relative rounded-lg overflow-hidden mb-2 bg-gray-200 aspect-video">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                          <PlayCircle className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="absolute bottom-2 right-2 px-2 py-1 bg-black bg-opacity-75 text-white text-xs rounded">
                          {formatVideoDuration(video.duration)}
                        </span>
                      </div>
                      <h3 className="font-medium group-hover:text-blue-600">{video.title}</h3>
                      <p className="text-sm text-gray-500">{video.views.toLocaleString()} views</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'search' && (
            <div>
              <h2 className="text-xl font-bold mb-4">
                Search Results for "{searchQuery}" ({searchResults.length} results)
              </h2>
              <div className="space-y-4">
                {searchResults.map(result => (
                  <div key={result.id} className="border-b pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-1 text-xs rounded ${
                            result.type === 'tutorial' ? 'bg-purple-100 text-purple-700' :
                            result.type === 'documentation' ? 'bg-blue-100 text-blue-700' :
                            result.type === 'faq' ? 'bg-green-100 text-green-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {result.type}
                          </span>
                          {result.category && (
                            <span className="text-sm text-gray-500">{result.category}</span>
                          )}
                        </div>
                        <h3 className="font-semibold text-blue-600 hover:underline cursor-pointer">
                          {result.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{result.excerpt}</p>
                        {result.highlights && result.highlights.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {result.highlights.map((highlight, index) => (
                              <p key={index} className="text-sm text-gray-500 italic">
                                "...{highlight}..."
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                      <button className="text-blue-600 hover:text-blue-700">
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tutorials' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Interactive Tutorials</h2>
                <select className="px-3 py-2 border rounded-lg">
                  <option>All Categories</option>
                  <option>Getting Started</option>
                  <option>Worksheets</option>
                  <option>Advanced</option>
                  <option>Admin</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {tutorials.map(tutorial => (
                  <div key={tutorial.id} className="border rounded-lg p-5 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{tutorial.title}</h3>
                        <p className="text-gray-600 text-sm">{tutorial.description}</p>
                      </div>
                      {tutorial.interactive && (
                        <Zap className="w-5 h-5 text-purple-600" />
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {tutorial.duration} min
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {tutorial.steps.length} steps
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        tutorial.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                        tutorial.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {tutorial.difficulty}
                      </span>
                    </div>

                    {tutorial.progress && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{calculateTutorialProgress(tutorial.progress.completedSteps, tutorial.steps.length)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${calculateTutorialProgress(tutorial.progress.completedSteps, tutorial.steps.length)}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {tutorial.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm">{tutorial.rating.toFixed(1)}</span>
                          </div>
                        )}
                        <span className="text-sm text-gray-500">
                          {tutorial.completions} completions
                        </span>
                      </div>
                      <button
                        onClick={() => startTutorial(tutorial)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        {tutorial.progress ? 'Continue' : 'Start'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  className="px-3 py-2 border rounded-lg w-64"
                />
              </div>

              <div className="space-y-4">
                {faqs.map(faq => (
                  <div key={faq.id} className="border rounded-lg">
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                      className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50"
                    >
                      <div className="text-left">
                        <div className="flex items-center gap-2 mb-1">
                          {faq.featured && (
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          )}
                          <h3 className="font-semibold">{faq.question}</h3>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span>{faq.category}</span>
                          <span>•</span>
                          <span>{faq.views} views</span>
                        </div>
                      </div>
                      {expandedFAQ === faq.id ? (
                        <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    
                    {expandedFAQ === faq.id && (
                      <div className="px-5 pb-4">
                        <div className="text-gray-600 mb-4">
                          {faq.answer}
                        </div>
                        
                        <div className="flex items-center justify-between border-t pt-3">
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500">Was this helpful?</span>
                            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-green-600">
                              <ThumbsUp className="w-4 h-4" />
                              Yes ({faq.helpful.yes})
                            </button>
                            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600">
                              <ThumbsDown className="w-4 h-4" />
                              No ({faq.helpful.no})
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <Share2 className="w-4 h-4 text-gray-500" />
                            </button>
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <Bookmark className="w-4 h-4 text-gray-500" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'support' && (
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Contact Support</h2>
              
              <div className="space-y-6">
                {/* Existing Tickets */}
                {tickets.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3">Your Recent Tickets</h3>
                    <div className="space-y-3">
                      {tickets.slice(0, 3).map(ticket => (
                        <div key={ticket.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium">{ticket.subject}</h4>
                              <p className="text-sm text-gray-600 mt-1">{ticket.description.substring(0, 100)}...</p>
                              <div className="flex items-center gap-3 mt-2">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${getTicketStatusColor(ticket.status)}`}>
                                  {ticket.status}
                                </span>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${getTicketPriorityColor(ticket.priority)}`}>
                                  {ticket.priority}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {new Date(ticket.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <button className="text-blue-600 hover:text-blue-700">
                              View →
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New Ticket Form */}
                <div>
                  <h3 className="font-semibold mb-3">Create New Ticket</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Subject *</label>
                      <input
                        type="text"
                        value={newTicket.subject}
                        onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Brief description of your issue"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Category</label>
                      <select
                        value={newTicket.category}
                        onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value as any })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="bug">Bug Report</option>
                        <option value="feature">Feature Request</option>
                        <option value="question">Question</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Priority</label>
                      <select
                        value={newTicket.priority}
                        onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value as any })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Description *</label>
                      <textarea
                        value={newTicket.description}
                        onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                        placeholder="Please provide as much detail as possible"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <button className="flex items-center gap-2 text-gray-600 hover:text-gray-700">
                        <Paperclip className="w-4 h-4" />
                        Attach files
                      </button>
                      <button
                        onClick={submitTicket}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Submit Ticket
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}