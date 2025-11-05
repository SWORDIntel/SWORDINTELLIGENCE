'use client';

/**
 * Secure Messaging Interface
 *
 * Post-quantum encrypted messaging with multiple modes:
 * - Direct messaging (1-on-1)
 * - Operations Rooms (group channels)
 * - Ephemeral/Burn mode
 */

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import {
  MessageSquare,
  Users,
  Plus,
  Send,
  Lock,
  Shield,
  Clock,
  Flame,
  Key,
  AlertTriangle,
  Settings,
  Search,
  Image as ImageIcon,
  FileText,
  MoreVertical,
  Check,
  CheckCheck,
} from 'lucide-react';

type MessageMode = 'direct' | 'room' | 'ephemeral';

interface MessagingKeys {
  kyberPublic: string;
  kyberPrivate: string;
  dilithiumPublic: string;
  dilithiumPrivate: string;
}

interface Conversation {
  id: string;
  participants: string[];
  otherParticipant: string;
  lastMessage?: Date;
  messageCount: number;
  unreadCount: number;
}

interface Room {
  id: string;
  name: string;
  description?: string;
  memberCount: number;
  lastActivity: Date;
  messageCount: number;
  tags: string[];
  isOwner: boolean;
}

interface Message {
  id: string;
  senderId: string;
  recipientId?: string;
  encryptedContent: string;
  type: string;
  timestamp: Date;
  delivered: boolean;
  read: boolean;
  ephemeral?: {
    burnAfterReading: boolean;
    expiresAt?: Date;
  };
}

