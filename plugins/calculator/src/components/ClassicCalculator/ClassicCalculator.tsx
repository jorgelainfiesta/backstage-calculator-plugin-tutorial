import {
  Content,
  ContentHeader,
  SupportButton
} from '@backstage/core-components';
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from '@material-ui/core';
import React, { useState } from 'react';
import {
  addDigit,
  DEFAULT_STATE,
  KEYBOARD,
  processOperator,
  showDigits
} from './array-calculator';

export const ClassicCalculator = () => {
  const [digits, setDigits] = useState(DEFAULT_STATE);
  return (
    <Content noPadding>
      <ContentHeader title="Classic Calculator">
        <SupportButton>A nostalgic calculator</SupportButton>
      </ContentHeader>
      <Grid
        container
        spacing={3}
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item xs={4}>
          <Box sx={{ maxWidth: '260px' }}>
            <TableContainer component={Paper}>
              <Paper elevation={1} variant="outlined">
                <Box sx={{ padding: '20px' }}>
                  <Typography
                    align="right"
                    variant="h1"
                    component="p"
                    className="calculator-results"
                  >
                    {showDigits(digits)}
                  </Typography>
                </Box>
              </Paper>
              <Table aria-label="Calculator keypad" padding="none">
                <TableBody>
                  {KEYBOARD.map((row, rowNum) => (
                    <TableRow key={`row-${rowNum}`}>
                      {row.map((key, keyNum) => {
                        if (key === '=') {
                          return (
                            <TableCell
                              align="center"
                              key={`key-${rowNum}-${keyNum}`}
                            >
                              <Button
                                variant="contained"
                                size="large"
                                color="primary"
                                aria-label={key}
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
                            <TableCell
                              align="center"
                              key={`key-${rowNum}-${keyNum}`}
                            >
                              <Button
                                variant="outlined"
                                size="large"
                                aria-label={key}
                                onClick={() => setDigits(addDigit(digits, key))}
                              >
                                {key}
                              </Button>
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell
                            align="center"
                            key={`key-${rowNum}-${keyNum}`}
                          >
                            <Button
                              variant="contained"
                              size="large"
                              aria-label={key}
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
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
    </Content>
  );
};
