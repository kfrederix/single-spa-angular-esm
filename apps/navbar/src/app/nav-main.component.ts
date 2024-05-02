import { NgClass } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';

const routes = [
  { path: '/cats', label: 'Cats' },
  { path: '/dogs', label: 'Dogs' },
] as const;

const isValidPath = (path: string) => routes.some((route) => path.startsWith(route.path));

@Component({
  standalone: true,
  imports: [NgClass],
  selector: 'nav-main',
  template: `
    <nav class="flex items-center gap-4 py-4 px-8 bg-gray-100 border-b border-gray-300">
      @for(navLink of navLinks(); track navLink.path) {
      <a
        class="border-b-2 border-transparent"
        [ngClass]="{
          'text-teal-600 font-bold cursor-default': appPath().startsWith(navLink.path),
          'hover:border-b-2 hover:border-teal-600': !appPath().startsWith(navLink.path)
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
    if (!isValidPath(document.location.pathname)) {
      // redirect to /cats when current path is invalid
      location.href = '/cats';
    }

    this.appPath.set(document.location.pathname);
  }
}
