import { Component, ViewEncapsulation } from '@angular/core';
import { CatsAppComponent } from './app.component';

@Component({
  imports: [CatsAppComponent],
  selector: 'cats-app-root',
  template: `<cats-app-main />`,
  styleUrls: ['../styles.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CatsAppRootComponent {}
