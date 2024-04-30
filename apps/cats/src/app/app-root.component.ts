import { Component, ViewEncapsulation } from '@angular/core';
import { AppComponent } from './app.component';

@Component({
  standalone: true,
  imports: [AppComponent],
  selector: 'app-root',
  template: `<app-main />`,
  styleUrls: ['../styles.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppRootComponent {}
