import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/nl/kennisbank")({
  component: () => <Outlet />,
});
