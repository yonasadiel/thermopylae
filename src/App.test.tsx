import { test, expect, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import App from './App';
import { fn } from 'jest-mock';


describe('App', () => {
    test('should render correctly', () => {
        window.particlesJS = fn();
        const result = render(<App />);
        expect(result.baseElement).toMatchSnapshot();
    });
});
