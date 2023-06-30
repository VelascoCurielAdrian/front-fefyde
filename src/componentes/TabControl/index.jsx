import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Box } from '@mui/material';

export const TabsHeader = React.memo((props) => {
  const { value, handleChange, tabs } = props;

  return (
    <Tabs
      variant="scrollable"
      scrollButtons="auto"
      value={value}
      onChange={handleChange}
    >
      {
        tabs.map((element) => (
          <Tab
            disableRipple
            key={element.id}
            label={element?.label}
          />
        ))
      }
    </Tabs>
  );
});

TabsHeader.propTypes = {
  value: PropTypes.number,
  handleChange: PropTypes.func,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  })),
};

TabsHeader.defaultProps = {
  tabs: [],
  value: 0,
  handleChange: () => { },
};

export const TabContainer = ((props) => {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      style={{ width: '100%', height: '100%' }}
      {...other}
    >
      <Box display={value === index ? 'block' : 'none'} height="100%">{children}</Box>
    </div>
  );
});

TabContainer.propTypes = {
  value: PropTypes.number,
  index: PropTypes.number,
  children: PropTypes.node,
};

TabContainer.defaultProps = {
  value: 0,
  index: 0,
  children: null,
};
