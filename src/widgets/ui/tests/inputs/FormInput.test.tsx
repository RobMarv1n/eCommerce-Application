import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { describe, expect, test } from 'vitest';
import { FormInput } from '../../inputs/FormInput';

describe('FormInput', () => {
  const TestForm = () => {
    const {
      register,
      formState: { errors },
      handleSubmit,
    } = useForm();

    return (
      <form onSubmit={handleSubmit(() => {})}>
        <FormInput
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

  test('should render FormInput field with label', () => {
    render(<TestForm />);
    expect(screen.getByLabelText('Test input')).toBeInTheDocument();
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
