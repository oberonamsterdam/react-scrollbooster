import { useState } from '@storybook/addons';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { ScrollingState } from 'scrollbooster';
import { useScrollBoost } from '../src';

const meta: Meta = {
    title: 'Welcome',
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

const Template: Story = () => {
    const [state, setState] = useState<ScrollingState | null>(null);

    const [ref] = useScrollBoost({
        direction: 'horizontal',
        friction: 0.1,
        scrollMode: 'native',
        onUpdate: setState,
    });

    return (
        <>
            <h2>Drag to scroll</h2>

            <div ref={ref} style={{ width: '100vw', overflow: 'auto' }}>
                <div style={{ display: 'flex' }}>
                    {new Array(10).fill(null).map((_, i) => (
                        <img
                            style={{ flexShrink: 0 }}
                            key={i}
                            alt=""
                            src={`https://picsum.photos/id/${i + 10}/400/300`}
                        />
                    ))}
                </div>
            </div>
            <pre>{JSON.stringify(state, null, 4)}</pre>
        </>
    );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
