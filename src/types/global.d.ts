type GtagParams = Record<string, unknown>;

declare function gtag(
  command: "event",
  eventName: string,
  eventParams?: GtagParams,
): void;

declare function gtag(
  command: "config",
  targetId: string,
  config?: GtagParams,
): void;

declare function gtag(
  command: "set",
  targetId: string | GtagParams,
  value?: unknown,
): void;

interface HappyFormatterAnalytics {
  ready: boolean;
  track(eventName: string, params?: Record<string, string | number | boolean | null | undefined>): void;
}

interface Window {
  highlighterCache: Map<string, Highlighter>;
  dataLayer?: IArguments[];
  gtag?: typeof gtag;
  happyFormatterAnalytics?: HappyFormatterAnalytics;
}
