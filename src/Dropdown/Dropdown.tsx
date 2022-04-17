import React, { FC, HTMLAttributes, ReactChild, useState, useMemo, useCallback, memo } from 'react';
import Icon from '../Icon';
import classnames from 'classnames';
import './styles.less';

const prefix = 'alpha-dropdown';

type typeRules = {
    message: string,
    pattern?: RegExp,
}
type RawValue = string | number;
type Keys = number | string;
type Obj<T = unknown> = {
    [K in Keys]: T;
};
export interface LabeledValue {
    key?: string;
    value: RawValue;
    label: React.ReactNode;
}
export interface RefSelectProps {
    focus?: () => void;
    blur?: () => void;
}

export type SelectValue = RawValue | RawValue[] | LabeledValue | LabeledValue[] | undefined;

export interface Props<T = {}> extends HTMLAttributes<HTMLInputElement> {
    options: T[],
    className?: string,
    searching?: boolean,
    disabled?: boolean,
    children?: ReactChild;
    required?: boolean,
    label?: string,
    requiredMsg?: string,
    rules?: typeRules[],
    multiple?: boolean,
    style?: {[key: string]: string},
    onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void),
    onChangeItem?: ((event:  React.MouseEvent<HTMLDivElement, MouseEvent>, options: T[]) => void),
}

function Dropdown<VT extends SelectValue = SelectValue>(props: Props<VT>) {
    const {
        className,
        disabled = false,
        label = '',
        placeholder = '请选择',
        rules = [],
        required = false,
        requiredMsg = '不能为空',
        children,
        options,
        searching = false,
        multiple = false,
        style = {},
        onChange = () => { },
        onChangeItem = () => { },
        ...rest
    } = props;
    const [value, setValue] = useState<string>();
    const [focus, setFocus] = useState<boolean>(false);
    const [recordSelected, setRecordSelected] = useState<string[]>([]);
    let isBlur = false;

    const rulesMessage: typeRules[] = useMemo(() => {
        const msgArr: typeRules[] = [];
        if (required) {
            if (value?.length === 0) return [{ message: requiredMsg }] as unknown as typeRules[];
            rules?.forEach(item => {
                if (!item.pattern.test(value)) {
                    msgArr?.push(item);
                };
            })
            return msgArr;
        }
        return msgArr
    }, [value, requiredMsg]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const val: string = e.target.value;
        setValue(val);
        onChange(e);
    }, [])

    const isError = useMemo(() => {
        return rulesMessage?.length > 0;
    }, [rulesMessage])

    const prefixCls = useMemo(() => {
        return classnames(
            { [prefix]: true },
            className,
        );;
    }, []);

    const prefixArrowsCls = useMemo(() => {
        return classnames(
            { ['arrow-icon']: true },
            { ['arrow-icon-disabled'] : disabled},
            className,
        );;
    }, []);

    const handleSelectItem = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, options) => {
        if (multiple) {
            return
        } else {
            if (options instanceof Object && options.value) {
                setValue(options.value);
                setRecordSelected([options.value]);
            } else {
                setValue(options);
                setRecordSelected([options.value]);
            } 
        }
        onChangeItem(e, options);
        handleOnBlur()
       
    };

    // const middleOptions = useMemo(() => {
    //     return options.map(( op: SelectValue[0] & {  checked: Boolean }) => {
    //         op.checked = false;
    //         return {
                
    //         } 
    //     });
    // }, [options]) 
    const hanldeOnFocus = () => setFocus(true);
    const handleOnBlur = () => {
        setTimeout(() => {
            if (isBlur) {
              isBlur = false;
            } else {
                setFocus(false);
            }
        }, 200);
    };
    
    const dropdownOver = useMemo(() => {
        console.log('value', value);
        
        const OptionItem = (index: string, _value: string, item: VT) => {
            const isEqual = String(value) === _value;
            console.log(_value);
            return (
                <div 
                    className='dropdown-list-items' 
                    key={index}
                    onClick={(e) => handleSelectItem(e, item)}>
                    <span className={isEqual ? `dropdown-text` : ''}>{_value}</span>
                    {isEqual && <Icon color='#104FD1' name='checkmark' size={12} />}
                </div>
            )
        }
        // ${focus ? 'fade-in-down' : 'fade-in-out'}
        return <div className={`dropdown-list`}>
            {
                options.map((item, index) => {
                    if ((item as LabeledValue)?.value) {
                        const i: LabeledValue = item as LabeledValue;
                        return OptionItem(String(index), String(i.value), item);
                    }
                    return OptionItem(String(index), String(item), item);
                })
            }
        </div>
    }, [focus, options, value]);

    const ARROW_ICON = (<Icon style={{ 'transform' : focus ? 'rotate(0deg)' : 'rotate(180deg)' }} className='upward-arrow' name='upward-arrow' size={12} />)
    return <div className={prefixCls} style={style}>
        {label && <div className='label'>{label}</div>}
        <div className={`alpha-dropdown-input ${isError ? 'box-error' : ''} ${focus ? 'hover': ''}`}>
            <input 
                onChange={handleInputChange}
                onFocus={hanldeOnFocus}
                onBlur={handleOnBlur}
                value={value}
                disabled={disabled}
                placeholder={placeholder}
                {...rest} 
            />
            <div className={prefixArrowsCls}>
                {ARROW_ICON}
            </div>
        </div>
        <div className='dropdown-list-box'>
            {dropdownOver}
        </div>
        {isError && <div className='error-msg'>
            {
                rulesMessage.map((item: typeRules, index) => {
                    return <div key={index} >{item?.message}</div>
                })
            }
        </div>}
    </div>
}

export default React.forwardRef(Dropdown) as <VT extends SelectValue = SelectValue>(
    props: Props<VT> & { ref?: React.Ref<RefSelectProps> },
) => React.ReactElement;