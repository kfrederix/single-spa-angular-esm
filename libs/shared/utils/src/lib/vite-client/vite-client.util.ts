import { getModuleOriginUrl } from '../module-url/module-url.util';

/**
 * For cases when we want to load the @vite/client module dynamically at runtime,
 * instead of relying on <script type="module" src="@vite/client"> in index.html.
 *
 * Loading the Vite client module enables Vite "live-reload" functionality,
 * which is especially useful during development in a micro-frontend architecture.
 *
 * @returns a promise that resolves when the @vite/client module is imported
 */
export const loadViteClient = (): Promise<unknown> => import(/* @vite-ignore */ `${getModuleOriginUrl()}/@vite/client`);
