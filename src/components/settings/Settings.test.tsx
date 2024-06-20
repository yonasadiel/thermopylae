import { test, expect, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import { fn } from 'jest-mock';
import Settings from './Settings';

describe('Settings', () => {
    test('should render correctly', () => {
        const result = render(<Settings onClose={() => { }} />);
        expect(result.baseElement).toMatchSnapshot();
    });
    test('should call on close when closing', () => {
        const onClose = fn();
        const result = render(<Settings onClose={onClose} />);
        const closeButton = result.getByAltText('cross');
        closeButton.click();
        expect(onClose).toHaveBeenCalled();
    });
});