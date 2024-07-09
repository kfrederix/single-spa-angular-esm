import { Component } from '@angular/core';
import { CatsComponent } from './cats/cats.component';

@Component({
  standalone: true,
  imports: [CatsComponent],
  selector: 'cats-app-main',
  template: `
    <section class="h-full p-7 bg-[#C8F5DD]">
      <cats-app />
    </section>
  `,
})
export class CatsAppComponent {}
