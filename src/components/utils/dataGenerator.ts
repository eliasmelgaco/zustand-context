import { User } from '../../types/Employee';

const roles = [
  'Manager',
  'Senior Developer',
  'Developer',
  'Analyst',
  'Coordinator',
  'Director',
];
const firstNames = [
  'Alex',
  'Jordan',
  'Taylor',
  'Casey',
  'Morgan',
  'Jamie',
  'Avery',
  'Riley',
  'Sage',
  'Quinn',
];
const lastNames = [
  'Smith',
  'Johnson',
  'Williams',
  'Brown',
  'Jones',
  'Garcia',
  'Miller',
  'Davis',
  'Rodriguez',
  'Wilson',
];

export const generateMockUsers = (count: number): User[] => {
  return Array.from({ length: count }, (_, index) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const role = roles[Math.floor(Math.random() * roles.length)];

    return {
      id: index + 1,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
      role,
      joinDate: new Date(
        Date.now() - Math.random() * 5 * 365 * 24 * 60 * 60 * 1000
      ),
      isActive: Math.random() > 0.1, // 90% active
    };
  });
};
