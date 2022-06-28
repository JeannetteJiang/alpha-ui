import React from 'react';
import type { TabPanelProps } from '../types/Tab'
import { getPrefix } from '../utils';
import './TabPanel.less';
import classnames from 'classnames';

const prefix = getPrefix('tab-panel');
const TabPanel = (props: TabPanelProps) => {
  const classes = classnames({
    [prefix]: true,
  })
  return <div className={classes}>
    {props.children}
  </div>
}


TabPanel.displayName = 'TabPanel'

TabPanel.defaultProps = {
  displayName: 'TabPanel',
}

export default TabPanel;

export {
  TabPanelProps
}