
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders the main application component without crashing', () => {
    render(<App />);
    // Check if a key element from the Index page is rendered
    expect(screen.getByText(/A digital marketplace for creators/i)).toBeInTheDocument();
  });
});
