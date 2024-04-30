import { Component } from '@angular/core';
import { CatsComponent } from './cats/cats.component';

@Component({
  standalone: true,
  imports: [CatsComponent],
  selector: 'app-main',
  template: `
    <section class="h-full p-7 bg-[#C8F5DD]">
      <app-cats />
    </section>
  `,
})
export class AppComponent {}
