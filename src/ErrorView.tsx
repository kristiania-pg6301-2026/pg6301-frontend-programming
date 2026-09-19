import { UserError } from "./userError.js";

export default function ErrorView({ error }: { error?: Error }) {
  if (!error) return null;
  if (error instanceof UserError) {
    return <div className={"userError"}>{error.message}</div>;
  }
  return <div className={"error"}>{error.toString()}</div>;
}
