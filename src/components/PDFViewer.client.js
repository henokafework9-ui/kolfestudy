"use client";
import React, { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "https://unpkg.com/pdfjs-dist/build/pdf.worker.min.js";

export default function PDFViewerClient({ fileUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const containerRef = useRef(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess} loading={<div>Loading PDF…</div>}>
            <Page pageNumber={pageNumber} scale={scale} loading={<div />} />
          </Document>
        </div>
      </div>
    </div>
  );
}
