const isDev = import.meta.env.DEV;

export const logger = {
  error: (...args) => { if (isDev) console.error(...args); },
};
