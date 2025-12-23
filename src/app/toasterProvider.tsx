"use client";
import { Toaster } from "sonner";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      richColors
      toastOptions={{ style: { zIndex: 9999 } }}
      expand={true}
    />
  );
}
