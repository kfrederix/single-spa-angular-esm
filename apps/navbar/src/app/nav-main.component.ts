import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { fromEvent, map } from 'rxjs';
import { navigateToUrl } from 'single-spa';

const routes = [
  { path: '/cats', label: 'Cats' },
  { path: '/dogs', label: 'Dogs' },
] as const;

@Component({
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
        onclick="singleSpaNavigate(event)"
        >{{ navLink.label }}</a
      >
      }
      <em class="ml-8">this nav bar is a micro-frontend too</em>
    </nav>
  `,
})
export class NavMainComponent {
  private readonly currentLocationPath$ = fromEvent(window, 'single-spa:routing-event').pipe(
    map(() => document.location.pathname)
  );

  appPath = toSignal(this.currentLocationPath$, { initialValue: document.location.pathname });
  navLinks = signal(routes);

  singleSpaNavigate = navigateToUrl;
}
