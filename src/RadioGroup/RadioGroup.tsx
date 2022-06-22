import React, { useMemo, useState } from 'react';
import classnames from 'classnames';
import Radio  from '../Radio';
import { RadioGroupContextProvider } from './context';
import type { RadioGroupsProps, RadioOptionType } from '../types/Radio';
import { getPrefix } from '../utils';
import './styles.less';

const prefix = getPrefix('radio-group');

function RadioGroup<T extends string | number | RadioOptionType>(props: RadioGroupsProps<T>): React.ReactElement {
  const { disabled = false, value, name, className, options, defalutValue = '', onChange, children } = props;
  const [radioValue, setRadioValue] = useState<string>(String(defalutValue));
  const classes = useMemo(() => {
    return classnames(
      { [prefix]: true },
      className,
    );;
  }, []);

  const renderView = useMemo(() => {
    if (options?.length > 0) {
      const ops = options[0];
      if (typeof ops === 'string' || typeof ops === 'number') {
        return options.map((item, index) => <Radio checked={radioValue === String(item)} name={props.name} value={item} key={index}>{item}</Radio>)
      } 
      if (ops instanceof Object) {
        return options.map((item: any , index) => <Radio checked={radioValue === String(item.value)} value={item.value} name={props.name} {...item} key={index}>{(item as RadioOptionType).label}</Radio>)
      }
      return null;
    }
    return children
  }, [options]);

  const handleChangeRadio = e => {
    if (e.value !==radioValue) {  setRadioValue(e.value)}
    onChange(e);
  };

  return <div className={classes}>
    <RadioGroupContextProvider
      value={{
        name,
        value: radioValue,
        disabled,
        onChange: handleChangeRadio,
      }}>
      {renderView}
    </RadioGroupContextProvider>
  </div>
}
RadioGroup.displayName = 'RadioGroup';

export default React.memo(RadioGroup);

export {
  RadioGroupsProps
}
