import {
  ChevronUp,
  ChevronDown,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  Share,
  ExternalLink,
  Printer,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const InvoiceDocument = ({ invoice }) => {
  const containerRef = useRef(null);
  const [pdf, setPdf] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const fileUrl = invoice?.previewUrl || "/invoices/sample_invoice.pdf";

  useEffect(() => {
    if (!fileUrl) return;
    const loadingTask = pdfjsLib.getDocument(fileUrl);
    loadingTask.promise
      .then((loadedPdf) => {
        setPdf(loadedPdf);
        setPageCount(loadedPdf.numPages);
        renderAllPages(loadedPdf, zoom);
      })
      .catch(console.error);
  }, [fileUrl]);

  useEffect(() => {
    if (pdf) renderAllPages(pdf, zoom);
  }, [zoom]);

  const renderAllPages = async (pdfDoc, scale) => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";

    for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      containerRef.current.appendChild(canvas);

      await page.render({ canvasContext: context, viewport }).promise;
    }
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.5));
  const handleReload = () => pdf && renderAllPages(pdf, zoom);
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = `invoice-${invoice?.id || "sample"}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleScroll = (direction) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const scrollAmount = 100;
    container.scrollBy({ top: direction === "up" ? -scrollAmount : scrollAmount, behavior: "smooth" });

    const pageHeight = container.scrollHeight / pageCount;
    const newPage = Math.round(container.scrollTop / pageHeight) + 1;
    setCurrentPage(Math.max(1, Math.min(newPage, pageCount)));
  };
  const handlePrint = () => window.print();
  const openExternal = () => window.open(fileUrl, "_blank");

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

  return (
    <div className="relative flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-white">
        {/* Left Controls */}
        <div className="flex items-center gap-1">
          <Button onClick={() => handleScroll("up")} variant="ghost" size="icon" className="h-8 w-8 p-0">
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          </Button>
          <span className="text-sm text-muted-foreground px-2">
            {currentPage} of {pageCount}
          </span>
          <Button onClick={() => handleScroll("down")} variant="ghost" size="icon" className="h-8 w-8 p-0">
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </Button>
          <span className="text-sm text-muted-foreground px-2">{Math.round(zoom * 100)}%</span>
          <Button onClick={handleZoomOut} variant="ghost" size="icon" className="h-8 w-8 p-0">
            <ZoomOut className="w-4 h-4 text-muted-foreground" />
          </Button>
          <Button onClick={handleZoomIn} variant="ghost" size="icon" className="h-8 w-8 p-0">
            <ZoomIn className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-1">
          <Button onClick={handleReload} variant="ghost" size="icon" className="h-8 w-8 p-0">
            <RotateCcw className="w-4 h-4 text-muted-foreground" />
          </Button>
          <Button onClick={handlePrint} variant="ghost" size="icon" className="h-8 w-8 p-0">
            <Printer className="w-4 h-4 text-muted-foreground" />
          </Button>
          <Button onClick={handleDownload} variant="ghost" size="icon" className="h-8 w-8 p-0">
            <Download className="w-4 h-4 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
            <Share className="w-4 h-4 text-muted-foreground" />
          </Button>
          <Button onClick={openExternal} variant="ghost" size="icon" className="h-8 w-8 p-0">
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 p-6 bg-muted overflow-auto custom-scroll">
        <div className="max-w-4xl mx-auto rounded-md bg-white shadow-sm border border-border p-2">
          <div ref={containerRef} />
        </div>
      </div>

      {/* Floating Print Button */}
      <button
        onClick={handlePrint}
        className="absolute bottom-6 right-6 bg-white rounded-full shadow-md border border-gray-200 p-3 hover:shadow-lg transition-all"
      >
        <Printer className="h-5 w-5 text-muted-foreground" />
      </button>
    </div>
  );
};
