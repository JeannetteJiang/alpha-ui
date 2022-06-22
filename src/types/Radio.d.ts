
import type * as React from 'react';

export type ValueType = number | string;

export type RadioOptionType = {
  id?: number;
  value: ValueType;
  label: string;
  disabled?: boolean;
}

export type RadioChangeEvent<T = any> = {
  originalEvent: React.MouseEventHandler<HTMLElement>,
  value: T,
  checked: boolean,
  stopPropagation: () => void,
  preventDefault: () => void,
  target: {
      id?: number,
      name: string,
      value: T,
      checked: boolean,
  }
}

export interface RadioAbstract<T = any> {
  id?: number;
  value?: T;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export interface RadioClickEvent<T> {
  originalEvent: React.MouseEventHandler<HTMLElement>,
  value: T;
  checked: boolean;
  stopPropagation: () => void;
  preventDefault: () => void;
  target: {
    id?: number;
    name: string,
    value: T,
    checked: boolean,
  }
}


export interface RadioProps<T = any> extends RadioAbstract<T>{
  name?: string;
  checked?: boolean;
  onChange?: (e: RadioChangeEvent<T>) => void;
}

export interface RadioGroupsProps<T = any> extends RadioAbstract<T> {
  name: string;
  options?: T[],
  defalutValue?: T;
  onChange?: (e: RadioChangeEvent<T>) => void;
}

export interface RadioGroupContextProps<T = any> {
  id?: number;
  name: string;
  value: any;
  disabled: boolean;
  onChange?: (e: RadioChangeEvent<T>) => void;
}
