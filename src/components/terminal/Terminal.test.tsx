import { test, expect, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import Terminal from './Terminal';

describe('Terminal', () => {
    test('should render correctly', () => {
        const result = render(<Terminal />);
        expect(result.baseElement).toMatchSnapshot();
    });
});