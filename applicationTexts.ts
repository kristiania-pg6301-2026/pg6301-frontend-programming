interface ApplicationTexts {
  invalidWeekday(arg: { day: string }): string;
  invalidEmailDomain(arg: {
    emailAddress: string;
    validDomains: readonly string[];
  }): string;
  generalError: string;
  networkError: string;
  userError: string;
}

export const norwegian: ApplicationTexts = {
  generalError: "Noe gikk feil",
  networkError: "Mistet kontakt med serveren",
  userError: "Feil i input",
  invalidEmailDomain: ({ emailAddress, validDomains }) =>
    `Adressen "${emailAddress}" må være i et av domenene ${validDomains.join(", ")}`,
  invalidWeekday: ({ day }) => `Verdien "${day}" er ikke en gyldig ukedag`,
};
export const english: ApplicationTexts = {
  generalError: "An error has occurred",
  networkError: "Failed to connect to server",
  userError: "Malformed input",
  invalidEmailDomain: ({ emailAddress, validDomains }) =>
    `The email "${emailAddress}" should be in one of these domains: ${validDomains.join(", ")}`,
  invalidWeekday: ({ day }) => `"${day}" is not a valid weekday`,
};

export function applicationTexts(
  language: ApplicationTexts,
  error:
    | { code: "invalidWeekday"; day: string }
    | {
        code: "invalidEmailDomain";
        emailAddress: string;
        validDomains: readonly string[];
      }
    | {
        code: Exclude<
          keyof ApplicationTexts,
          "invalidWeekday" | "invalidEmailDomain"
        >;
      },
) {
  if (error.code === "invalidWeekday") {
    return language.invalidWeekday(error);
  }
  if (error.code === "invalidEmailDomain") {
    return language.invalidEmailDomain(error);
  }
  return language[error.code];
}
