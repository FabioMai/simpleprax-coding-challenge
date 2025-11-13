import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => (
    <div>
      <nav style={{
        padding: '20px',
        borderBottom: '1px solid #ddd',
        marginBottom: '20px',
        display: 'flex',
        gap: '20px'
      }}>
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            color: '#007bff',
            fontWeight: 'bold'
          }}
          activeProps={{
            style: {
              color: '#333',
              textDecoration: 'underline'
            }
          }}
        >
          Feedback List
        </Link>
        <Link
          to="/new"
          style={{
            textDecoration: 'none',
            color: '#007bff',
            fontWeight: 'bold'
          }}
          activeProps={{
            style: {
              color: '#333',
              textDecoration: 'underline'
            }
          }}
        >
          Add Feedback
        </Link>
      </nav>
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
