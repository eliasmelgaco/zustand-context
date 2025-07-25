import { Link, Route, Routes } from 'react-router-dom';
import ReactContextPage from './routes/ReactContextPage';
import ZustandPage from './routes/ZustandPage';
import NotFoundPage from './routes/ErrorPage';
import ErrorPage from './routes/ErrorPage';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow">
        <div className="p-4">
          <nav>
            <ul className="flex space-x-8">
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
        <Routes>
          <Route path="/react-context" element={<ReactContextPage />} />
          <Route path="/zustand" element={<ZustandPage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
