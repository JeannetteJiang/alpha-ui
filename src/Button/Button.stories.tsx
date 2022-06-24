import React from 'react';
import { Meta, Story } from '@storybook/react';
import Button, { ButtonProps, ButtonEnum } from "./index";

const meta: Meta = {
  title: 'Button',
  component: Button,
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

const DefaultTemplate: Story<ButtonProps> = _ => {
    // console.log('_: ',args);
    const args = {
        type: ButtonEnum.primary
    }
    const args2 = {
        type: ButtonEnum.primary,
        disabled: true,
    }
    const args3 = {
        type: ButtonEnum.ghost,
        // disabled: true,
    }
    const args4 = {
        type: ButtonEnum.ghost,
        disabled: true,
    }
    const args5 = {
        type: ButtonEnum.outlined,
    }
    const args6 = {
        type: ButtonEnum.outlined,
        disabled: true,
    }
    const args7 = {
        type: ButtonEnum.danger,
    }
    const args8 = {
        type: ButtonEnum.danger,
        disabled: true,
    }
    return <div>
        <p> <Button {...args}>Primary Button</Button> </p>
        <p><Button {...args2} >Primary Button (disabled)</Button></p>
        <p><Button {...args3} >Ghost Button</Button></p>
        <p><Button {...args4} >Ghost Button  (disabled)</Button></p>
        <p> <Button {...args5}>Outlined Button</Button> </p>
        <p><Button {...args6} >Outlined Button (disabled)</Button></p>
        <p> <Button {...args7}>Danger Button</Button> </p>
        <p><Button {...args8} >Danger Button (disabled)</Button></p>
    </div>
};

export const AllButton = DefaultTemplate.bind({});

// PrimaryButton.args = {
//     disabled: true
// };


// const PrimaryTemplate: Story<ButtonProps> = args => <Button {...args} >Primary Button</Button>;

// export const PrimaryButton = DefaultTemplate.bind({
//     // type: ''
// });

// PrimaryButton.args = {};