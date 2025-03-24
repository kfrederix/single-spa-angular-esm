import { ApplicationConfig } from '@angular/core';
import { getSingleSpaExtraProviders } from 'single-spa-angular';

export const appConfig: ApplicationConfig = {
  providers: [getSingleSpaExtraProviders()],
};
