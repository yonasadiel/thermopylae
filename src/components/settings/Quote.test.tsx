import { test, expect, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import Quote from './Quote';

describe('Quote Settings', () => {
    test('should render correctly', () => {
        const result = render(<Quote />);
        expect(result.baseElement).toMatchSnapshot();
    });
});