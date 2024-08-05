"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";

export function JsonFormatter() {
  const [jsonInput, setJsonInput] = useState("");
  const [formattedJson, setFormattedJson] = useState("");
  const inputRef = useRef(null);
  const lineNumbersRef = useRef(null);

  const formatJson = () => {
    console.log("formatting json");
    try {
      const parsedJson = JSON.parse(jsonInput);
      setFormattedJson(JSON.stringify(parsedJson, null, 2));
    } catch (error) {
      setFormattedJson("Invalid JSON format");
    }
  };

  const syncScroll = (e) => {
    lineNumbersRef.current.scrollTop = e.target.scrollTop;
  };

  useEffect(() => {
    const inputElement = inputRef.current;
    inputElement.addEventListener("scroll", syncScroll);
    return () => {
      inputElement.removeEventListener("scroll", syncScroll);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <div className="w-full max-w-4xl bg-card p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          <div className="relative">
            <div className="flex">
              <div
                ref={lineNumbersRef}
                className="w-8 bg-muted/50 text-muted-foreground flex flex-col items-center justify-start pt-4 rounded-l-md overflow-y-auto"
              >
                {jsonInput.split("\n").map((_, index) => (
                  <div key={index} className="py-1">
                    {index + 1}
                  </div>
                ))}
              </div>
              <Textarea
                ref={inputRef}
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="w-full h-[400px] p-4 border border-input rounded-md resize-none"
                placeholder="Paste your JSON here..."
              />
            </div>
          </div>
          <div className="relative">
            <div className="flex">
              <div className="w-8 bg-muted/50 text-muted-foreground flex flex-col items-center justify-start pt-4 rounded-l-md overflow-y-auto">
                {formattedJson.split("\n").map((_, index) => (
                  <div key={index} className="py-1">
                    {index + 1}
                  </div>
                ))}
              </div>
              <Textarea
                value={formattedJson}
                readOnly
                className="w-full h-[400px] p-4 border border-input rounded-md resize-none"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <Button onClick={formatJson}>Format JSON</Button>
        </div>
      </div>
    </div>
  );
}
