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
            <DropdownComponent<string>
                onChangeItem={(e, value) => {
                    console.log(value);
                }}
                label='单选' 
                searching={false}
                options={['中华田园猫', '橘猫', '黑猫', '牛奶毛', '三花猫', '折耳猫']}            
            />
             <DropdownComponent<{
                label: string,
                value: number,
                key: string,
                disabled?: boolean,
            }>
                style={{marginLeft: '100px'}}
                onChangeItem={(e, value) => {
                    console.log(value);
                }}
                multiple
                label='多选:' 
                searching={false} 
                options={[
                    {
                        label: '哈密瓜',
                        value: 1,
                        key: '1',
                    },
                    {
                        label: '苹果',
                        value: 2,
                        key: '2',
                    },
                    {
                        label: '雪梨',
                        value: 3,
                        key: '3',
                    },
                    {
                        label: '香蕉',
                        value: 4,
                        key: '4',
                    },
                    {
                        label: '木瓜',
                        value: 5,
                        key: '5',
                    },
                    {
                        label: '西瓜',
                        value: 6,
                        key: '6',
                    },
                    {
                        label: '西梅',
                        value: 7,
                        key: '7',
                    },
                    {
                        label: '草莓',
                        value: 8,
                        key: '8',
                    },
                    {
                        label: '橘子',
                        value: 9,
                        key: '9',
                    },
                    {
                        label: '蜜桃',
                        value: 10,
                        key: '10',
                        disabled: true,
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