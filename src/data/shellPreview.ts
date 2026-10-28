import type { IconName } from "../components/Icon";

// Visual preview content only. Replace this file when real support data is available.
export const navigation = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "users", label: "Users", icon: "users" },
  { id: "tickets", label: "Tickets", icon: "tickets" },
  { id: "diagnostics", label: "Diagnostics", icon: "diagnostics" },
  { id: "logs", label: "Logs", icon: "logs" },
  { id: "tools", label: "Tools", icon: "tools" },
  { id: "settings", label: "Settings", icon: "settings" },
] as const satisfies readonly { id: string; label: string; icon: IconName }[];

export type SectionId = (typeof navigation)[number]["id"];

export const dashboardCards = [
  { title: "System Status", value: "Not connected", description: "Status information will appear here.", icon: "shield", code: "SYS / 01" },
  { title: "Active Support Sessions", value: "—", description: "Session information will appear here.", icon: "layers", code: "SES / 02" },
  { title: "Open Issues", value: "—", description: "Issue information will appear here.", icon: "tickets", code: "ISS / 03" },
] as const satisfies readonly { title: string; value: string; description: string; icon: IconName; code: string }[];

export const activityPreview = {
  title: "Recent Activity",
  description: "Support events and updates",
  emptyTitle: "No activity to show yet",
  emptyDescription: "Recent support activity will appear here once the workspace is connected.",
  terminalText: "awaiting activity feed",
};

export const sectionPreview = {
  description: "This workspace is ready for future support tools.",
  message: "Interface preview only. Support tools will appear here later.",
};
