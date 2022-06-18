import React, { createContext } from 'react';

interface RadioGroupContextProps {
    name: string;
    value: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled: boolean;
}

export const RadioGroupContext = createContext<RadioGroupContextProps | null>(null);

export const RadioGroupContextProvider = RadioGroupContext.Provider;
