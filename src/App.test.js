import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title on page', () => {
  render(<App />);
  const title = screen.getByText(/books/i);
  expect(title).toBeInTheDocument();
});
