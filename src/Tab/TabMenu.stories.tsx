import React from 'react';
import { Meta, Story } from '@storybook/react';
import TabMenuComponent, { TabMenuProps } from "./index";

const meta: Meta = {
    title: 'Tab',
    component: TabMenuComponent,
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

const DefaultTemplate: Story<TabMenuProps> = _ => {
    const data = [
      {
        id: 1,
        label: '咖啡',
        icon: 'kafei',
        disabled: true,
      },
      {
        id: 2,
        label: '薯条',
        icon: 'shutiao'
      },
      {
        id: 3,
        label: '珍珠奶茶',
        icon: 'zhenzhunaicha'
      },
      {
        id: 4,
        label: '雪糕',
        icon: 'xuegao'
      },
  ]


    return <div>
        <TabMenuComponent
          activiedIndex={1} 
          onTabChange={(e) => {
          console.log(e);
        }} data={data} />
    </div>
};

export const TabMenu = DefaultTemplate.bind({});
