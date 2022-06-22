import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import RadioGroupComponent, { RadioGroupsProps } from "./index";
import RadioComponent from '../Radio';
import { RadioChangeEvent, RadioOptionType } from '../types/Radio';

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

const DefaultTemplate: Story<RadioGroupsProps> = _ => {
    const [value, setValue] = useState<string>('Orange');
    const [value1, setValue1] = useState<string>('Orange');
    const [value2, setValue2] = useState<string>('Orange');
    const options: string[] = ['Apple', 'Orange', 'Watermelon'];
    const countries = ['China', 'Australia', 'Thailand', 'South Korea', 'Malaysia', 'Canada', 'America']
    const countries2: RadioOptionType[] = [{
      id: 0,
      value: 0,
      label: 'Spring Festival',
      disabled: true,
    }, {
      id: 1,
      value: 1,
      label: 'Lantern Festival'
    }, {
      id: 2,
      value: 2,
      label: 'International Labour Day'
    }, {
      id:3,
      value: 3,
      label: 'Mid-autumn Festival'
    }]

    return <div>
        <RadioGroupComponent
            name={'fruits'} 
            onChange={(e: any) => setValue(e.value)}
            defalutValue={'Apple'}
            value={value}
        >
            {options.map((item, index) => <RadioComponent id={1} value={'Apple'} key={index} >{item}</RadioComponent>)}
        </RadioGroupComponent> 
        <hr />
        <RadioGroupComponent
            name={'countries'}
            onChange={(e: any) => setValue1(e.value)}
            defalutValue={'China'}
            value={value1}
            options={countries}
        />
        <hr />
          <RadioGroupComponent
            name={'countries2'} 
            onChange={(e: any) => { console.log(e.value);}}
            defalutValue={'China'}
            value={value2}
            options={countries2}
        />
    </div>
};

export const Radio = DefaultTemplate.bind({});
