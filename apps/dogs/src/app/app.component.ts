import { Component } from '@angular/core';
import { DogsComponent } from './dogs/dogs.component';

@Component({
  standalone: true,
  imports: [DogsComponent],
  selector: 'app-main',
  template: `
    <section class="h-full p-7 bg-[#F7E4A7]">
      <app-dogs />
    </section>
  `,
})
export class AppComponent {}
