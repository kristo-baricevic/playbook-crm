export async function fetchChart(type: string, days = 30) {
  const res = await fetch(`/api/analytics/charts/?type=${type}&days=${days}`);
  return res.json();
}
