import React, { useState, useMemo } from 'react';
import { getPrefix } from '../utils';
import TabPanel, { TabPanelProps } from './TabPanel';
import classnames from 'classnames';
import type { Datas, TabMenuProps, TabProps } from '../types/Tab';
import TabMenu from '../TabMenu';
import './Tab.less';

const prefix = getPrefix('tab')
const Tab = (props: TabProps) => {
  const { activiedIndex = 0, scrollable = false } = props;
  const classes = classnames([prefix]);
  const [_acTive, setIndex] = useState<number>(activiedIndex);

  const getContent = useMemo(() => {
    return <div className={getPrefix('tab-panel-content')}>
      {
        React.Children.map(props.children, (tab, index) => {
          return <div key={index} className={getPrefix('tab-panel-content-item')} style={{display: _acTive === index ? 'block' : 'none'}}>{tab}</div>;
        })
      }
    </div>
  }, [_acTive]);

  const onTabChange = (e) => {
    setIndex(e.index);    
    props.onTabChange(e);
  }

  const getTabHeaders = () => {
    const options: Datas[] = [];
    React.Children.forEach(props.children, (tab: any) => {
      if (tab?.props?.displayName === 'TabPanel') {
        const { id, label, disabled, icon, url } = tab.props;
        options.push({ id, label, disabled, icon, url })
      }
    })
    return <TabMenu activiedIndex={_acTive} onTabChange={onTabChange} data={options} scrollable={scrollable} />
  }

  const getMenus = useMemo(() => {
    const headers = getTabHeaders();
    return headers
  }, [_acTive])

  const content = getContent;
  const menus = getMenus;

  return <div className={classes}>
    {menus}
    {content}
  </div>
}


export default React.memo(Tab);

export {
  TabPanel,
  TabProps,
  TabMenuProps,
  TabPanelProps,
}