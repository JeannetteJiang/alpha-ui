import React from 'react';
import { Meta, Story } from '@storybook/react';
import TabComponent, { TabPanel, TabPanelProps } from "./index";

const meta: Meta = {
  title: 'Tab',
  component: TabComponent,
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

const DefaultTemplate: Story<TabPanelProps> = _ => {
  return <div>
    <TabComponent  activiedIndex={0} onTabChange={() => {}}>
      <TabPanel label="Tab 1" id={1} icon={'kafei'}>
        Content of Tab Pane 1
      </TabPanel>
      <TabPanel label="Tab 2" id={2}>
        Content of Tab Pane 2
      </TabPanel>
      <TabPanel label="Tab 3" id={3}>
        Content of Tab Pane 3
      </TabPanel>
    </TabComponent>
    <div>
      Scroll
    </div>
    <TabComponent onTabChange={() => {}} scrollable={true}>
      {[...Array.from({ length: 30 }, (_, i) => i)].map(i => (
          <TabPanel label={`Tab-${i}`} id={i} disabled={i === 28}>
            Content of tab {i}
          </TabPanel>
        ))}
    </TabComponent>
  </div>
};

export const Tab = DefaultTemplate.bind({});
