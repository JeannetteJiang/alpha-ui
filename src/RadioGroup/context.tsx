import { createContext } from 'react';
import { RadioChangeEvent } from '../Radio/Radio';

interface RadioGroupContextProps {
    name: string;
    value: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RadioGroupContext = createContext<RadioGroupContextProps | null>(null);

export const RadioGroupContextProvider = RadioGroupContext.Provider;
