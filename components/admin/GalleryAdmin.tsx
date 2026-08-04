"use client";

import type { FormEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";
import type { GalleryItem } from "@/types/gallery";

type FormState = {
  title: string;
  caption: string;
  imageType: "single" | "comparison";
  sortOrder: string;
  published: boolean;
  singleFile: File | null;
  beforeFile: File | null;
  afterFile: File | null;
};

const emptyForm: FormState = {
  title: "",
  caption: "",
  imageType: "comparison",
  sortOrder: "0",
  published: true,
  singleFile: null,
  beforeFile: null,
  afterFile: null,
};

const inputClass =
  "mt-2 w-full rounded-xl border border-brand-olive/40 bg-brand-dark px-4 py-3 text-brand-cream outline-none transition placeholder:text-brand-muted/60 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30";

const MAX_PUBLISHED_ITEMS = 5;

function getAdminStoragePath(url: string | null) {
  if (!url) return null;
  const marker = "/storage/v1/object/public/other_sites/";
  const markerIndex = url.indexOf(marker);
  if (markerIndex === -1) return null;
  const path = decodeURIComponent(url.slice(markerIndex + marker.length));
  return path.startsWith("FoxRunForestry/admin-gallery/") ? path : null;
}

function validateImage(file: File) {
  if (!file.type.startsWith("image/")) {
    throw new Error(`${file.name} is not an image file.`);
  }
  if (file.size > 10 * 1024 * 1024) {
    throw new Error(`${file.name} is larger than 10 MB.`);
  }
}

async function uploadImage(file: File) {
  validateImage(file);
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `FoxRunForestry/admin-gallery/${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage
    .from("other_sites")
    .upload(path, file, { cacheControl: "3600", upsert: false });

  if (error) throw error;
  return supabase.storage.from("other_sites").getPublicUrl(path).data.publicUrl;
}

async function removeAdminImages(urls: Array<string | null>) {
  const paths = urls
    .map(getAdminStoragePath)
    .filter((path): path is string => Boolean(path));
  if (paths.length) {
    await supabase.storage.from("other_sites").remove(paths);
  }
}

export function GalleryAdmin() {
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const publishedCount = items.filter((item) => item.published).length;

  const loadItems = useCallback(async () => {
    setError("");
    const { data, error: loadError } = await supabase
      .from("FoxRunForestry")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (loadError) {
      setError(
        loadError.code === "42501"
          ? "This account does not have gallery admin access."
          : loadError.message,
      );
      return;
    }
    setItems((data ?? []) as GalleryItem[]);
  }, []);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthLoading(false);
      if (data.session) void loadItems();
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setAuthLoading(false);
      if (nextSession) void loadItems();
    });

    return () => listener.subscription.unsubscribe();
  }, [loadItems]);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (signInError) setError("Invalid email or password.");
    setBusy(false);
  }

  async function signOut() {
    await supabase.auth.signOut();
    setItems([]);
    setEditing(null);
    setForm(emptyForm);
  }

  function startEdit(item: GalleryItem) {
    setEditing(item);
    setForm({
      title: item.title,
      caption: item.caption,
      imageType: item.image_type,
      sortOrder: String(item.sort_order),
      published: item.published,
      singleFile: null,
      beforeFile: null,
      afterFile: null,
    });
    setMessage("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditing(null);
    setForm(emptyForm);
    setMessage("");
    setError("");
  }

  async function saveItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");

    const uploadedUrls: string[] = [];
    try {
      const otherPublishedItems = items.filter(
        (item) => item.published && item.id !== editing?.id,
      ).length;

      if (form.published && otherPublishedItems >= MAX_PUBLISHED_ITEMS) {
        throw new Error(
          "Only 5 gallery projects can be published at once. Hide another project first.",
        );
      }

      let singleUrl = editing?.single_image_url ?? null;
      let beforeUrl = editing?.before_image_url ?? null;
      let afterUrl = editing?.after_image_url ?? null;

      if (form.imageType === "single") {
        if (form.singleFile) {
          singleUrl = await uploadImage(form.singleFile);
          uploadedUrls.push(singleUrl);
        }
        if (!singleUrl) throw new Error("Choose a project photo.");
        beforeUrl = null;
        afterUrl = null;
      } else {
        if (form.beforeFile) {
          beforeUrl = await uploadImage(form.beforeFile);
          uploadedUrls.push(beforeUrl);
        }
        if (form.afterFile) {
          afterUrl = await uploadImage(form.afterFile);
          uploadedUrls.push(afterUrl);
        }
        if (!beforeUrl || !afterUrl) {
          throw new Error("Choose both a before photo and an after photo.");
        }
        singleUrl = null;
      }

      const payload = {
        title: form.title.trim(),
        caption: form.caption.trim(),
        alt_text: `${form.title.trim()} forestry mulching project in Eastern North Carolina`,
        image_type: form.imageType,
        single_image_url: singleUrl,
        before_image_url: beforeUrl,
        after_image_url: afterUrl,
        sort_order: Number.parseInt(form.sortOrder, 10) || 0,
        published: form.published,
        updated_at: new Date().toISOString(),
      };

      const result = editing
        ? await supabase.from("FoxRunForestry").update(payload).eq("id", editing.id)
        : await supabase.from("FoxRunForestry").insert(payload);

      if (result.error) throw result.error;

      if (editing) {
        const replacedUrls = [
          form.singleFile ? editing.single_image_url : null,
          form.beforeFile ? editing.before_image_url : null,
          form.afterFile ? editing.after_image_url : null,
          form.imageType !== editing.image_type ? editing.single_image_url : null,
          form.imageType !== editing.image_type ? editing.before_image_url : null,
          form.imageType !== editing.image_type ? editing.after_image_url : null,
        ];
        await removeAdminImages(replacedUrls);
      }

      setMessage(editing ? "Gallery item updated." : "Gallery item added.");
      setEditing(null);
      setForm(emptyForm);
      await loadItems();
    } catch (caughtError) {
      await removeAdminImages(uploadedUrls);
      setError(caughtError instanceof Error ? caughtError.message : "Unable to save this item.");
    } finally {
      setBusy(false);
    }
  }

  async function deleteItem(item: GalleryItem) {
    if (!window.confirm(`Delete “${item.title}” from the gallery?`)) return;
    setBusy(true);
    setError("");
    const { error: deleteError } = await supabase
      .from("FoxRunForestry")
      .delete()
      .eq("id", item.id);

    if (deleteError) {
      setError(deleteError.message);
    } else {
      await removeAdminImages([
        item.single_image_url,
        item.before_image_url,
        item.after_image_url,
      ]);
      setMessage("Gallery item deleted.");
      await loadItems();
    }
    setBusy(false);
  }

  if (authLoading) {
    return (
      <AdminShell>
        <p className="text-brand-muted">Checking your session…</p>
      </AdminShell>
    );
  }

  if (!session) {
    return (
      <AdminShell>
        <div className="mx-auto max-w-md rounded-3xl border border-brand-olive/40 bg-brand-card p-6 shadow-2xl sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
            Private access
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold">Gallery admin</h1>
          <p className="mt-3 leading-7 text-brand-muted">
            Sign in to manage project photos and captions.
          </p>
          <form className="mt-8 space-y-5" onSubmit={signIn}>
            <label className="block text-sm font-bold">
              Email
              <input
                className={inputClass}
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </label>
            <label className="block text-sm font-bold">
              Password
              <input
                className={inputClass}
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </label>
            {error && <StatusMessage tone="error">{error}</StatusMessage>}
            <button
              className="w-full rounded-xl bg-brand-orange px-5 py-3 font-bold text-brand-cream transition hover:bg-brand-orange-hover disabled:opacity-60"
              disabled={busy}
              type="submit"
            >
              {busy ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="flex flex-col gap-4 border-b border-brand-olive/30 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
            Fox Run Forestry
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
            Gallery admin
          </h1>
          <p className="mt-2 text-brand-muted">Add, edit, publish, or remove project photos.</p>
          <p className="mt-2 text-sm font-bold text-brand-cream">
            {publishedCount} of {MAX_PUBLISHED_ITEMS} projects published
          </p>
        </div>
        <button
          className="self-start rounded-xl border border-brand-olive/50 px-4 py-2 text-sm font-bold transition hover:border-brand-orange hover:text-brand-orange"
          type="button"
          onClick={signOut}
        >
          Sign out
        </button>
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <section className="rounded-3xl border border-brand-olive/40 bg-brand-card p-5 sm:p-7">
          <h2 className="font-display text-2xl font-semibold">
            {editing ? "Edit gallery item" : "Add gallery item"}
          </h2>
          <form className="mt-6 space-y-5" onSubmit={saveItem}>
            <label className="block text-sm font-bold">
              Title
              <input
                className={inputClass}
                value={form.title}
                onChange={(event) => setForm({ ...form, title: event.target.value })}
                maxLength={120}
                required
              />
            </label>
            <label className="block text-sm font-bold">
              Caption
              <textarea
                className={`${inputClass} min-h-32 resize-y`}
                value={form.caption}
                onChange={(event) => setForm({ ...form, caption: event.target.value })}
                maxLength={1200}
                required
              />
            </label>
            <fieldset>
              <legend className="text-sm font-bold">Photo type</legend>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {(["comparison", "single"] as const).map((type) => (
                  <label
                    key={type}
                    className={`cursor-pointer rounded-xl border px-4 py-3 text-center text-sm font-bold transition ${
                      form.imageType === type
                        ? "border-brand-orange bg-brand-orange/10 text-brand-orange"
                        : "border-brand-olive/40"
                    }`}
                  >
                    <input
                      className="sr-only"
                      type="radio"
                      checked={form.imageType === type}
                      onChange={() => setForm({ ...form, imageType: type })}
                    />
                    {type === "comparison" ? "Before & after" : "Single photo"}
                  </label>
                ))}
              </div>
            </fieldset>

            {form.imageType === "single" ? (
              <FileField
                label={editing?.single_image_url ? "Replace photo (optional)" : "Project photo"}
                onChange={(file) => setForm({ ...form, singleFile: file })}
                required={!editing?.single_image_url}
              />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                <FileField
                  label={editing?.before_image_url ? "Replace before photo" : "Before photo"}
                  onChange={(file) => setForm({ ...form, beforeFile: file })}
                  required={!editing?.before_image_url}
                />
                <FileField
                  label={editing?.after_image_url ? "Replace after photo" : "After photo"}
                  onChange={(file) => setForm({ ...form, afterFile: file })}
                  required={!editing?.after_image_url}
                />
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-bold">
                Display order
                <input
                  className={inputClass}
                  type="number"
                  value={form.sortOrder}
                  onChange={(event) => setForm({ ...form, sortOrder: event.target.value })}
                />
              </label>
              <label className="mt-7 flex items-center gap-3 rounded-xl border border-brand-olive/40 px-4 py-3 text-sm font-bold">
                <input
                  className="size-4 accent-brand-orange"
                  type="checkbox"
                  checked={form.published}
                  onChange={(event) => setForm({ ...form, published: event.target.checked })}
                />
                <span>
                  Show on website
                  <span className="block text-xs font-normal text-brand-muted">
                    Maximum {MAX_PUBLISHED_ITEMS} published projects
                  </span>
                </span>
              </label>
            </div>

            {error && <StatusMessage tone="error">{error}</StatusMessage>}
            {message && <StatusMessage tone="success">{message}</StatusMessage>}

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                className="rounded-xl bg-brand-orange px-5 py-3 font-bold text-brand-cream transition hover:bg-brand-orange-hover disabled:opacity-60"
                disabled={busy}
                type="submit"
              >
                {busy ? "Saving…" : editing ? "Save changes" : "Add to gallery"}
              </button>
              {editing && (
                <button
                  className="rounded-xl border border-brand-olive/50 px-5 py-3 font-bold"
                  type="button"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold">Current gallery</h2>
            <span className="text-sm text-brand-muted">{items.length} items</span>
          </div>
          <div className="mt-5 space-y-4">
            {items.map((item) => {
              const previewUrl =
                item.image_type === "single" ? item.single_image_url : item.after_image_url;
              return (
                <article
                  key={item.id}
                  className="grid gap-4 rounded-2xl border border-brand-olive/30 bg-brand-card p-4 sm:grid-cols-[9rem_1fr]"
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-xl bg-brand-dark">
                    {previewUrl && (
                      <img
                        src={previewUrl}
                        alt=""
                        className="size-full object-cover"
                      />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand-orange">
                          Order {item.sort_order} · {item.image_type === "comparison" ? "Before & after" : "Single photo"}
                        </p>
                        <h3 className="mt-2 font-display text-xl font-semibold">{item.title}</h3>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${item.published ? "bg-brand-olive/40 text-brand-cream" : "bg-brand-dark text-brand-muted"}`}>
                        {item.published ? "Live" : "Hidden"}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-brand-muted">
                      {item.caption}
                    </p>
                    <div className="mt-4 flex gap-2">
                      <button
                        className="rounded-lg border border-brand-olive/50 px-3 py-2 text-sm font-bold transition hover:border-brand-orange hover:text-brand-orange"
                        type="button"
                        onClick={() => startEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="rounded-lg border border-red-900/70 px-3 py-2 text-sm font-bold text-red-300 transition hover:bg-red-950/60"
                        type="button"
                        disabled={busy}
                        onClick={() => deleteItem(item)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}

function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="fixed inset-0 z-[100] overflow-y-auto bg-brand-dark text-brand-cream">
      <div className="mx-auto min-h-full w-full max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        {children}
      </div>
    </main>
  );
}

function FileField({
  label,
  required,
  onChange,
}: {
  label: string;
  required?: boolean;
  onChange: (file: File | null) => void;
}) {
  return (
    <label className="block text-sm font-bold">
      {label}
      <input
        className={`${inputClass} file:mr-3 file:rounded-lg file:border-0 file:bg-brand-olive/40 file:px-3 file:py-2 file:font-bold file:text-brand-cream`}
        type="file"
        accept="image/*"
        required={required}
        onChange={(event) => onChange(event.target.files?.[0] ?? null)}
      />
    </label>
  );
}

function StatusMessage({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "error" | "success";
}) {
  return (
    <p
      role="status"
      className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
        tone === "error"
          ? "border-red-900/70 bg-red-950/40 text-red-200"
          : "border-brand-olive/60 bg-brand-olive/20 text-brand-cream"
      }`}
    >
      {children}
    </p>
  );
}
