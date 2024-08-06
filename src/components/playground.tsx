import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createHighlighter, type Highlighter } from "shiki";
import json from "shiki/langs/json.mjs";
import everforestLight from "shiki/themes/everforest-light.mjs";

// Custom debounce function
const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const CodePlayground = ({ initialJson, onJsonChange, readOnly = false }: {
  initialJson: string;
  onJsonChange?: (json: string) => void;
  readOnly?: boolean;
}) => {
  const [input, setInput] = useState(initialJson);
  const [output, setOutput] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const highlightContainerRef = useRef<HTMLDivElement>(null);
  const [highlighter, setHighlighter] = useState<Highlighter | null>(null);

  useEffect(() => {
    const loadHighlighter = async () => {
      const hl = await createHighlighter({
        langs: [json],
        themes: [everforestLight],
      });
      await hl.loadLanguage("json");
      setHighlighter(hl);
      setOutput(highlightJson(initialJson, hl));
    };

    loadHighlighter();
  }, [initialJson]);

  const syncScroll = useCallback(() => {
    if (!highlightContainerRef.current || !textAreaRef.current) return;
    requestAnimationFrame(() => {
      highlightContainerRef.current!.scrollLeft = textAreaRef.current?.scrollLeft ?? 0;
      highlightContainerRef.current!.scrollTop = textAreaRef.current?.scrollTop ?? 0;
    });
  }, []);

  const adjustTextAreaHeight = useCallback(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, []);

  const highlightJson = useCallback((json: string, hl: Highlighter | null = highlighter) => {
    if (hl) {
      return hl.codeToHtml(json, {
        lang: "json",
        theme: "everforest-light",
        transformers: [
          {
            pre(node) {
              node.properties.class = Array.isArray(node.properties.class)
                ? node.properties.class.concat("code")
                : ["code"];
            },
          },
        ],
      });
    }
    return json;
  }, [highlighter]);

  const debouncedOnInput = useMemo(() =>
    debounce((newValue: string) => {
      setOutput(highlightJson(newValue));
      if (onJsonChange) {
        onJsonChange(newValue);
      }
      adjustTextAreaHeight();
    }, 300), [highlightJson, onJsonChange, adjustTextAreaHeight]);

  const onInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setInput(newValue);
    debouncedOnInput(newValue);
    setTimeout(syncScroll, 0);
  };

  useEffect(() => {
    setOutput(highlightJson(input));
    adjustTextAreaHeight();
  }, [input, highlighter, highlightJson, adjustTextAreaHeight]);

  useEffect(() => {
    setInput(initialJson);
  }, [initialJson]);

  return (
    <div className="language-ts vp-adaptive-theme mini-playground transition-none" style={{ colorScheme: "inherit" }}>
      <div className="relative mt-10 min-h-[400px] max-h-[600px] overflow-auto">
        <div
          ref={highlightContainerRef}
          dangerouslySetInnerHTML={{ __html: output }}
          className="block max-h-[600px] overflow-auto min-h-[400px]"
        />
        {!readOnly && (
          <textarea
            ref={textAreaRef}
            value={input}
            onChange={onInput}
            onScroll={syncScroll}
            className="
              whitespace-pre
              overflow-auto w-full h-full font-mono bg-transparent absolute inset-0 py-5 px-6
              text-transparent caret-gray-600 tab-4 resize-none z-10 max-h-[600px] min-h-[400px]
            "
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        )}
      </div>
    </div>
  );
};

export default CodePlayground;
