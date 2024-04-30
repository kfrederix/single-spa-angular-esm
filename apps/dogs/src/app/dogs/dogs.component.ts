import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { AssetUrlPipe } from '@single-spa-angular-esm/shared-ng';

@Component({
  standalone: true,
  imports: [NgOptimizedImage, AssetUrlPipe],
  selector: 'app-dogs',
  template: `
    <div>
      <img
        class="rounded-xl"
        [ngSrc]="'dogs/dog.jpg' | assetUrl"
        width="600"
        height="600"
        priority
      />
    </div>
  `,
})
export class DogsComponent {}
