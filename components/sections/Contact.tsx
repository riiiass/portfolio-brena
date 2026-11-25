"use client";

import { AnimatePresence, m } from "motion/react";
import { useId, useRef, useState } from "react";
import { site } from "@/lib/site";
import { copyEmail, emit } from "@/lib/events";
import { usePrefs } from "@/components/providers/Preferences";
import { RevealLines } from "@/components/motion/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";
import { FolderShape } from "@/components/ui/FolderShape";
import { cn } from "@/lib/cn";

import { getContent, type Content } from "@/content";
import { useLocale } from "@/lib/use-locale";

type Fields = { nome: string; email: string; tipo: string; mensagem: string };
type Errors = Partial<Record<keyof Fields, string>>;

function validate(f: Fields, tx: Content["t"]): Errors {
  const e: Errors = {};
  if (f.nome.trim().length < 2) e.nome = tx.errName;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = tx.errEmail;
  if (!f.tipo) e.tipo = tx.errType;
  if (f.mensagem.trim().length < 10) e.mensagem = tx.errMsg;
  return e;
}

const inputCls =
  "min-h-[52px] w-full rounded-2xl border-[1.5px] border-ink bg-paper px-4 text-[0.9375rem] text-ink placeholder:text-[#5a5a5a] transition-shadow aria-[invalid=true]:border-[#9b1c3a] aria-[invalid=true]:shadow-[0_0_0_3px_rgb(155_28_58/.18)]";

