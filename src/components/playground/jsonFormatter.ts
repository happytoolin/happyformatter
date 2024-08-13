import * as parserBabel from "prettier/parser-babel";
import pluginEstree from "prettier/plugins/estree";
import * as prettier from "prettier/standalone";

type DebouncedFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => void;

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): DebouncedFunction<T> {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export async function formatJSON(inputJSON: string) {
  try {
    return await prettier.format(inputJSON, {
      parser: "json",
      plugins: [parserBabel, pluginEstree],
      tabWidth: 2,
    });
  } catch (error) {
    console.error("Invalid JSON:", error);
    throw error;
  }
}
