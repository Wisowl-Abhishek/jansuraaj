"use client";

import { useEffect } from "react";
import { captureUTM } from "@/utils/captureUTM";
import { referralCookieHandler } from "@/utils/ReferralCookieHandler";

export function TrackingHandler() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      captureUTM();
      referralCookieHandler();
    }
  }, []);

  return null;
}
