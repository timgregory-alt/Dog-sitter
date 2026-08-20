import { hasEditSession } from "@/lib/session";
import { PasscodeForm } from "@/components/PasscodeForm";

export default async function EditLayout({ children }: { children: React.ReactNode }) {
  if (!(await hasEditSession())) return <PasscodeForm />;
  return <>{children}</>;
}
