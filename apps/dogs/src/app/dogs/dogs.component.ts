import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { AssetUrlPipe } from '@single-spa-angular-esm/shared-ng';

@Component({
  standalone: true,
  imports: [NgOptimizedImage, AssetUrlPipe],
  selector: 'dogs-app',
  template: `
    <div>
      <img
        class="rounded-xl"
        [ngSrc]="'dogs/shutterstock_halloween_dog_1533798113.jpg' | assetUrl"
        width="800"
        height="600"
        priority
      />
    </div>
  `,
})
export class DogsComponent {}
