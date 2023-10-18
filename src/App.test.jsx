import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import App from './App';
describe('Test', () => {
  it('should work', () => {
    expect(5).toBe(5);
  });
  it('renders header', () => {
    render(<App />);
    const header = screen.getByRole('heading', { level: 1 });
    expect(header).toBeDefined();
    expect(header).toBeInTheDocument()
    expect(header).toHaveTextContent('artschool')
  });
});
