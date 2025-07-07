import { useState, useRef, useEffect, memo, FC, RefObject } from 'react';
import { User } from '../../types/Employee';

interface EmployeeGridVirtualizedBodyProps {
  users: User[];
  scrollContainer: RefObject<HTMLDivElement>;
}

const ROW_HEIGHT = 51;
const BUFFER = 15;

/**
 * EmployeeGridVirtualizedBody
 *
 * A component that virtualizes the table body for an employee list,
 * rendering only the rows currently visible in the scrollable container to
 * greatly improve performance with large datasets.
 *
 * How it works:
 *  1. Subscribes to scroll events on the provided container to track scrollTop.
 *  2. Calculates startIndex and endIndex based on a fixed ROW_HEIGHT and BUFFER.
 *  3. Renders users.slice(startIndex, endIndex) as visible rows.
 *  4. Inserts two spacer <tr> elements (above and below) with calculated heights
 *     to preserve the correct scroll height and keep the scrollbar natural.
 *
 * How to test:
 *  - Open your DevTools and navigate to the Performance tab.
 *  - Set CPU throttling to 6× or 20× slowdown.
 *  - Scroll through the table and observe that only visible rows are rendered,
 *    confirming virtualization is working.
 */
const EmployeeGridVirtualizedBody = memo(
  ({ users, scrollContainer }: EmployeeGridVirtualizedBodyProps) => {
    const containerRef = useRef<HTMLTableSectionElement>(null);
    const [scrollTop, setScrollTop] = useState<number>(0);

    useEffect(() => {
      const el = scrollContainer.current;
      if (!el) return;
      const onScroll = () => setScrollTop(el.scrollTop);
      el.addEventListener('scroll', onScroll);
      return () => el.removeEventListener('scroll', onScroll);
    }, [scrollContainer]);

    const viewportHeight = containerRef.current?.clientHeight ?? 0;
    const startIdx = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - BUFFER);
    const visibleCount = Math.ceil(viewportHeight / ROW_HEIGHT) + BUFFER * 2;
    const endIdx = Math.min(users.length, startIdx + visibleCount);
    const slice = users.slice(startIdx, endIdx);

    return (
      <tbody>
        {/* put some spacing above */}
        <tr style={{ height: `${startIdx * ROW_HEIGHT}px` }} />

        {/* visible rows */}
        {slice.map((user) => (
          <tr
            key={user.id}
            style={{ height: `${ROW_HEIGHT}px` }}
            data-testid="data-grid-row"
          >
            <td className="border w-1/5">{user.name}</td>
            <td className="border w-1/5">{user.email}</td>
            <td className="border w-1/5">{user.role}</td>
            <td className="border w-1/5">
              {new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              }).format(user.joinDate)}
            </td>
            <td className="border w-1/5 text-center">
              {user.isActive ? 'Active' : 'Inactive'}
            </td>
          </tr>
        ))}

        {/* put some spacing below */}
        <tr style={{ height: `${(users.length - endIdx) * ROW_HEIGHT}px` }} />
      </tbody>
    );
  }
);

export default EmployeeGridVirtualizedBody;
