import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { AssetUrlPipe } from '@single-spa-angular-esm/shared-ng';

@Component({
  imports: [NgOptimizedImage, AssetUrlPipe],
  selector: 'cats-app',
  template: `
    <div>
      <img class="rounded-xl" [ngSrc]="'cats/cat.jpg' | assetUrl" width="600" height="600" priority />
    </div>
  `,
})
export class CatsComponent {}
