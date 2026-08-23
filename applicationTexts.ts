interface ApplicationTexts {
  generalError: string;
  networkError: string;
  userError: string;
}

export const norwegian: ApplicationTexts = {
  generalError: "Noe gikk feil",
  networkError: "Mistet kontakt med serveren",
  userError: "Feil i input",
};
export const english: ApplicationTexts = {
  generalError: "An error has occurred",
  networkError: "Failed to connect to server",
  userError: "Malformed input",
};

export function applicationTexts(
  language: ApplicationTexts,
  error: keyof ApplicationTexts,
) {
  return language[error];
}
