import { AfterViewChecked, Component, ElementRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Fuse from 'fuse.js';
import { knowledgeBase, suggestedQuestions } from '../../data/chatbot-knowledge';

interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
}

const FALLBACK_ANSWER = "I don't have a specific answer for that yet — try asking about his experience, skills, projects, education, or how to get in touch. You can also reach out directly via the Contact section!";

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.css'
})
export class ChatbotComponent implements AfterViewChecked {
  @ViewChild('scrollAnchor') scrollAnchor?: ElementRef<HTMLElement>;

  isOpen = signal(false);
  isTyping = signal(false);
  messages = signal<ChatMessage[]>([
    { role: 'bot', text: "Hi! I'm a quick-answer assistant trained on Vishnuprabha's resume. Ask about his experience, skills, or projects — or tap a suggestion below." }
  ]);

  inputText = '';
  suggestions = suggestedQuestions;

  private fuse = new Fuse(knowledgeBase, {
    keys: ['questions'],
    includeScore: true,
    threshold: 0.4,
    ignoreLocation: true,
    minMatchCharLength: 2
  });

  private pendingScroll = false;

  toggle() {
    this.isOpen.update(v => !v);
    if (this.isOpen()) this.pendingScroll = true;
  }

  close() {
    this.isOpen.set(false);
  }

  ask(question: string) {
    const q = question.trim();
    if (!q) return;

    this.messages.update(m => [...m, { role: 'user', text: q }]);
    this.inputText = '';
    this.pendingScroll = true;
    this.isTyping.set(true);

    setTimeout(() => {
      this.messages.update(m => [...m, { role: 'bot', text: this.findAnswer(q) }]);
      this.isTyping.set(false);
      this.pendingScroll = true;
    }, 400 + Math.random() * 350);
  }

  onSubmit() {
    this.ask(this.inputText);
  }

  private findAnswer(question: string): string {
    const results = this.fuse.search(question);
    if (results.length && (results[0].score ?? 1) <= 0.45) {
      return results[0].item.answer;
    }
    return FALLBACK_ANSWER;
  }

  ngAfterViewChecked() {
    if (this.pendingScroll && this.scrollAnchor) {
      this.scrollAnchor.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
      this.pendingScroll = false;
    }
  }
}