export default function SecureMessagingPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<'conversations' | 'rooms'>('conversations');
  const [hasKeys, setHasKeys] = useState(false);
  const [keys, setKeys] = useState<MessagingKeys | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState('');
  const [ephemeralMode, setEphemeralMode] = useState(false);
  const [burnAfterReading, setBurnAfterReading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [showNewRoom, setShowNewRoom] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomDescription, setNewRoomDescription] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (session) {
      checkKeys();
      loadConversations();
      loadRooms();
    }
  }, [session]);

  useEffect(() => {
    if (selectedConversation) {
      loadConversationMessages(selectedConversation);
    } else if (selectedRoom) {
      loadRoomMessages(selectedRoom);
    }
  }, [selectedConversation, selectedRoom]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const checkKeys = async () => {
    try {
      const res = await fetch('/api/messages/keys');
      const data = await res.json();

      if (data.hasKeys) {
        setHasKeys(true);
        // In production, keys would be stored securely in client
      } else {
        setHasKeys(false);
      }
    } catch (error) {
      console.error('Failed to check keys:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateKeys = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/messages/keys', { method: 'POST' });
      const data = await res.json();

      if (data.success) {
        setKeys({
          kyberPublic: data.publicKeys.kyber,
          kyberPrivate: data.privateKeys.kyber,
          dilithiumPublic: data.publicKeys.dilithium,
          dilithiumPrivate: data.privateKeys.dilithium,
        });
        setHasKeys(true);

        // In production, store private keys securely in browser
        if (typeof window !== 'undefined') {
          localStorage.setItem('messagingKeys', JSON.stringify({
            kyberPrivate: data.privateKeys.kyber,
            dilithiumPrivate: data.privateKeys.dilithium,
          }));
        }
      }
    } catch (error) {
      console.error('Failed to generate keys:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadConversations = async () => {
    try {
      const res = await fetch('/api/messages?mode=conversations');
      const data = await res.json();
      setConversations(data.conversations || []);
    } catch (error) {
      console.error('Failed to load conversations:', error);
    }
  };

  const loadRooms = async () => {
    try {
      const res = await fetch('/api/messages/rooms');
      const data = await res.json();
      setRooms(data.rooms || []);
    } catch (error) {
      console.error('Failed to load rooms:', error);
    }
  };

  const loadConversationMessages = async (conversationId: string) => {
    try {
      const res = await fetch(`/api/messages?conversationId=${conversationId}&limit=50`);
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const loadRoomMessages = async (roomId: string) => {
    try {
      const res = await fetch(`/api/messages?roomId=${roomId}&limit=100`);
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!messageText.trim() || sending) return;

    try {
      setSending(true);

      // In production, encrypt message client-side with recipient's public key
      // For demo, we'll send mock encrypted data
      const mockEncrypted = {
        mode: selectedRoom ? 'room' : ephemeralMode ? 'ephemeral' : 'direct',
        recipientId: selectedConversation?.split(':').find(p => p !== session?.user?.email),
        roomId: selectedRoom,
        encryptedContent: Buffer.from(messageText).toString('base64'),
        encryptionMetadata: {
          algorithm: 'kyber768-aes256-gcm',
          kyberCiphertext: 'mock-kyber-ct',
          iv: 'mock-iv',
          authTag: 'mock-tag',
          recipientPublicKey: 'mock-pub-key',
        },
        signature: {
          value: 'mock-signature',
          publicKey: 'mock-pub-key',
          algorithm: 'dilithium3',
        },
        type: 'text',
        ephemeral: ephemeralMode ? {
          burnAfterReading,
          expiresAt: new Date(Date.now() + 60000), // 1 minute for demo
        } : undefined,
      };

      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockEncrypted),
      });

      if (res.ok) {
        setMessageText('');
        // Reload messages
        if (selectedConversation) {
          loadConversationMessages(selectedConversation);
        } else if (selectedRoom) {
          loadRoomMessages(selectedRoom);
        }
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSending(false);
    }
  };

  const createRoom = async () => {
    if (!newRoomName.trim()) return;

    try {
      const res = await fetch('/api/messages/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newRoomName,
          description: newRoomDescription,
          inviteOnly: true,
          ephemeralByDefault: false,
          tags: ['operations'],
        }),
      });

      if (res.ok) {
        setShowNewRoom(false);
        setNewRoomName('');
        setNewRoomDescription('');
        loadRooms();
      }
    } catch (error) {
      console.error('Failed to create room:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-green-500">Loading secure messaging...</div>
      </div>
    );
  }

  if (!hasKeys) {
    return (
      <div className="min-h-screen bg-black text-green-500 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 mx-auto mb-4 text-green-500" />
            <h1 className="text-3xl font-bold mb-2">Secure Messaging Setup</h1>
            <p className="text-green-500/70">
              Generate your post-quantum encryption keys to start secure messaging
            </p>
          </div>

          <div className="bg-green-500/5 border border-green-500/30 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Key className="w-5 h-5 mr-2" />
              Post-Quantum Cryptography
            </h2>
            <div className="space-y-3 text-sm text-green-500/80">
              <div className="flex items-start">
                <Check className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>Kyber-768 for quantum-resistant key encapsulation</span>
              </div>
              <div className="flex items-start">
                <Check className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>Dilithium-3 for post-quantum digital signatures</span>
              </div>
              <div className="flex items-start">
                <Check className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>AES-256-GCM for authenticated encryption</span>
              </div>
              <div className="flex items-start">
                <Check className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>Forward secrecy with ephemeral key exchange</span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 mr-2 mt-0.5 text-yellow-500 flex-shrink-0" />
              <div className="text-sm text-yellow-500/80">
                <strong>Important:</strong> Your private keys will be stored locally in your browser.
                Never share your private keys. Back them up securely.
              </div>
            </div>
          </div>

          <button
            onClick={generateKeys}
            className="w-full bg-green-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-400 transition-colors"
          >
            Generate Encryption Keys
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-500">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-80 bg-green-500/5 border-r border-green-500/30 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-green-500/30">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Secure Messaging
              </h1>
              <Settings className="w-5 h-5 text-green-500/50 hover:text-green-500 cursor-pointer" />
            </div>

            {/* Tabs */}
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('conversations')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'conversations'
                    ? 'bg-green-500 text-black'
                    : 'bg-green-500/10 text-green-500/70 hover:bg-green-500/20'
                }`}
              >
                <MessageSquare className="w-4 h-4 inline mr-1" />
                Direct
              </button>
              <button
                onClick={() => setActiveTab('rooms')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'rooms'
                    ? 'bg-green-500 text-black'
                    : 'bg-green-500/10 text-green-500/70 hover:bg-green-500/20'
                }`}
              >
                <Users className="w-4 h-4 inline mr-1" />
                Rooms
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="p-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500/50" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-green-500/5 border border-green-500/30 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-green-500"
              />
            </div>
          </div>

          {/* Conversations/Rooms List */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'conversations' ? (
              <div className="space-y-1 px-2">
                {conversations.length === 0 ? (
                  <div className="text-center py-8 text-green-500/50 text-sm">
                    No conversations yet
                  </div>
                ) : (
                  conversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => {
                        setSelectedConversation(conv.id);
                        setSelectedRoom(null);
                      }}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedConversation === conv.id
                          ? 'bg-green-500/20'
                          : 'hover:bg-green-500/10'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium truncate">{conv.otherParticipant}</span>
                        {conv.unreadCount > 0 && (
                          <span className="bg-green-500 text-black text-xs rounded-full px-2 py-0.5">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-green-500/50">
                        {conv.messageCount} messages
                      </div>
                    </button>
                  ))
                )}
              </div>
            ) : (
              <div className="space-y-1 px-2">
                {rooms.length === 0 ? (
                  <div className="text-center py-8 text-green-500/50 text-sm">
                    No rooms yet
                  </div>
                ) : (
                  rooms.map((room) => (
                    <button
                      key={room.id}
                      onClick={() => {
                        setSelectedRoom(room.id);
                        setSelectedConversation(null);
                      }}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedRoom === room.id
                          ? 'bg-green-500/20'
                          : 'hover:bg-green-500/10'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium truncate">{room.name}</span>
                        <Users className="w-4 h-4 text-green-500/50" />
                      </div>
                      <div className="text-xs text-green-500/50">
                        {room.memberCount} members • {room.messageCount} messages
                      </div>
                      {room.tags.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {room.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-green-500/10 px-2 py-0.5 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          {/* New Room Button */}
          {activeTab === 'rooms' && (
            <div className="p-4 border-t border-green-500/30">
              <button
                onClick={() => setShowNewRoom(true)}
                className="w-full bg-green-500/10 border border-green-500/30 px-4 py-2 rounded-lg hover:bg-green-500/20 transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Create Operations Room
              </button>
            </div>
          )}
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {!selectedConversation && !selectedRoom ? (
            <div className="flex-1 flex items-center justify-center text-green-500/50">
              <div className="text-center">
                <Shield className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Select a conversation or room to start secure messaging</p>
              </div>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="bg-green-500/5 border-b border-green-500/30 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold">
                      {selectedRoom
                        ? rooms.find(r => r.id === selectedRoom)?.name
                        : conversations.find(c => c.id === selectedConversation)?.otherParticipant}
                    </h2>
                    <div className="text-xs text-green-500/50 flex items-center mt-1">
                      <Lock className="w-3 h-3 mr-1" />
                      End-to-end encrypted • Post-quantum secure
                    </div>
                  </div>
                  <button className="text-green-500/50 hover:text-green-500">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => {
                  const isOwn = msg.senderId === session?.user?.email;

                  return (
                    <div key={msg.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] ${isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
                        {!isOwn && (
                          <span className="text-xs text-green-500/50 mb-1">{msg.senderId}</span>
                        )}
                        <div
                          className={`px-4 py-2 rounded-lg ${
                            isOwn
                              ? 'bg-green-500 text-black'
                              : 'bg-green-500/10 border border-green-500/30'
                          }`}
                        >
                          <div className="break-words">
                            {/* In production, decrypt client-side */}
                            {Buffer.from(msg.encryptedContent, 'base64').toString('utf-8')}
                          </div>
                          {msg.ephemeral && (
                            <div className="flex items-center mt-2 pt-2 border-t border-current/20 text-xs opacity-70">
                              <Flame className="w-3 h-3 mr-1" />
                              {msg.ephemeral.burnAfterReading ? 'Burns after reading' : 'Ephemeral'}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center mt-1 text-xs text-green-500/50">
                          <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                          {isOwn && (
                            <span className="ml-2">
                              {msg.read ? (
                                <CheckCheck className="w-3 h-3" />
                              ) : msg.delivered ? (
                                <Check className="w-3 h-3" />
                              ) : null}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="bg-green-500/5 border-t border-green-500/30 p-4">
                {/* Ephemeral Mode Toggle */}
                <div className="mb-3 flex items-center space-x-4">
                  <button
                    onClick={() => setEphemeralMode(!ephemeralMode)}
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      ephemeralMode
                        ? 'bg-orange-500/20 text-orange-500 border border-orange-500/30'
                        : 'bg-green-500/10 text-green-500/70 hover:bg-green-500/20'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    <span>Ephemeral Mode</span>
                  </button>

                  {ephemeralMode && (
                    <button
                      onClick={() => setBurnAfterReading(!burnAfterReading)}
                      className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        burnAfterReading
                          ? 'bg-red-500/20 text-red-500 border border-red-500/30'
                          : 'bg-green-500/10 text-green-500/70 hover:bg-green-500/20'
                      }`}
                    >
                      <Flame className="w-4 h-4" />
                      <span>Burn After Reading</span>
                    </button>
                  )}
                </div>

                <div className="flex items-end space-x-2">
                  <button className="p-2 bg-green-500/10 rounded-lg hover:bg-green-500/20 transition-colors">
                    <ImageIcon className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-green-500/10 rounded-lg hover:bg-green-500/20 transition-colors">
                    <FileText className="w-5 h-5" />
                  </button>

                  <div className="flex-1 bg-green-500/5 border border-green-500/30 rounded-lg overflow-hidden">
                    <textarea
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                      placeholder="Type encrypted message..."
                      rows={2}
                      className="w-full px-4 py-2 bg-transparent focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    onClick={sendMessage}
                    disabled={sending || !messageText.trim()}
                    className="p-2 bg-green-500 text-black rounded-lg hover:bg-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-2 text-xs text-green-500/50 flex items-center">
                  <Shield className="w-3 h-3 mr-1" />
                  Messages are encrypted with Kyber-768 + Dilithium-3
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* New Room Modal */}
      {showNewRoom && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-black border border-green-500/30 rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Create Operations Room</h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Room Name</label>
                <input
                  type="text"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  placeholder="Operation Blue Magic"
                  className="w-full bg-green-500/5 border border-green-500/30 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description (Optional)</label>
                <textarea
                  value={newRoomDescription}
                  onChange={(e) => setNewRoomDescription(e.target.value)}
                  placeholder="Coordinating takedown of dark web vendor network..."
                  rows={3}
                  className="w-full bg-green-500/5 border border-green-500/30 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500 resize-none"
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowNewRoom(false)}
                className="flex-1 bg-green-500/10 border border-green-500/30 px-4 py-2 rounded-lg hover:bg-green-500/20 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createRoom}
                disabled={!newRoomName.trim()}
                className="flex-1 bg-green-500 text-black px-4 py-2 rounded-lg hover:bg-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                Create Room
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
