import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { calculatorPlugin } from '../src/plugin';
import { CalculatorPage } from '../src/extensions';

createDevApp()
  .registerPlugin(calculatorPlugin)
  .addPage({
    element: <CalculatorPage />,
    title: 'Root Page',
    path: '/calculator'
  })
  .render();
