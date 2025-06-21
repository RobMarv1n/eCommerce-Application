import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AccountSettings } from '../ui/components/AccountSettings';

describe('AccountSettings component', () => {
  test('should render AccountSettings component', () => {
    const { getByLabelText, getByRole } = render(<AccountSettings />);
    expect(getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
    expect(getByRole('textbox', { name: 'First name' })).toBeInTheDocument();
    expect(getByRole('textbox', { name: 'Last name' })).toBeInTheDocument();
    expect(getByLabelText('Date of birth')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Edit' })).toBeInTheDocument();
  });
});
