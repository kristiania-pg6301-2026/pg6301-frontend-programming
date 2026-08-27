interface ApplicationTexts {
  generalError: string;
  networkError: string;
  userError: string;
  invalidEmail: (emailAddress?: string) => string;
  invalidEmailDomain: (
    emailAddress?: string,
    validDomains?: string[],
  ) => string;
}

export const norwegian: ApplicationTexts = {
  invalidEmail: (emailAddress) => `adressen "${emailAddress}" er ugyldig`,
  invalidEmailDomain: (emailAddress, validDomains) =>
    `adressen "${emailAddress}" må være i et av disse domenene: ${validDomains!.join(", ")}`,
  networkError: "Mistet kontakt med serveren",
  generalError: "En feil har inntruffet",
  userError: "Feil i brukerinput",
};
export const english: ApplicationTexts = {
  invalidEmail: (emailAddress) =>
    `the email address "${emailAddress}" is invalid`,
  invalidEmailDomain: (emailAddress, validDomains) =>
    `the email address "${emailAddress}" should be in the domains: ${validDomains!.join(", ")}`,
  networkError: "Cannot communicate with the server",
  generalError: "Something went wrong",
  userError: "Invalid input",
};

type ErrorCodeParam = {
  code: keyof ApplicationTexts;
  emailAddress?: string;
  validDomains?: string[];
};

export function showText(
  errorCode: ErrorCodeParam,
  language: ApplicationTexts,
) {
  if (errorCode.code === "invalidEmail") {
    return language.invalidEmail(errorCode.emailAddress);
  }
  if (errorCode.code === "invalidEmailDomain") {
    return language.invalidEmailDomain(
      errorCode.emailAddress,
      errorCode.validDomains,
    );
  }
  return language[errorCode.code];
}
