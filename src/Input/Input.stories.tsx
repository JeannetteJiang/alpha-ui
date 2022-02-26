import React from 'react';
import { Meta, Story } from '@storybook/react';
import InputComponent, { InputProps } from "./index";

const meta: Meta = {
    title: 'Input',
    component: InputComponent,
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

const DefaultTemplate: Story<InputProps> = _ => {
    return <div>
        <div>
            <InputComponent
                rules={[
                    {
                        message: '手机号码错误',
                        pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/,
                    },
                ]}
                label='标题'
                required 
            />
        </div>
        <div>
            <InputComponent label='禁止输入' disabled />
        </div>
    </div>
};

export const Input = DefaultTemplate.bind({});

// PrimaryButton.args = {
//     disabled: true
// };


// const PrimaryTemplate: Story<ButtonProps> = args => <Button {...args} >Primary Button</Button>;

// export const PrimaryButton = DefaultTemplate.bind({
//     // type: ''
// });

// PrimaryButton.args = {};