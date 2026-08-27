interface ApplicationTexts {
  generalError: string;
  networkError: string;
  userError: string;
  invalidEmail: string;
}

export const norwegian: ApplicationTexts = {
  invalidEmail: 'adressen "hei-at-verden.no" er ugyldig',
  networkError: "Mistet kontakt med serveren",
  generalError: "En feil har inntruffet",
  userError: "Feil i brukerinput",
};
export const english: ApplicationTexts = {
  invalidEmail: 'the email address "hei-at-verden.no" is invalid',
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
