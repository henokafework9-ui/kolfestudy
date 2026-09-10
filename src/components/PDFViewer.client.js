"use client";
import React, { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Use the non-module worker build for broader browser compatibility
// Prefer a same-origin worker served from the `public/` folder to avoid
// cross-origin / CSP issues on deployment. Ask deploy to place
// `pdf.worker.min.js` at the site root (e.g. `public/pdf.worker.min.js`).
const localWorker = `${window.location.origin}/pdf.worker.min.js`;
const cdnWorker = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = localWorker;

export default function PDFViewerClient({ fileUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [error, setError] = useState(null);
  const [triedCdn, setTriedCdn] = useState(false);
  const [docKey, setDocKey] = useState(0);
  const containerRef = useRef(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
    setError(null);
  }

  function onDocumentLoadError(err) {
    console.error("PDF load error:", err);

    // If the worker at the same origin isn't working (common on some hosts
    // with strict CSP or missing worker file), fall back to the CDN worker
    // once and retry the document load.
    if (!triedCdn) {
      console.warn("PDF worker failed; retrying with CDN worker...");
      pdfjs.GlobalWorkerOptions.workerSrc = cdnWorker;
      setTriedCdn(true);
      setError(null);
      // bump key to force Document remount/reload
      setDocKey((k) => k + 1);
      return;
    }

    setError("Failed to load PDF on this device. Please open the PDF in a new tab to download it.");
  }

  useEffect(() => {
    function handleResize() {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const base = Math.max(0.6, Math.min(1.6, width / 900));
      setScale(base);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div style={{ padding: 12, display: "flex", gap: 8, alignItems: "center" }}>
        <button onClick={() => setPageNumber((p) => Math.max(1, p - 1))} style={{ padding: "6px 10px" }}>
          Prev
        </button>

        <div style={{ minWidth: 80, textAlign: "center" }}>
          {pageNumber} {numPages ? `of ${numPages}` : ""}
        </div>

        <button onClick={() => setPageNumber((p) => Math.min(numPages || 1, p + 1))} style={{ padding: "6px 10px" }}>
          Next
        </button>

        <button onClick={() => setScale((s) => Math.min(3, +(s + 0.1).toFixed(2)))} style={{ padding: "6px 10px" }}>
          Zoom +
        </button>

        <button onClick={() => setScale((s) => Math.max(0.5, +(s - 0.1).toFixed(2)))} style={{ padding: "6px 10px" }}>
          Zoom -
        </button>

        <button onClick={() => { setScale(1); setPageNumber(1); }} style={{ padding: "6px 10px" }}>
          Reset
        </button>

        <a href={fileUrl} target="_blank" rel="noreferrer" style={{ marginLeft: "auto" }}>
          Open / Download
        </a>
      </div>

      <div style={{ flex: 1, overflow: "auto", padding: 12 }}>
        {error ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 220, textAlign: "center", gap: 12, color: "#cbd5e1" }}>
            <div style={{ fontSize: 18, fontWeight: 600 }}>Unable to preview this PDF</div>
            <div style={{ maxWidth: 420 }}>{error}</div>
            <a href={fileUrl} target="_blank" rel="noreferrer" style={{ color: "#60a5fa" }}>
              Open / Download PDF
            </a>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Document key={docKey} file={{ url: fileUrl }} onLoadSuccess={onDocumentLoadSuccess} onLoadError={onDocumentLoadError} loading={<div>Loading PDF…</div>}>
              <Page pageNumber={pageNumber} scale={scale} loading={<div />} />
            </Document>
          </div>
        )}
      </div>
    </div>
  );
}
