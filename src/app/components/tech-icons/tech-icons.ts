import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-tech-icons',
  standalone: true,
  templateUrl: './tech-icons.html',
  styleUrl: './tech-icons.css',
  host: { 'aria-hidden': 'true' }
})
export class TechIconsComponent {
  @Input() variant: 'hero' | 'about' | 'skills' | 'experience' | 'projects' | 'contact' = 'hero';

  @HostBinding('class')
  get variantClass(): string {
    return 'tech-floats variant-' + this.variant;
  }
}
