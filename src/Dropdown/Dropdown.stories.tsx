import React from 'react';
import { Meta, Story } from '@storybook/react';
import DropdownComponent, { DropdownProps } from "./index";

const meta: Meta = {
    title: 'Dropdown',
    component: DropdownComponent,
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

const DefaultTemplate: Story<DropdownProps> = _ => {
    return <div>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginRight: '20px' }}>
            <DropdownComponent<number>
                onChangeItem={(e, value) => {
                    console.log(e, value);
                }}
                label='标题1' 
                searching={false} 
                options={[1, 2, 3]}            
            />
             <DropdownComponent<{
                label: string,
                value: number,
                key: string,
            }>
                style={{marginLeft: '100px'}}
                onChangeItem={(e, value) => {
                    console.log(e, value);
                }}
                label='标题2' 
                searching={false} 
                options={[
                    {
                        label: '111',
                        value: 1,
                        key: '1',
                    },
                    {
                        label: '222',
                        value: 2,
                        key: '2',
                    },
                    {
                        label: '111',
                        value: 3,
                        key: '1',
                    },
                    {
                        label: '333',
                        value: 4,
                        key: '2',
                    },
                    {
                        label: '444',
                        value: 5,
                        key: '1',
                    },
                    {
                        label: '435345',
                        value: 6,
                        key: '2',
                    },
                    {
                        label: '444',
                        value: 7,
                        key: '1',
                    },
                    {
                        label: '435345',
                        value: 6,
                        key: '2',
                    },
                    {
                        label: '444',
                        value: 5,
                        key: '1',
                    },
                    {
                        label: '435345',
                        value: 6,
                        key: '2',
                    },

            ]}            
            />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '300px', marginTop: '150px' }}>
           
        </div>
        <div>
            {/* <DropdownComponent label='禁止输入' disabled /> */}
        </div>
    </div>
};

export const Input = DefaultTemplate.bind({});