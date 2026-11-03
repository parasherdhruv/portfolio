import { ImageResponse } from "next/og";

export const alt = "Dhruv Parasher — Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#070708",
          padding: "72px 80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -260,
            left: -180,
            width: 780,
            height: 780,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(143,124,255,0.30), transparent 62%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -300,
            right: -160,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(92,141,255,0.22), transparent 64%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "96px 96px",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.16)",
              background: "rgba(255,255,255,0.04)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#f4f4f6",
              fontSize: 17,
              letterSpacing: 1,
            }}
          >
            DP
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#f4f4f6", fontSize: 20, fontWeight: 500 }}>
              Dhruv Parasher
            </span>
            <span
              style={{
                color: "#6a6a76",
                fontSize: 13,
                letterSpacing: 3,
                textTransform: "uppercase",
                marginTop: 4,
              }}
            >
              Full-Stack Developer
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: "#9898a4",
              fontSize: 16,
              letterSpacing: 4,
              textTransform: "uppercase",
              marginBottom: 28,
            }}
          >
            <span
              style={{ width: 8, height: 8, borderRadius: 8, background: "#34d399", display: "flex" }}
            />
            Available for opportunities
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              color: "#f4f4f6",
              fontSize: 76,
              lineHeight: 1.02,
              letterSpacing: -3.5,
              fontWeight: 500,
              maxWidth: 940,
            }}
          >
            Building digital experiences that make an impact.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(255,255,255,0.09)",
            paddingTop: 26,
          }}
        >
          <div style={{ display: "flex", gap: 26, color: "#9898a4", fontSize: 17 }}>
            <span>React</span>
            <span>Next.js</span>
            <span>Node.js</span>
            <span>NestJS</span>
            <span>MongoDB</span>
            <span>TypeScript</span>
          </div>
          <div style={{ display: "flex", color: "#6a6a76", fontSize: 15, letterSpacing: 2 }}>
            4+ YEARS · DELHI NCR, INDIA
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
