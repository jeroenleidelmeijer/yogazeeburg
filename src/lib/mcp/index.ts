import { defineMcp } from "@lovable.dev/mcp-js";
import getStudioInfo from "./tools/get-studio-info";
import suggestClassDirection from "./tools/suggest-class-direction";
import getDirectionsLink from "./tools/get-directions-link";

export default defineMcp({
  name: "yoga-zeeburg-mcp",
  title: "Yoga Zeeburg MCP",
  version: "0.1.0",
  instructions:
    "Tools for Yoga Zeeburg — a down-to-earth yoga studio in Amsterdam East (Zeeburg / Cruquius). Use `get_studio_info` for studio details and the intro pass, `suggest_class_direction` to recommend a type of class based on how someone feels, and `get_directions_link` for a Google Maps directions link.",
  tools: [getStudioInfo, suggestClassDirection, getDirectionsLink],
});
