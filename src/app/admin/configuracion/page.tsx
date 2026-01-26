import { ConfigurationForm } from "@/modules/admin/configuration/components/configuration-form";
import { getProfileAction } from "@/modules/admin/configuration/actions/settings.actions";

export default async function ConfigurationPage() {
  const result = await getProfileAction();
  return (
    <ConfigurationForm
      profile={result.success ? (result.data ?? null) : null}
    />
  );
}
