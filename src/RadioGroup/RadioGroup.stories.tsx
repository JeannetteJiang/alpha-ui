import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import RadioGroupComponent, { RadioGroupProps } from "./index";
import RadioComponent from '../Radio';

const meta: Meta = {
    title: 'RadioGroup',
    component: RadioGroupComponent,
    argTypes: {
        children: {
            control: {
                type: 'text',
            },
        },
    },
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const DefaultTemplate: Story<RadioGroupProps> = _ => {
    const [value, setValue] = useState<string>('Orange');
    const options: string[] = ['Apple', 'Orange', 'Watermelon'];

    return <div>
        <RadioGroupComponent
            name={'fruits'} 
            onChange={() => setValue(value)}
            defalutValue={'Apple'}
            value={value}
        >
            {options.map((item, index) => <RadioComponent value={'Apple'} key={index} >{item}</RadioComponent>)}
        </RadioGroupComponent> 
    </div>
};

export const Radio = DefaultTemplate.bind({});