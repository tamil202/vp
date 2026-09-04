export interface KnowledgeEntry {
  id: string;
  questions: string[];
  answer: string;
}

export const knowledgeBase: KnowledgeEntry[] = [
  {
    id: 'greeting',
    questions: ['hi', 'hello', 'hey', 'good morning', 'good evening', "what's up", 'yo'],
    answer: "Hey there! 👋 I can answer quick questions about Vishnuprabha's experience, skills, projects, or how to reach him. What would you like to know?"
  },
  {
    id: 'thanks',
    questions: ['thanks', 'thank you', 'thanks a lot', 'appreciate it', 'cool thanks'],
    answer: "You're welcome! Feel free to ask anything else, or head to the Contact section to reach out directly. 🙌"
  },
  {
    id: 'about',
    questions: [
      'who is vishnuprabha', 'about him', 'who are you', 'tell me about yourself',
      'tell me about vishnuprabha', 'summary', 'introduce yourself', 'what do you do'
    ],
    answer: 'Vishnuprabha is a full-stack Software Engineer based in Tamil Nadu, India, with 2+ years of experience building enterprise-grade web apps — from MySQL schema design to high-performance Angular interfaces. Currently a Software Engineer at Stellar Innovation, promoted twice in under two years.'
  },
  {
    id: 'current-role',
    questions: [
      'stellar innovation', 'current job', 'current role', 'work experience', 'current company',
      'what does he do at stellar innovation'
    ],
    answer: 'Since Jan 2024, Vishnuprabha has been a Software Engineer at Stellar Innovation (progressing from Junior Software Developer → Junior Software Engineer → Software Engineer). He builds RESTful APIs with NestJS/Node.js, models MySQL schemas with Prisma & Sequelize, wires up JWT auth and Redis caching, and builds scalable Angular modules with virtual scrolling for high-volume data tables.'
  },
  {
    id: 'previous-role',
    questions: [
      'webberax', 'marketing job', 'previous job', 'previous role', 'email marketing',
      'past experience', 'first job'
    ],
    answer: 'From Sep 2022 to Dec 2023, he worked at Webberax as an Associate Software Engineer — Marketing Professional, running large-scale bulk email campaigns via PMTA on a dedicated IP and configuring DKIM/SPF/DMARC/MX records for inbox deliverability.'
  },
  {
    id: 'years-experience',
    questions: ['how many years of experience', 'experience level', 'years of experience', 'how senior is he', 'is he junior or senior'],
    answer: 'He has 2+ years of professional experience, with two promotions in under two years at Stellar Innovation — Junior Software Developer → Junior Software Engineer → Software Engineer.'
  },
  {
    id: 'skills-frontend',
    questions: [
      'angular skills', 'frontend skills', 'front-end experience', 'does he know react',
      'rxjs', 'typescript experience', 'what frontend framework'
    ],
    answer: "He specializes in Angular rather than React — Angular, TypeScript, RxJS, NgRx, Angular Signals, HTML5/CSS3, and Tailwind CSS. He builds reusable component libraries and optimizes change detection for high-volume data tables."
  },
  {
    id: 'skills-backend',
    questions: ['backend skills', 'nestjs experience', 'node.js', 'api development', 'express js', 'server side'],
    answer: 'Backend: NestJS, Node.js, Express.js, REST API design, JWT authentication, and API performance optimization.'
  },
  {
    id: 'skills-database',
    questions: ['database skills', 'mysql experience', 'sql', 'prisma', 'redis', 'sequelize', 'caching'],
    answer: 'Database & caching: MySQL, Prisma ORM, Sequelize ORM, SQL, database schema design, and Redis for caching high-traffic lookups.'
  },
  {
    id: 'ai-tools',
    questions: ['ai tools', 'claude', 'chatgpt', 'codex', 'gemini cli', 'copilot', 'does he use ai'],
    answer: 'He works regularly with AI coding tools — Claude Code, Codex, Gemini CLI, and Antigravity — including building this very chatbot!'
  },
  {
    id: 'projects-overview',
    questions: ['projects', 'portfolio projects', 'what has he built', 'what has he worked on', 'side projects'],
    answer: 'Four main projects: ULRS (Universal Loan Review System), OMN (Order Management System), TPS (Title Production Service), and Screenate — all built with Angular, NestJS, and MySQL. Ask me about any one of them, or scroll to the Projects section.'
  },
  {
    id: 'project-ulrs',
    questions: ['ulrs', 'loan review system', 'loan application'],
    answer: 'ULRS (Universal Loan Review System) is an internal platform for loan officers to review, track, and approve loan applications through a structured workflow — built with Angular, NestJS, MySQL, Prisma, and JWT auth, with virtual-scrolled tables for large record volumes.'
  },
  {
    id: 'project-omn',
    questions: ['omn', 'order management system', 'mortgage deed title'],
    answer: 'OMN is an order management system for mortgage, deed, and loan title workflows — real-time order tracking, Redis-cached lookups, and Socket.io live status updates, built with Angular, NestJS, MySQL, and RxJS.'
  },
  {
    id: 'project-tps',
    questions: ['tps', 'title production service', 'title production'],
    answer: 'TPS (Title Production Service) automates title production workflows for mortgage and deed processing, with document-generation pipelines and real-time status tracking — built with NestJS, MySQL, and Angular.'
  },
  {
    id: 'project-screenate',
    questions: ['screenate', 'screen management', 'display management'],
    answer: 'Screenate is a screen and display management platform — centralized control, scheduling, and monitoring of screen assets across locations, with an Angular dashboard and NestJS backend.'
  },
  {
    id: 'education',
    questions: ['education', 'degree', 'college', 'university', 'cgpa', 'academic background'],
    answer: 'B.E. in Electrical and Electronics Engineering from PSNA College of Engineering and Technology, Dindigul (2018–2022), CGPA 7.9.'
  },
  {
    id: 'certifications',
    questions: ['certification', 'certificate', 'besant technologies', 'tessolve', 'courses'],
    answer: 'Front-End Developer certification from Besant Technologies, and Embedded and IoT Programming from Tessolve.'
  },
  {
    id: 'contact',
    questions: ['contact', 'email', 'reach him', 'hire him', 'linkedin', 'get in touch', 'phone number'],
    answer: "Best way to reach out is the Contact form on this site or email at vishnukprahbak@gmail.com. He's based in Tamil Nadu, India — LinkedIn is linked in the Contact section."
  },
  {
    id: 'resume-download',
    questions: ['resume', 'cv', 'download resume', 'download cv'],
    answer: "You can download the full resume PDF using the \"Resume\" button in the hero section at the top of the page."
  },
  {
    id: 'availability',
    questions: ['available', 'hiring', 'open to work', 'freelance', 'is he available', 'looking for a job'],
    answer: 'Yes — he is currently open to full-time, contract, and freelance opportunities.'
  },
  {
    id: 'meta-bot',
    questions: ['who built you', 'are you ai', 'are you real', 'what are you', 'is this a chatbot', 'are you chatgpt'],
    answer: "I'm a small assistant built into this portfolio — I run entirely in your browser and match your question against Vishnuprabha's real resume content, no external AI API involved. That also means I won't hallucinate a fact he doesn't actually have!"
  }
];

export const suggestedQuestions: string[] = [
  "What's his work experience?",
  "What's his tech stack?",
  'Tell me about his projects',
  'Is he available for hire?',
  'How can I contact him?'
];
