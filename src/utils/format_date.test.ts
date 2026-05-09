import { expect, test } from "vitest";

import { format_date } from "@/utils";

test("format_date correctly formats date string", () => {
  expect(format_date(new Date("2025-06-25"))).toBe("June 25, 2025");
});
