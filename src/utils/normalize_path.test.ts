import { expect, test } from "vitest";

import { normalize_path } from "./index.ts";

test("normalize_path returns root if only root path", () => {
  expect(normalize_path("/")).toBe("/");
});

test("normalize_path removes trailing slash", () => {
  expect(normalize_path("/base/")).toBe("/base");
});

test("normalize_path returns original because there was no trailing slash", () => {
  expect(normalize_path("/base")).toBe("/base");
});
