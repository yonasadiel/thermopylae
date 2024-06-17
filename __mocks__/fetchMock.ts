import { fn } from 'jest-mock';

export function mockFetch(data: any) {
    return fn().mockImplementation(() =>
        Promise.resolve({
            ok: true,
            json: () => data,
        }),
    );
}