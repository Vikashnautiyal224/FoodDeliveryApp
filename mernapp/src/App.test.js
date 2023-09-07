import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome to react', () => {
  render(<App />);
  const linkElement = screen.getByText(/welcome to react/i);
  expect(linkElement).toBeInTheDocument();
});

