import React, { useState } from 'react';
import {
  Typography,
  Grid,
  Table,
  TableRow,
  TableCell,
  Button,
  Paper,
  TableContainer,
  Box,
} from '@material-ui/core';
import {
  Header,
  Page,
  Content,
  HeaderLabel,
} from '@backstage/core-components';
import { evaluate } from 'mathjs';

const keyboard = [
  ['C', '/', '*', '<'],
  ['7', '8', '9', '-'],
  ['4', '5', '6', '+'],
  ['1', '2', '3', '='],
  ['0', '.'],
];

const DEFAULT_STATE = ['0'];
const OPERATORS = ['/', '*', '-', '+'];
const DELETE_KEY = '<';
const RESET_KEY = 'C';
const SOLVE_KEY = '=';
const IS_EPHEMERAL_RESULT = 'er'; //TODO: if the users inputs without operator on a result, delete result

/**
 * digits are a FILO list
 */
function digitsToString(digits) {
  return digits.reduce((displayVal, digit) => `${displayVal}${digit}`, '');
}

function addDigit(digits: string[], digit: string) {
  if (
    digits.length === DEFAULT_STATE.length &&
    digits[0] === DEFAULT_STATE[0]
  ) {
    return [digit];
  }
  return [...digits, digit];
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

function processOperator(digits: string[], operator: string) {
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
    // If the last digit is an operator remove it
    const withoutLast = deleteLastDigit(digits);
    if (lastDigit === operator) {
      return withoutLast;
    }
    return [...withoutLast, operator];
  }

  const hasPendingOperators = containsOperators(digits);
  if (hasPendingOperators) {
    return [`${evaluate(digitsToString(digits))}`, operator];
  }

  return [...digits, operator];
}

export const ExampleComponent = () => {
  const [digits, setDigits] = useState(DEFAULT_STATE);
  return (
    <Page themeId="tool">
      <Header title="Welcome to calculator!" subtitle="Optional subtitle">
        <HeaderLabel label="Owner" value="Team X" />
        <HeaderLabel label="Lifecycle" value="Alpha" />
      </Header>
      <Content>
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item>
            <Box sx={{ maxWidth: '600px' }}>
              <TableContainer component={Paper}>
                <Paper elevation={1} variant="outlined">
                  <Box sx={{ padding: '20px' }}>
                    <Typography align="right" variant="h1" component="p">
                      {digitsToString(digits)}
                    </Typography>
                  </Box>
                </Paper>
                <Table aria-label="Calculator keypad" padding="none">
                  {keyboard.map((row, rowNum) => (
                    <TableRow>
                      {row.map((key, keyNum) => {
                        if (key === '=') {
                          return (
                            <TableCell align="center">
                              <Button
                                variant="contained"
                                size="large"
                                color="primary"
                                onClick={() =>
                                  setDigits(processOperator(digits, key))
                                }
                              >
                                {key}
                              </Button>
                            </TableCell>
                          );
                        }
                        if (rowNum > 0 && keyNum < 3) {
                          return (
                            <TableCell align="center">
                              <Button
                                variant="outlined"
                                size="large"
                                onClick={() => setDigits(addDigit(digits, key))}
                              >
                                {key}
                              </Button>
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell align="center">
                            <Button
                              variant="contained"
                              size="large"
                              onClick={() =>
                                setDigits(processOperator(digits, key))
                              }
                            >
                              {key}
                            </Button>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </Table>
              </TableContainer>
            </Box>
          </Grid>
          {/* <Grid item>
            <ExampleFetchComponent />
          </Grid> */}
        </Grid>
      </Content>
    </Page>
  );
};
