import { createContext } from "react";

const location = createContext({});
const weatherAPIKey = createContext("73d50daa62ff9ab6a412d4f16d0d6499");
const stateAPIKey = createContext(
  "WGlqcTF3MVg0NWZGNllGWkFmWHpJd1ZWbWtGSGxIVnhBYXFIYTdOdg=="
);

export { location, weatherAPIKey, stateAPIKey };
