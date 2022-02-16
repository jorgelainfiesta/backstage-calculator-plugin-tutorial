import React from 'react';
import { SimpleCalculator } from './SimpleCalculator';
import { ThemeProvider } from '@material-ui/core';
import { lightTheme } from '@backstage/theme';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  setupRequestMockHandlers,
  renderInTestApp,
} from '@backstage/test-utils';

import { Button, HTML } from '@interactors/material-ui';

const CalculatorResult = HTML.extend<HTMLParagraphElement>(
  'calculator-result',
).selector('.calculator-results');

describe('SimpleCalculator', () => {
  const server = setupServer();
  // Enable sane handlers for network requests
  setupRequestMockHandlers(server);

  // setup mock response
  beforeEach(() => {
    server.use(
      rest.get('/*', (_, res, ctx) => res(ctx.status(200), ctx.json({}))),
    );
  });

  it('should render', async () => {
    const rendered = await renderInTestApp(
      <ThemeProvider theme={lightTheme}>
        <SimpleCalculator />
      </ThemeProvider>,
    );

    await Button('C').exists();
    await Button('/').exists();
    await Button('*').exists();
    await Button('<').exists();
    await Button('+').exists();
    await Button('-').exists();
    await Button('=').exists();
    await Button('0').exists();
    await Button('1').exists();
    await Button('2').exists();
    await Button('3').exists();
    await Button('4').exists();
    await Button('5').exists();
    await Button('6').exists();
    await Button('7').exists();
    await Button('8').exists();
    await Button('9').exists();
  });

  it('should input numbers', async () => {
    const rendered = await renderInTestApp(
      <ThemeProvider theme={lightTheme}>
        <SimpleCalculator />
      </ThemeProvider>,
    );

    await Button('1').click();
    await Button('2').click();
    await Button('3').click();
    await CalculatorResult().has({ text: '1234' });
  }, 30000);
});
