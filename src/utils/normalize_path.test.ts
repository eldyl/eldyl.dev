import { expect, test } from "vitest";

import { normalize_path } from "@/utils";

test("normalize_path returns root if only root path", () => {
  expect(normalize_path("/")).toBe("/");
});

test("normalize_path keeps existing trailing slash", () => {
  expect(normalize_path("/base/")).toBe("/base/");
});

test("normalize_path adds a trailing slash when missing", () => {
  expect(normalize_path("/base")).toBe("/base/");
});
