import React, { useEffect, useRef, useState } from "react";
import { inputStore } from "./store";

interface CodePlaygroundProps {
  inputCode: string;
  language: string;
}

export default function CodePlayground({ inputCode, language }: CodePlaygroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let editorView: any = null;
    let unsubscribe: (() => void) | undefined;

    const initializeEditor = async () => {
      if (!containerRef.current) return;

      try {
        // Dynamically import all CodeMirror modules
        const [
          codemirror,
          stateModule,
          langModule,
          themeModule,
        ] = await Promise.all([
          import("codemirror"),
          import("@codemirror/state"),
          getLanguageModule(language),
          import("../../lib/codemirror-theme"),
        ]);

        const { EditorView, basicSetup } = codemirror;
        const { EditorState } = stateModule;
        const { createShikiThemeExtension } = themeModule;

        // Get language support
        let langExtension: any = null;
        if (langModule) {
          // Type cast the module to handle different language module exports
          const langMod = langModule as any;

          if (language === "typescript" && langMod.javascript) {
            langExtension = langMod.javascript({ typescript: true });
          } else if (typeof langMod.default === "function") {
            langExtension = langMod.default();
          } else if (langMod[language] && typeof langMod[language] === "function") {
            langExtension = langMod[language]();
          } else if (langMod.javascript) {
            langExtension = langMod.javascript();
          }
        }

        // Get current code from store
        const currentCode = inputStore.get() || inputCode;

        // Create update listener extension
        const updateListener = codemirror.EditorView.updateListener.of((update: any) => {
          if (update.docChanged) {
            const newCode = update.state.doc.toString();
            inputStore.set(newCode);
          }
        });

        // Create shiki theme extension
        const themeExtension = await createShikiThemeExtension(
          language,
          "one-dark-pro", // You can make this configurable
          false, // Dark mode - you can make this dynamic based on system preference
        );

        // Create editor state
        const state = EditorState.create({
          doc: currentCode,
          extensions: [
            basicSetup,
            langExtension,
            ...themeExtension,
            updateListener,
            EditorView.lineWrapping,
            EditorView.theme({
              "&": {
                height: "100%",
              },
              ".cm-scroller": {
                overflow: "auto",
              },
            }),
          ],
        });

        // Create editor view
        editorView = new EditorView({
          state,
          parent: containerRef.current,
        });

        // Listen to store changes
        unsubscribe = inputStore.subscribe((newCode) => {
          if (editorView && editorView.state.doc.toString() !== newCode) {
            editorView.dispatch({
              changes: {
                from: 0,
                to: editorView.state.doc.length,
                insert: newCode || "",
              },
            });
          }
        });

        setIsReady(true);
      } catch (error) {
        console.error("Failed to initialize CodeMirror:", error);
      }
    };

    // Helper function to get language module
    async function getLanguageModule(lang: string) {
      try {
        switch (lang) {
          case "javascript":
          case "typescript":
            return import("@codemirror/lang-javascript");
          case "json":
            return import("@codemirror/lang-json");
          case "python":
            return import("@codemirror/lang-python");
          case "html":
            return import("@codemirror/lang-html");
          case "css":
            return import("@codemirror/lang-css");
          case "cpp":
            return import("@codemirror/lang-cpp");
          case "java":
            return import("@codemirror/lang-java");
          case "php":
            return import("@codemirror/lang-php");
          case "rust":
            return import("@codemirror/lang-rust");
          case "sql":
            return import("@codemirror/lang-sql");
          case "xml":
            return import("@codemirror/lang-xml");
          case "yaml":
            return import("@codemirror/lang-yaml");
          case "markdown":
            return import("@codemirror/lang-markdown");
          default:
            return null;
        }
      } catch {
        return null;
      }
    }

    initializeEditor();

    return () => {
      if (editorView) {
        editorView.destroy();
      }
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [language, inputCode]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-transparent"
      data-language={language}
    />
  );
}
