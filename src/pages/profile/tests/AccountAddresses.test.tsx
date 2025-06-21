import { render, renderHook, screen } from '@testing-library/react';
import { act, useState } from 'react';
import { describe, expect, test } from 'vitest';
import { AccountAddress } from '../../../shared/api/clientApi/types';
import {
  MOCK_DEFAULT_ADDRESS,
  MOCK_DEFAULT_BILLING_ADDRESS,
  MOCK_DEFAULT_SHIPPING_ADDRESS,
} from '../model/DefaultAddresses';
import { AccountAddresses } from '../ui/components/AccountAddresses';

const mockAddresses: AccountAddress[] = [
  MOCK_DEFAULT_SHIPPING_ADDRESS,
  MOCK_DEFAULT_BILLING_ADDRESS,
  MOCK_DEFAULT_ADDRESS,
];

describe('AccountAddresses component', () => {
  test('should render AccountAddresses component', () => {
    render(<AccountAddresses />);

    const { result } = renderHook(() => useState<AccountAddress[]>([]));
    const [, setAddresses] = result.current;

    act(() => {
      setAddresses(mockAddresses);
    });

    expect(result.current[0][0]).toEqual(MOCK_DEFAULT_SHIPPING_ADDRESS);
    expect(result.current[0].length).toEqual(3);
    expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
  });
});
