import { Component, AfterViewInit, ElementRef, EventEmitter, Output } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-preloader',
  standalone: true,
  templateUrl: './preloader.html',
  styleUrl: './preloader.css',
  host: { 'aria-hidden': 'true' }
})
export class PreloaderComponent implements AfterViewInit {
  @Output() done = new EventEmitter<void>();

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        this.done.emit();
      }
    });

    tl.from('.pl-letter', {
        opacity: 0,
        y: 24,
        scale: 0.7,
        duration: 0.6,
        stagger: 0.08,
        ease: 'back.out(1.7)'
      })
      .to('.pl-bar-fill', {
        width: '100%',
        duration: 1.2,
        ease: 'power2.inOut'
      }, '-=0.1')
      .from('.pl-caption', {
        opacity: 0,
        y: 8,
        duration: 0.4
      }, '-=1.0')
      .to({}, { duration: 0.25 })
      .call(() => {
        document.body.classList.add('intro-done');
        document.dispatchEvent(new Event('intro-complete'));
      })
      .to('.pl-content', {
        opacity: 0,
        y: -20,
        scale: 0.95,
        duration: 0.4,
        ease: 'power2.in'
      }, '<')
      .to(this.el.nativeElement, {
        yPercent: -100,
        duration: 0.9,
        ease: 'power4.inOut'
      }, '-=0.15');
  }
}
