import { create } from 'zustand';
import { EmployeeState, Filters, User } from '../types/Employee';

const defaultFilters: Filters = {
  search: '',
  role: '',
  isActive: null,
};

const defaultPagination = {
  currentPage: 1,
  pageSize: 500,
  totalItems: 0,
  totalPages: 0,
};

export const useEmployeeGridStore = create<EmployeeState>((set, get) => ({
  users: [],
  filteredUsers: [],
  isLoading: true,
  error: null,
  filters: defaultFilters,
  sortConfig: null,
  pagination: defaultPagination,

  roleOptions: [],

  setUsers: (users: User[]) => {
    const { applyFiltersAndSort } = get();

    const uniqueRoles = [...new Set(users.map((u) => u.role))].sort();

    set({
      users,
      roleOptions: uniqueRoles,
    });

    applyFiltersAndSort();
  },

  setIsLoading: (isLoading: boolean) => set({ isLoading }),

  setError: (error: string | null) => set({ error }),

  setFilters: (newFilters: Partial<Filters>) => {
    set(({ filters }) => ({ filters: { ...filters, ...newFilters } }));

    get().applyFiltersAndSort();
  },

  setSort: (field: keyof User) => {
    const { sortConfig, applyFiltersAndSort } = get();

    const currentSort = sortConfig;
    const direction =
      currentSort?.field === field && currentSort.direction === 'asc'
        ? 'desc'
        : 'asc';

    set({ sortConfig: { field, direction } });

    applyFiltersAndSort();
  },

  setPagination: (page: number, pageSize?: number) => {
    const { filteredUsers, pagination } = get();

    const currentPagination = pagination;
    const newPageSize = pageSize || currentPagination.pageSize;
    const totalPages = Math.ceil(filteredUsers.length / newPageSize);

    set({
      pagination: {
        ...currentPagination,
        currentPage: page,
        pageSize: newPageSize,
        totalPages,
      },
    });

    get().applyFiltersAndSort();
  },

  resetFilters: () => {
    set(({ users }) => ({
      filters: defaultFilters,
      pagination: { ...defaultPagination, totalItems: users.length },
    }));

    get().applyFiltersAndSort();
  },

  refreshData: () => get().applyFiltersAndSort(),

  // Internal method to apply filters and sorting
  applyFiltersAndSort: () => {
    const { users, filters, sortConfig, pagination } = get();

    // Apply filters
    let filtered = users.filter((user) => {
      const matchesSearch =
        !filters.search ||
        user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.search.toLowerCase());

      const matchesRole = !filters.role || user.role === filters.role;

      const matchesActive =
        filters.isActive === null || user.isActive === filters.isActive;

      return matchesSearch && matchesRole && matchesActive;
    });

    // Apply sorting
    if (sortConfig) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.field];
        const bValue = b[sortConfig.field];

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    // Update pagination
    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / pagination.pageSize);

    const start = (pagination.currentPage - 1) * pagination.pageSize;
    const end = start + pagination.pageSize;
    filtered = filtered.slice(start, end);

    set({
      filteredUsers: filtered,
      pagination: {
        ...pagination,
        totalItems,
        totalPages,
        currentPage: Math.min(pagination.currentPage, totalPages || 1),
      },
    });
  },
}));
