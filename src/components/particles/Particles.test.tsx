import { test, expect, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import Particles from './Particles';

describe('Particles', () => {
    test('should render correctly', () => {
        const result = render(<Particles />);
        expect(result.baseElement).toMatchSnapshot();
    });
});