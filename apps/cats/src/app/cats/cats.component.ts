import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { AssetUrlPipe } from '@single-spa-angular-esm/shared-ng';

@Component({
  standalone: true,
  imports: [NgOptimizedImage, AssetUrlPipe],
  selector: 'cats-app',
  template: `
    <div>
      <img
        class="rounded-xl"
        [ngSrc]="'cats/shutterstock_halloween_cat_2193834537.jpg' | assetUrl"
        width="800"
        height="600"
        priority
      />
    </div>
  `,
})
export class CatsComponent {}
