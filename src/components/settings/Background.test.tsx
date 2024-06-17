import { test, expect, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import BackgroundSettings from './Background';

describe('BackgroundSettings', () => {
    test('should render correctly', () => {
        const result = render(<BackgroundSettings />);
        expect(result.baseElement).toMatchSnapshot();
    });
});