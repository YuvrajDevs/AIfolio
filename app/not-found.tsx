import { ButtonLink, CursorTag, PageShell, SelectionFrame } from "@/components/ui-bits";

export default function NotFound() {
  return (
    <PageShell className="flex flex-col items-center py-20 text-center md:py-28">
      <p className="eyebrow mb-8 text-white/70">Error 404</p>
      <div className="relative">
        <SelectionFrame size="0 × 0">
          <p className="text-7xl font-black uppercase leading-none tracking-tight md:text-9xl">Lost</p>
        </SelectionFrame>
        <CursorTag name="You?" className="absolute -bottom-14 -right-10" />
      </div>
      <p className="mb-8 mt-16 text-white/80">That frame doesn&apos;t exist, or it moved.</p>
      <ButtonLink href="/">Back home</ButtonLink>
    </PageShell>
  );
}
