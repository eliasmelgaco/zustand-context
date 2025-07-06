import { screen, fireEvent } from '@testing-library/react';

import { useEmployeeStore } from '../../store/dataGridStore';
import { render } from '../../../tests/test-utils';

import { _mock_users } from '../../../__mocks__/users';
import EmployeeList from '.';

describe('[STORY-002] Zustand Optimized Data Grid', () => {
  describe('Zustand store', () => {
    it('should manage sortable data', () => {
      const { setUsers, filteredUsers, setSort } = useEmployeeStore();

      setUsers(_mock_users.splice(0, 2));

      setSort('name', 'asc');

      expect(filteredUsers).toEqual([
        {
          id: 2,
          name: 'Avery Rodrigue',
          email: 'avery.rodriguez@company.com',
          department: 'Operations',
          role: 'Senior Developer',
          salary: 137122,
          joinDate: new Date(2024, 2, 23, 22, 47, 41, 289),
          isActive: false,
        },
        {
          id: 1,
          name: 'Casey Miller',
          email: 'casey.miller@company.com',
          department: 'Finance',
          role: 'Developer',
          salary: 175087,
          joinDate: new Date(2023, 7, 8, 9, 16, 39, 374),
          isActive: true,
        },
      ]);

      setSort('name', 'desc');

      expect(filteredUsers).toEqual([
        {
          id: 1,
          name: 'Casey Miller',
          email: 'casey.miller@company.com',
          department: 'Finance',
          role: 'Developer',
          salary: 175087,
          joinDate: new Date(2023, 7, 8, 9, 16, 39, 374),
          isActive: true,
        },
        {
          id: 2,
          name: 'Avery Rodrigue',
          email: 'avery.rodriguez@company.com',
          department: 'Operations',
          role: 'Senior Developer',
          salary: 137122,
          joinDate: new Date(2024, 2, 23, 22, 47, 41, 289),
          isActive: false,
        },
      ]);
    });

    it('should filter data', () => {
      const { setUsers, filteredUsers, setFilter } = useEmployeeStore();
      setUsers(_mock_users.slice(0, 2));
      setFilter({ isActive: true });
      expect(filteredUsers).toEqual([
        {
          id: 1,
          name: 'Casey Miller',
          email: 'casey.miller@company.com',
          department: 'Finance',
          role: 'Developer',
          salary: 175087,
          joinDate: new Date(2023, 7, 8, 9, 16, 39, 374),
          isActive: true,
        },
      ]);

      setFilter({ isActive: false });

      expect(filteredUsers).toEqual([
        {
          id: 2,
          name: 'Avery Rodrigue',
          email: 'avery.rodriguez@company.com',
          department: 'Operations',
          role: 'Senior Developer',
          salary: 137122,
          joinDate: new Date(2024, 2, 23, 22, 47, 41, 289),
          isActive: false,
        },
      ]);
    });

    it('should paginate data', () => {
      const { setUsers, setPagination, filteredUsers } = useEmployeeStore();
      setUsers(_mock_users);
      setPagination(1, 4);

      expect(filteredUsers.length).toBe(4);

      setPagination(2, 4);

      expect(filteredUsers.length).toBe(4);

      setPagination(4, 4);

      expect(filteredUsers.length).toBe(2);
    });
  });

  describe('DataGrid component', () => {
    it('should navigate between many data virtualized', async () => {
      render(<EmployeeList />);

      const grid = screen.getByTestId('data-grid-base');
      const initialRows = screen.getAllByTestId('data-grid-row');
      expect(initialRows.length).toBeLessThan(_mock_users.length);
      fireEvent.scroll(grid, { target: { scrollTop: 1000 } });

      const rowsAfterScroll = screen.getAllByTestId('data-grid-row');
      expect(rowsAfterScroll.length).toBeGreaterThan(initialRows.length);
    });
  });

  describe('DataGrid states', () => {
    it('should display the loading state', () => {
      const { setIsLoading } = useEmployeeStore();
      setIsLoading(true);

      render(<EmployeeList />);
      expect(screen.getByTestId('loading-state')).toBeInTheDocument();
    });
    it('should display the error state', () => {
      const { setError } = useEmployeeStore();
      setError('Failed to load data');

      render(<EmployeeList />);
      expect(screen.getByTestId('error-state')).toBeInTheDocument();
    });
    it('should display the empty state', () => {
      const { setUsers } = useEmployeeStore();
      setUsers([]);

      render(<EmployeeList />);
      expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    });
  });
});
