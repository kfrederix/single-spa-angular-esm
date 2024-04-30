import { Component, ViewEncapsulation } from '@angular/core';
import { NavMainComponent } from './nav-main.component';

@Component({
  standalone: true,
  imports: [NavMainComponent],
  selector: 'nav-root',
  template: `<nav-main />`,
  styleUrls: ['../styles.css'],
  encapsulation: ViewEncapsulation.None,
})
export class NavRootComponent {}
