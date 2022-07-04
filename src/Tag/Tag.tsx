import React, { FC, HTMLAttributes, useMemo } from 'react';
import Typography from '../Typography';
import type { TagProps } from '../types/Tag';
import classnames from 'classnames';
import { getPrefix } from '../utils';
import './Tag.less';
const { Text } = Typography;

export interface Props extends HTMLAttributes<HTMLButtonElement> {

}
const Tag: FC<TagProps> = ({ type = 'primary', className = '', children = '', style,  dots = false, onClick }) => {
  const classes = classnames(getPrefix('tag'), getPrefix(`tag-${type}`), className);


  const renderView = useMemo(() => {
    return <div>
      {dots && <i className='dots' />}
      <Text>{children}</Text>
    </div>
  }, [dots, children])

  return <div className={classes} style={style} onClick={onClick}>
    {renderView}
  </div>
};

Tag.displayName = 'Tag';

export default Tag;

export {
  TagProps,
}