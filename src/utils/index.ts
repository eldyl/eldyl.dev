// Formats a Date into a string with format like: 'July 4, 2025'
export function format_date(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

// Returns the the base path of a path string that will return only '/' if it is
// the root, or the first name of the path only if the path is not the root.
//
// '/' returns '/'
// '/base' returns 'base'
// '/base/z' returns 'base'
export function base_path(path: string): string {
  if (path === "/") {
    return path;
  }
  return path.split("/")[1];
}

// Returns a path without a trailing slash
export function normalize_path(path: string): string {
  if (path.endsWith("/")) {
    if (path.length === 1) {
      return path;
    }
    return path.slice(0, -1);
  }
  return path;
}

// Appends a string to a given title that provides additional information.
// If the total length of the title with the appended attribute is over the
// max_title_length, then the title will be trimmed to fit with ellipses (...)
// denoting that the title was trimmed.
export function validate_page_title(
  title: string,
  suffix: string,
  max_title_length: number,
): string {
  if (suffix.length > max_title_length) {
    throw new Error("suffix is longer than available max_title_length");
  }

  if (!title) {
    return suffix;
  }

  const ellipses = "...";
  const hyphen_suffix = ` - ${suffix}`;
  const available_chars_left =
    max_title_length - title.length - hyphen_suffix.length;

  if (available_chars_left >= 0) {
    return `${title}${hyphen_suffix}`;
  }

  return `${title.slice(0, title.length + available_chars_left - ellipses.length)}${ellipses}${hyphen_suffix}`;
}
