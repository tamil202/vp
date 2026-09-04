import { Directive, ElementRef, Input, NgZone, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appParallax]',
  standalone: true
})
export class ParallaxDirective implements OnInit, OnDestroy {
  @Input('appParallax') speed = 0.15;

  private ticking = false;
  private active = false;
  private onScroll = () => this.requestTick();
  private onResize = () => this.requestTick();

  constructor(private el: ElementRef<HTMLElement>, private zone: NgZone) {}

  ngOnInit() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.active = true;
    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll, { passive: true });
      window.addEventListener('resize', this.onResize, { passive: true });
      this.update();
    });
  }

  private requestTick() {
    if (this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(() => {
      this.update();
      this.ticking = false;
    });
  }

  private update() {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const centerDelta = vh / 2 - (rect.top + rect.height / 2);
    const progress = Math.max(-1, Math.min(1, centerDelta / vh));
    const offset = progress * 160 * this.speed;
    this.el.nativeElement.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
  }

  ngOnDestroy() {
    if (!this.active) return;
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  }
}
