export type GetStyleInfo = (resolved: { element: Element | null }) => {
  className: string;
  styles: Record<string, string> | null;
};

export function initDesignMode(
  getStyleInfo: GetStyleInfo,
): () => void {
  return () => {};
}
