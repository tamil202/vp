import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  name: string;
  subtitle: string;
  description: string;
  tech: string[];
  color: string;
  gradient: string;
  icon: string;
  status: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  private observer: IntersectionObserver | null = null;

  projects: Project[] = [
    {
      name: 'ULRS',
      subtitle: 'Universal Loan Review System',
      description: 'Enterprise-grade loan review platform for financial institutions. Streamlines the entire loan review lifecycle — from submission to approval — with automated workflows, document verification, compliance checks, and real-time status tracking built on Angular and NestJS.',
      tech: ['Angular', 'NestJS', 'MySQL', 'Prisma', 'JWT', 'TypeScript'],
      color: '#f472b6',
      gradient: 'linear-gradient(135deg, rgba(244,114,182,0.15), rgba(168,85,247,0.08))',
      icon: '🏦',
      status: 'Production'
    },
    {
      name: 'OMN',
      subtitle: 'Order Management — Mortgage · Deed · Loan Title',
      description: 'Comprehensive order management system handling mortgage processing, deed management, and loan title operations. Features real-time order tracking, multi-channel pipeline management, Redis-cached lookups, and Socket.io live status updates for high-volume title and deed workflows.',
      tech: ['Angular', 'NestJS', 'MySQL', 'Redis', 'Socket.io', 'RxJS'],
      color: '#a855f7',
      gradient: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(139,92,246,0.08))',
      icon: '📋',
      status: 'Production'
    },
    {
      name: 'Screenate',
      subtitle: 'Screen Management System',
      description: 'Full-featured screen and display management platform for enterprise environments. Enables centralized control, scheduling, and monitoring of screen assets across multiple locations, with a responsive Angular dashboard and high-performance NestJS backend API.',
      tech: ['Angular', 'NestJS', 'MySQL', 'Redis', 'Socket.io', 'TypeScript'],
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(244,114,182,0.08))',
      icon: '🖥️',
      status: 'Active'
    },
    {
      name: 'TPS',
      subtitle: 'Transaction Processing System',
      description: 'High-performance transaction processing system with real-time data handling and secure financial workflows. Features advanced queue management, audit trails, and seamless API integrations for reliable transaction execution at scale.',
      tech: ['Angular', 'NestJS', 'MySQL', 'Redis', 'REST API', 'TypeScript'],
      color: '#ec4899',
      gradient: 'linear-gradient(135deg, rgba(236,72,153,0.15), rgba(168,85,247,0.08))',
      icon: '⚡',
      status: 'In Progress'
    }
  ];

  ngAfterViewInit() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('#projects .reveal, #projects .reveal-scale')
      .forEach(el => this.observer!.observe(el));
  }

  onCardMove(event: MouseEvent, card: HTMLElement) {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -8;
    const ry = ((x - cx) / cx) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;

    const shine = card.querySelector('.card-shine') as HTMLElement;
    if (shine) {
      shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.08) 0%, transparent 60%)`;
    }
  }

  onCardLeave(card: HTMLElement) {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    const shine = card.querySelector('.card-shine') as HTMLElement;
    if (shine) shine.style.background = 'transparent';
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
