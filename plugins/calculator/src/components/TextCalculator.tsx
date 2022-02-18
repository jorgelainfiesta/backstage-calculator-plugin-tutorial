import {
  Content,
  ContentHeader,
  SupportButton
} from '@backstage/core-components';
import {
  Box,
  Button, Grid,
  Paper,
  TextField, Typography
} from '@material-ui/core';
import { evaluate } from 'mathjs';
import React, { useState } from 'react';



export const TextCalculator = () => {
  const [inputText, setInputText] = useState('');
  const [hasError, setHasError] = useState(false);
  const [result, setResult] = useState(0);

  const calculateResults = (event) => {
    event.preventDefault();
    try {
      return evaluate(inputText)
    } catch(error) {
      setHasError(true);
      return result;
    }
  };

  return (
    <Content noPadding>
      <ContentHeader title="Text-based Calculator">
        <SupportButton>A more boring calculator</SupportButton>
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
            <Paper elevation={1} variant="outlined">
              <form onSubmit={(event) => setResult(calculateResults(event))}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <TextField
                    variant="outlined"
                    size="medium"
                    label="Math expression"
                    value={inputText}
                    error={hasError}
                    onChange={event => {setHasError(false); setInputText(event.target.value)}}
                  />
                  <Button
                    aria-label="Solve"
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                  >
                    =
                  </Button>
                </Box>
              </form>
              <Paper elevation={1} variant="outlined">
                <Box sx={{ padding: '20px' }}>
                  <Typography
                    align="right"
                    variant="h1"
                    component="p"
                    className="calculator-results"
                  >
                    {result}
                  </Typography>
                </Box>
              </Paper>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Content>
  );
};
