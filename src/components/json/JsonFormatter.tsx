"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import CodePlayground from "../playground";

const initialJson = `{
  "greeting": "Welcome to HappyFormatter!",
  "instructions": [
    "Type or paste JSON here",
    "Or choose a sample above",
    "HappyFormatter will format your code"
  ]
}`;

export function JsonFormatter() {
  const [jsonInput, setJsonInput] = useState<string>(initialJson);
  const [formattedJson, setFormattedJson] = useState<string>("");

  const formatJson = () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      setFormattedJson(JSON.stringify(parsedJson, null, 2));
    } catch (error) {
      setFormattedJson("Invalid JSON format");
    }
  };

  useEffect(() => {
    formatJson();
  }, [jsonInput]);

  useEffect(() => {
    console.log("formattedJson", formattedJson);
  }, [formatJson]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <div className="w-full max-w-6xl bg-card p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          <div className="relative">
            <CodePlayground
              initialJson={jsonInput}
              onJsonChange={(newJson) => setJsonInput(newJson)}
            />
          </div>
          <div className="relative">
            <CodePlayground
              initialJson={formattedJson}
              readOnly
            />
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <Button onClick={formatJson}>Format JSON</Button>
        </div>
      </div>
    </div>
  );
}
