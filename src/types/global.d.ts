declare function gtag(
  command: "config" | "set" | "event",
  targetId: string,
  eventParams?: {
    [key: string]: any;
  },
): void;

interface Window {
  highlighterCache: Map<string, Highlighter>;
}
