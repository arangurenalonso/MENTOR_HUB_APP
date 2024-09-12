import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid2';
import { Divider, Typography, useMediaQuery, useTheme } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  title: string;
}

const TabPanel = ({ children, value, index, title }: TabPanelProps) => {
  return (
    <Box>
      {value === index && (
        <Box sx={{ pl: 3, py: 5 }}>
          <Grid container gap={3}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h5">{title}</Typography>
              <Divider />
            </Grid>
            <Grid size={{ xs: 12 }}>{children}</Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};
export type RenderTabsContentProps = {};
export type CustomTabsProps = {
  render: {
    [key: string]: {
      label: string;
      element: ({}: RenderTabsContentProps) => React.ReactNode;
    };
  };
};

const CustomTabs = ({ render }: CustomTabsProps) => {
  const [value, setValue] = React.useState(0);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      {isSmallScreen ? (
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
            >
              {Object.keys(render).map((key, index) => {
                return <Tab key={key} label={render[key].label} />;
              })}
            </Tabs>
          </Box>
          {Object.keys(render).map((key, index) => (
            <TabPanel
              key={key}
              value={value}
              index={index}
              title={render[key].label}
            >
              {render[key].element({})}
            </TabPanel>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            height: '100%',
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider', width: '30%' }}
          >
            {Object.keys(render).map((key, index) => {
              return <Tab key={key} label={render[key].label} />;
            })}
          </Tabs>
          <Box sx={{ width: '70%' }}>
            {Object.keys(render).map((key, index) => (
              <TabPanel
                key={key}
                value={value}
                index={index}
                title={render[key].label}
              >
                {render[key].element({})}
              </TabPanel>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default CustomTabs;
