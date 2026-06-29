import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  @ViewChild('cursor') cursorEl!: ElementRef;
  @ViewChild('cursorFollower') followerEl!: ElementRef;

  private mouseX = 0;
  private mouseY = 0;
  private followerX = 0;
  private followerY = 0;
  private rafId: number = 0;

  ngOnInit() {
    this.animateCursor();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    if (this.cursorEl) {
      this.cursorEl.nativeElement.style.left = e.clientX + 'px';
      this.cursorEl.nativeElement.style.top = e.clientY + 'px';
    }
  }

  @HostListener('document:mouseenter')
  onMouseEnter() {
    if (this.cursorEl) this.cursorEl.nativeElement.style.opacity = '1';
    if (this.followerEl) this.followerEl.nativeElement.style.opacity = '1';
  }

  @HostListener('document:mouseleave')
  onMouseLeave() {
    if (this.cursorEl) this.cursorEl.nativeElement.style.opacity = '0';
    if (this.followerEl) this.followerEl.nativeElement.style.opacity = '0';
  }

  animateCursor() {
    const follow = () => {
      this.followerX += (this.mouseX - this.followerX) * 0.12;
      this.followerY += (this.mouseY - this.followerY) * 0.12;
      if (this.followerEl) {
        this.followerEl.nativeElement.style.left = this.followerX + 'px';
        this.followerEl.nativeElement.style.top = this.followerY + 'px';
      }
      this.rafId = requestAnimationFrame(follow);
    };
    this.rafId = requestAnimationFrame(follow);
  }

  @HostListener('document:mouseover', ['$event'])
  onHover(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const isHoverable = target.closest('a, button, .nav-logo, .project-card, .skill-group-card, .stat-card');
    if (this.cursorEl) this.cursorEl.nativeElement.classList.toggle('hover', !!isHoverable);
    if (this.followerEl) this.followerEl.nativeElement.classList.toggle('hover', !!isHoverable);
  }
}
