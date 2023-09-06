import localFont from "next/font/local";

export const SpaceGrotesk = localFont({
  src: [
    {
      path: "./SpaceGrotesk-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./SpaceGrotesk-SemiBold.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./SpaceGrotesk-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "block",
  variable: "--font-space-grotesk",
});
