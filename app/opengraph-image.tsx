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
          background: "#070709",
          padding: "64px 76px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -300,
            left: -180,
            width: 820,
            height: 820,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124,140,255,0.32), transparent 62%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -320,
            right: -160,
            width: 740,
            height: 740,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(77,157,255,0.26), transparent 64%)",
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

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: 16,
                border: "1px solid rgba(124,140,255,0.55)",
                background:
                  "linear-gradient(135deg, rgba(124,140,255,0.18), rgba(77,157,255,0.06))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#f5f5f7",
                fontSize: 21,
                fontWeight: 600,
                letterSpacing: 1,
              }}
            >
              DP
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "#f5f5f7", fontSize: 24, fontWeight: 600 }}>
                Dhruv Parasher
              </span>
              <span
                style={{
                  color: "#8b8b9b",
                  fontSize: 12,
                  letterSpacing: 3.4,
                  textTransform: "uppercase",
                  marginTop: 6,
                }}
              >
                Full-Stack Developer | MERN Stack Engineer
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 999,
              padding: "8px 16px",
              color: "#a4a4b2",
              fontSize: 14,
            }}
          >
            <span
              style={{ width: 8, height: 8, borderRadius: 8, background: "#34d399", display: "flex" }}
            />
            Available for opportunities
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#8891ff",
              fontSize: 15,
              letterSpacing: 4,
              textTransform: "uppercase",
              marginBottom: 22,
            }}
          >
            Building digital experiences
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              color: "#f5f5f7",
              fontSize: 74,
              lineHeight: 1.02,
              letterSpacing: -3.2,
              fontWeight: 600,
              maxWidth: 960,
            }}
          >
            That make an impact.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: 24,
          }}
        >
          <div style={{ display: "flex", gap: 24, color: "#a4a4b2", fontSize: 16 }}>
            <span>React</span>
            <span>Next.js</span>
            <span>Node.js</span>
            <span>NestJS</span>
            <span>MongoDB</span>
            <span>TypeScript</span>
          </div>
          <div style={{ display: "flex", color: "#73737f", fontSize: 14, letterSpacing: 2 }}>
            4 YEARS · DELHI NCR, INDIA
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
