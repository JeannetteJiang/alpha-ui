import React, { useMemo } from 'react';
import classnames from 'classnames';
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
    value: string | number;
    name?: string;
    className?: string;
    disabled?: boolean;
    onChange?: (e: RadioChangeEvent) => void;
    children?: React.ReactNode;
}

const prefix = 'alpha-radio';
const Radio = (props: Props) => {
    const { disabled = false, value, name, className, children } = props;
    const prefixCls = useMemo(() => {
        return classnames(
            { [prefix]: true },
            className,
        );;
    }, []);
    return <label className={prefixCls}>
        {/* {children !== undefined ? <span>{children}</span> : null} */}
        <input disabled={disabled} className='radio-input' id='radio' name={name} type="radio" value={1} onChange={(e) => {
            console.log(e.target.value);
        }} />
        <label className='radio-label' htmlFor='radio'>
            {/* <span className="out-span"><span className="inner-span"></span></span> */}
            {children !== undefined ? <span>{children}</span> : null}
        </label>
    </label>
}

export default Radio;