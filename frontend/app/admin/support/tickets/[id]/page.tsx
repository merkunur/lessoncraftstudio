'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/admin-layout';
import {
  ArrowLeft,
  Send,
  Paperclip,
  Clock,
  User,
  Calendar,
  Tag,
  Flag,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
  Trash2,
  Archive,
  MoreVertical,
  Download,
  Star,
  AlertTriangle,
  Info,
  RefreshCw,
  UserCheck,
  Mail,
  Phone,
  Globe,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

interface Message {
  id: string;
  content: string;
  isInternal: boolean;
  sender: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string | null;
    isStaff: boolean;
  };
  attachments: Array<{
    id: string;
    name: string;
    size: number;
    url: string;
  }>;
  createdAt: string;
}

interface TicketDetail {
  id: string;
  ticketNumber: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'waiting' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  tags: string[];
  user: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    company: string | null;
    subscriptionTier: string;
    totalTickets: number;
    createdAt: string;
  };
  assignee: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string | null;
  } | null;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
  resolvedAt: string | null;
  responseTime: number | null;
  resolutionTime: number | null;
  satisfaction: number | null;
  relatedTickets: Array<{
    id: string;
    ticketNumber: string;
    subject: string;
    status: string;
  }>;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  department: string;
  activeTickets: number;
}

