import { AfterViewChecked, Component, ElementRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Fuse from 'fuse.js';
import { KnowledgeEntry, knowledgeBase, suggestedQuestions } from '../../data/chatbot-knowledge';

interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
}

interface IndexedWord {
  word: string;
  entryId: string;
}

const FALLBACK_ANSWER = "I don't have a specific answer for that yet — try asking about his experience, skills, projects, education, or how to get in touch. You can also reach out directly via the Contact section!";

// Matching is order-independent keyword voting, not whole-sentence fuzzy matching:
// a full question ("What is his current job?") is reduced to its meaningful words
// (stripping filler like "what/is/his"), each word is fuzzy-matched (typo-tolerant)
// against a flat index of keywords pulled from every entry's example phrasings, and
// the entry with the most word-level hits wins. Whole-sentence edit-distance matching
// was tried first and rejected — it's sensitive to word order and to length mismatches
// between short stored phrases and long visitor questions, so it missed obvious matches.
const STOPWORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'am', 'be', 'been', 'being',
  'what', 'who', 'whom', 'which', 'when', 'where', 'why', 'how',
  'do', 'does', 'did', 'doing', 'have', 'has', 'had', 'having',
  'i', 'you', 'he', 'she', 'it', 'we', 'they', 'him', 'her', 'his', 'hers', 'its', 'their', 'them',
  'and', 'or', 'but', 'if', 'so', 'of', 'in', 'on', 'at', 'to', 'for', 'with', 'about', 'from', 'by',
  'me', 'my', 'your', 'tell', 'please', 'can', 'could', 'would', 'should', 'will', 'shall',
  'this', 'that', 'these', 'those', 'there', 'here', 'any', 'some', 'just'
]);

function extractKeywordTokens(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter(w => w.length > 1 && !STOPWORDS.has(w));
}

function buildWordIndex(kb: KnowledgeEntry[]): IndexedWord[] {
  const index: IndexedWord[] = [];
  for (const entry of kb) {
    const seen = new Set<string>();
    for (const question of entry.questions) {
      for (const word of extractKeywordTokens(question)) {
        if (!seen.has(word)) {
          seen.add(word);
          index.push({ word, entryId: entry.id });
        }
      }
    }
  }
  return index;
}

// Words shared across many entries (e.g. generic filler like "tech"/"stack") are
// weak signals; a word unique to one entry is a strong one. Weighting each hit by
// 1/(number of entries it appears in) keeps a specific word like "backend" from
// losing to two generic words that happen to add up to a higher raw vote count.
function computeDocFrequency(index: IndexedWord[]): Map<string, number> {
  const entryIdsByWord = new Map<string, Set<string>>();
  for (const { word, entryId } of index) {
    if (!entryIdsByWord.has(word)) entryIdsByWord.set(word, new Set());
    entryIdsByWord.get(word)!.add(entryId);
  }
  return new Map([...entryIdsByWord].map(([word, ids]) => [word, ids.size]));
}

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

  private wordIndex = buildWordIndex(knowledgeBase);
  private docFreq = computeDocFrequency(this.wordIndex);
  private wordFuse = new Fuse(this.wordIndex, {
    keys: ['word'],
    includeScore: true,
    threshold: 0.3,
    ignoreLocation: true
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
    const tokens = extractKeywordTokens(question);
    const votes = new Map<string, { weight: number; bestScore: number }>();

    for (const token of tokens) {
      const results = this.wordFuse.search(token);
      const best = results[0];
      if (!best || (best.score ?? 1) > 0.3) continue;

      const weight = 1 / (this.docFreq.get(best.item.word) ?? 1);
      const v = votes.get(best.item.entryId) ?? { weight: 0, bestScore: 1 };
      v.weight += weight;
      v.bestScore = Math.min(v.bestScore, best.score ?? 1);
      votes.set(best.item.entryId, v);
    }

    if (!votes.size) return FALLBACK_ANSWER;

    const [topEntryId] = [...votes.entries()]
      .sort((a, b) => b[1].weight - a[1].weight || a[1].bestScore - b[1].bestScore)[0];

    return knowledgeBase.find(e => e.id === topEntryId)?.answer ?? FALLBACK_ANSWER;
  }

  ngAfterViewChecked() {
    if (this.pendingScroll && this.scrollAnchor) {
      this.scrollAnchor.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
      this.pendingScroll = false;
    }
  }
}
