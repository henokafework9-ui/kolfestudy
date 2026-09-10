"use client";
import React, { useEffect, useState } from "react";

const normalizePdfUrl = (raw) => {
  if (!raw) return raw;

  let url = String(raw).trim();

  // If a developer accidentally passed a path including the `public/` folder,
  // strip it: files in Next.js `public` are served from the site root.
  url = url.replace(/^\.\/public\//, "").replace(/^\/public\//, "").replace(/^public\//, "");

  // Normalize backslashes and collapse multiple slashes
  url = url.replace(/\\/g, "/").replace(/\/+/g, "/");

  // Ensure leading slash for root-relative public assets
  if (!/^https?:\/\//i.test(url) && !url.startsWith("/")) {
    url = "/" + url;
  }

  try {
    return new URL(url, window.location.origin).toString();
  } catch {
    // Fallback: encode URI path portion
    try {
      const origin = window.location?.origin || "";
      return origin + "/" + encodeURI(url.replace(/^\/+/, ""));
    } catch {
      return encodeURI(url);
    }
  }
};

export default function PDFViewer({ fileUrl }) {
  const [Loaded, setLoaded] = useState(null);
  const safeFileUrl = normalizePdfUrl(fileUrl);

  useEffect(() => {
    let mounted = true;
    import("./PDFViewer.client")
      .then((m) => {
        if (mounted) setLoaded(() => m.default);
      })
      .catch((err) => {
        // If the client-only PDF implementation fails to load (pdfjs issues),
        // fall back to a robust iframe/object viewer for broad compatibility.
        if (mounted) {
          const Fallback = ({ fileUrl }) => (
            <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ padding: 12, display: "flex", gap: 8 }}>
                <a href={fileUrl} target="_blank" rel="noreferrer">Open / Download PDF</a>
                <span style={{ color: "#94a3b8", marginLeft: 8 }}>Fallback viewer (native PDF rendering)</span>
              </div>
              <div style={{ flex: 1, minHeight: 0 }}>
                <iframe src={fileUrl} style={{ width: "100%", height: "100%", border: "none" }} title="PDF preview" />
              </div>
            </div>
          );

          setLoaded(() => Fallback);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (!Loaded) return <div style={{ padding: 20 }}>Loading PDF viewer…</div>;

  return <Loaded fileUrl={safeFileUrl} />;
}