export default function TicketDetailPage() {
  const params = useParams();
  const router = useRouter();
  const ticketId = params.id as string;

  const [ticket, setTicket] = useState<TicketDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [isInternal, setIsInternal] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedAssignee, setSelectedAssignee] = useState('');
  const [showDetailsPanel, setShowDetailsPanel] = useState(true);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [sending, setSending] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchTicket();
    fetchTeamMembers();
  }, [ticketId]);

  useEffect(() => {
    scrollToBottom();
  }, [ticket?.messages]);

  const fetchTicket = async () => {
    try {
      const response = await fetch(`/api/admin/support/tickets/${ticketId}`);
      if (!response.ok) {
        if (response.status === 404) {
          toast.error('Ticket not found');
          router.push('/admin/support/tickets');
          return;
        }
        throw new Error('Failed to fetch ticket');
      }

      const data = await response.json();
      setTicket(data);
    } catch (error) {
      console.error('Error fetching ticket:', error);
      toast.error('Failed to load ticket');
    } finally {
      setLoading(false);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('/api/admin/support/team');
      if (!response.ok) throw new Error('Failed to fetch team members');
      const data = await response.json();
      setTeamMembers(data.members);
    } catch (error) {
      console.error('Error fetching team members:', error);
    }
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!message.trim() && attachments.length === 0) {
      toast.error('Please enter a message or attach files');
      return;
    }

    setSending(true);
    try {
      const formData = new FormData();
      formData.append('content', message);
      formData.append('isInternal', isInternal.toString());
      attachments.forEach(file => formData.append('attachments', file));

      const response = await fetch(`/api/admin/support/tickets/${ticketId}/messages`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to send message');

      toast.success('Message sent');
      setMessage('');
      setAttachments([]);
      fetchTicket();

      // Update status if it's the first response
      if (ticket?.status === 'open') {
        handleStatusChange('in_progress');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/support/tickets/${ticketId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update status');

      toast.success('Status updated');
      fetchTicket();
    } catch (error) {
      console.error('Status update error:', error);
      toast.error('Failed to update status');
    }
  };

  const handlePriorityChange = async (newPriority: string) => {
    try {
      const response = await fetch(`/api/admin/support/tickets/${ticketId}/priority`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priority: newPriority }),
      });

      if (!response.ok) throw new Error('Failed to update priority');

      toast.success('Priority updated');
      fetchTicket();
    } catch (error) {
      console.error('Priority update error:', error);
      toast.error('Failed to update priority');
    }
  };

  const handleAssign = async () => {
    if (!selectedAssignee) {
      toast.error('Please select an assignee');
      return;
    }

    try {
      const response = await fetch(`/api/admin/support/tickets/${ticketId}/assign`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assigneeId: selectedAssignee }),
      });

      if (!response.ok) throw new Error('Failed to assign ticket');

      toast.success('Ticket assigned');
      setShowAssignModal(false);
      fetchTicket();
    } catch (error) {
      console.error('Assign error:', error);
      toast.error('Failed to assign ticket');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments([...attachments, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-blue-100 text-blue-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800',
    };
    return colors[priority as keyof typeof colors] || colors.low;
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'high':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'medium':
        return <Flag className="h-4 w-4 text-blue-500" />;
      case 'low':
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      open: 'bg-green-100 text-green-800',
      in_progress: 'bg-blue-100 text-blue-800',
      waiting: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-purple-100 text-purple-800',
      closed: 'bg-gray-100 text-gray-800',
    };
    return colors[status as keyof typeof colors] || colors.open;
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4" />
          <div className="bg-white shadow rounded-lg p-6">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!ticket) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Ticket not found</h3>
          <Link href="/admin/support/tickets" className="text-blue-600 hover:text-blue-700 mt-2 inline-block">
            Back to tickets
          </Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link
                href="/admin/support/tickets"
                className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">
                Ticket #{ticket.ticketNumber}
              </h1>
              <div className="ml-4 flex items-center gap-2">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  getStatusColor(ticket.status)
                }`}>
                  {ticket.status.replace('_', ' ')}
                </span>
                <div className="flex items-center">
                  {getPriorityIcon(ticket.priority)}
                  <span className={`ml-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    getPriorityColor(ticket.priority)
                  }`}>
                    {ticket.priority}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowDetailsPanel(!showDetailsPanel)}
                className="p-2 hover:bg-gray-100 rounded-lg"
                title="Toggle details panel"
              >
                <Info className="h-5 w-5 text-gray-500" />
              </button>
              <button
                onClick={fetchTicket}
                className="p-2 hover:bg-gray-100 rounded-lg"
                title="Refresh"
              >
                <RefreshCw className="h-5 w-5 text-gray-500" />
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded-lg"
                title="More options"
              >
                <MoreVertical className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Conversation */}
          <div className="flex-1 flex flex-col">
            {/* Subject */}
            <div className="bg-gray-50 px-6 py-4 border-b">
              <h2 className="text-lg font-medium text-gray-900">{ticket.subject}</h2>
              <p className="text-sm text-gray-500 mt-1">{ticket.description}</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {ticket.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender.isStaff ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-2xl ${msg.sender.isStaff ? 'order-2' : ''}`}>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-500" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900">
                            {msg.sender.name}
                          </span>
                          {msg.isInternal && (
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                              Internal
                            </span>
                          )}
                          <span className="text-xs text-gray-500">
                            {formatDate(msg.createdAt)}
                          </span>
                        </div>
                        <div className={`rounded-lg p-3 ${
                          msg.sender.isStaff
                            ? msg.isInternal
                              ? 'bg-yellow-50 border border-yellow-200'
                              : 'bg-blue-50 border border-blue-200'
                            : 'bg-gray-100'
                        }`}>
                          <div className="text-sm text-gray-900 whitespace-pre-wrap">
                            {msg.content}
                          </div>
                          {msg.attachments.length > 0 && (
                            <div className="mt-3 space-y-2">
                              {msg.attachments.map((attachment) => (
                                <a
                                  key={attachment.id}
                                  href={attachment.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                                >
                                  <Paperclip className="h-4 w-4" />
                                  <span>{attachment.name}</span>
                                  <span className="text-gray-500">
                                    ({formatFileSize(attachment.size)})
                                  </span>
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messageEndRef} />
            </div>

            {/* Reply Box */}
            <div className="border-t p-4">
              <div className="mb-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isInternal}
                    onChange={(e) => setIsInternal(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Internal note</span>
                </label>
              </div>

              {attachments.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1"
                    >
                      <Paperclip className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{file.name}</span>
                      <button
                        onClick={() => removeAttachment(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <XCircle className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={isInternal ? "Add an internal note..." : "Type your reply..."}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Paperclip className="h-4 w-4 mr-1" />
                    Attach
                  </button>
                </div>

                <div className="flex gap-2">
                  <select
                    value={ticket.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="waiting">Waiting</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                  <button
                    onClick={handleSendMessage}
                    disabled={sending || (!message.trim() && attachments.length === 0)}
                    className={`inline-flex items-center px-4 py-1.5 border border-transparent rounded-md text-sm font-medium text-white ${
                      isInternal
                        ? 'bg-yellow-600 hover:bg-yellow-700'
                        : 'bg-blue-600 hover:bg-blue-700'
                    } disabled:opacity-50`}
                  >
                    {sending ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        {isInternal ? 'Add Note' : 'Send Reply'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Details Panel */}
          {showDetailsPanel && (
            <div className="w-80 border-l bg-gray-50 overflow-y-auto">
              {/* Customer Info */}
              <div className="p-6 border-b bg-white">
                <h3 className="font-medium text-gray-900 mb-4">Customer</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <User className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{ticket.user.name}</div>
                      <div className="text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          ticket.user.subscriptionTier === 'full'
                            ? 'bg-purple-100 text-purple-800'
                            : ticket.user.subscriptionTier === 'core'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {ticket.user.subscriptionTier}
                        </span>
                      </div>
                    </div>
                  </div>

                  <dl className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-500">
                      <Mail className="h-4 w-4 mr-2" />
                      <a href={`mailto:${ticket.user.email}`} className="text-blue-600 hover:text-blue-800">
                        {ticket.user.email}
                      </a>
                    </div>
                    {ticket.user.phone && (
                      <div className="flex items-center text-gray-500">
                        <Phone className="h-4 w-4 mr-2" />
                        {ticket.user.phone}
                      </div>
                    )}
                    {ticket.user.company && (
                      <div className="flex items-center text-gray-500">
                        <Globe className="h-4 w-4 mr-2" />
                        {ticket.user.company}
                      </div>
                    )}
                    <div className="flex items-center text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      Customer since {new Date(ticket.user.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Ticket className="h-4 w-4 mr-2" />
                      {ticket.user.totalTickets} total tickets
                    </div>
                  </dl>
                </div>
              </div>

              {/* Ticket Details */}
              <div className="p-6 border-b bg-white">
                <h3 className="font-medium text-gray-900 mb-4">Details</h3>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-gray-500 mb-1">Assignee</dt>
                    <dd>
                      {ticket.assignee ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                              <User className="h-4 w-4 text-gray-500" />
                            </div>
                            <span className="text-gray-900">{ticket.assignee.name}</span>
                          </div>
                          <button
                            onClick={() => setShowAssignModal(true)}
                            className="text-blue-600 hover:text-blue-800 text-xs"
                          >
                            Change
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowAssignModal(true)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Assign
                        </button>
                      )}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-gray-500 mb-1">Priority</dt>
                    <dd>
                      <select
                        value={ticket.priority}
                        onChange={(e) => handlePriorityChange(e.target.value)}
                        className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </dd>
                  </div>

                  <div>
                    <dt className="text-gray-500 mb-1">Category</dt>
                    <dd className="text-gray-900">{ticket.category}</dd>
                  </div>

                  {ticket.tags.length > 0 && (
                    <div>
                      <dt className="text-gray-500 mb-1">Tags</dt>
                      <dd className="flex flex-wrap gap-1">
                        {ticket.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </dd>
                    </div>
                  )}

                  <div>
                    <dt className="text-gray-500 mb-1">Created</dt>
                    <dd className="text-gray-900">
                      {new Date(ticket.createdAt).toLocaleString()}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-gray-500 mb-1">Last Updated</dt>
                    <dd className="text-gray-900">
                      {new Date(ticket.updatedAt).toLocaleString()}
                    </dd>
                  </div>

                  {ticket.responseTime && (
                    <div>
                      <dt className="text-gray-500 mb-1">Response Time</dt>
                      <dd className="text-gray-900">{ticket.responseTime} minutes</dd>
                    </div>
                  )}

                  {ticket.resolvedAt && (
                    <div>
                      <dt className="text-gray-500 mb-1">Resolved</dt>
                      <dd className="text-gray-900">
                        {new Date(ticket.resolvedAt).toLocaleString()}
                      </dd>
                    </div>
                  )}

                  {ticket.satisfaction !== null && (
                    <div>
                      <dt className="text-gray-500 mb-1">Satisfaction</dt>
                      <dd className="flex items-center">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <Star
                            key={rating}
                            className={`h-4 w-4 ${
                              rating <= ticket.satisfaction!
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Related Tickets */}
              {ticket.relatedTickets.length > 0 && (
                <div className="p-6 bg-white">
                  <h3 className="font-medium text-gray-900 mb-4">Related Tickets</h3>
                  <div className="space-y-2">
                    {ticket.relatedTickets.map((related) => (
                      <Link
                        key={related.id}
                        href={`/admin/support/tickets/${related.id}`}
                        className="block p-2 hover:bg-gray-50 rounded-lg"
                      >
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">
                            #{related.ticketNumber}
                          </div>
                          <div className="text-gray-500 truncate">
                            {related.subject}
                          </div>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            getStatusColor(related.status)
                          }`}>
                            {related.status}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Assign Modal */}
        {showAssignModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Assign Ticket</h3>
              <select
                value={selectedAssignee}
                onChange={(e) => setSelectedAssignee(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500 mb-4"
              >
                <option value="">Select team member...</option>
                {teamMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name} - {member.department} ({member.activeTickets} active)
                  </option>
                ))}
              </select>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowAssignModal(false);
                    setSelectedAssignee('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssign}
                  disabled={!selectedAssignee}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                  Assign
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}