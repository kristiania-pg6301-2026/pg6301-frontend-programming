export const norwegian = {};
export const english = {};

export function applicationTexts(language: any, error: string) {
  if (language === english) return "An error has occurred";
  return "Noe gikk feil";
}
