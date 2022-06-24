import React, { useMemo, useState, useRef } from 'react';
import classnames from 'classnames';
import type { TabMenuProps } from '../types/Tab';
import { getPrefix } from '../utils/index';
import Icon from '../Icon';
import './TabMenu.less';


type Item = TabMenuProps['data'][0];

const prefix = getPrefix('tab-menu');
const TabMenu = (props: TabMenuProps) => {
  const { data, className, activiedIndex = 0 } = props;
  const [_acTive, setIndex] = useState<number>(activiedIndex);
  const tabsRef = useRef<HTMLLIElement>();
  const underlineRef = useRef<HTMLLIElement>();
  
  const classes = classnames(
    { [prefix]: true },
    className,
  )

  const handleClickItem = (event: React.MouseEvent<HTMLAnchorElement>, _item: Item, _index: number) => {
    if (_item.disabled) {
      event.preventDefault();
      return;
    };
    if (!_item.url) {
      event.preventDefault();
    }
    if (props.onTabChange) {
        props.onTabChange({
            originalEvent: event,
            value: _item,
            index: _index,
        });
    }
    setIndex(Number(_index));
  }

  const classesLink = (_menuItem: Item, _index: number) => classnames({
    ['tab-menu-link']: true,
    ['active']: _menuItem.disabled ? false : _acTive === _index,
    ['disabled']: _menuItem.disabled
  })

  const getContent = (_menuItem: Item, _index: number) => {
    return <a href={_menuItem.url} className={classesLink(_menuItem, _index)} onClick={(event) => handleClickItem(event, _menuItem, _index)} >
      {_menuItem.icon && <Icon name={_menuItem.icon} />}
      {_menuItem.label}
    </a>
  };


  const TabMemuItem = (_menuItem: Item, _index: number) => {
    const content = getContent(_menuItem, _index)
    return <li className='tab-menu-item' key={_index}>
      {content}
    </li>
  }

  const _data = useMemo(() => {
    return data.map(TabMemuItem)
  }, [data, tabsRef, _acTive, props])

  return <ul className={classes}>
    {_data}
    <li ref={underlineRef} className={'tab-menu-under-line'}></li>
  </ul>
}

export default TabMenu;

export {
  TabMenuProps
}