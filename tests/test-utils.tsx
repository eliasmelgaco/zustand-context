import { ReactElement } from 'react';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

interface AllProvidersProps {
  children: ReactElement;
}

function AllProviders({ children }: AllProvidersProps) {
  return (
    <MemoryRouter
      // remove test console warnings
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      {children}
    </MemoryRouter>
  );
}

// it is used to wrap the all needed context providers. Like react-router-dom
function render(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return rtlRender(ui, { wrapper: AllProviders, ...options });
}

export { render };
