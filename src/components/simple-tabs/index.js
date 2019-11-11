import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function SimpleTabs(props) {
    SimpleTabs.propTypes = {
        tabOneLabel: PropTypes.string,
        tabTwoLabel: PropTypes.string,
        tabThreeLabel: PropTypes.string,
        tabOnePanel: PropTypes.object,
        tabTwoPanel: PropTypes.object,
        tabThreePanel: PropTypes.object
    };

    SimpleTabs.defaultProps = {
        tabOneLabel: "Item One",
        tabTwoLabel: "Item Two",
    };

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { tabOneLabel, tabTwoLabel, tabThreeLabel, tabOnePanel, tabTwoPanel, tabThreePanel } = props;

    return (
        <div>
            <Paper square>
                <Tabs 
                    value={value} 
                    onChange={handleChange} 
                    aria-label="simple tabs" 
                    indicatorColor="primary" 
                    textColor="primary"
                    centered>
                <Tab label={tabOneLabel} {...a11yProps(0)} />
                <Tab label={tabTwoLabel} {...a11yProps(1)} />
                <Tab label={tabThreeLabel} {...a11yProps(2)} />
                </Tabs>
            </Paper>
            <Paper square>
                <TabPanel value={value} index={0}>
                    {tabOnePanel}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {tabTwoPanel}
                </TabPanel>
                <TabPanel value={value} index={2}>
                    {tabThreePanel}
                </TabPanel>
            </Paper>
        </div>
    );
}