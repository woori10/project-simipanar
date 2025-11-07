// import '../css/app.css';
import 'flowbite';
import 'flowbite-react';
import '../css/index.css';
import './bootstrap';

// import { InertiaProgress } from '@inertiajs/progress';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'SIMIPANAR';
// InertiaProgress.init({ showSpinner: false });

createInertiaApp({
    title: (title) => `${title} ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

       root.render(
      <>
        <App {...props} />
        {/* <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#fffff',
              color: '#000000',
            },
          }}
        /> */}
      </>
    );
    },
    // progress: {
    //     color: '#4B5563',
    // },
});
