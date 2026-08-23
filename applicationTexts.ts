export const norwegian = {};
export const english = {};

export function applicationTexts(language: any, error: string) {
  if (error === "networkError") {
    if (language === english) return "Failed to connect to server";
    return "Mistet kontakt med serveren";
  }
  if (language === english) return "An error has occurred";
  return "Noe gikk feil";
}
