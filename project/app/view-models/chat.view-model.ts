import { Observable } from '@nativescript/core';
import { ChatService } from '../services/chat.service';
import { ChatMessage, TypingStatus } from '../types/chat.types';

export class ChatViewModel extends Observable {
  private chatService: ChatService;
  private _messages: ChatMessage[] = [];
  private _messageText = '';
  private _typingUsers: TypingStatus[] = [];
  private _participantCount = 0;
  private cleanupFunctions: (() => void)[] = [];

  constructor(private venueId: string, private venueName: string, private userId: string, private userName: string) {
    super();
    this.chatService = new ChatService();
    this.initializeChat();
  }

  private initializeChat() {
    // Watch messages
    const messageCleanup = this.chatService.watchMessages(this.venueId, (messages) => {
      this._messages = messages;
      this.notifyPropertyChange('messages', messages);
    });

    // Watch typing status
    const typingCleanup = this.chatService.watchTypingStatus(this.venueId, (typing) => {
      this._typingUsers = typing.filter(t => t.userId !== this.userId);
      this.notifyPropertyChange('typingText', this.typingText);
      this.notifyPropertyChange('isTyping', this.isTyping);
    });

    this.cleanupFunctions.push(messageCleanup, typingCleanup);
  }

  get messages(): ChatMessage[] {
    return this._messages;
  }

  get messageText(): string {
    return this._messageText;
  }

  set messageText(value: string) {
    if (this._messageText !== value) {
      this._messageText = value;
      this.notifyPropertyChange('messageText', value);
    }
  }

  get typingText(): string {
    if (this._typingUsers.length === 0) return '';
    if (this._typingUsers.length === 1) {
      return `${this._typingUsers[0].userName} is typing...`;
    }
    return `${this._typingUsers.length} people are typing...`;
  }

  get isTyping(): boolean {
    return this._typingUsers.length > 0;
  }

  get participantCount(): number {
    return this._participantCount;
  }

  onTextChange() {
    this.chatService.updateTypingStatus(this.venueId, this.userId, this.userName);
  }

  async onSendMessage() {
    if (!this._messageText.trim()) return;

    await this.chatService.sendMessage(this.venueId, {
      userId: this.userId,
      userName: this.userName,
      content: this._messageText.trim(),
      venueId: this.venueId
    });

    this.messageText = '';
  }

  cleanup() {
    this.cleanupFunctions.forEach(cleanup => cleanup());
  }
}