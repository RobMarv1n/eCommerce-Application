import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import { Modal } from '../../ui/Modal';

describe('Modal component', () => {
  const onClose = vi.fn();

  test('should render Modal component', () => {
    const { getByText } = render(<Modal onClose={() => {}}>Test</Modal>);

    expect(getByText('Test')).toBeInTheDocument();
  });

  test('should call onClose when overlay is clicked', async () => {
    const { container } = render(<Modal onClose={onClose}>Test</Modal>);
    const user = userEvent.setup();

    await user.click(container.querySelector('div')!);

    expect(onClose).toHaveBeenCalled();
  });

  test('should close modal when button is clicked', async () => {
    render(<Modal onClose={onClose}>Test</Modal>);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: '✕' }));

    expect(onClose).toHaveBeenCalled();
  });
});
