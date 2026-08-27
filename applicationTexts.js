const norwegian = {};
const english = {};

function showText(errorCode, language) {
  if (language === norwegian) {
    if (errorCode === "networkError") return "Mistet kontakt med serveren";
    if (errorCode === "generalError") return "En feil har inntruffet";
    if (errorCode === "userError") return "Feil i brukerinput";
  }
  if (errorCode === "networkError") return "Cannot communicate with the server";
  if (errorCode === "generalError") return "Something went wrong";
  if (errorCode === "userError") return "Invalid input";
}
