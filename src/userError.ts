export class UserError implements Error {
  constructor(param: { error: string }) {
    this.message = param.error;
    this.name = "UserError";
  }

  message: string;
  name: string;
}
