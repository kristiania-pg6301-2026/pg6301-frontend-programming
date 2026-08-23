interface ApplicationTexts {
  generalError: string;
  networkError: string;
}

export const norwegian: ApplicationTexts = {
  generalError: "Noe gikk feil",
  networkError: "Mistet kontakt med serveren",
};
export const english: ApplicationTexts = {
  generalError: "An error has occurred",
  networkError: "Failed to connect to server",
};

export function applicationTexts(
  language: ApplicationTexts,
  error: keyof ApplicationTexts,
) {
  return language[error];
}
