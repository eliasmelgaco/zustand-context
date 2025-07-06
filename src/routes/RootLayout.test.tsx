import { screen } from '@testing-library/react';
import { render } from '../../tests/test-utils';
import RootLayout from './RootLayout';

describe('RootLayout', () => {
  it('shows the nav links', () => {
    render(<RootLayout />);

    expect(screen.getByTestId('root-layout-link-home')).toHaveAttribute(
      'href',
      '/'
    );
    expect(screen.getByTestId('root-layout-link-context')).toHaveAttribute(
      'href',
      '/react-context'
    );
    expect(screen.getByTestId('root-layout-link-zustand')).toHaveAttribute(
      'href',
      '/zustand'
    );
  });

  it('renders a <main> for the Outlet', () => {
    render(<RootLayout />);

    expect(screen.getByTestId('root-layout-main')).toBeInTheDocument();
  });
});
