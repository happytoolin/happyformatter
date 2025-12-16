interface KeyboardShortcutsHelpProps {
  className?: string;
}

export default function KeyboardShortcutsHelp({ className = "" }: KeyboardShortcutsHelpProps) {
  return (
    <div className={`text-xs ${className}`} role="region" aria-label="Keyboard shortcuts">
      <h3 className="font-mono font-bold uppercase mb-2">Keyboard Shortcuts:</h3>
      <ul className="space-y-1 font-mono">
        <li>
          <kbd className="px-1 py-0.5 bg-muted border border-foreground rounded text-xs">Ctrl+Shift+F</kbd>{" "}
          → Format code
        </li>
        <li>
          <kbd className="px-1 py-0.5 bg-muted border border-foreground rounded text-xs">Ctrl+Shift+M</kbd>{" "}
          → Minify code
        </li>
        <li>
          <kbd className="px-1 py-0.5 bg-muted border border-foreground rounded text-xs">Esc</kbd> → Close mobile menu
        </li>
      </ul>
    </div>
  );
}
