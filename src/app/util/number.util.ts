export function formatNumber(str: string | number) {
  const n = Number(str);
  return n.toLocaleString('el-GR');
}
