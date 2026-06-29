import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero';
import { AboutComponent } from '../../components/about/about';
import { SkillsComponent } from '../../components/skills/skills';
import { ExperienceComponent } from '../../components/experience/experience';
import { ProjectsComponent } from '../../components/projects/projects';
import { ContactComponent } from '../../components/contact/contact';
import { FooterComponent } from '../../components/footer/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    ContactComponent,
    FooterComponent
  ],
  template: `
    <app-hero></app-hero>
    <app-about></app-about>
    <app-skills></app-skills>
    <app-experience></app-experience>
    <app-projects></app-projects>
    <app-contact></app-contact>
    <app-footer></app-footer>
  `
})
export class HomeComponent {}
