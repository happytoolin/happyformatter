import { getOgImageCard, getOgImageStaticPaths, renderOgImageSvg } from "@/lib/og-image";
import type { APIRoute } from "astro";
import sharp from "sharp";

export const getStaticPaths = getOgImageStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const svg = renderOgImageSvg(getOgImageCard(params.slug ?? "home"));
  const png = await sharp(Buffer.from(svg))
    .png({
      adaptiveFiltering: true,
      compressionLevel: 9,
    })
    .toBuffer();

  return new Response(new Uint8Array(png), {
    headers: {
      "Cache-Control": "public, max-age=86400",
      "Content-Type": "image/png",
    },
  });
};
