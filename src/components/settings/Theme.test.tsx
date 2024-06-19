import { test, expect, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import ThemeSettings from './Theme';

describe('ThemeSettings', () => {
    test('should render correctly', () => {
        const result = render(<ThemeSettings />);
        expect(result.baseElement).toMatchSnapshot();
    });
});