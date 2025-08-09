import {
  ChevronUp,
  ChevronDown,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  Printer,
  ExternalLink,
  File,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";

export const InvoiceDocument = ({ invoice }) => {
  const scrollContainerRef = useRef(null);
  const pdfContainerRef = useRef(null);

  const [pdf, setPdf] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPageless, setIsPageless] = useState(false);

  const fileUrl = invoice?.previewUrl || "/invoices/sample_invoice.pdf";

  // Load PDF
  useEffect(() => {
    if (!fileUrl) return;
    const loadingTask = pdfjsLib.getDocument(fileUrl);
    loadingTask.promise
      .then(async (loadedPdf) => {
        setPdf(loadedPdf);
        setPageCount(loadedPdf.numPages);
        const firstPage = await loadedPdf.getPage(1);
        const viewport = firstPage.getViewport({ scale: 1 });
        if (pdfContainerRef.current) {
          const width = pdfContainerRef.current.parentElement.clientWidth - 20;
          const fitScale = width / viewport.width;
          setZoom(fitScale);
          renderAllPages(loadedPdf, fitScale);
        }
      })
      .catch(console.error);
  }, [fileUrl]);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      if (!pdf || !pdfContainerRef.current) return;
      pdf.getPage(1).then((page) => {
        const base = page.getViewport({ scale: 1 });
        const width = pdfContainerRef.current.parentElement.clientWidth - 20;
        const fitScale = width / base.width;
        setZoom(fitScale);
        renderAllPages(pdf, fitScale);
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pdf]);

  // Re-render on zoom
  useEffect(() => {
    if (pdf) renderAllPages(pdf, zoom);
  }, [zoom, pdf]);

  // Re-render on pageless toggle
  useEffect(() => {
    if (pdf) renderAllPages(pdf, zoom);
  }, [isPageless]);

  const renderAllPages = async (pdfDoc, scale) => {
    if (!pdfContainerRef.current) return;
    pdfContainerRef.current.innerHTML = "";
    for (let n = 1; n <= pdfDoc.numPages; n++) {
      const page = await pdfDoc.getPage(n);
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      if (!isPageless) {
        canvas.style.marginBottom = "20px";
        canvas.style.boxShadow = "0 0 8px rgba(0,0,0,.12)";
        canvas.style.borderRadius = "6px";
        canvas.style.background = "#fff";
      } else {
        canvas.style.marginBottom = "8px";
        canvas.style.boxShadow = "none";
      }

      pdfContainerRef.current.appendChild(canvas);
      await page.render({ canvasContext: ctx, viewport }).promise;
    }
  };

  // Actions
  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.1, 3));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.5));
  const handleReload = () => pdf && renderAllPages(pdf, zoom);
  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = `invoice-${invoice?.id || "sample"}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const handleScroll = (dir) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollBy({ top: dir === "up" ? -100 : 100, behavior: "smooth" });
    const pageHeight = el.scrollHeight / pageCount;
    const newPage = Math.round(el.scrollTop / pageHeight) + 1;
    setCurrentPage(Math.max(1, Math.min(newPage, pageCount)));
  };
  const openExternal = () => window.open(fileUrl, "_blank");
  const togglePageless = () => setIsPageless((v) => !v);
  const handlePrint = () => window.print();

  if (!invoice) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-muted-foreground rounded" />
          </div>
          <p className="text-sm">Select an invoice to view the document</p>
        </div>
      </div>
    );
  }

  // Toolbar button style
  const toolbarBtn =
    "flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 transition";

  return (
    <div className="relative flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white text-sm">
        {/* Left */}
        <div className="flex items-center space-x-1.5">
          <button onClick={() => handleScroll("up")} className={toolbarBtn}>
            <ChevronUp className="w-4 h-4" />
          </button>
          <span className="mx-1">{currentPage} of {pageCount}</span>
          <button onClick={() => handleScroll("down")} className={toolbarBtn}>
            <ChevronDown className="w-4 h-4" />
          </button>


          <div className="w-px h-6 bg-gray-300 mx-2" />

          <button onClick={handleZoomOut} className={toolbarBtn}>
            <ZoomOut className="w-4 h-4" />
          </button>
          <span>{Math.round(zoom * 100)}%</span>
          <button onClick={handleZoomIn} className={toolbarBtn}>
            <ZoomIn className="w-4 h-4" />
          </button>

          <div className="w-px h-6 bg-gray-300 mx-2" />

          <button onClick={handleReload} className={toolbarBtn}>
            <RotateCcw className="w-4 h-4" />
          </button>
          <button onClick={togglePageless} className={toolbarBtn}>
            <File className="w-4 h-4" />
          </button>
          <button onClick={handlePrint} className={toolbarBtn}>
            <Printer className="w-4 h-4" />
          </button>
          <button onClick={handleDownload} className={toolbarBtn}>
            <Download className="w-4 h-4" />
          </button>
          <button onClick={openExternal} className={toolbarBtn}>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div
        ref={scrollContainerRef}
        className="flex-1 p-6 bg-muted overflow-auto custom-scroll"
      >
        <div className="max-w-4xl mx-auto rounded-md bg-white shadow-sm border border-border p-2">
          <div ref={pdfContainerRef} />
        </div>
      </div>

      {/* Floating Pageless Toggle */}
      <button
        onClick={togglePageless}
        className="absolute bottom-6 right-6 bg-white rounded-xl shadow-md border border-gray-200 p-3 hover:shadow-lg transition-all"
        title={isPageless ? "Switch to Page View" : "Switch to Pageless View"}
      >
        <File className="h-5 w-5 text-muted-foreground" />
      </button>
    </div>
  );
};
