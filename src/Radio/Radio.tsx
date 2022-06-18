import React, { useMemo, useRef } from 'react';
import classnames from 'classnames';
import { RadioGroupContext } from '../RadioGroup/context';
import { omit } from '../utils/index'; 
import './styles.less';

// export interface AbstractCheckboxProps<T> {
//     prefixCls?: string;
//     className?: string;
//     defaultChecked?: boolean;
//     checked?: boolean;
//     style?: React.CSSProperties;
//     disabled?: boolean;
//     onChange?: (e: T) => void;
//     onClick?: React.MouseEventHandler<HTMLElement>;
//     onMouseEnter?: React.MouseEventHandler<HTMLElement>;
//     onMouseLeave?: React.MouseEventHandler<HTMLElement>;
//     onKeyPress?: React.KeyboardEventHandler<HTMLElement>;
//     onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
//     value?: any;
//     tabIndex?: number;
//     name?: string;
//     children?: React.ReactNode;
//     id?: string;
//     autoFocus?: boolean;
//     type?: string;
//     skipGroup?: boolean;
//   }

// export type RadioProps = AbstractCheckboxProps<RadioChangeEvent>;

// export interface RadioChangeEventTarget extends RadioProps {
//     checked: boolean;
//   }
  
// export interface RadioChangeEvent {
//     target: RadioChangeEventTarget;
//     stopPropagation: () => void;
//     preventDefault: () => void;
//     nativeEvent: MouseEvent;
// }

export interface Props {
    value: string | number;
    name?: string;
    className?: string;
    disabled?: boolean;
    children?: React.ReactNode;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const prefix = 'alpha-radio';
const Radio = (props: Props) => {
    const { value, className, children } = props;
    const inputRef = useRef<any>();
    const groupContext = React.useContext(RadioGroupContext);

    const classes = useMemo(() => {
        return classnames(
            { [prefix]: true },
            className,
        );;
    }, []);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange?.(e);
        groupContext?.onChange?.(e);
    };

    const _value = useMemo(() => {
        if (groupContext?.value) {
            return groupContext.value ?? value;
        }
        return value;
    }, [groupContext?.value, value])

    const _props = useMemo(() => {
        if (groupContext) {
            return {
                name: groupContext.name,
                disabled: groupContext.disabled,
                value: groupContext.value
            } 
        }
        return omit(['value'], props)
    }, [groupContext, props])

    const hanleClickRadio = () => {
        inputRef.current.checked = true;
    }

    return <div className={classes} onClick={hanleClickRadio}>
        <input
            type="radio"
            className='radio-input'
            ref={inputRef}
            checked={_value === value} 
            onChange={onChange}
            {..._props}
        />
        <label className='radio-label' htmlFor='radio'>
            {children !== undefined ? <span>{ children }</span> : null}
        </label>
    </div>
}

Radio.displayName = 'Radio'

export default React.memo(Radio);