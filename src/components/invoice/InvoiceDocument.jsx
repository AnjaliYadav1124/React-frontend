import {
  ChevronUp,
  ChevronDown,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  Share,
  ExternalLink,
} from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button.jsx";

export const InvoiceDocument = ({ invoice }) => {
  const iframeRef = useRef(null);
  const [zoom, setZoom] = useState(1);

  const fileUrl = invoice?.previewUrl || "/invoices/sample_invoice.pdf";

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.5));

  const handleReload = () => {
    if (iframeRef.current) {
      iframeRef.current.src = fileUrl;
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = `invoice-${invoice?.id || "sample"}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleScroll = (direction) => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow) {
      const amount = 100; // scroll amount per click
      iframe.contentWindow.scrollBy(0, direction === "up" ? -amount : amount);
    }
  };

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
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-white">
        {/* Left Controls */}
        <div className="flex items-center gap-1">
          <Button onClick={() => handleScroll("up")} variant="ghost" size="icon" className="h-8 w-8 p-0">
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          </Button>
          <Button onClick={() => handleScroll("down")} variant="ghost" size="icon" className="h-8 w-8 p-0">
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </Button>
          <span className="text-sm text-muted-foreground ml-2">{Math.round(zoom * 100)}%</span>
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
          <Button onClick={handleDownload} variant="ghost" size="icon" className="h-8 w-8 p-0">
            <Download className="w-4 h-4 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
            <Share className="w-4 h-4 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>
      </div>

      {/* Iframe Viewer */}
      <div className="flex-1 overflow-auto p-6 bg-muted">
        <div className="max-w-4xl mx-auto rounded-md bg-white shadow-sm border border-border p-2">
          <iframe
            ref={iframeRef}
            src={fileUrl}
            title="Invoice PDF"
            style={{
              width: "100%",
              height: "80vh",
              transform: `scale(${zoom})`,
              transformOrigin: "top left",
            }}
            frameBorder="0"
          />
        </div>
      </div>
    </div>
  );
};


// pdf-viewer-reactjs
// import {
//   ChevronUp,
//   ChevronDown,
//   ZoomIn,
//   ZoomOut,
//   RotateCcw,
//   Download,
//   Share,
//   ExternalLink,
// } from "lucide-react";
// import { useRef, useState } from "react";
// import { Button } from "@/components/ui/button.jsx";
// import PDFViewer from "pdf-viewer-reactjs";

// export const InvoiceDocument = ({ invoice }) => {
//   const [zoom, setZoom] = useState(1);
//   const [page, setPage] = useState(1);
//   const [key, setKey] = useState(Date.now());
//   const containerRef = useRef(null);

//   const fileUrl = invoice?.previewUrl || "/invoices/sample_invoice.pdf";

//   const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 3));
//   const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.5));
//   const handleScrollUp = () => setPage((prev) => Math.max(prev - 1, 1));
//   const handleScrollDown = () => setPage((prev) => prev + 1); // no max check due to limited API

//   const handleReload = () => setKey(Date.now());

//   const handleDownload = () => {
//     const link = document.createElement("a");
//     link.href = fileUrl;
//     link.download = `invoice-${invoice?.id || "sample"}.pdf`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   if (!invoice) {
//     return (
//       <div className="flex items-center justify-center h-full text-muted-foreground">
//         <div className="text-center">
//           <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
//             <div className="w-8 h-8 bg-muted-foreground rounded" />
//           </div>
//           <p className="text-sm">Select an invoice to view the document</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col h-full">
//       {/* Toolbar */}
//       <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-white">
//         {/* Left Controls */}
//         <div className="flex items-center gap-1">
//           <Button onClick={handleScrollUp} variant="ghost" size="icon" className="h-8 w-8 p-0">
//             <ChevronUp className="w-4 h-4 text-muted-foreground" />
//           </Button>
//           <span className="text-sm text-muted-foreground">
//             Page {page}
//           </span>
//           <Button onClick={handleScrollDown} variant="ghost" size="icon" className="h-8 w-8 p-0">
//             <ChevronDown className="w-4 h-4 text-muted-foreground" />
//           </Button>
//           <span className="text-sm text-muted-foreground ml-2">{Math.round(zoom * 100)}%</span>
//           <Button onClick={handleZoomOut} variant="ghost" size="icon" className="h-8 w-8 p-0">
//             <ZoomOut className="w-4 h-4 text-muted-foreground" />
//           </Button>
//           <Button onClick={handleZoomIn} variant="ghost" size="icon" className="h-8 w-8 p-0">
//             <ZoomIn className="w-4 h-4 text-muted-foreground" />
//           </Button>
//         </div>

//         {/* Right Controls */}
//         <div className="flex items-center gap-1">
//           <Button onClick={handleReload} variant="ghost" size="icon" className="h-8 w-8 p-0">
//             <RotateCcw className="w-4 h-4 text-muted-foreground" />
//           </Button>
//           <Button onClick={handleDownload} variant="ghost" size="icon" className="h-8 w-8 p-0">
//             <Download className="w-4 h-4 text-muted-foreground" />
//           </Button>
//           <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
//             <Share className="w-4 h-4 text-muted-foreground" />
//           </Button>
//           <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
//             <ExternalLink className="w-4 h-4 text-muted-foreground" />
//           </Button>
//         </div>
//       </div>

//       {/* PDF Viewer */}
//       <div ref={containerRef} className="flex-1 overflow-auto p-6 bg-muted">
//         <div className="max-w-4xl mx-auto rounded-md bg-white shadow-sm border border-border p-4">
//           <PDFViewer
//             key={key}
//             document={{ url: fileUrl }}
//             scale={zoom}
//             page={page}
//             hideNavbar={true}
//             css="w-full h-[80vh]"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
