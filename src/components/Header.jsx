import { Upload, Grid3X3, FileText, Bell } from "lucide-react";
import { useRef } from "react";

export const Header = () => {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click(); 
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File selected:", file.name);
    }
  };

  return (
    <div className="flex items-center justify-between px-6 h-16 border-b border-border bg-white">
   
      <h1 className="text-xl font-semibold text-foreground">AI Invoicing</h1>

      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition">
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition">
            <FileText className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition">
            <Bell className="w-4 h-4" />
          </button>
        </div>

        
        <button
          onClick={handleUploadClick}
          className="flex items-center gap-2 px-4 h-9 bg-primary text-white rounded-md hover:bg-primary/90 transition text-sm"
        >
          <Upload className="w-4 h-4" />
          Upload Invoice
        </button>

        {/* Hidden input */}
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};
