"use client";

import { useEffect } from "react";

export function DynamicFavicon() {
    useEffect(() => {
        const setRoundedFavicon = async () => {
            const originalIconPath = "/favicon.jpg";
            const img = new Image();
            img.src = originalIconPath;
            img.crossOrigin = "anonymous";

            img.onload = () => {
                const canvas = document.createElement("canvas");
                const size = 64; // Use a decent resolution
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext("2d");

                if (!ctx) return;

                // Configuration for "rounded-md" look
                // Tailwind rounded-md is 6px. Relative to a standard 32px icon or higher, we scale it.
                // Let's assume the source is being drawn into a 64x64 square.
                // 6px on a 16px font base is 0.375rem.
                // Proportional radius: (6/16) * 100% ? No, let's just pick a pleasing ratio.
                // A standard rounded icon often has radius ~20-25% of the size.
                // "rounded-md" is small rounding. "rounded-xl" is larger.
                // Let's try to simulate a consistent "md" feel.
                const radius = 12; // 12px radius on 64px image (approx 18%)

                // Draw rounded rectangle mask
                ctx.beginPath();
                ctx.moveTo(radius, 0);
                ctx.lineTo(size - radius, 0);
                ctx.quadraticCurveTo(size, 0, size, radius);
                ctx.lineTo(size, size - radius);
                ctx.quadraticCurveTo(size, size, size - radius, size);
                ctx.lineTo(radius, size);
                ctx.quadraticCurveTo(0, size, 0, size - radius);
                ctx.lineTo(0, radius);
                ctx.quadraticCurveTo(0, 0, radius, 0);
                ctx.closePath();
                ctx.clip();

                // Draw the image into the clipped region
                ctx.drawImage(img, 0, 0, size, size);

                // Convert to data URL
                const dataUrl = canvas.toDataURL("image/png");

                // Update the link tag
                let link: HTMLLinkElement | null =
                    document.querySelector("link[rel~='icon']");
                if (!link) {
                    link = document.createElement("link");
                    link.rel = "icon";
                    document.head.appendChild(link);
                }
                link.href = dataUrl;
            };
        };

        setRoundedFavicon();
    }, []);

    return null;
}
