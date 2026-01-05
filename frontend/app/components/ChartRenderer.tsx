// ChartRenderer.tsx
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ThreePie } from "./charts/ThreePie";

import { ThreeLine } from "./charts/ThreeLine";
import { ThreeCombo } from "./charts/ThreeCombo";
import { ThreeBar } from "./charts/ThreeBar";

export function ChartRenderer({ config }: any) {
  const data = useSelector((s: RootState) => s.analytics.charts[config.id]);

  if (!data) return null;

  switch (config.chartType) {
    case "pie":
      return <ThreePie data={data} />;
    case "bar":
      return <ThreeBar data={data} />;
    case "line":
      return <ThreeLine data={data} />;
    case "combo":
      return <ThreeCombo data={data} />;
  }
}
