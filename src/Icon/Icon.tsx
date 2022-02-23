import React from 'react';
import classnames from 'classnames';
import './iconfont.js';
import './styles.less';
export type Props = {
    name: string,
    size?: number,
    color: string,
    onClick?(): void;
    className?: string,
}

const prefix = 'alpha-icon'
const Icon = ({ name = '', size = 14, color = '#333333', onClick, className }: Props) => {
    const prefixCls = classnames(
        { ['iconfont']: true },
        { [prefix]: true },
        { [`${prefix}-${name}`]: true },
        className,
    );
    const styles = {
        fontSize: size,
        width: size,
        height: size,
        fill: color
        // verticalAlign: 'middle',
    }

    if (onClick instanceof Function) {
        return <svg
            onClick={onClick}
            className={prefixCls}
            aria-hidden="true"
            style={styles}
        >
            <use xlinkHref={`#${prefix}-${name}`}></use>
        </svg>
    }

    return <svg
        className={prefixCls}
        aria-hidden="true"
        style={styles}
    >
        <use xlinkHref={`#${prefix}-${name}`}></use>
    </svg>
};

// Icon.displayName 
export default Icon;