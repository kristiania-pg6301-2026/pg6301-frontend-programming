interface ApplicationTexts {
  generalError: string;
  networkError: string;
  userError: string;
}

export const norwegian = {
  networkError: "Mistet kontakt med serveren",
  generalError: "En feil har inntruffet",
  userError: "Feil i brukerinput",
};
export const english = {
  networkError: "Cannot communicate with the server",
  generalError: "Something went wrong",
  userError: "Invalid input",
};

export function showText(
  errorCode: keyof ApplicationTexts,
  language: ApplicationTexts,
) {
  return language[errorCode];
}
