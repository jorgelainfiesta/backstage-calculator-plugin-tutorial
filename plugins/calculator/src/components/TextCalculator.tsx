import {
  Content,
  ContentHeader,
  SupportButton,
} from '@backstage/core-components';
import { Button, FormGroup, Grid, TextField } from '@material-ui/core';
import React from 'react';

export const TextCalculator = () => {
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
        <Grid item xs={3}>
          <form>
            <FormGroup row>
              <Button
                aria-label="Clear"
                variant="contained"
                size="large"
                type="submit"
              >
                C
              </Button>
              <TextField
                variant="outlined"
                size="medium"
                label="Your math expression"
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
            </FormGroup>
          </form>
        </Grid>
      </Grid>
    </Content>
  );
};
