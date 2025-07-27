"use client";

import { db, storage } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export enum StatusText {
  UPLOADING = "Uploading",
  UPLOADED = "Uploaded",
  SAVING = "Saving",
  GENERATING = "Generating AI embeddings...",
}

export type Status = StatusText[keyof StatusText];

export function useUpload() {
  const [progess, setProgress] = useState<number | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const { user } = useUser();
  const router = useRouter();
  const handleUpload = async (file: File) => {
    if (!file || !user) return;
    const fileIdtoUploadTo = uuidv4();
    const storageRef = ref(
      storage,
      `users/${user.id}/files/${fileIdtoUploadTo}`
    );
    const UploadTask = uploadBytesResumable(storageRef, file);
    UploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setStatus(StatusText.UPLOADING);
        setProgress(percent);
      },
      (error) => {
        console.log(error);
      },
      async () => {
        setStatus(StatusText.UPLOADED);
        const downloadUrl = await getDownloadURL(UploadTask.snapshot.ref);
        setStatus(StatusText.SAVING);
        await setDoc(doc(db, "users", user.id, "files", fileIdtoUploadTo), {
          name: file.name,
          size: file.size,
          type: file.type,
          downloadUrl: downloadUrl,
          ref: UploadTask.snapshot.ref.fullPath,
          createdAt: new Date(),
        });
        setStatus(StatusText.GENERATING);
        setFileId(fileIdtoUploadTo);
      }
    );
  };
  return { handleUpload, progess, fileId, status };
}
