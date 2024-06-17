import { test, expect } from '@jest/globals';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
    const result = render(<App />);
    const rootElem = result.container.querySelector('#root');
    expect(rootElem).toMatchSnapshot();
});
