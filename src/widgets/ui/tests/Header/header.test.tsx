import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';
import { Header } from '../../Header';

describe('Header component', () => {
  test('should render Header component', () => {
    render(
      <BrowserRouter>
        <Header cartCount={0} setCartCount={() => {}} />
      </BrowserRouter>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Catalog')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
  });

  test('should call useNavigate with the correct path', async () => {
    render(<Header cartCount={0} setCartCount={() => {}} />, {
      wrapper: BrowserRouter,
    });
    const user = userEvent.setup();

    await user.click(screen.getByRole('link', { name: /login/i }));
    expect(globalThis.location.pathname).toBe('/login');

    await user.click(screen.getByRole('link', { name: /register/i }));
    expect(globalThis.location.pathname).toBe('/registration');

    await user.click(screen.getByRole('link', { name: /home/i }));
    expect(globalThis.location.pathname).toBe('/');
  });
});
