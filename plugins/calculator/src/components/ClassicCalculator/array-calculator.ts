import { evaluate } from 'mathjs';

const OPERATORS = ['/', '*', '-', '+'];
const DELETE_KEY = '<';
const RESET_KEY = 'C';
const SOLVE_KEY = '=';
// TODO: if the users inputs without operator on a result, delete result

export const DEFAULT_STATE = ['0'];

export const KEYBOARD = [
  [RESET_KEY, '/', '*', DELETE_KEY],
  ['7', '8', '9', '-'],
  ['4', '5', '6', '+'],
  ['1', '2', '3', SOLVE_KEY],
  ['0', '.'],
];

function digitsToString(digits: string[]) {
  return digits.reduce((displayVal, digit) => `${displayVal}${digit}`, '');
}

function isOperator(digit: string) {
  return OPERATORS.indexOf(digit) >= 0;
}

function containsOperators(digits: string[]) {
  return digits.reduce(
    (operatorsFound, digit) =>
      isOperator(digit) ? operatorsFound + 1 : operatorsFound,
    0,
  );
}

function deleteLastDigit(digits: string[]) {
  if (digits.length === 1) {
    return DEFAULT_STATE;
  }
  return digits.slice(0, digits.length - 1);
}

export function showDigits(digits: string[]) {
  return digitsToString(digits);
}

export function addDigit(digits: string[], digit: string) {
  if (
    digits.length === DEFAULT_STATE.length &&
    digits[0] === DEFAULT_STATE[0]
  ) {
    return [digit];
  }
  return [...digits, digit];
}

export function processOperator(digits: string[], operator: string) {
  if (operator === DELETE_KEY) {
    return deleteLastDigit(digits);
  }

  if (operator === RESET_KEY) {
    return DEFAULT_STATE;
  }

  if (operator === SOLVE_KEY) {
    return [`${evaluate(digitsToString(digits))}`];
  }

  const lastDigit = digits[digits.length - 1];
  if (isOperator(lastDigit)) {
    // If the last digit is the same new operator, remove it
    const withoutLast = deleteLastDigit(digits);
    if (lastDigit === operator) {
      return withoutLast;
    }
    // Otherwise, replace it
    return [...withoutLast, operator];
  }

  const hasPendingOperators = containsOperators(digits);
  if (hasPendingOperators) {
    return [`${evaluate(digitsToString(digits))}`, operator];
  }

  return [...digits, operator];
}
