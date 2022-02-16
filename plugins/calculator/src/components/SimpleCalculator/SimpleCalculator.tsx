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
  TableBody,
} from '@material-ui/core';
import { Header, Page, Content, HeaderLabel } from '@backstage/core-components';
import {
  addDigit,
  DEFAULT_STATE,
  KEYBOARD,
  processOperator,
  showDigits,
} from '../../utils/array-calculator';

export const SimpleCalculator = () => {
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
                    <Typography align="right" variant="h1" component="p" className='calculator-results'>
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
                                  onClick={() =>
                                    setDigits(addDigit(digits, key))
                                  }
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
    </Page>
  );
};
