// TODO: на все эти функции-хелперы как раз было бы здорово написать тесты, легко сломать
export function getYouTubeId(input?: string | null): string | null {
  if (!input) return null;
  const s = input.trim();
  try {
    const u = new URL(s);
    const p = u.pathname || "";
    const v = u.searchParams.get("v");
    if (v) return v;
    const embed = p.match(/\/embed\/([A-Za-z0-9_-]{6,})/);
    if (embed) return embed[1];
    if (u.hostname.toLowerCase().includes("youtu.be")) {
      const id = p.replace(/^\/+/, "").split(/[/?#&]/)[0];
      if (id) return id;
    }
    const loose = s.match(/([A-Za-z0-9_-]{6,})/);
    return loose ? loose[1] : null;
  } catch {
    const embed = s.match(/\/embed\/([A-Za-z0-9_-]{6,})/);
    if (embed) return embed[1];
    const short = s.match(/youtu\.be\/([A-Za-z0-9_-]{6,})/);
    if (short) return short[1];
    const v = s.match(/[?&]v=([A-Za-z0-9_-]{6,})/);
    if (v) return v[1];
    const any = s.match(/([A-Za-z0-9_-]{6,})/);
    return any ? any[1] : null;
  }
}

export function toYouTubeWatchUrl(input?: string | null): string | null {
  const id = getYouTubeId(input);
  return id ? `https://www.youtube.com/watch?v=${id}` : null;
}

export function toYouTubeEmbedUrl(
  input?: string | null,
  opts?: { autoplay?: number; enablejsapi?: number; origin?: string }
): string | null {
  const id = getYouTubeId(input);
  if (!id) return null;
  const params = new URLSearchParams();
  if (opts?.autoplay) params.set("autoplay", String(opts.autoplay));
  if (opts?.enablejsapi) params.set("enablejsapi", String(opts.enablejsapi));
  if (opts?.origin) params.set("origin", opts.origin);
  const q = params.toString();
  return `https://www.youtube.com/embed/${id}${q ? `?${q}` : ""}`;
}

export const formatDate = (iso?: string | null) => {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString();
};

export const joinNames = (arr?: { name?: string }[] | null) =>
  arr && arr.length ? arr.map((x) => x.name ?? "—").join(", ") : "—";

export const pickImage = (obj: any, fallback = ""): string => {
  if (!obj) return fallback;
  return (
    obj.images?.jpg?.image_url ||
    obj.image_url ||
    obj.jpg?.image_url ||
    obj.webp?.image_url ||
    obj.large_image_url ||
    fallback
  );
};
