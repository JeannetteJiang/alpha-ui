import React from 'react';
export type Props = {
    
}

const Typography = () => {
    return (
        (node, needEllipsis) => {
            let renderNode: React.ReactNode = node;
            if (node.length && needEllipsis) {
              renderNode = (
                <span key="show-content" aria-hidden>
                  {renderNode}
                </span>
              );
            }
          }
    );
};
Typography.displayName = 'Typography';

export default Typography;