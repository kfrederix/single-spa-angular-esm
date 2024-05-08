import { NgClass } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';

const routes = [
  { path: '/cats', label: 'Cats' },
  { path: '/dogs', label: 'Dogs' },
] as const;

@Component({
  standalone: true,
  imports: [NgClass],
  selector: 'nav-main',
  template: `
    <nav class="flex items-center gap-4 py-4 px-8 bg-gray-100 border-b border-gray-300">
      @for(navLink of navLinks(); track navLink.path) {
      <a
        class="border-b-2 border-transparent hover:text-teal-600"
        [ngClass]="{
          'text-teal-600 font-bold cursor-default': appPath().startsWith(navLink.path)
        }"
        [href]="navLink.path"
        >{{ navLink.label }}</a
      >
      }
      <em class="ml-8">this nav bar is a micro-frontend too</em>
    </nav>
  `,
})
export class NavMainComponent implements OnInit {
  appPath = signal('');
  navLinks = signal(routes);

  ngOnInit(): void {
    this.appPath.set(document.location.pathname);
  }
}
