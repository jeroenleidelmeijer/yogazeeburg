import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const DIRECTIONS = [
  {
    q: "Need to slow down?",
    a: "Gentle, grounding classes to unwind and downshift after work.",
  },
  {
    q: "Want to move?",
    a: "Stronger, flowing classes to build energy, focus and a bit of healthy sweat.",
  },
  {
    q: "Feeling stiff?",
    a: "Targeted mobility and release for tight hips, shoulders and lower back.",
  },
  {
    q: "New to yoga?",
    a: "Beginner-friendly classes with clear guidance — a soft place to begin.",
  },
];

export default defineTool({
  name: "suggest_class_direction",
  title: "Suggest a class direction",
  description:
    "Suggest which type of Yoga Zeeburg class fits how someone feels today (slow down, move, stiff, new to yoga). Does not return real class names or a live schedule.",
  inputSchema: {
    mood: z
      .string()
      .describe(
        "Free-text description of how the person feels, what they want, or their experience level.",
      ),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ mood }) => {
    const m = mood.toLowerCase();
    let pick = DIRECTIONS[3]!;
    if (/(stress|tired|calm|slow|sleep|anx|overwhelm|reset|unwind|relax)/.test(m)) {
      pick = DIRECTIONS[0]!;
    } else if (/(energy|strong|sweat|flow|power|move|active|workout)/.test(m)) {
      pick = DIRECTIONS[1]!;
    } else if (/(stiff|tight|sore|pain|mobility|hip|shoulder|back|desk)/.test(m)) {
      pick = DIRECTIONS[2]!;
    } else if (/(begin|new|first|never|start)/.test(m)) {
      pick = DIRECTIONS[3]!;
    }
    const result = {
      direction: pick.q,
      suggestion: pick.a,
      next_step:
        "Start with the 14-Day Unlimited Intro Pass and try a few different classes.",
      signup_url: "https://trial.yogazeeburg.com/",
    };
    return {
      content: [
        {
          type: "text",
          text: `${pick.q} — ${pick.a}`,
        },
      ],
      structuredContent: result,
    };
  },
});
