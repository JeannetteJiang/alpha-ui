import React, { useMemo, useState, useRef } from 'react';
import classnames from 'classnames';
import type { TabMenuProps } from '../types/Tab';
import { getPrefix } from '../utils/index';
import Button from '../Button';
import Icon from '../Icon';
import './TabMenu.less';
import DomHandler from '../utils/DomHandler';


type Item = TabMenuProps['data'][0];

const prefix = getPrefix('tab-menu-container');
const TabMenu = (props: TabMenuProps) => {
  const { data, className, activiedIndex = 0, scrollable = false } = props;
  const [_acTive, setIndex] = useState<number>(activiedIndex);
  const tabsRef = useRef({});
  const underlineRef = useRef<HTMLLIElement>();
  const contentRef = React.useRef(null);
  const prevBtnRef = React.useRef(null);
  const nextBtnRef = React.useRef(null);
  const [leftIsDisabledState, setBackwardIsDisabledState] = React.useState(true);
  const [rightIsDisabledState, setForwardIsDisabledState] = React.useState(false);

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
      return <li ref={(el) => tabsRef.current[`tab_${_index}`] = el} id={'tab-menu-item' + _index} className='tab-menu-item' key={_index}>
        {content}
      </li>
  }

  const _data = useMemo(() => {
    return data.map(TabMemuItem)
  }, [data, tabsRef, _acTive, props])

  const handleScroll = (event) => {
    props.scrollable && updateButtonState();
    event.preventDefault();
  }

  
  const updateButtonState = () => {
    const { scrollLeft, scrollWidth } = contentRef.current;
    
    const width = DomHandler.getWidth(contentRef.current);
    setBackwardIsDisabledState(scrollLeft === 0);
    setForwardIsDisabledState(scrollLeft === scrollWidth - width);
}

    
  const getVisibleButtonWidths = () => {
    return [prevBtnRef.current, nextBtnRef.current].reduce((acc, el) => el ? acc + DomHandler.getWidth(el) : acc, 0);
  }

  const handleRight = () => {
    const width = DomHandler.getWidth(contentRef.current) - getVisibleButtonWidths();
    const pos = contentRef.current.scrollLeft + width;
    const lastPos = contentRef.current.scrollWidth - width;
    contentRef.current.scrollLeft = pos >= lastPos ? lastPos : pos;
  }

  const handleLeft = () => {
    const width = DomHandler.getWidth(contentRef.current) - getVisibleButtonWidths();
    const pos = contentRef.current.scrollLeft - width;
    contentRef.current.scrollLeft = pos <= 0 ? 0 : pos;
  }



  return <div className={classes}>
    { scrollable && !leftIsDisabledState && <Button  useIcon={<Icon size={15} color={'#fff'} name='arrow-left-bold'/>} onClick={handleLeft} /> }
    <div ref={contentRef} className={getPrefix('tab-menu')} onScroll={handleScroll}>
      <ul className={getPrefix('tab-menu-ul')} >
        {_data}
        <li ref={underlineRef} className={getPrefix('tab-menu-under-line')}></li>
      </ul>
    </div>
    { scrollable && !rightIsDisabledState && <Button useIcon={<Icon size={15} color={'#fff'} name='arrow-right-bold'/>} onClick={handleRight} /> }
  </div>
}

export default TabMenu;

export {
  TabMenuProps
}