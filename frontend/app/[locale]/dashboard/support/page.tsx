'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { MessageSquare, Send, CheckCircle, AlertCircle, Clock, Ticket, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface SupportTicket {
  id: string;
  subject: string;
  message: string;
  category: string;
  priority: string;
  status: string;
  response: string | null;
  respondedAt: string | null;
  resolved: boolean;
  resolvedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function SupportPage() {
  const t = useTranslations('support');
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'my-tickets' | 'new-ticket'>('my-tickets');
  const [loading, setLoading] = useState(false);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [ticketInfo, setTicketInfo] = useState<{ id: string; subject: string; createdAt: string; status: string } | null>(null);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [expandedTickets, setExpandedTickets] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    category: 'other',
    priority: 'medium',
  });

  // Fetch user's tickets
  useEffect(() => {
    if (user && activeTab === 'my-tickets') {
      fetchTickets();
    }
  }, [user, activeTab]);

  const fetchTickets = async () => {
    setLoadingTickets(true);
    try {
      const response = await fetch('/api/support/tickets', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTickets(data.tickets || []);
      } else {
        toast.error(t('loadError'));
      }
    } catch (error) {
      console.error('Fetch tickets error:', error);
      toast.error(t('loadError'));
    } finally {
      setLoadingTickets(false);
    }
  };

  const toggleTicket = (ticketId: string) => {
    setExpandedTickets(prev => {
      const newSet = new Set(prev);
      if (newSet.has(ticketId)) {
        newSet.delete(ticketId);
      } else {
        newSet.add(ticketId);
      }
      return newSet;
    });
  };

  const handleDeleteTicket = async (ticketId: string, ticketSubject: string) => {
    if (!confirm(t('deleteConfirm'))) {
      return;
    }

    try {
      const response = await fetch(`/api/support/tickets/${ticketId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (response.ok) {
        toast.success(t('deleteSuccess'));
        // Remove ticket from local state
        setTickets(prev => prev.filter(t => t.id !== ticketId));
        // Close expanded ticket if it was open
        setExpandedTickets(prev => {
          const newSet = new Set(prev);
          newSet.delete(ticketId);
          return newSet;
        });
      } else {
        const data = await response.json();
        toast.error(data.error || t('deleteError'));
      }
    } catch (error) {
      console.error('Delete ticket error:', error);
      toast.error(t('deleteError'));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error(t('errorMessage'));
      router.push('/auth/signin');
      return;
    }

    setLoading(true);

    try {
      const requestBody = {
        ...formData,
        userId: user.id,
        email: user.email,
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email,
      };

      const response = await fetch('/api/support/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(t('successMessage'));
        setTicketInfo(data.ticket);
        setSubmitted(true);
        setFormData({
          subject: '',
          message: '',
          category: 'other',
          priority: 'medium',
        });
        // Refresh tickets list
        fetchTickets();
        // Switch to my tickets tab after a delay
        setTimeout(() => {
          setActiveTab('my-tickets');
          setSubmitted(false);
        }, 3000);
      } else {
        const errorMessage = data.error || data.details?.fieldErrors || t('errorMessage');
        toast.error(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
      }
    } catch (error) {
      console.error('Submit ticket error:', error);
      toast.error(t('errorMessage'));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      open: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-yellow-100 text-yellow-800',
      waiting: 'bg-orange-100 text-orange-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800',
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
        {t(`status.${status}` as any) || status.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const styles: Record<string, string> = {
      low: 'bg-gray-100 text-gray-700',
      medium: 'bg-blue-100 text-blue-700',
      high: 'bg-orange-100 text-orange-700',
      urgent: 'bg-red-100 text-red-700',
    };
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${styles[priority] || 'bg-gray-100 text-gray-700'}`}>
        {t(`priority.${priority}` as any) || priority.toUpperCase()}
      </span>
    );
  };

  const getCategoryLabel = (category: string) => {
    return t(`categories.${category}` as any) || category;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('pageTitle')}</h1>
            <p className="text-gray-600">
              {t('pageSubtitle')}
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-sm p-1 mb-6 flex gap-1">
            <button
              onClick={() => setActiveTab('my-tickets')}
              className={`flex-1 px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'my-tickets'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Ticket className="h-5 w-5" />
                <span>{t('myTickets')}</span>
                {tickets.length > 0 && (
                  <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                    activeTab === 'my-tickets' ? 'bg-white/20' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {tickets.length}
                  </span>
                )}
              </div>
            </button>
            <button
              onClick={() => setActiveTab('new-ticket')}
              className={`flex-1 px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'new-ticket'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Send className="h-5 w-5" />
                <span>{t('newTicket')}</span>
              </div>
            </button>
          </div>

          {/* My Tickets Section */}
          {activeTab === 'my-tickets' && (
            <div className="space-y-4">
              {loadingTickets ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <svg className="animate-spin h-8 w-8 mx-auto text-blue-600 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-gray-600">{t('loadingTickets')}</p>
                </div>
              ) : tickets.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <Ticket className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('noTicketsTitle')}</h3>
                  <p className="text-gray-600 mb-6">
                    {t('noTicketsMessage')}
                  </p>
                  <button
                    onClick={() => setActiveTab('new-ticket')}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    {t('newTicket')}
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">{t('myTickets')}</h2>
                    <button
                      onClick={fetchTickets}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {t('pageTitle')}
                    </button>
                  </div>
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:border-blue-300 transition-colors">
                      {/* Ticket Header */}
                      <div
                        onClick={() => toggleTicket(ticket.id)}
                        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <h3 className="font-semibold text-gray-900 text-lg">{ticket.subject}</h3>
                              {getStatusBadge(ticket.status)}
                              {ticket.response && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  {t('adminResponse')}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600 flex-wrap">
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {new Date(ticket.createdAt).toLocaleDateString('de-DE', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                              <span>•</span>
                              <span>{getCategoryLabel(ticket.category)}</span>
                              <span>•</span>
                              {getPriorityBadge(ticket.priority)}
                            </div>
                          </div>
                          <button className="flex-shrink-0 text-gray-400 hover:text-gray-600">
                            {expandedTickets.has(ticket.id) ? (
                              <ChevronUp className="h-5 w-5" />
                            ) : (
                              <ChevronDown className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Expanded Ticket Details */}
                      {expandedTickets.has(ticket.id) && (
                        <div className="border-t border-gray-200 bg-gray-50">
                          {/* Original Message */}
                          <div className="p-4 border-b border-gray-200 bg-white">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{t('yourMessage')}</p>
                            <p className="text-gray-700 whitespace-pre-wrap">{ticket.message}</p>
                          </div>

                          {/* Support Response */}
                          {ticket.response ? (
                            <div className="p-4 bg-blue-50 border-b border-blue-100">
                              <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                  <MessageSquare className="h-4 w-4 text-white" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <p className="text-xs font-semibold text-blue-900 uppercase tracking-wide">{t('adminResponse')}</p>
                                    {ticket.respondedAt && (
                                      <span className="text-xs text-blue-600">
                                        {new Date(ticket.respondedAt).toLocaleDateString('de-DE', {
                                          month: 'short',
                                          day: 'numeric',
                                          hour: '2-digit',
                                          minute: '2-digit'
                                        })}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-gray-800 whitespace-pre-wrap">{ticket.response}</p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="p-4 bg-yellow-50 border-b border-yellow-100">
                              <div className="flex items-start gap-3">
                                <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-yellow-900">{t('noResponseYet')}</p>
                                  <p className="text-sm text-yellow-700 mt-1">{t('noResponseYet')}</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Resolution Info */}
                          {ticket.resolved && ticket.resolvedAt && (
                            <div className="p-3 bg-green-50 border-b border-green-100">
                              <div className="flex items-center gap-2 text-sm text-green-800">
                                <CheckCircle className="h-4 w-4" />
                                <span className="font-medium">{t('status.resolved')} {new Date(ticket.resolvedAt).toLocaleDateString('de-DE')}</span>
                              </div>
                            </div>
                          )}

                          {/* Delete Button */}
                          <div className="p-4 bg-gray-50 border-t border-gray-200">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteTicket(ticket.id, ticket.subject);
                              }}
                              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                            >
                              <Trash2 className="h-4 w-4 mr-1.5" />
                              {t('deleteTicket')}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          {/* Success Confirmation Message */}
          {activeTab === 'new-ticket' && submitted && ticketInfo && (
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-6">
                  <CheckCircle className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('successMessage')}</h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  {t('successMessage')}
                </p>

                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6 max-w-xl mx-auto">
                  <div className="grid grid-cols-1 gap-4 text-left">
                    <div>
                      <p className="text-sm text-gray-600 font-medium mb-1">{t('ticketId')}</p>
                      <p className="text-lg font-bold text-gray-900 font-mono">{ticketInfo.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium mb-1">{t('subjectLabel')}</p>
                      <p className="text-gray-900 font-semibold">{ticketInfo.subject}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium mb-1">{t('created')}</p>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                        {ticketInfo.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium mb-1">{t('created')}</p>
                      <p className="text-gray-900">{new Date(ticketInfo.createdAt).toLocaleString('de-DE')}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 max-w-xl mx-auto">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div className="text-left">
                      <p className="text-sm text-blue-900 font-medium mb-1">{t('responseTimeInfo')}</p>
                      <p className="text-sm text-blue-800">{t('responseTimeInfo')}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  {t('newTicket')}
                </button>
              </div>
            </div>
          )}

          {/* Support Form */}
          {activeTab === 'new-ticket' && !submitted && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('subjectLabel')}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  minLength={5}
                  placeholder={t('subjectPlaceholder')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('categoryLabel')}
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="bug">{t('categories.bug')}</option>
                  <option value="feature_request">{t('categories.feature_request')}</option>
                  <option value="billing">{t('categories.billing')}</option>
                  <option value="technical">{t('categories.technical')}</option>
                  <option value="other">{t('categories.other')}</option>
                </select>
              </div>

              {/* Priority */}
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('priorityLabel')}
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">{t('priority.low')}</option>
                  <option value="medium">{t('priority.medium')}</option>
                  <option value="high">{t('priority.high')}</option>
                  <option value="urgent">{t('priority.urgent')}</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('messageLabel')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  minLength={20}
                  rows={8}
                  placeholder={t('messagePlaceholder')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* User Info Display */}
              {user && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>{t('emailLabel')}</strong> {user.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>{t('priorityLabel')}</strong> {user.subscriptionTier.toUpperCase()}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('submitting')}
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    {t('submitButton')}
                  </>
                )}
              </button>
            </form>
          </div>
          )}

          {/* Help Section */}
          {activeTab === 'new-ticket' && !submitted && (
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{t('responseTime')}</h3>
                    <p className="text-sm text-gray-600">
                      {t('responseTimeInfo')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-start">
                  <AlertCircle className="h-6 w-6 text-blue-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{t('helpTitle')}</h3>
                    <p className="text-sm text-gray-600">
                      {t('helpDescription')}
                    </p>
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
