import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { calculatorRouteRef } from './routes';

export const calculatorPlugin = createPlugin({
  id: 'calculator',
  routes: {
    root: calculatorRouteRef,
  },
});

