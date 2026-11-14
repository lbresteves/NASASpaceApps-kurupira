// Keeps style-only props (color, padding, variant...) from being written to the HTML element.
export const omitProps =
  (...names: string[]) =>
  (prop: string) =>
    !names.includes(prop);
