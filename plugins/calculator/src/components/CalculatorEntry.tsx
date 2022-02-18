import { Header, Page, RoutedTabs } from '@backstage/core-components';
import { TabProps } from '@material-ui/core';
import { default as React } from 'react';
import { ClassicCalculator } from './ClassicCalculator';
import { TextCalculator } from './TextCalculator';

type SubRoute = {
  path: string;
  title: string;
  children: JSX.Element;
  tabProps?: TabProps<React.ElementType, { component?: React.ElementType }>;
};

export const CalculatorEntry = () => {
  const routes: SubRoute[] = [
    {
      path: '/classic',
      title: 'Classic calculator',
      children: <ClassicCalculator />,
    },
    {
      path: '/text',
      title: 'Text calculator',
      children: <TextCalculator />,
    },
  ];

  return (
    <Page themeId="home">
      <Header
        title="Calculator"
        subtitle="Why do basic math outside Backstage when you can do it right here"
      />
      <RoutedTabs routes={routes} />
    </Page>
  );
};
