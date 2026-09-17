import * as React from "react";
import { type ReactNode, useEffect, useRef } from "react";

export default function Dialog({
  isVisible,
  setIsVisible,
  children,
}: {
  children: ReactNode;
  isVisible: boolean;
  setIsVisible(b: boolean): void;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (isVisible) dialogRef.current!.showModal();
    else dialogRef.current!.close();
  }, [isVisible]);
  useEffect(() => {
    dialogRef.current!.addEventListener("close", () => {
      setIsVisible(false);
    });
  }, []);
  return <dialog ref={dialogRef}>{children}</dialog>;
}
