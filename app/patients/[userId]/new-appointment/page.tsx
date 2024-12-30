import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";
import React from "react";

export default async function NewAppointment({
  params: { userId },
}: SearchParamProps) {
  console.log("userId: ", userId);
  const patient = await getPatient(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="max-w-[860px] mx-auto flex-1 justify-between size-full flex flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="patient"
            width={1000}
            height={1000}
            className="mb-12 h-10 w-fit"
          />
          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id}
          />
          <p className="text-sm font-normal justify-items-end text-center text-dark-600 xl:text-left py-10">
            © 2024 CarePulse
          </p>
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        alt="patient"
        width={1000}
        height={1000}
        className="hidden h-full object-cover md:block max-w-[390px] bg-bottom"
      />
    </div>
  );
}
