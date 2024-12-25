"use client";
import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploaderProps {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
}

export default function FileUploader ({ files, onChange }: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="text-xs font-normal flex cursor-pointer  flex-col items-center justify-center gap-3 rounded-md border border-dashed border-dark-500 bg-dark-400 p-5"
    >
      <input {...getInputProps()} />
      {files && files.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          alt="uploaded file"
          width={1000}
          height={1000}
          className="max-h-[400px] overflow-hidden object-cover"
        />
      ) : (
        <>
          <Image
            src="/assets/icons/upload.svg"
            width={40}
            height={40}
            alt="upload"
          />
          <div className="flex flex-col justify-center gap-2 text-center text-dark-600">
            <p className="text-sm font-normal">
              <span className="text-green-500">Click to upload </span>
              or drag and drop
            </p>
            <p className="text-xs font-normal">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>
        </>
      )}
    </div>
  );
};
