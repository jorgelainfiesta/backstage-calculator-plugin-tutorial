import { Button, createInteractor, Heading, HTML, Tab, TextField } from '@interactors/material-ui';

const CalculatorResult = HTML.extend<HTMLParagraphElement>(
  'calculator-result',
).selector('.calculator-results');

const ClassicCalculator = createInteractor('Calculator')
  .selector('.classic-calculator')
  .actions({
    async inputDigits(calculator, digits: string) {
      for (const digit of digits) {
        await calculator.find(Button(digit)).click()
      }
    }
  });

describe('The calculator plugin', () => {
  beforeEach(() => cy.visit('/calculator'));

  it('should render simple calculator by default', () => {
    cy.expect([
      Heading('Classic Calculator').exists(),
      Tab('CLASSIC CALCULATOR').is({ active: true }),
    ]);
  });

  it('should change to input calculator with tab', () => {
    cy.do([
      Tab('TEXT CALCULATOR').click(),
    ]);
    cy.expect([
      Heading('Text-based Calculator').exists(),
      Tab('TEXT CALCULATOR').is({ active: true }),
    ]);
  });
});

describe('The classic calculator', () => {
  beforeEach(() => cy.visit('/calculator/classic'));

  it('should show all buttons', () => {
    cy.expect([
      Button('C').exists(),
      Button('/').exists(),
      Button('*').exists(),
      Button('<').exists(),
      Button('+').exists(),
      Button('-').exists(),
      Button('=').exists(),
      Button('0').exists(),
      Button('1').exists(),
      Button('2').exists(),
      Button('3').exists(),
      Button('4').exists(),
      Button('5').exists(),
      Button('6').exists(),
      Button('7').exists(),
      Button('8').exists(),
      Button('9').exists(),
      CalculatorResult().has({ text: '0' })
    ]);
  })

  it('should show inputted numbers in the result box', () => {
    cy.do([
      Button('1').click(),
      Button('2').click(),
      Button('3').click()
    ]);
    cy.expect([
      CalculatorResult().has({ text: '123' })
    ]);
  })

  it('should not add left 0s to the result box', () => {
    cy.do([
      Button('0').click(),
      Button('5').click(),
      Button('6').click(),
    ]);
    cy.expect([
      CalculatorResult().has({ text: '56' })
    ]);
  });

  it('should add two numbers correctly', () => {
    cy.do([
      Button('1').click(),
      Button('0').click(),
      Button('1').click(),
      Button('+').click(),
      Button('2').click(),
      Button('3').click(),
      Button('=').click(),
    ]);
    cy.expect([
      CalculatorResult().has({ text: '124' })
    ]);
  });

  it('should add two numbers correctly with Interactor', () => {
    cy.do([
      ClassicCalculator().inputDigits('101+23=')
    ]);
    cy.expect([
      CalculatorResult().has({ text: '124' })
    ]);
  });
});

describe('The text calculator', () => {
  beforeEach(() => cy.visit('/calculator/text'));

  it('should render initail state', () => {
    cy.expect([
      TextField('Math expression').exists(),
      Button('=').exists(),
      CalculatorResult().has({ text: '0' })
    ])
  });

  it('should solve an expression', () => {
    cy.do([
      TextField('Math expression').fillIn('101+23'),
      Button('=').click(),
    ]);
    cy.expect([
      CalculatorResult().has({ text: '124' })
    ]);
  });
});
