export const norwegian = {
  generalError: "Noe gikk feil",
  networkError: "Mistet kontakt med serveren",
};
export const english = {
  generalError: "An error has occurred",
  networkError: "Failed to connect to server",
};

export function applicationTexts(language: any, error: string) {
  return language[error];
}
