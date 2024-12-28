"use client";
import React, { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { decryptKey, encryptKey } from "@/lib/utils";

export default function PassKeyModal() {
  const [open, setOpen] = useState(true);
  const [passKey, setPassKey] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const encryptedKey =
    typeof window !== 'undefined'
      ? window.localStorage.getItem("accessKey")
      : null;

      useEffect(() => {
        const accessKey = encryptedKey && decryptKey(encryptedKey);
       if (pathname) {
        if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
          setOpen(false);
          router.push("/admin");
        } else {
          setOpen(true);
        }
       }
      }, [encryptedKey])
      

  const closeModal = () => {
    setOpen(false);
    router.push("/");
  };

  const validatePassKey = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (passKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passKey);
      localStorage.setItem("accessKey", encryptedKey);
      setOpen(false);
    } else {
      setError("Invalid PassKey! Please try again.");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="space-y-5 bg-dark-400 border-dark-500 outline-none">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Admin Access Verification
            <Image
              src="/assets/icons/close.svg"
              alt="close"
              width={20}
              height={20}
              onClick={closeModal}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin page, please enter the passKey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP
            maxLength={6}
            value={passKey}
            onChange={(value) => setPassKey(value)}
          >
            <InputOTPGroup className="w-full flex justify-between">
              <InputOTPSlot
                className="text-4xl font-bold justify-center flex border border-dark-500 rounded-lg size-16 gap-4"
                index={0}
              />
              <InputOTPSlot
                className="text-4xl font-bold justify-center flex border border-dark-500 rounded-lg size-16 gap-4"
                index={1}
              />
              <InputOTPSlot
                className="text-4xl font-bold justify-center flex border border-dark-500 rounded-lg size-16 gap-4"
                index={2}
              />
              <InputOTPSlot
                className="text-4xl font-bold justify-center flex border border-dark-500 rounded-lg size-16 gap-4"
                index={3}
              />
              <InputOTPSlot
                className="text-4xl font-bold justify-center flex border border-dark-500 rounded-lg size-16 gap-4"
                index={4}
              />
              <InputOTPSlot
                className="text-4xl font-bold justify-center flex border border-dark-500 rounded-lg size-16 gap-4"
                index={5}
              />
            </InputOTPGroup>
          </InputOTP>

          {error && (
            <p className="flex justify-center text-red-400 text-sm font-normal mt-4">
              {error}
            </p>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            className="bg-green-500 text-white w-full"
            onClick={validatePassKey}
          >
            Enter Admin Passkey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
