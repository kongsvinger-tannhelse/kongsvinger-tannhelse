import type { CSSProperties } from "react";
import tegnet from "./tegnet.webp";

/**
 * What stands in the drawing's place until it has come: its own miniature
 * (8 × 5 px, some 250 bytes, made by Next from the file), carried in the HTML
 * and stretched by the browser into a soft blur of its colours. A plain
 * background, not next/image's `placeholder="blur"`: that is an SVG blur
 * filter the browser redraws on the main thread, and it held a phone's
 * processor for up to a second while the drawing moved.
 */
export const FORVARSEL: CSSProperties = { backgroundImage: `url(${tegnet.blurDataURL})`, backgroundSize: "cover", backgroundPosition: "center" };
