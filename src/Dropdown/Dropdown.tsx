import React, { HTMLAttributes, ReactChild, useState, useMemo, useRef, useEffect } from 'react';
import Icon from '../Icon';
import classnames from 'classnames';
import './styles.less';
// import { } from 'loadash';

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
    value: RawValue;
    label: React.ReactNode;
    key?: string;
    disabled?: boolean;
}
export interface RefSelectProps {
    focus?: () => void;
    blur?: () => void;
}

export type SelectValue = RawValue | RawValue[] | LabeledValue | LabeledValue[] | undefined;

export interface Props<T extends SelectValue = SelectValue> extends HTMLAttributes<HTMLInputElement> {
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
    style?: { [key: string]: string },
    onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void),
    onChangeItem?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>, options: T | T[]) => void),
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
    const [value, setValue] = useState<VT>(null);
    const [focus, setFocus] = useState<boolean>(false);
    const [multipleList, setMultipleList] = useState<VT[]>([])
    const inputRef = useRef(null);
    const alphaDropDownRef = useRef(null);
    let isBlur = false;
    let timeout: NodeJS.Timeout = null;



    // const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    //     const val: string = e.target.value;
    //     setValue(val);
    //     onChange(e);
    // }, [])

    const hanldeOnFocus = () => setFocus(true);
    const handleOnBlur = () => {
        timeout = setTimeout(() => {
            setFocus(false);
            clearTimeout(timeout);
            timeout = null;
        }, 200);
    };

    const handleDocumentClick = (e) => {
        if (!alphaDropDownRef.current) return;
        if (!alphaDropDownRef.current.contains(e.target as Node)  && alphaDropDownRef.current !== e.target) {
            handleOnBlur()
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.addEventListener('click', handleDocumentClick);
            document.addEventListener('click', handleDocumentClick);
        }
    }, [])



    const classes = useMemo(() => {
        return classnames(
            { [prefix]: true },
            className,
        );;
    }, []);

    const prefixArrowsCls = useMemo(() => {
        return classnames(
            { ['arrow-icon']: true },
            { ['arrow-icon-disabled']: disabled },
            className,
        );;
    }, []);


    const handleisIncludesTagsList = (_multipleItem: VT) => {
        let _multipleList = multipleList;
        let isCorrect = false;
        for (let i = 0; i < _multipleList.length; i++) {
            const _item = _multipleList[i];
            if (handleGetValue(_item) === handleGetValue(_multipleItem)) {
                isCorrect = true;
            }
        }
        return isCorrect;
    }

    const handleRemoveMultipleTagItem = (_multipleItem: VT): VT[] => {
        let _multipleList = multipleList;
        let newArray: VT[] = [];
        for (let i = 0; i < _multipleList.length; i++) {
            const _item = _multipleList[i];
            if (handleGetValue(_item) !== handleGetValue(_multipleItem)) {
                newArray.push(_item);
            }
        }
        return newArray;
    };

    const handleOnClickRemoveMultipleTagItem = (e, options: VT) => {
        const _multipleList = handleRemoveMultipleTagItem(options);
        setMultipleList([..._multipleList]);
        onChangeItem(e, _multipleList);
    }

    const handleSelectItem = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, options: VT) => {
        if (multiple) {
            let _multipleList = multipleList;
            if (!(handleisIncludesTagsList(options))) {
                _multipleList.push(options);
            } else {
                _multipleList = handleRemoveMultipleTagItem(options);
            }
            setMultipleList([..._multipleList]);
            onChangeItem(e, _multipleList);
        } else {
            setValue(options);
            isBlur = true;
            onChangeItem(e, options);
            handleOnBlur()
        }
    };

    // const middleOptions = useMemo(() => {
    //     return options.map(( op: SelectValue[0] & {  checked: Boolean }) => {
    //         op.checked = false;
    //         return {

    //         } 
    //     });
    // }, [options]) 

    const handleIsObjectSelect = (options: VT) => {
        return options instanceof Object && (typeof options !== 'string' || typeof options !== 'number');
    }

    const handleGetLable = (item: VT) => handleIsObjectSelect(item) ? (item as LabeledValue).label : item;
    const handleGetValue = (item: VT) => handleIsObjectSelect(item) ? (item as LabeledValue).value : item;

   

    

    // const rulesMessage: typeRules[] = useMemo(() => {
    //     const msgArr: typeRules[] = [];
    //     if (required) {
    //         if (value?.length === 0) return [{ message: requiredMsg }] as unknown as typeRules[];
    //         rules?.forEach(item => {
    //             if (!item.pattern.test(value)) {
    //                 msgArr?.push(item);
    //             };
    //         })
    //         return msgArr;
    //     }
    //     return msgArr
    // }, [value, requiredMsg]);


    // const isError = useMemo(() => {
    //     return rulesMessage?.length > 0;
    // }, [rulesMessage])

    const dropdownOver = useMemo(() => {
        const OptionItem = (index: string, _value: string, item: VT) => {
            const isEqual = multiple ? handleisIncludesTagsList(item) : (handleIsObjectSelect(item) ? ((item as LabeledValue).value ?? item) === ((value as LabeledValue)?.value ?? value) : String(_value) === String(value));
            const isDisabled = handleIsObjectSelect(item) ? ((item as LabeledValue).disabled ?? false) : false;
            if (multiple) {
                return (
                    <div
                        className={`dropdown-list-items ${isDisabled ? 'dropdown-list-items-disabled' : ''}`}
                        key={index}
                        onClick={(e) => !isDisabled ? handleSelectItem(e, item) : null}>
                        <span className={isEqual ? `dropdown-text` : ''}>{_value}</span>
                        {isEqual && <Icon color='#104FD1' name='checkmark' size={12} />}
                    </div>
                )
            }

            return (
                <div
                    className={`dropdown-list-items ${isDisabled ? 'dropdown-list-items-disabled' : ''}`}
                    key={index}
                    onClick={(e) => !isDisabled ? handleSelectItem(e, item) : null}>
                    <span className={isEqual ? `dropdown-text` : ''}>{_value}</span>
                    {isEqual && <Icon color='#104FD1' name='checkmark' size={12} />}
                </div>
            )
        }
        return <div className={`dropdown-list ${focus ? 'fade-in-down' : 'fade-in-out'}`}>
            {
                options.map((item, index) => {
                    if ((item as LabeledValue)?.value) {
                        const i: LabeledValue = item as LabeledValue;
                        return OptionItem(String(index), String(i.label), item);
                    }
                    return OptionItem(String(index), String(item), item);
                })
            }
        </div>
    }, [focus, options, value, multiple, multipleList]);


    const ARROW_ICON = (<Icon style={{ 'transform': focus ? 'rotate(0deg)' : 'rotate(180deg)' }} className='upward-arrow' name='upward-arrow' size={12} />)
    const currentValue = useMemo(() => {
        return handleIsObjectSelect(value) && ((value as LabeledValue).label ?? value) || value || ''
    }, [value])

    const handleClickMultipleInput = () => {
        inputRef.current.focus();
        hanldeOnFocus();

    }

    const InputMultipleView = useMemo(() => {
        if (multiple) {
            return <div className={`alpha-dropdown-multiple-input ${focus ? 'hover' : ''}`} onClick={handleClickMultipleInput}>
                <div>
                    <div className='alpha-list'>
                        {
                            multipleList?.map(item => (<div className='alpha-tag'>
                                <span>{handleGetLable(item)}</span>
                                <div  onClick={(e) => handleOnClickRemoveMultipleTagItem(e, item)}>
                                    <Icon size={12} name='round-close' color='#909399'/>
                                </div>
                            </div>))
                        }
                         <input
                            ref={inputRef}
                            value={String(currentValue) ?? ''}
                            disabled={disabled}
                            placeholder={placeholder}
                            {...rest}
                        />
                    </div>
                </div>
                <div className={prefixArrowsCls}>
                    {ARROW_ICON}
                </div>
            </div>
        }
    }, [currentValue, disabled, placeholder, prefixArrowsCls, focus, multipleList])


    const InputView = useMemo(() => {
        return <div className={`alpha-dropdown-input ${focus ? 'hover' : ''}`}>
            <input
                // onChange={handleInputChange}
                onFocus={hanldeOnFocus}
                // onBlur={handleOnBlur}
                value={String(currentValue) ?? ''}
                disabled={disabled}
                placeholder={placeholder}
                {...rest}
            />
            <div className={prefixArrowsCls}>
                {ARROW_ICON}
            </div>
        </div>
    }, [currentValue, disabled, placeholder, prefixArrowsCls, focus])

    


    return <div className={classes} style={style}  ref={alphaDropDownRef}>
        {label && <div className='label'>{label}</div>}
        {/* ${true ? 'box-error' : ''}  */}
        {multiple ? InputMultipleView : InputView}
        <div className='dropdown-list-box'>
            {dropdownOver}
        </div>
        {/* {isError && <div className='error-msg'>
            {
                rulesMessage.map((item: typeRules, index) => {
                    return <div key={index} >{item?.message}</div>
                })
            }
        </div>} */}
    </div>
}

export default React.forwardRef(Dropdown) as <VT extends SelectValue = SelectValue>(
    props: Props<VT> & { ref?: React.Ref<RefSelectProps> },
) => React.ReactElement;
