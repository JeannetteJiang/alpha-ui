import React, { FC, HTMLAttributes, ReactChild, ReactNode } from 'react';
import Typography from '../Typography';
import Icon from '../Icon';
import classnames from 'classnames';
import './index.module.less';
const { Text } = Typography;
export enum ButtonEnum {
    'primary' = 'primary',
    'outlined' = 'outlined',
    'ghost' = 'ghost',
    'danger' = 'danger'
}
export type ButtonType = ButtonEnum.primary | ButtonEnum.outlined | ButtonEnum.ghost | ButtonEnum.danger;
export interface Props extends HTMLAttributes<HTMLButtonElement> {
    children?: ReactChild;
    useIcon?: ReactNode | '';
    type?: ButtonType,
    className?: string,
    size?: number,
    bold?: number,
    disabled?: boolean,
}
const prefix = 'alpha-button';
const Button: FC<Props> = ({ type = ButtonEnum.primary, className = '', children = '', size = 14, disabled = false, bold = 400, useIcon = '' }) => {
    const classes = classnames(
        { [prefix]: true },
        {
            [`${prefix}-${type}`]: true,
        },
        className,
    );
    const IconDom = (useIcon && <Icon name="down-arrow" size={13} color={disabled ? '#999999' : '#fff'} />)
    return <button className={classes} disabled={disabled}>
        <Text className={useIcon ? 'text' : '' } size={size} bold={bold}>{children}</Text>
        {IconDom}
    </button>
};

Button.displayName = 'Button';

export default Button;