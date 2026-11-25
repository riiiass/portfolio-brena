"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { CaseMeta } from "@/content/pt/cases";
import { getContent } from "@/content";
import { useLocale } from "@/lib/use-locale";

type Img = CaseMeta["gallery"][number];

/** Grade 3×3 com lightbox (<dialog> nativo: foco preso e Esc de graça). Setas navegam. */
export function Gallery({ images, placeholders = 0 }: { images: Img[]; placeholders?: number }) {
  const t = getContent(useLocale()).t;
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const current = images[index];

  const open = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
  };
  const step = (d: number) => setIndex((i) => (i + d + images.length) % images.length);

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {images.map((img, i) => (
          <li key={img.src}>
            <button
              type="button"
              onClick={() => open(i)}
              data-cursor={t.enlargeCursor}
              className="group bg-surface relative block aspect-[4/3] w-full overflow-hidden rounded-[20px]"
              aria-label={`${t.enlarge}: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
            </button>
          </li>
        ))}
        {Array.from({ length: placeholders }).map((_, i) => (
          <li
            key={`ph-${i}`}
            className="border-line text-muted flex aspect-[4/3] items-center justify-center rounded-[20px] border-[1.5px] border-dashed font-mono text-[10px] tracking-[.12em] uppercase"
          >
            {t.todoPrint}
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label={t.enlarged}
        className="backdrop:bg-ink/80 m-auto max-h-[92vh] w-[min(1100px,94vw)] overflow-visible bg-transparent p-0 backdrop:backdrop-blur-sm"
        onKeyDown={(e) => {
          if (images.length < 2) return;
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        {current ? (
          <figure className="bg-surface relative overflow-hidden rounded-[24px]">
            <Image
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="94vw"
              className="h-auto max-h-[80vh] w-full object-contain"
            />
            <figcaption className="text-muted px-5 py-3 text-sm">{current.alt}</figcaption>
            <button
              type="button"
              autoFocus
              onClick={() => dialog.current?.close()}
              aria-label={t.close}
              className="bg-fg text-bg absolute top-3 right-3 flex size-11 items-center justify-center rounded-full"
            >
              <Icon name="close" size={18} />
            </button>
            {images.length > 1 ? (
              <div className="absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label={t.prev}
                  className="bg-fg text-bg flex size-11 rotate-180 items-center justify-center rounded-full"
                >
                  <Icon name="arrowUpRight" size={18} className="rotate-45" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label={t.next}
                  className="bg-fg text-bg flex size-11 items-center justify-center rounded-full"
                >
                  <Icon name="arrowUpRight" size={18} className="rotate-45" />
                </button>
              </div>
            ) : null}
          </figure>
        ) : null}
      </dialog>
    </>
  );
}
