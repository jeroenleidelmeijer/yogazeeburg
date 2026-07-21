import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "get_studio_info",
  title: "Get studio info",
  description:
    "Return core information about Yoga Zeeburg: name, address, neighbourhood, positioning, and intro pass details.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      name: "Yoga Zeeburg",
      tagline: "Down-to-earth yoga in Amsterdam East",
      address: {
        street: "Cruquiusweg 96F",
        postalCode: "1019 AH",
        city: "Amsterdam",
        country: "NL",
      },
      neighbourhoods: [
        "Amsterdam East",
        "Zeeburg",
        "Cruquius",
        "Eastern Docklands",
      ],
      location_notes: "Above CrossFit Zeeburg, by the water.",
      positioning:
        "A small, personal, beginner-friendly studio for busy people who need a weekly reset — not another class on their schedule.",
      intro_pass: {
        name: "14-Day Unlimited Intro Pass",
        description:
          "14 days of unlimited yoga. Try different classes, teachers and times. Stops automatically. New students only.",
        signup_url: "https://crossfitzeeburg.sportbitapp.nl/web/nl/registreren/lidmaatschap?r=42",
      },
      website: "https://yogazeeburg.com",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
