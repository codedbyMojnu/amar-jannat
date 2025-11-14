import Script from "next/script";
import React, { useEffect, useMemo, useRef, useState } from "react";

type OrderBy = "social" | "reverse_time" | "time";
type ColorScheme = "light" | "dark";

interface FacebookCommentsProps {
  // Optional: absolute URL or path. If not provided, current page URL will be used client-side.
  href?: string;
  // Width can be percentage or pixel string (e.g., "100%" or "600").
  width?: string | number;
  // Number of comments to show initially
  numposts?: number;
  // Sorting strategy
  orderBy?: OrderBy;
  // Color scheme adapts to site theme
  colorScheme?: ColorScheme;
  // Facebook locale, e.g., "en_US", "bn_IN". Defaults to en_US.
  locale?: string;
  // Provide a CSP nonce if your site uses one
  nonce?: string;
  // Optional override; otherwise reads from NEXT_PUBLIC_FACEBOOK_APP_ID
  appId?: string;
  // Lazy render when in viewport
  lazy?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const ensureAbsoluteUrl = (raw: string | undefined): string => {
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

const getPreferredColorScheme = (): ColorScheme => {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const FacebookComments: React.FC<FacebookCommentsProps> = ({
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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pageHref, setPageHref] = useState<string>("");
  const [sdkLoaded, setSdkLoaded] = useState<boolean>(false);
  const [inView, setInView] = useState<boolean>(!lazy);

  const resolvedAppId = useMemo(
    () => appId || process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "",
    [appId]
  );

  // Normalize width to string
  const normalizedWidth = typeof width === "number" ? String(width) : width;

  // Resolve URL on mount / href changes (client-side only)
  useEffect(() => {
    const normalized = ensureAbsoluteUrl(href);
    setPageHref(normalized);
  }, [href]);

  // Warn if appId is missing (dev only)
  useEffect(() => {
    if (!resolvedAppId && process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn(
        "FacebookComments: NEXT_PUBLIC_FACEBOOK_APP_ID is not set and no appId prop was provided. Comments plugin may not initialize."
      );
    }
  }, [resolvedAppId]);

  // IntersectionObserver for lazy render
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

  // Detect OS theme if not provided
  const resolvedColorScheme = useMemo<ColorScheme>(() => {
    return colorScheme || getPreferredColorScheme();
  }, [colorScheme]);

  // If SDK already loaded on page, mark as loaded
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).FB) {
      setSdkLoaded(true);
    }
  }, []);

  // Re-parse XFBML when SDK is loaded or href changes
  useEffect(() => {
    if (!sdkLoaded || !pageHref) return;
    try {
      const FB = (window as any).FB;
      if (FB && typeof FB.XFBML?.parse === "function") {
        // Parse only within this container for efficiency
        FB.XFBML.parse(containerRef.current || undefined);
      }
    } catch {
      // ignore
    }
  }, [sdkLoaded, pageHref]);

  // Don't render until we know the page URL on client
  if (!pageHref) return null;

  return (
    <div
      ref={containerRef}
      style={{ marginTop: "2.5rem", ...style }}
      className={className}
    >
      {/* Load SDK only when in view to save resources */}
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
              const FB = (window as any).FB;
              FB?.XFBML?.parse?.(containerRef.current || undefined);
            } catch {
              // noop
            }
          }}
        />
      )}

      {/* Comments plugin */}
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
