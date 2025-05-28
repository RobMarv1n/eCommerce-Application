import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { describe, expect, test } from 'vitest';
import { FormPasswordInput } from '../../inputs/FormPasswordInput';

const TestForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <form onSubmit={handleSubmit(() => {})}>
      <FormPasswordInput
        label="Test input"
        id="test-input"
        name="test"
        register={register}
        rules={{ required: 'This field is required' }}
        errors={errors}
      />
      <button type="submit">Send</button>
    </form>
  );
};

describe('FormPasswordInput', () => {
  test('should render FormPasswordInput field with label', () => {
    render(<TestForm />);
    expect(screen.getByLabelText('Test input')).toBeInTheDocument();
  });

  test('should show password on click', () => {
    render(<TestForm />);

    const input = screen.getByLabelText('Test input');
    const button = screen.getByLabelText('Show password');

    fireEvent.click(button);
    expect(input).toHaveAttribute('type', 'text');
  });

  test('should display an error message if the field is empty', async () => {
    render(<TestForm />);

    const submitButton = screen.getByText('Send');

    fireEvent.click(submitButton);

    expect(
      await screen.findByText('This field is required')
    ).toBeInTheDocument();
  });
});
