import React, { FC, HTMLAttributes, ReactChild } from 'react';
import classnames from 'classnames';
import styles from './styles/text.module.less';
export type Props = {
    children?: ReactChild;
    size?: number,
    className?: string,
    bold?: number,
}
const prefix = 'alpha-prefix';
const Text = ({ size = 14, bold = 400, className, children }: Props) => {
    const classes = classnames(
        { [styles[prefix]]: true },
        className,
    );
    const styleObject = {
        fontSize: size,
        fontWeight: bold
    }
    return (
       <span style={styleObject} className={classes} >{children}</span>
    );
};
Text.displayName = 'Text';

export default Text;