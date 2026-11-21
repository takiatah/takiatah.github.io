import { Film } from 'lucide-react'
import type { MediaAsset } from '@/lib/projects'

export function MediaSlot({
  media,
  accentVar,
}: {
  media: MediaAsset
  accentVar: string
}) {
  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-card">
      <div
        className="relative w-full bg-black/40"
        style={{
          aspectRatio: `${media.width} / ${media.height}`,
        }}
      >
        {media.available ? (
          media.kind === 'video' ? (
            <video
              src={media.src}
              poster={media.poster}
              controls
              playsInline
              preload="metadata"
              aria-label={media.alt}
              className="absolute inset-0 size-full object-contain"
            >
              Your browser does not support video playback.
            </video>
          ) : (
            // GIFs are served unoptimized so animation is preserved.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={media.src}
              alt={media.alt}
              width={media.width}
              height={media.height}
              className="absolute inset-0 size-full object-contain"
            />
          )
        ) : (
          <div className="starfield absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
            <span
              className="flex size-12 items-center justify-center rounded-full border border-dashed"
              style={{
                borderColor: `var(${accentVar})`,
                color: `var(${accentVar})`,
              }}
            >
              <Film className="size-5" aria-hidden="true" />
            </span>

            <p className="font-heading text-sm font-medium">
              Gameplay recording coming soon
            </p>

            <p className="max-w-xs text-xs text-muted-foreground">
              {`The demo ${media.kind === 'video' ? 'video' : media.kind === 'gif' ? 'GIF' : 'image'} will appear here once it is added at `}
              <code className="rounded bg-secondary px-1 py-0.5">
                {media.src}
              </code>.
            </p>
          </div>
        )}
      </div>

      <figcaption className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
        {media.caption}
      </figcaption>
    </figure>
  )
}
