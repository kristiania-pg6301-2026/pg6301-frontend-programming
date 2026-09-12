import * as React from "react";
import { type ReactNode, useEffect, useRef } from "react";

export default function Dialog({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose(): void;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  useEffect(() => {
    if (isOpen) dialogRef.current!.showModal();
    else dialogRef.current!.close();
  }, [isOpen]);
  useEffect(() => {
    dialogRef.current!.addEventListener("close", () => onClose());
  }, []);
  return <dialog ref={dialogRef}>{children}</dialog>;
}
