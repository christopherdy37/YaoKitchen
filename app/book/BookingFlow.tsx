import { Suspense } from "react";
import InquiryFlow from "@/components/InquiryFlow";

export default function BookingFlow() {
  return (
    <Suspense>
      <InquiryFlow source="website" />
    </Suspense>
  );
}
