import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../hooks/useAuth';
import Signin from './Signin';

// Mocking the environment for Jest
if (typeof window === 'undefined') {
  global.window = {};
}

const renderWithProviders = (ui) => {
  return render(
    <AuthProvider>
      <MemoryRouter>
        {ui}
      </MemoryRouter>
    </AuthProvider>
  );
};

describe('Signin Component', () => {
  test('renders the sign-in form correctly', () => {
    renderWithProviders(<Signin />);
    
    expect(screen.getByText('L&F Portal')).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in with google/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in with github/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in with facebook/i })).toBeInTheDocument();
  });

  test('shows validation error for invalid email format', async () => {
    renderWithProviders(<Signin />);
    
    const emailInput = screen.getByLabelText(/email address/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput); // Some validation might trigger on blur

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);

    const error = await screen.findByText('Email address is invalid.');
    expect(error).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('aria-invalid', 'true');
  });

  test('shows validation error for empty password', async () => {
    renderWithProviders(<Signin />);
    
    const emailInput = screen.getByLabelText(/email address/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);

    const error = await screen.findByText('Password is required.');
    expect(error).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toHaveAttribute('aria-invalid', 'true');
  });
  
  test('submit button is disabled when form is invalid', () => {
    renderWithProviders(<Signin />);
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    
    // Initially, both fields are empty, so it should be disabled
    expect(submitButton).toBeDisabled();

    const emailInput = screen.getByLabelText(/email address/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    // Password is still empty, so it should be disabled
    expect(submitButton).toBeDisabled();
  });

  test('submit button is enabled when form is valid', () => {
    renderWithProviders(<Signin />);
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(submitButton).toBeEnabled();
  });
});
