export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  joinDate: Date;
  isActive: boolean;
}

export interface Filters {
  search: string;
  role: string;
  isActive: boolean | null;
}

export interface Sort {
  field: keyof User;
  direction: 'asc' | 'desc';
}

export interface Pagination {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface EmployeeState {
  // Data
  users: User[];
  filteredUsers: User[];
  isLoading: boolean;
  error: string | null;

  filters: Filters;
  sortConfig: Sort | null;
  pagination: Pagination;

  roleOptions: string[];

  // Actions
  setUsers: (users: User[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setFilters: (filters: Partial<Filters>) => void;
  setSort: (field: keyof User) => void;
  setPagination: (page: number, pageSize?: number) => void;
  resetFilters: () => void;
  refreshData: () => void;

  applyFiltersAndSort: () => void;
}
