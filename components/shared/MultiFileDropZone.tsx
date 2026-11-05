/** biome-ignore-all lint/performance/noImgElement: blob URLs can't use next/image */
"use client";

import { useEffect, useState } from "react";
import * as Icons from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { formatFileSize } from "@/lib/format";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  One row in the list (preview + name + size + remove button)               */
/* -------------------------------------------------------------------------- */

interface FileRowProps {
  file: File;
  onRemove: () => void;
}

function FileRow({ file, onRemove }: FileRowProps) {
  // Every row has its own preview URL, so each one is created and cleaned up separately
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file.type.startsWith("image/")) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Free the memory when this row is removed or the file changes
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <li className="flex items-center gap-3 rounded-lg border bg-muted/40 p-3">
      {previewUrl ? (
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
        <p className="truncate text-sm font-medium">{file.name}</p>
        <p className="text-xs text-muted-foreground">
          {formatFileSize(file.size)}
        </p>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onRemove}
        aria-label={`Remove ${file.name}`}
      >
        <Icons.X className="size-4" />
      </Button>
    </li>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main component                                                            */
/* -------------------------------------------------------------------------- */

interface MultiFileDropZoneProps {
  id: string; // links the <label> with the hidden <input>
  name: string; // form field name
  accept: string[]; // allowed file types, e.g. ["image/png", "image/jpeg"]
  value: File[] | null | undefined; // all the selected files
  invalid: boolean; // true when the form shows an error for this field
  hint: string; // small helper text, e.g. "PNG or JPG, max 5MB each"
  maxFiles?: number; // optional limit, e.g. 5
  onChange: (files: File[]) => void; // send the full new list to the parent
  onBlur: () => void; // tell the parent the field was touched
}

// Two files are "the same" if name, size and last modified date all match
const getFileKey = (file: File) =>
  `${file.name}-${file.size}-${file.lastModified}`;

export function MultiFileDropZone({
  id,
  name,
  accept,
  value,
  invalid,
  hint,
  maxFiles,
  onChange,
  onBlur,
}: MultiFileDropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  // Always work with a real array, even if the form gives us null
  const files = Array.isArray(value) ? value : [];

  // Can the user still add more files?
  const canAddMore = maxFiles === undefined || files.length < maxFiles;

  // Runs when files are chosen (click) or dropped (drag and drop)
  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;

    // 1. Keep only the allowed types (the form schema shows errors on submit)
    const newFiles = Array.from(fileList).filter((file) =>
      accept.includes(file.type),
    );

    // 2. Skip files that are already in the list
    const existingKeys = new Set(files.map(getFileKey));
    const uniqueNewFiles = newFiles.filter(
      (file) => !existingKeys.has(getFileKey(file)),
    );

    if (uniqueNewFiles.length === 0) return;

    // 3. Add them to the old list, and respect the limit
    const merged = [...files, ...uniqueNewFiles];
    onChange(maxFiles ? merged.slice(0, maxFiles) : merged);
  };

  // Remove only one file by its position in the list
  const handleRemove = (indexToRemove: number) => {
    onChange(files.filter((_, index) => index !== indexToRemove));
    onBlur();
  };

  return (
    <div className="space-y-3">
      {/* Hidden real input. The label below opens it. */}
      <input
        id={id}
        name={name}
        type="file"
        multiple
        accept={accept.join(",")}
        className="sr-only"
        onChange={(e) => {
          handleFiles(e.target.files);
          // Reset so the same file can be picked again after removing it
          e.target.value = "";
        }}
        onBlur={onBlur}
        aria-invalid={invalid}
      />

      {/* Upload / drop area (hidden when the limit is reached) */}
      {canAddMore && (
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

      {/* Small counter, only when there is a limit */}
      {maxFiles !== undefined && (
        <p className="text-xs text-muted-foreground">
          {files.length} / {maxFiles} files
        </p>
      )}

      {/* List of selected files */}
      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((file, index) => (
            <FileRow
              key={getFileKey(file)}
              file={file}
              onRemove={() => handleRemove(index)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
