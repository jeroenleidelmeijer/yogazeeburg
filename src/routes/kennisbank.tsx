import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/kennisbank")({
  component: () => <Outlet />,
});
