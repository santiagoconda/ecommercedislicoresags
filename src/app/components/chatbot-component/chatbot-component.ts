import { Component, ViewChild, ElementRef, AfterViewChecked, OnInit, ChangeDetectorRef } from '@angular/core';
import { ChatBot, Message } from '../../services/chat-bot';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot-component',
  standalone: true, // <-- Asegúrate de que esto esté presente
  imports: [CommonModule, FormsModule], // Ya los tienes, bien ✅
  templateUrl: './chatbot-component.html',
  styleUrl: './chatbot-component.css',
})
export class ChatbotComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  
  isChatOpen = false;
  userInput = '';
  isTyping = false;
  messages: Message[] = [];

  constructor(
    public chatBot: ChatBot,
    private cdr: ChangeDetectorRef // <-- AGREGAR ESTO
  ) {}

  ngOnInit() {
    this.chatBot.messages$.subscribe(messages => {
      this.messages = messages;
      this.cdr.markForCheck(); // <-- AGREGAR ESTO para forzar detección
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  async sendMessage() {
    if (!this.userInput.trim() || this.isTyping) return;

    const message = this.userInput.trim();
    this.userInput = '';
    this.isTyping = true;

    try {
      await this.chatBot.sendMessage(message);
    } catch (error) {
      console.error('Error enviando mensaje:', error);
    } finally {
      this.isTyping = false;
      this.cdr.markForCheck(); // <-- AGREGAR ESTO
    }
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  clearChat() {
    this.chatBot.clearChat();
    this.cdr.markForCheck(); // <-- AGREGAR ESTO
  }

  formatTime(date: Date): string {
    return new Date(date).toLocaleTimeString('es-CO', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop = 
          this.messagesContainer.nativeElement.scrollHeight;
      }
    } catch(err) {
      console.error('Error al hacer scroll:', err);
    }
  }
}