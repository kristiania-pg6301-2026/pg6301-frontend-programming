interface ApplicationTexts {
  generalError: string;
  networkError: string;
  userError: string;
  invalidEmail: (emailAddress?: string) => string;
}

export const norwegian: ApplicationTexts = {
  invalidEmail: (emailAddress) => `adressen "${emailAddress}" er ugyldig`,
  networkError: "Mistet kontakt med serveren",
  generalError: "En feil har inntruffet",
  userError: "Feil i brukerinput",
};
export const english: ApplicationTexts = {
  invalidEmail: (emailAddress) =>
    `the email address "${emailAddress}" is invalid`,
  networkError: "Cannot communicate with the server",
  generalError: "Something went wrong",
  userError: "Invalid input",
};

type ErrorCodeParam = { code: keyof ApplicationTexts; emailAddress?: string };

export function showText(
  errorCode: ErrorCodeParam,
  language: ApplicationTexts,
) {
  if (errorCode.code === "invalidEmail") {
    return language.invalidEmail(errorCode.emailAddress);
  }
  return language[errorCode.code];
}
