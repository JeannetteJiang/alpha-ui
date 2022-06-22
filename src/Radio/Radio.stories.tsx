import React from 'react';
import { Meta, Story } from '@storybook/react';
import RadioComponent, { RadioProps } from "./index";
import { useState } from 'react';

const meta: Meta = {
    title: 'Radio',
    component: RadioComponent,
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

const DefaultTemplate: Story<RadioProps> = _ => {
    const [value , setValue] = useState<number>(2);
    const hanleChange = (e) => {
      setValue(e.value)
    }

    return <div>
        <RadioComponent disabled onChange={hanleChange} checked={true} value={1} key={1}>Cat</RadioComponent>
        <RadioComponent onChange={hanleChange} checked={value === 2} value={2} key={2} id={2} >Dog</RadioComponent>            
        <RadioComponent onChange={hanleChange} checked={value === 3} value={3} key={3} id={3}>Bird</RadioComponent>            
    </div>
}
export const Radio = DefaultTemplate.bind({});
