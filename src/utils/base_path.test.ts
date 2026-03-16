import { expect, test } from "vitest";

import { base_path } from "./index.ts";

test("base_path properly parses root path only", () => {
  expect(base_path("/")).toBe("/");
});

test("base_path properly parses base_path, only one level", () => {
  expect(base_path("/base")).toBe("base");
});

test("base_path properly parses base_path, two levels", () => {
  expect(base_path("/base/z")).toBe("base");
});
