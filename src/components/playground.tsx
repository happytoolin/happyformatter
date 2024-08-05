import React, { useEffect, useRef, useState } from "react";
import { createHighlighter, type Highlighter } from "shiki";
import json from "shiki/langs/json.mjs";
import everforestLight from "shiki/themes/everforest-light.mjs";

const initialJson = `{
  "greeting": "Welcome to quicktype!",
  "instructions": [
    "Type or paste JSON here",
    "Or choose a sample above",
    "quicktype will generate code in your",
    "chosen language to parse the sample data"
  ]
}`;

const MiniPlayground: React.FC = () => {
  const [input, setInput] = useState(initialJson);
  const [output, setOutput] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const highlightContainerRef = useRef<HTMLSpanElement>(null);
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
  }, []);

  const syncScroll = () => {
    if (!highlightContainerRef.current || !textAreaRef.current) return;
    const preEl = highlightContainerRef.current.children[0] as HTMLPreElement;
    if (!preEl) return;
    preEl.scrollLeft = textAreaRef.current.scrollLeft;
    preEl.scrollTop = textAreaRef.current.scrollTop;
  };

  const adjustTextAreaHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  const highlightJson = (json: string, hl: Highlighter | null = highlighter) => {
    if (hl) {
      return hl.codeToHtml(json, {
        lang: "json",
        theme: "everforest-light",
        transformers: [
          {
            pre(node) {
              node.properties.className = Array.isArray(node.properties.className)
                ? node.properties.className.concat("vp-code")
                : ["vp-code"];
            },
          },
        ],
      });
    }
    return json;
  };

  const onInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setInput(newValue);
    setOutput(highlightJson(newValue));
    setTimeout(syncScroll, 0);
    adjustTextAreaHeight();
  };

  useEffect(() => {
    setOutput(highlightJson(input));
    adjustTextAreaHeight();
  }, [input, highlighter]);

  return (
    <div className="language-ts vp-adaptive-theme mini-playground transition-none!" style={{ colorScheme: "inherit" }}>
      <div className="absolute z-10 p-2 px-3 pl-5 flex gap-1 items-center left-0 top-0 right-0 border-b border-gray-200">
        <div className="i-carbon:chevron-down opacity-50" />
        <div className="flex-auto" />
        <div className="opacity-50 text-xs mx-2">Playground</div>
      </div>
      <div className="relative mt-10 min-h-100">
        <span
          ref={highlightContainerRef}
          dangerouslySetInnerHTML={{ __html: output }}
          className="shiki pt-5 font-mono tab-4 text-transparent caret-gray-700"
          style={{ padding: "1rem", whiteSpace: "pre-wrap", wordWrap: "break-word" }}
        />
        <textarea
          ref={textAreaRef}
          value={input}
          onChange={onInput}
          onScroll={syncScroll}
          className="whitespace-pre overflow-auto w-full h-full font-mono bg-transparent absolute inset-0 py-5 px-6 caret-gray tab-4 z-10 text-transparent caret-gray-700 tab-4"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          style={{
            resize: "none",
            color: "transparent",
            backgroundColor: "transparent",
            padding: "1rem",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
          }}
        />
      </div>
    </div>
  );
};

export default MiniPlayground;
