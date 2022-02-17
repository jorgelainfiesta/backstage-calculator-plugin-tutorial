import { Button, HTML } from '@interactors/material-ui';

const CalculatorResult = HTML.extend<HTMLParagraphElement>(
  'calculator-result',
).selector('.calculator-results');

const generateDigits = (digits: string) => {
  return digits.split('').map(digit => Button(digit).click() );
}

// Step 1
describe('The simple calculator', () => {
  beforeEach(() => cy.visit('http://localhost:3000/calculator'));
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
  })
  it('should add two numbers correctly with function', () => {
    cy.do(generateDigits('101+23='));
    cy.expect([
      CalculatorResult().has({ text: '124' })
    ]);
  })
})


