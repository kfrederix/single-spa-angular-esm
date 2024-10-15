import { Component } from '@angular/core';
import { CatsComponent } from './cats/cats.component';

@Component({
  standalone: true,
  imports: [CatsComponent],
  selector: 'cats-app-main',
  template: `
    <section class="h-full p-7 bg-[rgb(135,150,101)]">
      <cats-app />
    </section>
  `,
})
export class CatsAppComponent {}
