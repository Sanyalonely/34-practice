import { Outlet, createRootRoute, Navigate } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

import "../styles/global.css";

export const Route = createRootRoute({
  notFoundComponent: NotFound,
  component: RootComponent,
});

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
}

function RootComponent() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] dark:bg-[var(--color-background-dark)]">
      <Outlet />
      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "TanStack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] dark:bg-[var(--color-background-dark)]">
      <Navigate to="/notFound" />
    </div>
  );
}
