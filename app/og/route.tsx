import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");

  const fontPath = path.join(process.cwd(), "public/fonts/NunitoBold.ttf");
  const fontData = await readFile(fontPath);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
        }}
      >
        <div tw="w-full flex flex-col items-center text-center font-nunito tracking-widest text-[#1a1a1a]">
          <div tw="flex h-fit items-center justify-center">
            <div tw="relative flex">
              <div tw="absolute -bottom-2 left-0 h-16 w-full bg-[#f2e9e3] opacity-90" />
              <div tw="relative flex items-center px-4 text-8xl">
                Yen Cheng's Blog
              </div>
            </div>
          </div>
          {title && (
            <div tw="flex h-fit items-center justify-center pt-12">
              <div tw="relative flex items-center px-4 text-6xl">
                {title || "Yen Cheng's Blog"}
              </div>
            </div>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "nunito",
          data: fontData,
          style: "normal",
        },
      ],
    },
  );
}
