export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  venueId: string;
  content: string;
  timestamp: number;
  imageUrl?: string;
}

export interface ChatRoom {
  id: string;
  venueId: string;
  name: string;
  lastMessage?: ChatMessage;
  participantCount: number;
}

export interface TypingStatus {
  userId: string;
  userName: string;
  timestamp: number;
}