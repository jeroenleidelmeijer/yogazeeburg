import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "get_directions_link",
  title: "Get directions to studio",
  description:
    "Return a Google Maps directions link to Yoga Zeeburg (Cruquiusweg 96F, Amsterdam), optionally from a given starting address.",
  inputSchema: {
    from: z
      .string()
      .optional()
      .describe("Optional starting address or place name."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true },
  handler: ({ from }) => {
    const destination = "Cruquiusweg+96F+Amsterdam";
    const base = "https://www.google.com/maps/dir/?api=1";
    const url = from
      ? `${base}&origin=${encodeURIComponent(from)}&destination=${destination}`
      : `${base}&destination=${destination}`;
    const result = {
      destination: "Yoga Zeeburg, Cruquiusweg 96F, 1019 AH Amsterdam",
      directions_url: url,
    };
    return {
      content: [{ type: "text", text: url }],
      structuredContent: result,
    };
  },
});
