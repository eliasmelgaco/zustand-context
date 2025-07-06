import { Link, useRouteError } from 'react-router-dom';

interface RouterErrorProps {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouterErrorProps;

  return (
    <div>
      <h1>Error</h1>
      <p>An unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/">Back home</Link>
    </div>
  );
}
