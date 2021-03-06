import React from 'react';
import classnames from 'classnames';
import { getPrefix } from '../utils/index';
import './iconfont.js';
import './styles.less';
export type Props = {
    name: string,
    size?: number,
    color?: string,
    style?: {[key: string]: string},
    onClick?(): void;
    className?: string,
}

const prefix = getPrefix('icon');

const Icon = ({ name = '', size = 14, color = '', style = {}, onClick, className }: Props) => {
    const classes = classnames(
        { ['iconfont']: true },
        { [prefix]: true },
        { [`${prefix}-${name}`]: true },
        className,
    );
    const styles = Object.assign({
        fontSize: size,
        width: size,
        height: size,
        fill: color
    }, style)

    if (onClick instanceof Function) {
        return <svg
            onClick={onClick}
            className={classes}
            aria-hidden="true"
            style={styles}
        >
            <use xlinkHref={`#${prefix}-${name}`}></use>
        </svg>
    }

    return <svg
        className={classes}
        aria-hidden="true"
        style={styles}
    >
        <use xlinkHref={`#${prefix}-${name}`}></use>
    </svg>
};

// Icon.displayName 
export default Icon;