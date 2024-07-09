import { Component, ViewEncapsulation } from '@angular/core';
import { DogsAppComponent } from './app.component';

@Component({
  standalone: true,
  imports: [DogsAppComponent],
  selector: 'dogs-app-root',
  template: `<dogs-app-main />`,
  styleUrls: ['../styles.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DogsAppRootComponent {}
