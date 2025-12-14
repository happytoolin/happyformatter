import CodeMirror from "@uiw/react-codemirror";
import shiki from "codemirror-shiki";
import React, { useCallback, useEffect, useState } from "react";
import { getShikiHighlighter } from "../../lib/shiki-config";
import { availableThemes } from "../../lib/shiki-config";
import { useTheme } from "./ThemeContext";

interface CodePlaygroundProps {
  inputCode: string;
  language: string;
  onCodeChange?: (code: string) => void;
}

export default function CodePlayground({ inputCode, language, onCodeChange }: CodePlaygroundProps) {
  const [isReady, setIsReady] = useState(false);
  const [highlighter, setHighlighter] = useState<any>(null);
  const [extensions, setExtensions] = useState<any[]>([]);
  const { currentTheme } = useTheme();

  // Initialize the Shiki highlighter
  useEffect(() => {
    const initHighlighter = async () => {
      try {
        const h = await getShikiHighlighter();
        setHighlighter(h);
        setIsReady(true);
      } catch (error) {
        console.error("Failed to initialize Shiki highlighter:", error);
      }
    };

    initHighlighter();
  }, []);

  // Get language extension
  const getLanguageExtension = useCallback(async (lang: string) => {
    try {
      switch (lang) {
        case "javascript":
        case "typescript":
          const jsModule = await import("@codemirror/lang-javascript");
          return lang === "typescript"
            ? jsModule.javascript({ typescript: true })
            : jsModule.javascript();
        case "json":
          const jsonModule = await import("@codemirror/lang-json");
          return jsonModule.json();
        case "python":
          const pythonModule = await import("@codemirror/lang-python");
          return pythonModule.python();
        case "html":
          const htmlModule = await import("@codemirror/lang-html");
          return htmlModule.html();
        case "css":
          const cssModule = await import("@codemirror/lang-css");
          return cssModule.css();
        case "cpp":
          const cppModule = await import("@codemirror/lang-cpp");
          return cppModule.cpp();
        case "java":
          const javaModule = await import("@codemirror/lang-java");
          return javaModule.java();
        case "php":
          const phpModule = await import("@codemirror/lang-php");
          return phpModule.php();
        case "rust":
          const rustModule = await import("@codemirror/lang-rust");
          return rustModule.rust();
        case "sql":
          const sqlModule = await import("@codemirror/lang-sql");
          return sqlModule.sql();
        case "xml":
          const xmlModule = await import("@codemirror/lang-xml");
          return xmlModule.xml();
        case "yaml":
          const yamlModule = await import("@codemirror/lang-yaml");
          return yamlModule.yaml();
        case "markdown":
          const markdownModule = await import("@codemirror/lang-markdown");
          const { markdownLanguage } = await import("@codemirror/lang-markdown");
          const { languages } = await import("@codemirror/language-data");
          return markdownModule.markdown({
            base: markdownLanguage,
            codeLanguages: languages,
          });
        default:
          return null;
      }
    } catch (error) {
      console.error(`Failed to load language module for ${lang}:`, error);
      return null;
    }
  }, []);

  // Update extensions when highlighter, language, or theme changes
  useEffect(() => {
    const updateExtensions = async () => {
      if (!highlighter) return;

      try {
        const langExtension = await getLanguageExtension(language);
        const exts = [];

        if (langExtension) {
          exts.push(langExtension);
        }

        // Add shiki syntax highlighting
        if (highlighter) {
          console.log("CodePlayground: Creating shiki extension with:", {
            language,
            theme: currentTheme,
          });

          exts.push(
            shiki({
              highlighter,
              language,
              theme: currentTheme,
            }),
          );
        }

        // Add line wrapping
        const { EditorView } = await import("@codemirror/view");
        exts.push(EditorView.lineWrapping);

        setExtensions(exts);
      } catch (error) {
        console.error("Error updating extensions:", error);
      }
    };

    updateExtensions();
  }, [highlighter, language, currentTheme, getLanguageExtension]);

  if (!isReady || !highlighter) {
    return (
      <div className="w-full h-full bg-gray-100 dark:bg-gray-800 animate-pulse flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">Loading editor...</div>
      </div>
    );
  }

  return (
    <div
      className="w-full h-full bg-transparent"
      data-language={language}
    >
      <CodeMirror
        value={inputCode}
        height="100%"
        theme="dark"
        extensions={extensions}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightSpecialChars: true,
          history: true,
          foldGutter: true,
          drawSelection: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          highlightSelectionMatches: true,
        }}
        editable={true}
        onChange={(value) => {
          onCodeChange?.(value);
        }}
      />
    </div>
  );
}
