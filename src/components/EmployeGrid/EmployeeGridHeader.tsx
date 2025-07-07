import { memo, useCallback } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

import { User } from '../../types/Employee';
import { useEmployeeGridStore } from '../../store/employeeGridStore';

const columns: { key: keyof User; label: string }[] = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'joinDate', label: 'Join Date' },
  { key: 'isActive', label: 'Status' },
];

const EmployeeGridHeader = memo(() => {
  const { sortConfig, setSort } = useEmployeeGridStore();

  const handleClick = (field: keyof User) => {
    setSort(field);
  };

  const renderIcon = useCallback(
    (field: keyof User) => {
      if (sortConfig?.field !== field) {
        return (
          <ChevronsUpDown className="ml-1 inline-block w-4 h-4 text-gray-400" />
        );
      }
      return sortConfig?.direction === 'asc' ? (
        <ChevronUp className="ml-1 inline-block w-4 h-4 text-gray-600" />
      ) : (
        <ChevronDown className="ml-1 inline-block w-4 h-4 text-gray-600" />
      );
    },
    [sortConfig?.direction, sortConfig?.field]
  );

  return (
    <thead className="sticky top-0 bg-gray-100 z-10">
      <tr>
        {columns.map(({ key, label }) => (
          <th
            key={key}
            className="border font-medium p-4 pl-8 pt-3 pb-3 text-slate-400 text-left cursor-pointer select-none"
            onClick={() => handleClick(key)}
          >
            <span className="flex items-center">
              {label}
              {renderIcon(key)}
            </span>
          </th>
        ))}
      </tr>
    </thead>
  );
});

export default EmployeeGridHeader;
