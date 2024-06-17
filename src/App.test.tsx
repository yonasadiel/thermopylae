import { test, expect, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import App from './App';


describe('App', () => {
    test('should render correctly', () => {
        const result = render(<App />);
        expect(result.baseElement).toMatchSnapshot();
    });
});
