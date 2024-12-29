import clsx from "clsx";
import Image from "next/image";
import React from "react";

interface StatCardProps {
  type: "appointments" | "pending" | "cancelled";
  count: number;
  label: string;
  icon: string;
}

export default function StatCard({
  count = 0,
  label,
  icon,
  type,
}: StatCardProps) {
  return (
    <div
      className={clsx(
        "flex flex-1 flex-col gap-6 rounded-2xl bg-cover p-6 shadow-lg",
        {
          "bg-appointments": type === "appointments",
          "bg-pending": type === "pending",
          "bg-cancelled": type === "cancelled",
        }
      )}
    >
      <div className="flex items-center gap-4">
        <Image
          src={icon}
          height={32}
          width={32}
          alt="appointments"
          className="size-8 w-fit"
        />
        <h2 className="text-3xl font-bold text-white">{count}</h2>
      </div>

      <p className="text-sm font-normal"> Total Number of {label}</p>
    </div>
  );
}
