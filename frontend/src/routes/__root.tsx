import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { AppShell, Group, Anchor, Container } from '@mantine/core';
import { IconStar, IconPlus } from '@tabler/icons-react';

export const Route = createRootRoute({
  component: () => (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md">
          <Link to="/" style={{ textDecoration: 'none' }}>
            {({ isActive }) => (
              <Anchor
                component="span"
                fw={700}
                c={isActive ? 'primary' : 'dimmed'}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <IconStar size={20} />
                Feedback List
              </Anchor>
            )}
          </Link>
          <Link to="/new" style={{ textDecoration: 'none' }}>
            {({ isActive }) => (
              <Anchor
                component="span"
                fw={700}
                c={isActive ? 'primary' : 'dimmed'}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <IconPlus size={20} />
                Add Feedback
              </Anchor>
            )}
          </Link>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="lg">
          <Outlet />
        </Container>
      </AppShell.Main>
      <TanStackRouterDevtools />
    </AppShell>
  ),
});
