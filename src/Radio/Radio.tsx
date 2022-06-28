import React, { useMemo, useRef } from 'react';
import classnames from 'classnames';
import { RadioGroupContext } from '../RadioGroup/context';
import type { RadioProps, RadioOptionType, RadioChangeEvent } from '../types/Radio';
import { getPrefix, omit } from '../utils/index';
import './styles.less';


const prefix = getPrefix('radio');

function Radio<T extends number | string | RadioOptionType, P = RadioProps<T>>(props: RadioProps) {
  const { value, className, children } = props;
  const inputRef = useRef<any>();
  const groupContext = React.useContext(RadioGroupContext);

  const classes = useMemo(() => {
    return classnames(
      { [prefix]: true },
      className,
    );;
  }, []);


  const _props = useMemo(() => {
    if (groupContext) {
      return {
        name: groupContext.name,
        disabled: props?.disabled || false,
        value: props.value,
        id: props.id,
      } as RadioProps
    }
    return omit(['id', 'onChange'], { ...props, disabled: props?.disabled || false }) as RadioProps;
  }, [groupContext, props]);


  const hanleClickRadio = (e) => {
    if (groupContext?.disabled || props.disabled) return;
    const _currnet = inputRef.current;
    // inputRef.current.event.persist()
    const event = {
      originalEvent: e,
      value: props.value,
      checked: _currnet.checked,
      stopPropagation: () => { },
      preventDefault: () => { },
      target: {
        id: props.id,
        name: props.name,
        value: props.value,
        checked: _currnet.checked
      }
    }

    if(groupContext) {
      if (groupContext.value !== Number(_currnet.getAttribute('data-value'))) {
        _currnet.checked = !_currnet.checked;
        return groupContext.onChange(event)
      }
      return
    }
    _currnet.checked = !_currnet.checked;
    return props.onChange(event)
  }
  return <div className={classes} onClick={hanleClickRadio}  data-value={_props.value}>
      <input
        type="radio"
        className='radio-input p-hidden-accessible'
        ref={inputRef}
        checked={_props.checked}
        disabled={_props.disabled}
        name={_props.name}
        data-value={_props.value}
      />
    <label className='radio-label' htmlFor='radio'>
      {children !== undefined ? <span>{children}</span> : null}
    </label>
  </div>
}

Radio.displayName = 'Radio'

export default React.memo(Radio);