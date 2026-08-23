interface ApplicationTexts {
  invalidWeekday: (arg: { day: string }) => string;
  generalError: string;
  networkError: string;
  userError: string;
}

export const norwegian: ApplicationTexts = {
  generalError: "Noe gikk feil",
  networkError: "Mistet kontakt med serveren",
  userError: "Feil i input",
  invalidWeekday: ({ day }) => `Verdien "${day}" er ikke en gyldig ukedag`,
};
export const english: ApplicationTexts = {
  generalError: "An error has occurred",
  networkError: "Failed to connect to server",
  userError: "Malformed input",
  invalidWeekday: ({ day }) => `"${day}" is not a valid weekday`,
};

export function applicationTexts(
  language: ApplicationTexts,
  error:
    | { code: "invalidWeekday"; day: string }
    | { code: Exclude<keyof ApplicationTexts, "invalidWeekday"> },
) {
  if (error.code === "invalidWeekday") {
    return language.invalidWeekday(error);
  }
  return language[error.code];
}
