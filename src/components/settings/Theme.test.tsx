import { test, expect, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import ThemeSettings from './Theme';

describe('ThemeSettings', () => {
    test('should render correctly', () => {
        const result = render(<ThemeSettings />);
        expect(result.baseElement).toMatchSnapshot();
    });

    test('should render correctly when particle is not enabled', async () => {
        const result = render(<ThemeSettings />);
        const elem = await result.findByLabelText('Particles')
        elem.click();
        expect(result.baseElement).toMatchSnapshot();
    });
});