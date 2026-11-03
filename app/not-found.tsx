import { ButtonLink, Hand, PageShell } from "@/components/ui-bits";

export default function NotFound() {
  return (
    <PageShell className="text-center">
      <p className="font-pixel text-9xl font-bold">404</p>
      <Hand className="mb-8">that page wandered off.</Hand>
      <ButtonLink href="/">Back home</ButtonLink>
    </PageShell>
  );
}
