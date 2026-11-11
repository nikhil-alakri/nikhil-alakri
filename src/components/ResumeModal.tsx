
import { useEffect, useState, useCallback } from "react";
import { FileDown, ExternalLink, Eye, ShieldCheck, Download, X } from "lucide-react";
import { SITE_URLS } from "@/config/urls";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

interface ResumeModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function ResumeModal({ isOpen: controlledOpen, onClose }: ResumeModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (controlledOpen !== undefined) {
      setIsOpen(controlledOpen);
    }
  }, [controlledOpen]);

  useEffect(() => {
    const handleOpenEvent = () => setIsOpen(true);
    const handleHash = () => {
      if (window.location.hash === "#resume") {
        setIsOpen(true);
      }
    };

    window.addEventListener("portfolio:open-resume", handleOpenEvent);
    window.addEventListener("hashchange", handleHash);
    handleHash();

    return () => {
      window.removeEventListener("portfolio:open-resume", handleOpenEvent);
      window.removeEventListener("hashchange", handleHash);
    };
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    onClose?.();
    if (window.location.hash === "#resume") {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, [onClose]);

  const pdfUrl = SITE_URLS.resume;
  const downloadFileName = "Nikhil-Alakri-Resume.pdf";

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (open) setIsOpen(true);
        else handleClose();
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="flex h-[92vh] max-h-[940px] max-w-5xl flex-col gap-0 overflow-hidden p-0 sm:max-w-5xl"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-surface-border bg-surface/90 px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="hidden rounded-xl border border-mint/20 bg-mint/10 p-2 text-mint sm:block">
              <Eye className="size-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <DialogTitle>Nikhil Alakri · Resume / CV</DialogTitle>
                <span className="hidden items-center gap-1 rounded-md border border-mint/30 bg-mint/15 px-2 py-0.5 font-mono text-[11px] font-medium text-mint md:inline-flex">
                  <ShieldCheck className="size-3" />
                  Verified
                </span>
              </div>
              <DialogDescription className="hidden sm:block">
                Senior Software Engineer · CitiusTech Healthcare UI Platform &amp; Design Systems
              </DialogDescription>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={pdfUrl}
              download={downloadFileName}
              className="inline-flex items-center gap-1.5 rounded-xl bg-mint px-3 py-2 text-xs font-semibold text-background shadow-sm transition-colors hover:bg-mint-dark sm:px-4"
              title="Download official resume PDF"
            >
              <Download className="size-3.5" />
              <span className="hidden sm:inline">Download</span> PDF
            </a>

            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-xl border border-surface-border bg-surface px-3 py-2 text-xs text-bodytext transition-colors hover:border-mint hover:text-headline sm:inline-flex"
              title="Open PDF in a new tab"
            >
              <ExternalLink className="size-3.5" />
              <span>Full Tab</span>
            </a>

            <DialogClose
              aria-label="Close resume viewer"
              className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-xl border border-surface-border bg-surface text-bodytext transition-colors hover:border-mint hover:text-headline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
            >
              <X className="size-4" />
            </DialogClose>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-between border-b border-mint/20 bg-mint/10 px-4 py-2 text-xs text-mint sm:hidden">
          <span>Viewing on mobile?</span>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-semibold underline"
          >
            Open in new tab <ExternalLink className="size-3" />
          </a>
        </div>

        <div className="relative w-full flex-1 overflow-hidden bg-slate-900/60">
          <object
            data={`${pdfUrl}#view=FitH&toolbar=1&navpanes=0`}
            type="application/pdf"
            className="h-full w-full"
            aria-label="Nikhil Alakri Resume PDF Viewer"
          >
            <div className="flex h-full flex-col items-center justify-center bg-surface p-8 text-center">
              <FileDown className="mb-4 size-12 animate-bounce text-mint" />
              <h3 className="mb-2 font-display text-lg font-bold text-headline">
                Nikhil Alakri · Senior Software Engineer Resume
              </h3>
              <p className="mb-6 max-w-md text-sm leading-relaxed text-bodytext">
                Your browser doesn&apos;t support direct PDF embedding. Click below to download the official PDF or open it directly.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={pdfUrl}
                  download={downloadFileName}
                  className="inline-flex items-center gap-2 rounded-xl bg-mint px-5 py-2.5 text-sm font-semibold text-background shadow-md transition-colors hover:bg-mint-dark"
                >
                  <Download className="size-4" />
                  <span>Download {downloadFileName}</span>
                </a>
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-surface-border bg-surface px-5 py-2.5 text-sm font-semibold text-headline transition-colors hover:border-mint"
                >
                  <ExternalLink className="size-4" />
                  <span>Open in New Tab</span>
                </a>
              </div>
            </div>
          </object>
        </div>

        <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-surface-border bg-surface/90 px-4 py-2.5 text-xs text-mutedtext sm:px-6">
          <span>File: {downloadFileName} (118 KB)</span>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">
              Press{" "}
              <kbd className="rounded border border-surface-border bg-surface px-1.5 py-0.5 font-mono text-[10px] text-headline">
                ESC
              </kbd>{" "}
              to close
            </span>
            <a
              href={pdfUrl}
              download={downloadFileName}
              className="flex items-center gap-1 font-semibold text-mint hover:underline"
            >
              <FileDown className="size-3" />
              Direct Download
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
