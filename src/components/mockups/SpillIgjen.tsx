"use client";

import { RotateCcw } from "lucide-react";

/** MOCKUP: loads the page again, so the change from drawing to photo plays once more. */
export function SpillIgjen() {
  return (
    <button type="button" onClick={() => window.location.reload()} aria-label="Spill av igjen" className="rounded-full px-2.5 py-1.5">
      <RotateCcw className="size-4" aria-hidden="true" />
    </button>
  );
}
