import { DatabaseService } from './database.service';
import { ErrorHandler } from '../utils/error-handler';
import { ChatMessage, TypingStatus } from '../types/chat.types';
import { Observable } from '@nativescript/core';

export class ChatService extends Observable {
  private static instance: ChatService;
  private database: DatabaseService;
  private static readonly TYPING_TIMEOUT = 3000; // 3 seconds

  private constructor() {
    super();
    this.database = DatabaseService.getInstance();
  }

  static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  async sendMessage(venueId: string, message: Partial<ChatMessage>): Promise<void> {
    try {
      await this.database.setData(`chats/${venueId}/messages/${Date.now()}`, {
        ...message,
        timestamp: Date.now()
      });
    } catch (error) {
      ErrorHandler.handleError(error as Error, 'ChatService.sendMessage');
      throw error;
    }
  }

  watchMessages(venueId: string, callback: (messages: ChatMessage[]) => void): () => void {
    return this.database.watchData(`chats/${venueId}/messages`, (data) => {
      const messages = Object.keys(data || {}).map(key => ({
        id: key,
        ...data[key]
      }));
      callback(messages);
    });
  }

  updateTypingStatus(venueId: string, userId: string, userName: string): void {
    const path = `chats/${venueId}/typing/${userId}`;
    const status: TypingStatus = {
      userId,
      userName,
      timestamp: Date.now()
    };

    this.database.setData(path, status).catch(error => {
      ErrorHandler.handleError(error as Error, 'ChatService.updateTypingStatus');
    });

    // Remove typing status after timeout
    setTimeout(() => {
      this.database.setData(path, null).catch(error => {
        ErrorHandler.handleError(error as Error, 'ChatService.updateTypingStatus.timeout');
      });
    }, ChatService.TYPING_TIMEOUT);
  }
}