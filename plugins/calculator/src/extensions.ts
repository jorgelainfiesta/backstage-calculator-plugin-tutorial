import { createComponentExtension, createRoutableExtension } from '@backstage/core-plugin-api';
import { calculatorPlugin } from './plugin';
import { calculatorRouteRef } from './routes';

export const CalculatorPage = calculatorPlugin.provide(
  createRoutableExtension({
    name: 'CalculatorPage',
    component: () =>
      import('./components/CalculatorEntry').then(m => m.CalculatorEntry),
    mountPoint: calculatorRouteRef,
  }),
);

export const ClassicCalculatorPage = calculatorPlugin.provide(
  createComponentExtension({
    name: 'ClassicCalculatorPage',
    component: {
      lazy: () =>
        import('./components/ClassicCalculator').then(
          m => m.ClassicCalculator,
        ),
    },
  }),
);

export const TextCalculatorPage = calculatorPlugin.provide(
  createComponentExtension({
    name: 'TextCalculatorPage',
    component: {
      lazy: () =>
        import('./components/TextCalculator').then(
          m => m.TextCalculator,
        ),
    },
  }),
);