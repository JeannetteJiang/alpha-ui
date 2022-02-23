import React from 'react';

type Props = {
    
}

const Text = () => {
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
Text.displayName = 'Text';

export default Text;