import React from 'react';
import * as ReactDOM from 'react-dom';
import { Default as Basic } from '../stories/Basic.stories';

describe('Thing', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Basic />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
