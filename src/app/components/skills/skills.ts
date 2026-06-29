import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill { name: string; level: number; color: string; }
interface SkillGroup { title: string; icon: string; color: string; skills: Skill[]; }

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css'
})
export class SkillsComponent implements AfterViewInit, OnDestroy {
  private observer: IntersectionObserver | null = null;
  private barsAnimated = false;

  skillGroups: SkillGroup[] = [
    {
      title: 'Frontend', icon: '🎨', color: '#f472b6',
      skills: [
        { name: 'Angular', level: 92, color: '#f472b6' },
        { name: 'TypeScript', level: 90, color: '#a855f7' },
        { name: 'RxJS / NgRx', level: 85, color: '#ec4899' },
        { name: 'Angular Signals', level: 82, color: '#8b5cf6' },
        { name: 'HTML5 / CSS3', level: 90, color: '#f472b6' },
        { name: 'Tailwind CSS', level: 85, color: '#a855f7' }
      ]
    },
    {
      title: 'Backend', icon: '⚙️', color: '#a855f7',
      skills: [
        { name: 'NestJS', level: 88, color: '#a855f7' },
        { name: 'Node.js', level: 85, color: '#8b5cf6' },
        { name: 'REST API Design', level: 90, color: '#ec4899' },
        { name: 'Express.js', level: 80, color: '#f472b6' },
        { name: 'JWT Auth', level: 85, color: '#a855f7' },
        { name: 'Socket.io', level: 75, color: '#8b5cf6' }
      ]
    },
    {
      title: 'Database & DevOps', icon: '🗄️', color: '#8b5cf6',
      skills: [
        { name: 'MySQL', level: 87, color: '#8b5cf6' },
        { name: 'Prisma ORM', level: 83, color: '#a855f7' },
        { name: 'Sequelize ORM', level: 80, color: '#ec4899' },
        { name: 'Redis', level: 78, color: '#f472b6' },
        { name: 'Git / GitHub', level: 88, color: '#8b5cf6' },
        { name: 'Database Design', level: 85, color: '#a855f7' }
      ]
    }
  ];

  techBadges = [
    'JavaScript', 'SQL', 'Jira', 'GitLab', 'Claude Code', 'Codex', 'Gemini CLI', 'Antigravity'
  ];

  ngAfterViewInit() {
    this.setupObserver();
  }

  setupObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('#skills .reveal, #skills .reveal-left, #skills .reveal-right, #skills .reveal-scale')
      .forEach(el => this.observer!.observe(el));

    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid) {
      const barObs = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !this.barsAnimated) {
          this.barsAnimated = true;
          this.animateBars();
          barObs.disconnect();
        }
      }, { threshold: 0.3 });
      barObs.observe(skillsGrid);
    }
  }

  animateBars() {
    const bars = document.querySelectorAll('.skill-bar-fill');
    bars.forEach((bar) => {
      const el = bar as HTMLElement;
      const target = el.dataset['level'] || '0';
      el.style.width = target + '%';
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
