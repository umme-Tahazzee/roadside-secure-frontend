"use client";

import { Button } from "@/components/ui/button";
import * as Icons from "@/components/shared/icons";
import { formatFileSize } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Props = the data this component receives from its parent
interface FileDropZoneProps {
  id: string; // links the <label> with the hidden <input>
  name: string; // form field name
  accept: string[]; // allowed file types, e.g. ["image/png", "application/pdf"]
  value: File | null | undefined; // the currently selected file
  invalid: boolean; // true when the form shows an error for this field
  hint: string; // small helper text, e.g. "PNG or PDF, max 5MB"
  onChange: (file: File) => void; // tell the parent a file was picked / removed
  onBlur: () => void; // tell the parent the field was touched
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
  // Reference to the hidden <input type="file">, so we can click or clear it
  const inputRef = useRef<HTMLInputElement>(null);

  // True while the user is dragging a file over the drop area
  const [isDragging, setIsDragging] = useState(false);

  // A temporary browser URL used to show an image preview
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Make sure we only use `value` when it is a real File
  const selectedFile = value instanceof File ? value : null;

  // Create a preview URL when a file is selected.
  // The cleanup function runs when the file changes or the component unmounts,
  // and it frees the memory used by the old URL.
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
    // Clear the hidden input so the same file can be picked again
    if (inputRef.current) inputRef.current.value = "";

    // The form types this field as `File` and uses `null as unknown as File`
    // as its empty value, so we do the same here to stay consistent.
    onChange(null as unknown as File);
    onBlur();
  };

  return (
    <>
      {/* Hidden real input. The label / buttons below open it. */}
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
            // Plain <img> is correct here: next/image can't optimize local blob URLs.
            // eslint-disable-next-line @next/next/no-img-element
            // biome-ignore lint/performance/noImgElement: <explanation>
          <img
              src={previewUrl}
              alt=""
              className="size-12 shrink-0 rounded-md border object-cover"
            />
          ) : (
            // Not an image (for example a PDF): show a file icon instead
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
            e.preventDefault(); // required, otherwise the browser blocks dropping
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault(); // stop the browser from opening the file
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