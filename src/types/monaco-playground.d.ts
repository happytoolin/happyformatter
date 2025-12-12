export {};

declare global {
  interface Window {
    MonacoPlayground: {
      getCurrentContent(playgroundElement: HTMLElement): Promise<string>;
      updateContent(playgroundElement: HTMLElement, newContent: string): Promise<void>;
    };
  }
}
