import type { Preview } from "@storybook/react";
import "../src/styles/globals.css";
import React from "react";

import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (story) => {
      return (
        <main
          className={`${geistSans.className} ${geistMono.className} antialiased`}
        >
          {story()}
        </main>
      );
    },
  ],
};

export default preview;
