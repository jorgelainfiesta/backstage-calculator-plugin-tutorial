import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { calculatorPlugin, CalculatorPage } from '../src/plugin';

createDevApp()
  .registerPlugin(calculatorPlugin)
  .addPage({
    element: <CalculatorPage />,
    title: 'Root Page',
    path: '/calculator'
  })
  .render();
