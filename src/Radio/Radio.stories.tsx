import React from 'react';
import { Meta, Story } from '@storybook/react';
import RadioComponent, { Props as RadioProps } from "./index";

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
        <RadioComponent />            
    </div>
};

export const Input = DefaultTemplate.bind({});