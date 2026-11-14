export const omitProps =
  (...names: string[]) =>
  (prop: string) =>
    !names.includes(prop);
