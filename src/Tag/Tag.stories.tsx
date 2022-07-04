import React from 'react';
import { Meta, Story } from '@storybook/react';
import TagComponent, { TagProps } from "./index";

const meta: Meta = {
  title: 'Button',
  component: TagComponent,
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

const DefaultTemplate: Story<TagProps> = _ => {
    return <div>
      <TagComponent dots type='primary'>一般状态</TagComponent>
      <TagComponent dots type='warning' >警告状态</TagComponent>
      <TagComponent dots type='stop' >停止状态</TagComponent>
      <TagComponent dots type='error'>紧急状态</TagComponent>
      <TagComponent dots type='success'>成功状态</TagComponent>
    </div>
};

export const Tag = DefaultTemplate.bind({});