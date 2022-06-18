import React from 'react';
import { Meta, Story } from '@storybook/react';
import RadioComponent, { RadioProps } from "./index";

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
    return <div>
        <RadioComponent disabled value={1} key={1} >Cat</RadioComponent>            
        <RadioComponent value={2} key={2}>Dog</RadioComponent>            
    </div>
};

export const Radio = DefaultTemplate.bind({});
