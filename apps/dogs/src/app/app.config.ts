import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { getSingleSpaExtraProviders } from 'single-spa-angular';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideRouter(appRoutes), getSingleSpaExtraProviders()],
};
