export type ChartType = "sent_per_day" | "open_rate" | "replies_by_playbook";

export const CHARTS = [
  {
    type: "sent_per_day",
    label: "Emails Sent Per Day",
  },
  {
    type: "open_rate",
    label: "Open Rate",
  },
  {
    type: "replies_by_playbook",
    label: "Replies by Playbook",
  },
];
