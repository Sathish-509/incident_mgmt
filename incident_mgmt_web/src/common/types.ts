export type EnumLiteralsOf<T extends object> = T[keyof T];

export type ErrorPayload = {
  error: string;
};

export type Dictionary<T> = {
  [key: string]: T;
};
