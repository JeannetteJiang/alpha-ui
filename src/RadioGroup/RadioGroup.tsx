import React, { useMemo, useState } from 'react';
import classnames from 'classnames';
import Radio from '../Radio';
import { RadioGroupContextProvider } from './context';
import './styles.less';

export interface AbstractCheckboxProps<T> {
    prefixCls?: string;
    className?: string;
    defaultChecked?: boolean;
    checked?: boolean;
    style?: React.CSSProperties;
    disabled?: boolean;
    onChange?: (e: T) => void;
    onClick?: React.MouseEventHandler<HTMLElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLElement>;
    onKeyPress?: React.KeyboardEventHandler<HTMLElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
    value?: any;
    tabIndex?: number;
    name?: string;
    children?: React.ReactNode;
    id?: string;
    autoFocus?: boolean;
    type?: string;
    skipGroup?: boolean;
}

export type RadioProps = AbstractCheckboxProps<RadioChangeEvent>;

export interface RadioChangeEventTarget extends RadioProps {
    checked: boolean;
}

export interface RadioChangeEvent {
    target: RadioChangeEventTarget;
    stopPropagation: () => void;
    preventDefault: () => void;
    nativeEvent: MouseEvent;
}

export interface Props {
    defalutValue?: any;
    name: string;
    value?: string | number;
    options?: string[],
    className?: string;
    disabled?: boolean;
    children?: React.ReactNode;
    onChange?: (e: any) => void;
}

const prefix = 'alpha-radio-group';
const RadioGroup = (props: Props) => {
    const { disabled = false, value, name, className, options, children, defalutValue ,onChange } = props;
    const prefixCls = useMemo(() => {
        return classnames(
            { [prefix]: true },
            className,
        );;
    }, []);

    const renderView = useMemo(() => {
        if (options?.length > 0) {
            return options.map((item) => {
                return <Radio value={item}></Radio>
            })
        }
        return children
    }, [options]);

    const handleChangeRadio = e => {
        onChange(e.target.value);
    };

    const _value = useMemo(() => {
        return !value ? defalutValue ?? value : value;
    }, [value, defalutValue])

    return <div className={prefixCls}>
        <RadioGroupContextProvider 
            value={{
                name,
                onChange: handleChangeRadio,
                value: _value,
        }}>
            {renderView}
        </RadioGroupContextProvider>
    </div>
}
RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;