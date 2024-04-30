import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import { assetUrl } from '@single-spa-angular-esm/shared-utils';

@Pipe({ name: 'assetUrl', standalone: true })
export class AssetUrlPipe implements PipeTransform {
  transform(value: string): string {
    return assetUrl(value);
  }
}
