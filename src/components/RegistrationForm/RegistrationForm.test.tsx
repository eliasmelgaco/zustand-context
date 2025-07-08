import { ReactNode } from 'react';
import { describe, it, expect } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  renderHook,
  act,
} from '@testing-library/react';

import {
  RegistrationFormProvider,
  useRegistrationFormContext,
} from '../../contexts/RegistrationFormContext';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import RegistrationPage, { steps } from '.';

describe('[STORY-001] Context-Based Component Composition', () => {
  describe('RegistrationFormProvider context to manage form state', () => {
    it('should provide default values and allow updating fields', () => {
      const wrapper = ({ children }: { children: ReactNode }) => (
        <RegistrationFormProvider steps={steps}>
          {children}
        </RegistrationFormProvider>
      );
      const { result } = renderHook(() => useRegistrationFormContext(), {
        wrapper,
      });

      expect(result.current.values).toEqual({ name: '', email: '', role: '' });

      act(() => {
        result.current.setField('name', 'John');
        result.current.setField('email', 'john@example.com');
        result.current.setField('role', 'admin');
      });

      expect(result.current.values).toEqual({
        name: 'John',
        email: 'john@example.com',
        role: 'admin',
      });
    });

    it('should validate fields and set errors', () => {
      const wrapper = ({ children }: { children: ReactNode }) => (
        <RegistrationFormProvider steps={steps}>
          {children}
        </RegistrationFormProvider>
      );
      const { result } = renderHook(() => useRegistrationFormContext(), {
        wrapper,
      });

      act(() => {
        result.current.setField('email', 'invalid-email');
        result.current.setField('name', '');
        result.current.setField('role', '');
      });

      act(() => {
        result.current.validate();
      });

      expect(result.current.errors).toEqual({
        name: 'Name is required',
        email: 'Invalid email',
        role: 'Role is required',
      });
    });
  });

  describe('RegistrationFormProvider context to consume on the elements', () => {
    it('Input and Select should reflect and update context values', () => {
      render(
        <RegistrationFormProvider steps={steps}>
          <Input
            name="name"
            label="Name"
            data-testid="form-context-input-name"
          />
          <Input
            name="email"
            label="Email"
            data-testid="form-context-input-email"
          />
          <Select
            name="role"
            data-testid="form-context-select-role"
            label="Role"
            options={[
              { value: 'user', label: 'User' },
              { value: 'admin', label: 'Admin' },
            ]}
          />
        </RegistrationFormProvider>
      );

      const nameInput = screen.getByTestId(
        'form-context-input-name'
      ) as HTMLInputElement;
      const emailInput = screen.getByTestId(
        'form-context-input-email'
      ) as HTMLInputElement;
      const select = screen.getByTestId(
        'form-context-select-role'
      ) as HTMLSelectElement;

      fireEvent.change(nameInput, { target: { value: 'Alice' } });
      fireEvent.change(emailInput, { target: { value: 'alice@site.com' } });
      fireEvent.change(select, { target: { value: 'user' } });

      expect(nameInput.value).toBe('Alice');
      expect(emailInput.value).toBe('alice@site.com');
      expect(select.value).toBe('user');
    });

    it('Button should trigger submit and validation', () => {
      render(<RegistrationPage />);

      const nextBtn = screen.getByTestId('form-context-next');

      fireEvent.change(screen.getByTestId('form-context-input-name'), {
        target: { value: 'Bob' },
      });

      fireEvent.click(nextBtn);

      fireEvent.change(screen.getByTestId('form-context-input-email'), {
        target: { value: 'bob@site.com' },
      });

      fireEvent.click(nextBtn);

      fireEvent.change(screen.getByTestId('form-context-select-role'), {
        target: { value: 'admin' },
      });

      fireEvent.click(nextBtn);

      expect(screen.getByTestId('form-context-review-name')).toHaveTextContent(
        'Bob'
      );
      expect(screen.getByTestId('form-context-review-email')).toHaveTextContent(
        'bob@site.com'
      );
      expect(screen.getByTestId('form-context-review-role')).toHaveTextContent(
        'admin'
      );
    });
  });

  describe('composition pattern', () => {
    it('should show success message after valid registration', () => {
      render(<RegistrationPage />);

      const nextBtn = screen.getByTestId('form-context-next');

      fireEvent.change(screen.getByTestId('form-context-input-name'), {
        target: { value: 'Bob' },
      });

      fireEvent.click(nextBtn);

      fireEvent.change(screen.getByTestId('form-context-input-email'), {
        target: { value: 'bob@site.com' },
      });

      fireEvent.click(nextBtn);

      fireEvent.change(screen.getByTestId('form-context-select-role'), {
        target: { value: 'admin' },
      });

      fireEvent.click(nextBtn);

      expect(screen.getByTestId('form-context-review-name')).toHaveTextContent(
        'Bob'
      );
      expect(screen.getByTestId('form-context-review-email')).toHaveTextContent(
        'bob@site.com'
      );
      expect(screen.getByTestId('form-context-review-role')).toHaveTextContent(
        'admin'
      );

      const nextSubmit = screen.getByTestId('form-context-submit');

      fireEvent.click(nextSubmit);

      expect(screen.getByTestId('form-context-success')).toBeInTheDocument();
    });

    it('should show validation errors for invalid fields', () => {
      render(<RegistrationPage />);

      const nextBtn = screen.getByTestId('form-context-next');

      fireEvent.click(nextBtn);

      expect(screen.getByTestId('name-error')).toHaveTextContent(
        'Name is required'
      );

      fireEvent.change(screen.getByTestId('form-context-input-name'), {
        target: { value: 'Bob' },
      });

      fireEvent.click(nextBtn);
      fireEvent.click(nextBtn);

      expect(screen.getByTestId('email-error')).toHaveTextContent(
        'Email is required'
      );

      fireEvent.change(screen.getByTestId('form-context-input-email'), {
        target: { value: 'bob@site.com' },
      });

      fireEvent.click(nextBtn);
      fireEvent.click(nextBtn);

      expect(screen.getByTestId('role-error')).toHaveTextContent(
        'Role is required'
      );

      fireEvent.change(screen.getByTestId('form-context-select-role'), {
        target: { value: 'admin' },
      });

      fireEvent.click(nextBtn);

      expect(screen.getByTestId('form-context-review-name')).toHaveTextContent(
        'Bob'
      );
      expect(screen.getByTestId('form-context-review-email')).toHaveTextContent(
        'bob@site.com'
      );
      expect(screen.getByTestId('form-context-review-role')).toHaveTextContent(
        'admin'
      );

      const nextSubmit = screen.getByTestId('form-context-submit');

      fireEvent.click(nextSubmit);

      expect(screen.getByTestId('form-context-success')).toBeInTheDocument();
    });
  });
});
