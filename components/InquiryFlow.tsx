"use client";

import { useState, useEffect, Fragment } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { CheckCircle, ArrowLeft, MessageCircle, Loader2 } from "lucide-react";

const STEPS = [
  { n: 1, label: "Select Date" },
  { n: 2, label: "Your Details" },
  { n: 3, label: "Confirmed" },
];

const inquirySchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  mobile: z.string().min(1, "Mobile number is required"),
  viber: z.string().optional(),
  email: z.string().optional(),
  eventDate: z.string().min(1),
  eventLocation: z.string().min(1, "Event location is required"),
  package: z.string().min(1, "Please select a package"),
  guestCount: z.number().int().min(1, "Enter estimated guest count"),
  notes: z.string().optional(),
});

type InquiryForm = z.infer<typeof inquirySchema>;

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-PH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Manila",
  });
}

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="mb-8 flex items-center justify-center">
      {STEPS.map((s, i) => (
        <Fragment key={s.n}>
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full font-inter text-sm font-bold transition-colors ${
                step > s.n
                  ? "bg-forest text-white"
                  : step === s.n
                    ? "bg-gold text-white"
                    : "bg-charcoal/10 text-charcoal/40"
              }`}
            >
              {step > s.n ? "✓" : s.n}
            </div>
            <span
              className={`hidden font-inter text-xs sm:block ${
                step === s.n ? "font-semibold text-charcoal" : "text-charcoal/40"
              }`}
            >
              {s.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`mb-5 h-0.5 w-12 transition-colors sm:w-20 ${
                step > s.n ? "bg-forest" : "bg-charcoal/10"
              }`}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}

const inputClass =
  "mt-1 w-full rounded-lg border border-charcoal/20 px-4 py-2.5 font-inter text-sm text-charcoal placeholder:text-charcoal/35 focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest/30";

const labelClass = "block font-inter text-sm font-semibold text-charcoal";

interface InquiryFlowProps {
  source?: string;
  partnerSlug?: string;
}

export default function InquiryFlow({ source = "website", partnerSlug }: InquiryFlowProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);
  const [loadingDates, setLoadingDates] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const viberNumber = process.env.NEXT_PUBLIC_VIBER_NUMBER ?? "";
  const viberClean = viberNumber.replace(/\D/g, "");

  useEffect(() => {
    fetch("/api/availability")
      .then((r) => r.json())
      .then((dates: string[]) => {
        setBlockedDates(dates.map((d) => new Date(d)));
      })
      .catch(() => setFetchError(true))
      .finally(() => setLoadingDates(false));
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<InquiryForm>({ resolver: zodResolver(inquirySchema) });

  function handleDateSelect(date: Date | undefined) {
    if (!date) return;
    setSelectedDate(date);
    setValue("eventDate", date.toISOString());
    setStep(2);
  }

  async function onSubmit(data: InquiryForm) {
    setSubmitError(null);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source,
          partnerSlug: partnerSlug ?? null,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setSubmitError(
          (err as { error?: string }).error ?? "Something went wrong. Please try again.",
        );
        return;
      }
      const { bookingRef: ref } = (await res.json()) as { bookingRef: string };
      setBookingRef(ref);
      setStep(3);
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    }
  }

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <ProgressBar step={step} />

      {step === 1 && (
        <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-playfair text-2xl font-bold text-charcoal">When is the event?</h2>
          <p className="mt-1 font-inter text-sm text-charcoal/60">
            Select a date at least 24 hours from today. Grayed-out dates are unavailable.
          </p>
          {fetchError && (
            <p className="mt-3 rounded-lg bg-amber-50 px-4 py-2.5 font-inter text-sm text-amber-700">
              Could not verify blocked dates. Proceed, then confirm availability on Viber.
            </p>
          )}
          {loadingDates ? (
            <div className="flex h-72 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-forest" />
            </div>
          ) : (
            <div className="yao-calendar mt-4 flex justify-center">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={[{ before: tomorrow }, ...blockedDates]}
                defaultMonth={tomorrow}
                showOutsideDays={false}
              />
            </div>
          )}
        </div>
      )}

      {step === 2 && selectedDate && (
        <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <button
            onClick={() => setStep(1)}
            className="mb-4 flex items-center gap-1.5 font-inter text-sm text-charcoal/55 hover:text-charcoal"
          >
            <ArrowLeft className="h-4 w-4" /> Back to calendar
          </button>
          <h2 className="font-playfair text-2xl font-bold text-charcoal">Your Details</h2>
          <p className="mt-1 font-inter text-sm text-charcoal/60">
            Event date:{" "}
            <span className="font-semibold text-charcoal">{formatDate(selectedDate)}</span>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <input type="hidden" {...register("eventDate")} />

            <div>
              <label className={labelClass}>Full Name <span className="text-red-500">*</span></label>
              <input {...register("fullName")} placeholder="e.g. Maria Santos" className={inputClass} />
              {errors.fullName && <p className="mt-1 font-inter text-xs text-red-500">{errors.fullName.message}</p>}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Mobile Number <span className="text-red-500">*</span></label>
                <input {...register("mobile")} placeholder="e.g. 09171234567" className={inputClass} />
                {errors.mobile && <p className="mt-1 font-inter text-xs text-red-500">{errors.mobile.message}</p>}
              </div>
              <div>
                <label className={labelClass}>Viber Number</label>
                <input {...register("viber")} placeholder="If different from mobile" className={inputClass} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Email Address</label>
              <input {...register("email")} type="email" placeholder="e.g. maria@example.com" className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Event Location <span className="text-red-500">*</span></label>
              <input {...register("eventLocation")} placeholder="e.g. Funeraria Paz, Quezon City" className={inputClass} />
              {errors.eventLocation && <p className="mt-1 font-inter text-xs text-red-500">{errors.eventLocation.message}</p>}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Package of Interest <span className="text-red-500">*</span></label>
                <select {...register("package")} className={inputClass + " bg-white"}>
                  <option value="">Select a package</option>
                  <option value="Basic">Basic (50–80 guests)</option>
                  <option value="Standard">Standard (80–120 guests)</option>
                  <option value="Premium">Premium (120–200 guests)</option>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
                {errors.package && <p className="mt-1 font-inter text-xs text-red-500">{errors.package.message}</p>}
              </div>
              <div>
                <label className={labelClass}>Estimated Guests <span className="text-red-500">*</span></label>
                <input {...register("guestCount", { valueAsNumber: true })} type="number" min={1} placeholder="e.g. 80" className={inputClass} />
                {errors.guestCount && <p className="mt-1 font-inter text-xs text-red-500">{errors.guestCount.message}</p>}
              </div>
            </div>

            <div>
              <label className={labelClass}>Additional Notes</label>
              <textarea
                {...register("notes")}
                rows={3}
                placeholder="Special requests, dietary concerns, setup preferences…"
                className={inputClass}
              />
            </div>

            {submitError && (
              <div className="rounded-lg bg-red-50 px-4 py-3 font-inter text-sm text-red-700">
                {submitError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-forest px-6 py-3 font-inter text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {isSubmitting ? (
                <><Loader2 className="h-4 w-4 animate-spin" />Submitting…</>
              ) : (
                "Submit Inquiry"
              )}
            </button>
          </form>
        </div>
      )}

      {step === 3 && (
        <div className="rounded-2xl bg-white p-6 text-center shadow-sm sm:p-8">
          <div className="flex justify-center">
            <CheckCircle className="h-14 w-14 text-forest" />
          </div>
          <h2 className="mt-4 font-playfair text-3xl font-bold text-charcoal">Inquiry Received!</h2>
          <p className="mt-2 font-inter text-sm text-charcoal/60">Your booking reference is:</p>
          <div className="mx-auto mt-4 max-w-xs rounded-xl bg-beige px-6 py-4">
            <p className="font-mono text-2xl font-bold tracking-widest text-forest">{bookingRef}</p>
          </div>
          <p className="mx-auto mt-3 max-w-sm font-inter text-sm text-charcoal/60">
            Screenshot or note this reference. Share it when you message us on Viber so we can confirm your booking quickly.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3">
            <Link
              href={`https://viber.me/${viberClean}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-[#7360F2] px-6 py-3 font-inter text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" />
              Continue on Viber
            </Link>
            <Link href="/" className="font-inter text-sm text-charcoal/50 hover:text-charcoal hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
