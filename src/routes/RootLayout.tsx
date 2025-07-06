import { Outlet, Link } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow">
        <div className="p-4">
          <nav>
            <ul className="flex space-x-8">
              <li>
                <Link
                  to="/"
                  className="text-gray-700 hover:text-blue-600 text-xs"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/react-context"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  React Context
                </Link>
              </li>
              <li>
                <Link
                  to="/zustand"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Zustand
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
