import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const calculatorPlugin = createPlugin({
  id: 'calculator',
  routes: {
    root: rootRouteRef,
  },
});

export const CalculatorPage = calculatorPlugin.provide(
  createRoutableExtension({
    name: 'CalculatorPage',
    component: () =>
      import('./components/SimpleCalculator').then(m => m.SimpleCalculator),
    mountPoint: rootRouteRef,
  }),
);
