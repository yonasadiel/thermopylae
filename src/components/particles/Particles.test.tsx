import { test, expect, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import Particles from './Particles';
import { fn } from 'jest-mock';

describe('Particles', () => {
    test('should render correctly', () => {
        window.particlesJS = fn();
        const result = render(<Particles />);
        expect(result.baseElement).toMatchSnapshot();
    });
});