import React, { HTMLAttributes } from 'react';

export interface Props extends HTMLAttributes<HTMLInputElement>{
    
}

const Radio = (props: Props) => {
    return <div>
        <input name="Fruit" type="radio" value="" />
    </div>
}

export default Radio;