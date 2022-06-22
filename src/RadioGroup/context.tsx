import React from 'react';
import { RadioGroupContextProps } from '../types/Radio';

export const RadioGroupContext = React.createContext<RadioGroupContextProps | null>(null);

export const RadioGroupContextProvider = RadioGroupContext.Provider;