export function Contact() {
  const l = useLocale();
  const tx = getContent(l).t;
  const TYPES = tx.types;
  const { reducedMotion } = usePrefs();
  const [fields, setFields] = useState<Fields>({ nome: "", email: "", tipo: "", mensagem: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const id = useId();

  const set = (k: keyof Fields, v: string) => {
    const next = { ...fields, [k]: v };
    setFields(next);
    // feedback: depois que o campo foi tocado, o erro some assim que fica certo
    if (touched[k]) setErrors(validate(next, tx));
  };
  const blur = (k: keyof Fields) => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(fields, tx));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate(fields, tx);
    setErrors(errs);
    setTouched({ nome: true, email: true, tipo: true, mensagem: true });
    const first = Object.keys(errs)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const body = new URLSearchParams(
        new FormData(e.currentTarget) as unknown as Record<string, string>,
      ).toString();
      // Netlify Forms (runtime Next v5): o POST vai para o HTML estático que declara o formulário
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("error");
      emit("toast", tx.sendFailToast);
    }
  }

  const err = (k: keyof Fields) => (touched[k] ? errors[k] : undefined);

  const tiles: {
    label: string;
    sub: string;
    icon: IconName;
    href?: string;
    download?: boolean;
    onClick?: () => void;
    cls: string;
  }[] = [
    {
      label: tx.email,
      sub: tx.tileEmailSub,
      icon: "copy",
      onClick: () => void copyEmail(site.email),
      cls: "bg-paper text-ink",
    },
    {
      label: "LinkedIn",
      sub: "brena-angelo",
      icon: "linkedin",
      href: site.social.linkedin,
      cls: "bg-ink text-paper",
    },
    {
      label: "GitHub",
      sub: site.githubUser,
      icon: "github",
      href: site.social.github,
      cls: "bg-folder-blue text-ink",
    },
    { label: tx.tileLocation, sub: tx.tileRemote, icon: "pin", cls: "bg-folder-lime text-ink" },
    {
      label: tx.tileCv,
      sub: tx.tileCvSub,
      icon: "download",
      href: l === "en" ? site.cvUrlEn : site.cvUrl,
      download: true,
      cls: "bg-ink text-paper col-span-2 min-h-[110px]",
    },
  ];

  return (
    <section
      id="contato"
      data-bg="paper"
      aria-labelledby="contato-t"
      className="mx-auto max-w-[1240px] px-4 pb-24 md:px-8"
    >
      <div className="on-light bg-folder-pink rounded-[44px] p-6 md:p-12">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div>
            <p className="label-mono mb-4 text-[11px]">{tx.contactLabel}</p>
            <RevealLines
              id="contato-t"
              className="font-display text-step-4 mb-8 leading-[.9] uppercase"
              lines={[
                tx.contactTitle1,
                <>
                  <span className="font-script text-[1.35em] leading-[.6] text-[#6e2238] normal-case">
                    {tx.contactScript}
                  </span>{" "}
                  {tx.contactTitle2}
                </>,
              ]}
            />

            <div className="relative">
              <AnimatePresence mode="wait" initial={false}>
                {status === "sent" ? (
                  <m.div
                    key="ok"
                    role="status"
                    initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex min-h-[420px] flex-col items-center justify-center gap-6 text-center"
                  >
                    {/* deleite: a mensagem vira um papel que entra na pasta e a pasta fecha */}
                    <div className="relative h-40 w-44">
                      <m.span
                        aria-hidden="true"
                        className="bg-paper absolute top-0 left-1/2 z-0 h-24 w-28 -translate-x-1/2 rounded-lg shadow"
                        initial={reducedMotion ? false : { y: -70, rotate: -8 }}
                        animate={{ y: 30, rotate: 0 }}
                        transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: 0.1 }}
                      />
                      <m.div
                        className="absolute inset-x-0 bottom-0 z-10"
                        initial={reducedMotion ? false : { y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      >
                        <FolderShape label="mensagens_05" color="lime" className="w-44" />
                      </m.div>
                    </div>
                    <div>
                      <p className="font-display text-3xl uppercase">{tx.sentTitle}</p>
                      <p className="mt-2 max-w-sm">
                        {tx.sentText(fields.nome.split(" ")[0] ?? "")}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setFields({ nome: "", email: "", tipo: "", mensagem: "" });
                        setTouched({});
                        setErrors({});
                        setStatus("idle");
                      }}
                      className="border-ink min-h-11 rounded-full border-[1.5px] px-5 text-sm font-medium"
                    >
                      {tx.sendAnother}
                    </button>
                  </m.div>
                ) : (
                  <m.form
                    key="form"
                    ref={formRef}
                    name="contato"
                    method="POST"
                    action="/__forms.html"
                    noValidate
                    onSubmit={onSubmit}
                    exit={reducedMotion ? undefined : { opacity: 0, y: 30, scale: 0.95 }}
                    className="flex flex-col gap-5"
                  >
                    <input type="hidden" name="form-name" value="contato" />
                    {/* honeypot: invisível para pessoas, preenchido por robôs */}
                    <p className="sr-only" aria-hidden="true">
                      <label>
                        {tx.honeypot}
                        <input name="empresa-site" tabIndex={-1} autoComplete="off" />
                      </label>
                    </p>

                    <div className="grid gap-5 sm:grid-cols-2">
                      {(["nome", "email"] as const).map((k) => (
                        <div key={k} className="flex flex-col gap-1.5">
                          <label htmlFor={`${id}-${k}`} className="text-sm font-bold">
                            {k === "nome" ? tx.name : tx.email}
                          </label>
                          <input
                            id={`${id}-${k}`}
                            name={k}
                            type={k === "email" ? "email" : "text"}
                            autoComplete={k === "email" ? "email" : "name"}
                            inputMode={k === "email" ? "email" : undefined}
                            required
                            value={fields[k]}
                            onChange={(e) => set(k, e.target.value)}
                            onBlur={() => blur(k)}
                            aria-invalid={Boolean(err(k))}
                            aria-describedby={err(k) ? `${id}-${k}-err` : undefined}
                            placeholder={k === "nome" ? tx.namePh : tx.emailPh}
                            className={inputCls}
                          />
                          {err(k) ? (
                            <p id={`${id}-${k}-err`} className="text-sm font-medium text-[#7a1530]">
                              {err(k)}
                            </p>
                          ) : null}
                        </div>
                      ))}
                    </div>

                    <fieldset aria-describedby={err("tipo") ? `${id}-tipo-err` : undefined}>
                      <legend className="mb-2 text-sm font-bold">{tx.projectType}</legend>
                      <div className="flex flex-wrap gap-2">
                        {TYPES.map((t) => {
                          const on = fields.tipo === t;
                          return (
                            <label
                              key={t}
                              className={cn(
                                "border-ink has-[:focus-visible]:outline-select relative flex min-h-11 cursor-pointer items-center rounded-full border-[1.5px] px-4 text-sm font-medium transition-[background-color,color,transform] duration-150 active:scale-[.97] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4",
                                on ? "bg-ink text-paper" : "hover:bg-ink/10",
                              )}
                            >
                              <input
                                type="radio"
                                name="tipo"
                                value={t}
                                checked={on}
                                onChange={() => {
                                  setTouched((x) => ({ ...x, tipo: true }));
                                  set("tipo", t);
                                }}
                                className="sr-only"
                              />
                              {t}
                            </label>
                          );
                        })}
                      </div>
                      {err("tipo") ? (
                        <p
                          id={`${id}-tipo-err`}
                          className="mt-1.5 text-sm font-medium text-[#7a1530]"
                        >
                          {err("tipo")}
                        </p>
                      ) : null}
                    </fieldset>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor={`${id}-mensagem`} className="text-sm font-bold">
                        {tx.message}
                      </label>
                      <textarea
                        id={`${id}-mensagem`}
                        name="mensagem"
                        rows={5}
                        required
                        value={fields.mensagem}
                        onChange={(e) => set("mensagem", e.target.value)}
                        onBlur={() => blur("mensagem")}
                        aria-invalid={Boolean(err("mensagem"))}
                        aria-describedby={err("mensagem") ? `${id}-mensagem-err` : undefined}
                        placeholder={tx.messagePh}
                        className={cn(inputCls, "min-h-[140px] resize-y py-3.5")}
                      />
                      {err("mensagem") ? (
                        <p id={`${id}-mensagem-err`} className="text-sm font-medium text-[#7a1530]">
                          {err("mensagem")}
                        </p>
                      ) : null}
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        data-cursor={tx.sendCursor}
                        className="bg-ink font-display text-paper inline-flex min-h-[54px] items-center gap-2 rounded-full px-7 text-xl tracking-[.06em] transition-transform active:scale-[.97] disabled:opacity-70"
                      >
                        {status === "sending" ? tx.sending : tx.send}
                        <Icon name="arrowUpRight" size={20} strokeWidth={2} />
                      </button>
                      {status === "error" ? (
                        <p role="alert" className="text-sm font-medium text-[#7a1530]">
                          {tx.sendFail}{" "}
                          <button
                            type="button"
                            onClick={() => void copyEmail(site.email)}
                            className="underline"
                          >
                            {tx.copyMyEmail}
                          </button>
                        </p>
                      ) : null}
                    </div>
                  </m.form>
                )}
              </AnimatePresence>
            </div>
          </div>

          <ul className="grid grid-cols-2 content-end gap-3">
            {tiles.map((t) => {
              const inner = (
                <>
                  <Icon name={t.icon} size={28} />
                  <span>
                    <strong className="block text-[1.0625rem]">{t.label}</strong>
                    <span className="text-sm opacity-80">{t.sub}</span>
                  </span>
                </>
              );
              const cls = cn(
                "flex min-h-[160px] w-full flex-col justify-between rounded-[28px] p-5 text-left transition-transform duration-300 hover:-translate-y-1 active:scale-[.97]",
                t.cls,
              );
              return (
                <li key={t.label} className={t.download ? "col-span-2" : undefined}>
                  {t.href ? (
                    <a
                      href={t.href}
                      target={t.download ? undefined : "_blank"}
                      rel="noreferrer"
                      download={t.download || undefined}
                      className={cls}
                      data-cursor={t.download ? "pdf" : "abrir"}
                    >
                      {inner}
                      {t.download ? null : <span className="sr-only">{tx.newTab}</span>}
                    </a>
                  ) : t.onClick ? (
                    <button type="button" onClick={t.onClick} className={cls} data-cursor="copiar">
                      {inner}
                      <span className="sr-only">: {site.email}</span>
                    </button>
                  ) : (
                    <div className={cls}>{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
