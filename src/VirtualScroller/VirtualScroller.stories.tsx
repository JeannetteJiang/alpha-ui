import React from 'react';
import { Meta, Story } from '@storybook/react';
import VirtualScrollerComponent, { VirtualScrollerProps } from "./index";
import classNames from 'classnames';

const meta: Meta = {
  title: 'Scroll',
  component: VirtualScrollerComponent,
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

const DefaultTemplate: Story<VirtualScrollerProps> = _ => {

  const basicItems = Array.from({ length: 50 }).map(
    (_, i) => `Item #${i}`
  );


  const itemTemplate = (item, options) => {
    const { index, count, first, last, even, odd } = options;
    const className = classNames("custom-scroll-item scroll-item", {
      odd: odd
    });

    return (
      <div className={className} style={{height: '250px', background: '#ccc', marginBottom: '10px'}}>
          {item}
      </div>
    );
  }
  
  const loadingTemplate = (options) => {
    console.log('options: ', options);
    const className = classNames('custom-scroll-item scroll-item', {
        'odd': options.odd
    });

    return (
        <div className={className} style={{marginBottom: '20px', background: '#ccc'}}>
            <div className="flex align-items-center px-2" style={{ height: '25px' }}>1</div>
            <div className="flex align-items-center px-2" style={{ height: '25px' }}>123</div>
            <div className="flex align-items-center px-2" style={{ height: '25px' }}>123</div>
            <div className="flex align-items-center px-2" style={{ height: '25px' }}>123</div>
            <div className="flex align-items-center px-2" style={{ height: '25px' }}>123</div>
            <div className="flex align-items-center px-2" style={{ height: '25px' }}>123</div>
            <div className="flex align-items-center px-2" style={{ height: '25px' }}>123</div>
            <div className="flex align-items-center px-2" style={{ height: '25px' }}>123</div>
        </div>
    );
}
  return <div>
    <div style={{ margin: '20px 0 ' }}>
      <h2>默认: </h2>
    </div>
    <div style={{'height': '550px'}}>
        <VirtualScrollerComponent
          items={basicItems}
          itemSize={25 * 7}
          itemTemplate={itemTemplate}
          showLoader
          delay={10}
        />
        </div>
   
  </div>
};

export const VirtualScroller = DefaultTemplate.bind({});
