import { NgClass, NgOptimizedImage } from '@angular/common';
import { Component, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AssetUrlPipe } from '@single-spa-angular-esm/shared-ng';
import { fromEvent, map } from 'rxjs';
import { navigateToUrl } from 'single-spa';

const routes = [
  { path: '/cats', label: 'Cats' },
  { path: '/dogs', label: 'Dogs' },
] as const;

@Component({
  standalone: true,
  imports: [NgClass, NgOptimizedImage, AssetUrlPipe],
  selector: 'nav-main',
  template: `
    <nav class="flex items-center gap-4 py-4 px-8 bg-gray-800 border-b border-gray-700 text-white">
      <img class="-mt-2" [ngSrc]="'halloween_icon.png' | assetUrl" width="40" height="40" priority />

      @for(navLink of navLinks(); track navLink.path) {
      <a
        class="border-b-2 border-transparent hover:text-teal-300"
        [ngClass]="{
          'text-teal-300 font-bold cursor-default': appPath().startsWith(navLink.path)
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
