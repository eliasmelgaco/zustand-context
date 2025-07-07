import { screen, fireEvent, renderHook, act } from '@testing-library/react';

import { useEmployeeGridStore } from '../../store/employeeGridStore';
import { render } from '../../../tests/test-utils';

import { _mock_users } from '../../../__mocks__/users';
import EmployeeList from './';
import EmployeeGrid from './EmployeeGrid';
import { generateMockUsers } from '../utils/dataGenerator';

describe('[STORY-002] Zustand Optimized Data Grid', () => {
  beforeEach(() => {
    useEmployeeGridStore.getState().resetFilters();
  });

  describe('Zustand store', () => {
    it('should manage sortable data', () => {
      const { result } = renderHook(() => useEmployeeGridStore());
      act(() => {
        result.current.setUsers(_mock_users.slice(0, 2));
        result.current.setSort('name');
      });

      expect(result.current.filteredUsers).toEqual([
        {
          id: 2,
          name: 'Avery Rodrigue',
          email: 'avery.rodriguez@company.com',
          role: 'Senior Developer',
          joinDate: new Date(2024, 2, 23, 22, 47, 41, 289),
          isActive: false,
        },
        {
          id: 1,
          name: 'Casey Miller',
          email: 'casey.miller@company.com',
          role: 'Developer',
          joinDate: new Date(2023, 7, 8, 9, 16, 39, 374),
          isActive: true,
        },
      ]);

      act(() => {
        result.current.setSort('name');
      });

      expect(result.current.filteredUsers).toEqual([
        {
          id: 1,
          name: 'Casey Miller',
          email: 'casey.miller@company.com',
          role: 'Developer',
          joinDate: new Date(2023, 7, 8, 9, 16, 39, 374),
          isActive: true,
        },
        {
          id: 2,
          name: 'Avery Rodrigue',
          email: 'avery.rodriguez@company.com',
          role: 'Senior Developer',
          joinDate: new Date(2024, 2, 23, 22, 47, 41, 289),
          isActive: false,
        },
      ]);
    });

    it('should filter data', () => {
      const { result } = renderHook(() => useEmployeeGridStore());
      act(() => {
        result.current.setUsers(_mock_users.slice(0, 2));
        result.current.setFilters({ isActive: true });
      });

      expect(result.current.filteredUsers).toEqual([
        {
          id: 1,
          name: 'Casey Miller',
          email: 'casey.miller@company.com',
          role: 'Developer',
          joinDate: new Date(2023, 7, 8, 9, 16, 39, 374),
          isActive: true,
        },
      ]);

      act(() => {
        result.current.setFilters({ isActive: false });
      });

      expect(result.current.filteredUsers).toEqual([
        {
          id: 2,
          name: 'Avery Rodrigue',
          email: 'avery.rodriguez@company.com',
          role: 'Senior Developer',
          joinDate: new Date(2024, 2, 23, 22, 47, 41, 289),
          isActive: false,
        },
      ]);
    });

    it('should paginate data', () => {
      const { result } = renderHook(() => useEmployeeGridStore());
      act(() => {
        result.current.setUsers(_mock_users);
        result.current.setPagination(1, 4);
      });

      expect(result.current.filteredUsers.length).toBe(4);

      act(() => {
        result.current.setUsers(_mock_users);
        result.current.setPagination(2, 4);
      });

      expect(result.current.filteredUsers.length).toBe(4);

      act(() => {
        result.current.setUsers(_mock_users);
        result.current.setPagination(3, 4);
      });

      expect(result.current.filteredUsers.length).toBe(2);
    });
  });

  describe('DataGrid component', () => {
    it('should navigate between many data virtualized', async () => {
      const mockUsers = generateMockUsers(1000);
      const { result } = renderHook(() => useEmployeeGridStore());

      render(<EmployeeGrid />);

      act(() => {
        result.current.setUsers(mockUsers);
        result.current.setIsLoading(false);
      });

      const scrollable = screen.getByTestId('data-grid-scrollable');

      // get the text of the first visible row
      const initialFirst =
        screen.getAllByTestId('data-grid-row')[0].textContent;

      // scroll down and wait to re-render
      fireEvent.scroll(scrollable, { target: { scrollTop: 1000 } });

      // get the text of the first visible row
      const newFirst = (await screen.findAllByTestId('data-grid-row'))[0]
        .textContent;

      // must be different
      expect(newFirst).not.toEqual(initialFirst);
    });
  });

  describe('DataGrid states', () => {
    it('should display the loading state', () => {
      const { result } = renderHook(() => useEmployeeGridStore());

      render(<EmployeeList />);

      act(() => {
        result.current.setIsLoading(true);
      });

      expect(screen.getByTestId('data-grid-loading')).toBeInTheDocument();
    });

    it('should display the error state', async () => {
      const { result } = renderHook(() => useEmployeeGridStore());

      render(<EmployeeList />);

      act(() => {
        result.current.setIsLoading(false);
        result.current.setError('Failed to load data');
      });

      expect(screen.getByTestId('data-grid-error')).toBeInTheDocument();
    });

    it('should display the empty state', () => {
      const { result } = renderHook(() => useEmployeeGridStore());

      render(<EmployeeList />);

      act(() => {
        result.current.setIsLoading(false);
        result.current.setUsers([]);
      });
      expect(screen.getByTestId('data-grid-empty')).toBeInTheDocument();
    });
  });
});
