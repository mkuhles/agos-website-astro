// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  vite: {
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          if (
            warning?.code === 'UNUSED_EXTERNAL_IMPORT' &&
            warning?.exporter === '@astrojs/internal-helpers/remote' &&
            Array.isArray(warning?.names) &&
            warning.names.every((name) =>
              ['matchHostname', 'matchPathname', 'matchPort', 'matchProtocol'].includes(name)
            ) &&
            Array.isArray(warning?.ids) &&
            warning.ids.some(
              (id) =>
                id?.includes('node_modules/astro/dist/assets/utils/remotePattern.js') ||
                id?.includes('node_modules/astro/dist/assets/services/service.js')
            )
          ) {
            return;
          }

          warn(warning);
        }
      }
    }
  }
});
