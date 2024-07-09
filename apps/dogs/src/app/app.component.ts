import { Component } from '@angular/core';
import { DogsComponent } from './dogs/dogs.component';

@Component({
  standalone: true,
  imports: [DogsComponent],
  selector: 'dogs-app-main',
  template: `
    <section class="h-full p-7 bg-[#BBEBFF]">
      <dogs-app />
    </section>
  `,
})
export class DogsAppComponent {}
