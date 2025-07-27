"use client";

import { useUpload } from "@/hooks/useUpload";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

const FileUploader = () => {
  const { handleUpload, fileId, progess, status } = useUpload();
  const router = useRouter();

  useEffect(() => {
    if (fileId) {
      router.push(`/dashboard/document/${fileId}`);
    }
  }, [fileId, router]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      await handleUpload(file);
    } else {
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive, isFocused } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "application/pdf": [".pdf"],
    },
  });
  const uploading = progess !== null && progess >= 0 && progess <= 100;
  return (
    <div className="flex flex-col justify-center items-center text-center">
      {uploading && (
        <div className="mt-32 flex flex-col items-center gap-5 justify-center">
          <div
            className="radial-progress"
            //@ts-ignore
            style={{ "--value": progess }}
            aria-valuenow={70}
            role="progressbar"
          >
            {progess}%
          </div>
          <p className="text-lg text-purple-500">{status}</p>
        </div>
      )}
      <div
        {...getRootProps()}
        className={`p-10 border-2 border-dashed mt-10 w-[90%] border-blue-500 text-blue-500 max-w-4xl rounded-lg ${
          uploading && "hidden"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
    </div>
  );
};
export default FileUploader;
