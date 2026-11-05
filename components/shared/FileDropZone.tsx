"use client";

import { useEffect, useRef, useState } from "react";
import * as Icons from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { formatFileSize } from "@/lib/format";
import { cn } from "@/lib/utils";

interface FileDropZoneProps {
  id: string;
  name: string;
  accept: string[];
  value: File | null | undefined;
  invalid: boolean;
  hint: string;
  onChange: (file: File) => void;
  onBlur: () => void;
}

export function FileDropZone({
  id,
  name,
  accept,
  value,
  invalid,
  hint,
  onChange,
  onBlur,
}: FileDropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const selectedFile = value instanceof File ? value : null;

  useEffect(() => {
    const isImage = selectedFile?.type.startsWith("image/");

    if (!selectedFile || !isImage) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  // Runs when a file is chosen (click) or dropped (drag and drop)
  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;

    // Ignore unsupported types (the form schema shows the error on submit)
    if (!accept.includes(file.type)) return;

    onChange(file);
  };

  // Runs when the user clicks the X button
  const handleRemove = () => {
    if (inputRef.current) inputRef.current.value = "";
    onChange(null as unknown as File);
    onBlur();
  };

  return (
    <>
      <input
        ref={inputRef}
        id={id}
        name={name}
        type="file"
        accept={accept.join(",")}
        className="sr-only"
        onChange={(e) => handleFiles(e.target.files)}
        onBlur={onBlur}
        aria-invalid={invalid}
      />

      {selectedFile ? (
        // ---------- A file is selected: show its details ----------
        <div className="flex items-center gap-3 rounded-lg border bg-muted/40 p-3">
          {previewUrl ? (
            // biome-ignore lint/performance/noImgElement: <explanation>
            <img
              src={previewUrl}
              alt=""
              className="size-12 shrink-0 rounded-md border object-cover"
            />
          ) : (
            <div className="flex size-12 shrink-0 items-center justify-center rounded-md border bg-background text-muted-foreground">
              <Icons.FileText className="size-5" />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{selectedFile.name}</p>
            <p className="text-xs text-muted-foreground">
              {formatFileSize(selectedFile.size)}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => inputRef.current?.click()}
            >
              Replace
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleRemove}
              aria-label={`Remove ${selectedFile.name}`}
            >
              <Icons.X className="size-4" />
            </Button>
          </div>
        </div>
      ) : (
        // ---------- No file yet: show the upload / drop area ----------
        <label
          htmlFor={id}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFiles(e.dataTransfer.files);
          }}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed px-4 py-6 text-center transition-colors",
            "hover:border-primary/60 hover:bg-muted/50",
            "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring",
            isDragging && "border-primary bg-primary/5",
            invalid && "border-destructive bg-destructive/5",
          )}
        >
          <Icons.UploadCloud
            className={cn(
              "size-6",
              invalid ? "text-destructive" : "text-muted-foreground",
            )}
          />
          <span className="text-sm font-medium">
            <span className="text-primary">Click to upload</span> or drag and
            drop
          </span>
          <span className="text-xs text-muted-foreground">{hint}</span>
        </label>
      )}
    </>
  );
}
