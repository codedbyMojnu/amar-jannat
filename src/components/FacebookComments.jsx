"use client";

import Script from "next/script";
import { useEffect, useMemo, useRef, useState } from "react";

const ensureAbsoluteUrl = (raw) => {
  if (!raw && typeof window !== "undefined") return window.location.href;
  if (!raw) return "";
  try {
    const origin =
      typeof window !== "undefined" ? window.location.origin : undefined;
    const url = new URL(raw, origin);
    if (url.protocol === "http:" || url.protocol === "https:") {
      return url.toString();
    }
    return "";
  } catch {
    return "";
  }
};

const getPreferredColorScheme = () => {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const FacebookComments = ({
  href,
  width = "100%",
  numposts = 5,
  orderBy = "social",
  colorScheme,
  locale = "en_US",
  nonce,
  appId,
  lazy = true,
  className,
  style,
}) => {
  const containerRef = useRef(null);
  const [pageHref, setPageHref] = useState("");
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [inView, setInView] = useState(!lazy);

  const resolvedAppId = useMemo(
    () => appId || process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "",
    [appId]
  );

  const normalizedWidth = typeof width === "number" ? String(width) : width;

  useEffect(() => {
    const normalized = ensureAbsoluteUrl(href);
    setPageHref(normalized);
  }, [href]);

  useEffect(() => {
    if (!resolvedAppId && process.env.NODE_ENV !== "production") {
      console.warn(
        "FacebookComments: NEXT_PUBLIC_FACEBOOK_APP_ID is not set and no appId prop was provided. Comments plugin may not initialize."
      );
    }
  }, [resolvedAppId]);

  useEffect(() => {
    if (!lazy || inView) return;
    const el = containerRef.current;
    if (
      !el ||
      typeof window === "undefined" ||
      !("IntersectionObserver" in window)
    ) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [lazy, inView]);

  const resolvedColorScheme = useMemo(() => {
    return colorScheme || getPreferredColorScheme();
  }, [colorScheme]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.FB) {
      setSdkLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!sdkLoaded || !pageHref) return;
    try {
      const FB = window.FB;
      if (FB && typeof FB.XFBML?.parse === "function") {
        FB.XFBML.parse(containerRef.current || undefined);
      }
    } catch {}
  }, [sdkLoaded, pageHref]);

  if (!pageHref) return null;

  return (
    <div
      ref={containerRef}
      style={{ marginTop: "2.5rem", ...style }}
      className={className}
    >
      {inView && resolvedAppId && (
        <Script
          id="facebook-jssdk"
          strategy="afterInteractive"
          async
          defer
          crossOrigin="anonymous"
          src={`https://connect.facebook.net/${encodeURIComponent(
            locale
          )}/sdk.js#xfbml=1&version=v17.0&appId=${encodeURIComponent(
            resolvedAppId
          )}&autoLogAppEvents=1`}
          nonce={nonce}
          onLoad={() => {
            setSdkLoaded(true);
            try {
              const FB = window.FB;
              FB?.XFBML?.parse?.(containerRef.current || undefined);
            } catch {}
          }}
        />
      )}

      {inView && (
        <div
          className="fb-comments"
          data-href={pageHref}
          data-width={normalizedWidth}
          data-numposts={numposts}
          data-order-by={orderBy}
          data-colorscheme={resolvedColorScheme}
        />
      )}

      {!resolvedAppId && (
        <noscript>
          Facebook Comments unavailable: missing appId (set
          NEXT_PUBLIC_FACEBOOK_APP_ID).
        </noscript>
      )}
    </div>
  );
};

FacebookComments.displayName = "FacebookComments";

export default FacebookComments;
