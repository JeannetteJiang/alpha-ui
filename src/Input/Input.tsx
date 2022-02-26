import React, { FC, HTMLAttributes, ReactChild, useState, useMemo, useCallback } from 'react';
import Icon from '../Icon';
import classnames from 'classnames';
import './styles.less';

const prefix = 'alpha-input';

type typeRules = {
    message: string,
    pattern?: RegExp,
}
export interface Props extends HTMLAttributes<HTMLInputElement> {
    children?: ReactChild;
    className?: string,
    disabled?: boolean,
    label?: string,
    required?: boolean,
    requiredMsg?: string,
    rules?: typeRules[],
    onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void),
}

const Input: FC<Props> = ({ className, disabled = false, label = '', placeholder = '请输入', rules = [], required = false, requiredMsg = '不能为空', onChange = (str) => { }, children, ...rest }) => {
    const [value, setValue] = useState<string>();

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

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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

    const ERROR_ICON = (isError && <Icon color='#E21925' name='icon-waring' size={18} />)


    return <div className={prefixCls}>
        {label && <div className='label'>{label}</div>}
        <div className={`box ${isError ? 'box-error': ''}`}>
            <input onChange={handleChange} disabled={disabled} placeholder={placeholder} {...rest}></input>
            {ERROR_ICON}
        </div>
        {isError && <div className='error-msg'>
            {
                rulesMessage.map((item: typeRules, index) => {
                    return <div key={index}>{item?.message}</div>
                })
            }
        </div>}
    </div>
}

export default Input;