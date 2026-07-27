import type { ErrorCategory } from "./schemas";

export class PipelineError extends Error {
  category: ErrorCategory;
  retryable: boolean;
  step: string;
  details?: unknown;
  constructor(opts: {
    category: ErrorCategory;
    step: string;
    message: string;
    retryable?: boolean;
    details?: unknown;
  }) {
    super(opts.message);
    this.name = "PipelineError";
    this.category = opts.category;
    this.step = opts.step;
    // configuration_error and content_safety_error are non-retryable by default.
    this.retryable =
      opts.retryable ??
      (opts.category !== "configuration_error" && opts.category !== "content_safety_error");
    this.details = opts.details;
  }
}

export const MAX_RETRIES_PER_STEP = 3;
