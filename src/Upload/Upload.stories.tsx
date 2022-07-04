import React from 'react';
import { Meta, Story } from '@storybook/react';
import UploadComponent, { UploadProps } from "./index";

const meta: Meta = {
    title: 'Upload',
    component: UploadComponent,
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

const DefaultTemplate: Story<UploadProps> = _ => {
    return <div>
        <p>
         <UploadComponent type='drag' />
        </p>
        <p>
          <UploadComponent type='drag' size='small' />
        </p>
    </div>
};

export const Upload = DefaultTemplate.bind({});
