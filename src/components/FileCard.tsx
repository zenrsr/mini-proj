import React from "react";
import { Invoice } from "@/app/(subjects)/cns/page";
import { usePathname } from "next/navigation";

interface FileCardProps {
  className: string;
  hoveredInvoice: Invoice | null;
  selectedInvoice: Invoice | null;
}

export const FileCard: React.FC<FileCardProps> = ({
  className,
  hoveredInvoice,
  selectedInvoice
}) => {
  const pathname = usePathname();
  const cns = pathname?.split("/")[1] || "";
  console.log(cns);
  const displayedInvoice = selectedInvoice || hoveredInvoice;
  console.log(displayedInvoice?.unit);

  const handleDownload = async () => {
    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          bucketName: "zenrsr-uoe",
          key: `${cns}/${displayedInvoice?.unit}.pdf`
        })
      });

      console.log({ response });

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `${displayedInvoice?.unit}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Failed to download file:", error);
    }
  };

  return (
    <div className={className}>
      {displayedInvoice ? (
        <>
          <div>
            <h3 className="text-xl font-bold mb-2">{displayedInvoice.unit}</h3>
            <p className="text-sm">{displayedInvoice.description}</p>
          </div>
          <div className="flex justify-end items-center">
            <button
              onClick={handleDownload}
              className="bg-black text-white flex justify-center group/modal-btn px-6 py-3 rounded-full hover:bg-opacity-75 transition-colors"
            >
              <span className="group-hover/modal-btn:translate-x-1 transition duration-300">
                Download your Unit
              </span>
            </button>
          </div>
        </>
      ) : (
        <p className="text-center">
          Hover over or select a file to view details
        </p>
      )}
    </div>
  );
};
