import { expect, test } from "vitest";

import { MAX_TITLE_LENGTH } from "../constants/index.ts";
import { validate_page_title } from "./index.ts";

function generate_string_of_char_with_length(
  char: string,
  length: number,
): string {
  return Array.from({ length }, () => char).join("");
}

test("generate_string_of_char_with_length helper creates string of correct length", () => {
  const title = generate_string_of_char_with_length("X", 65);
  expect(title.length).toBe(65);

  const title2 = generate_string_of_char_with_length("X", 1001);
  expect(title2.length).toBe(1001);
});

test("generate_string_of_char_with_length helper creates empty string when length passed is less than or equal to 0", () => {
  const title = generate_string_of_char_with_length("X", -65);
  expect(title.length).toBe(0);
  expect(title).toBe("");

  const title2 = generate_string_of_char_with_length("X", -1001);
  expect(title2.length).toBe(0);
  expect(title2).toBe("");

  const title3 = generate_string_of_char_with_length("X", -1);
  expect(title3.length).toBe(0);
  expect(title3).toBe("");
});

test("generate_string_of_char_with_length helper creates string of correct characters and length", () => {
  const title = generate_string_of_char_with_length("Y", 7);
  expect(title.length).toBe(7);
  const valid_test_string = "YYYYYYY";
  expect(title).toBe(valid_test_string);
});

test("validate_page_title gets correct final string length with original title over 60 chars", () => {
  const title = generate_string_of_char_with_length("X", 65);
  const suffix = "Taco";

  const validated_title = validate_page_title(title, suffix, MAX_TITLE_LENGTH);
  expect(validated_title.length).toBe(MAX_TITLE_LENGTH);
});

test("validate_page_title gets correct final string length with original title of 59 chars", () => {
  const title = generate_string_of_char_with_length("X", 59);
  const suffix = "Taco";

  const validated_title = validate_page_title(title, suffix, MAX_TITLE_LENGTH);
  expect(validated_title.length).toBe(MAX_TITLE_LENGTH);
});

test("validate_page_title gets correct final string with title over 60 chars", () => {
  const title = generate_string_of_char_with_length("X", 65);
  const suffix = "Taco";
  const ellipses_with_suffix_added = `... - ${suffix}`;

  const validated_title = validate_page_title(title, suffix, MAX_TITLE_LENGTH);
  expect(validated_title.length).toBe(MAX_TITLE_LENGTH);

  const num_chars_over_max = title.length - MAX_TITLE_LENGTH;
  const num_chars_remaining_from_original_title =
    title.length - num_chars_over_max - ellipses_with_suffix_added.length;

  const remaining_title_chars = generate_string_of_char_with_length(
    "X",
    num_chars_remaining_from_original_title,
  );

  const correct_test_string = `${remaining_title_chars}${ellipses_with_suffix_added}`;
  expect(correct_test_string.length).toBe(MAX_TITLE_LENGTH);

  expect(validated_title).toBe(correct_test_string);
});

test("validate_page_title gets correct final string with original title of 59 chars", () => {
  const title = generate_string_of_char_with_length("X", 59);
  const suffix = "Taco";
  const ellipses_with_suffix_added = `... - ${suffix}`;

  const validated_title = validate_page_title(title, suffix, MAX_TITLE_LENGTH);
  expect(validated_title.length).toBe(MAX_TITLE_LENGTH);

  const num_chars_over_max = title.length - MAX_TITLE_LENGTH;
  const num_chars_remaining_from_original_title =
    title.length - num_chars_over_max - ellipses_with_suffix_added.length;

  const remaining_title_chars = generate_string_of_char_with_length(
    "X",
    num_chars_remaining_from_original_title,
  );

  const correct_test_string = `${remaining_title_chars}${ellipses_with_suffix_added}`;
  expect(correct_test_string.length).toBe(MAX_TITLE_LENGTH);

  expect(validated_title).toBe(correct_test_string);
});

test("validate_page_title called with empty title returns suffix", () => {
  const title = generate_string_of_char_with_length("X", 0);
  const suffix = "Taco";

  const validated_title = validate_page_title(title, suffix, MAX_TITLE_LENGTH);
  expect(validated_title.length).toBe(suffix.length);

  expect(suffix.length).toBe(suffix.length);

  expect(validated_title).toBe(suffix);
});

test("validate_page_title throws when suffix is over max_title_length", () => {
  const title = generate_string_of_char_with_length("X", 5);
  const suffix = generate_string_of_char_with_length("X", 61);

  expect(() =>
    validate_page_title(title, suffix, MAX_TITLE_LENGTH),
  ).toThrowError("suffix");
});

test("validate_page_title correct return on happy path", () => {
  const title = "New";
  const suffix = "Site";

  const correct_test_string = "New - Site";
  const validated_title = validate_page_title(title, suffix, MAX_TITLE_LENGTH);
  expect(validated_title).toBe(correct_test_string);
});
