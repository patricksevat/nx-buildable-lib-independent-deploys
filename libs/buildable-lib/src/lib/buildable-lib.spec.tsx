import { render } from '@testing-library/react';

import BuildableLib from './buildable-lib';

describe('BuildableLib', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BuildableLib />);
    expect(baseElement).toBeTruthy();
  });
});
