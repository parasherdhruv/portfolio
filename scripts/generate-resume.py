#!/usr/bin/env python3
"""Generate a clean one-page resume PDF for Dhruv Parasher.

Uses only the Python standard library. Helvetica (base-14) keeps the file small
and dependency-free so the site can ship a real PDF download.
"""

from pathlib import Path

PAGE_W, PAGE_H = 595.28, 841.89  # A4
MARGIN = 52
CONTENT_W = PAGE_W - MARGIN * 2

INK = (0.035, 0.035, 0.045)
MUTED = (0.38, 0.38, 0.43)
FAINT = (0.62, 0.62, 0.68)
ACCENT = (0.36, 0.27, 0.78)
LINE = (0.86, 0.86, 0.89)

# Rough Helvetica advance widths (fraction of font size) for wrapping.
NARROW = set("iljtfrI.,:;'!|()[]")


def char_width(ch: str) -> float:
    if ch == " ":
        return 0.28
    if ch in NARROW:
        return 0.29
    if ch.isupper():
        return 0.68
    if ch.isdigit():
        return 0.56
    if ch in "mwMW@":
        return 0.83
    return 0.53


def text_width(text: str, size: float) -> float:
    return sum(char_width(c) for c in text) * size


def wrap(text: str, size: float, width: float) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if text_width(candidate, size) <= width or not current:
            current = candidate
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def escape(text: str) -> str:
    replacements = {
        "\u2014": "-",
        "\u2013": "-",
        "\u2019": "'",
        "\u00b7": "|",
        "\u2022": "-",
        "\u00a0": " ",
    }
    for source, target in replacements.items():
        text = text.replace(source, target)
    return text.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")


class PDF:
    def __init__(self) -> None:
        self.ops: list[str] = []

    def color(self, rgb: tuple[float, float, float], stroke: bool = False) -> None:
        op = "RG" if stroke else "rg"
        self.ops.append(f"{rgb[0]:.3f} {rgb[1]:.3f} {rgb[2]:.3f} {op}")

    def text(
        self,
        x: float,
        y: float,
        value: str,
        size: float,
        font: str = "F1",
        rgb: tuple[float, float, float] = INK,
    ) -> None:
        self.color(rgb)
        self.ops.append(
            f"BT /{font} {size:.2f} Tf 1 0 0 1 {x:.2f} {y:.2f} Tm ({escape(value)}) Tj ET"
        )

    def rect(
        self,
        x: float,
        y: float,
        w: float,
        h: float,
        rgb: tuple[float, float, float],
    ) -> None:
        self.color(rgb)
        self.ops.append(f"{x:.2f} {y:.2f} {w:.2f} {h:.2f} re f")

    def line(
        self,
        x1: float,
        y1: float,
        x2: float,
        y2: float,
        rgb: tuple[float, float, float],
        width: float = 0.6,
    ) -> None:
        self.color(rgb, stroke=True)
        self.ops.append(
            f"{width:.2f} w {x1:.2f} {y1:.2f} m {x2:.2f} {y2:.2f} l S"
        )

    def spacer_line(self, y: float) -> None:
        self.line(MARGIN, y, MARGIN + 34, y, ACCENT, 1.4)
        self.line(MARGIN + 38, y, PAGE_W - MARGIN, y, LINE, 0.6)

    def build(self) -> bytes:
        stream = "\n".join(self.ops).encode("latin-1")
        objects: list[bytes] = []

        def obj(body: str) -> None:
            objects.append(body.encode("latin-1"))

        obj("<< /Type /Catalog /Pages 2 0 R >>")
        obj("<< /Type /Pages /Kids [3 0 R] /Count 1 >>")
        obj(
            "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 "
            f"{PAGE_W:.2f} {PAGE_H:.2f}] /Resources << /Font << "
            "/F1 4 0 R /F2 5 0 R /F3 6 0 R >> >> /Contents 7 0 R >>"
        )
        obj("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>")
        obj("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>")
        obj("<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>")
        obj(f"<< /Length {len(stream)} >>\nstream\n" + stream.decode("latin-1") + "\nendstream")

        out = bytearray(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
        offsets: list[int] = []
        for index, body in enumerate(objects, start=1):
            offsets.append(len(out))
            out.extend(f"{index} 0 obj\n".encode("latin-1"))
            out.extend(body)
            out.extend(b"\nendobj\n")

        xref_at = len(out)
        out.extend(f"xref\n0 {len(objects) + 1}\n".encode("latin-1"))
        out.extend(b"0000000000 65535 f \n")
        for offset in offsets:
            out.extend(f"{offset:010d} 00000 n \n".encode("latin-1"))
        out.extend(
            (
                f"trailer\n<< /Size {len(objects) + 1} /Root 1 0 R >>\n"
                f"startxref\n{xref_at}\n%%EOF\n"
            ).encode("latin-1")
        )
        return bytes(out)


def build_resume() -> bytes:
    pdf = PDF()
    x = MARGIN
    y = PAGE_H - 64

    pdf.text(x, y, "F U L L - S T A C K   D E V E L O P E R", 8, "F2", ACCENT)
    y -= 30
    pdf.text(x, y, "Dhruv Parasher", 30, "F2", INK)
    y -= 20
    pdf.text(
        x,
        y,
        "MERN Stack Engineer  |  4+ Years Experience  |  Delhi NCR, India",
        10,
        "F1",
        MUTED,
    )
    y -= 15
    pdf.text(
        x,
        y,
        "email: dhpar22@gmail.com   ·   github: github.com/parasherdhruv   ·   linkedin: linkedin.com/in/dhruvparasher",
        8.4,
        "F1",
        FAINT,
    )

    y -= 26
    pdf.spacer_line(y)
    y -= 26

    def section(title: str) -> None:
        nonlocal y
        if y < 120:
            return
        pdf.text(x, y, title.upper(), 8.6, "F2", ACCENT)
        y -= 16

    def paragraph(body: str, size: float = 9.4, leading: float = 14, rgb=MUTED) -> None:
        nonlocal y
        for line in wrap(body, size, CONTENT_W):
            pdf.text(x, y, line, size, "F1", rgb)
            y -= leading

    def bullet(body: str, size: float = 9.4, leading: float = 13.6) -> None:
        nonlocal y
        lines = wrap(body, size, CONTENT_W - 14)
        for index, line in enumerate(lines):
            if index == 0:
                pdf.rect(x + 1, y + 2.6, 3.2, 3.2, ACCENT)
            pdf.text(x + 13, y, line, size, "F1", MUTED)
            y -= leading

    def entry(heading: str, meta: str, meta_size: float = 8.4) -> None:
        nonlocal y
        pdf.text(x, y, heading, 10.2, "F2", INK)
        if meta:
            pdf.text(x, y - 10.5, meta, meta_size, "F1", FAINT)
            y -= 24
        else:
            y -= 15

    section("Profile")
    paragraph(
        "Full-Stack Developer with 4 years of experience building scalable web applications, "
        "modern user interfaces, and robust backend systems. Specialized in React, Next.js, "
        "Node.js, Express.js, NestJS, MongoDB, and TypeScript. Experienced in designing "
        "maintainable architectures, optimizing application performance, and using AI-assisted "
        "development to ship features efficiently."
    )
    y -= 12

    section("Experience")
    entry("Qloron Pvt. Ltd.  —  Full-Stack Developer", "MERN Stack  ·  Delhi NCR, India  ·  20XX — Present (placeholder)")
    for item in [
        "Full-stack MERN development across client-facing and internal applications.",
        "Built React and Next.js applications with reusable, accessible component systems.",
        "Developed Node.js and NestJS backend services and integrated third-party APIs.",
        "Designed and consumed REST APIs with predictable contracts and validation.",
        "Improved frontend performance through profiling, code-splitting, and render optimization.",
        "Contributed to enterprise application delivery and frontend architecture decisions.",
    ]:
        bullet(item)
    y -= 12

    section("Selected Projects")
    projects = [
        (
            "Orbit Mart  —  E-commerce ecosystem",
            "React, Redux Toolkit, Material UI, Tailwind CSS, Syncfusion DataGrid. Merchant, admin, "
            "and customer-facing applications with data-dense operational interfaces and a shared "
            "reusable UI architecture.",
        ),
        (
            "Procalyx  —  AI-assisted development",
            "AI-assisted feature implementation and ship-feature workflows; rapid iteration from "
            "prompt to review while keeping architecture decisions with the engineer.",
        ),
        (
            "Pimpri Chinchwad Municipal Corporation  —  Public-sector platform",
            "Next.js, React, TypeScript, Tailwind CSS. Maintainable frontend architecture and "
            "responsive interfaces for high-volume civic services.",
        ),
        (
            "MLA Management Application  —  Operations console",
            "React, Node.js, Express.js, MongoDB. Data-driven dashboards, request workflows, and "
            "high-density records for constituency operations.",
        ),
        (
            "Surplus Finance  —  Backend engineering",
            "Node.js, Express.js, MongoDB, REST APIs, Redis. API design, database modeling, and "
            "service boundaries for financial workflows.",
        ),
    ]
    for title, body in projects:
        pdf.text(x, y, title, 9.6, "F2", INK)
        y -= 13
        for line in wrap(body, 9.0, CONTENT_W - 2):
            pdf.text(x, y, line, 9.0, "F1", MUTED)
            y -= 12.6
        y -= 7
    y -= 5

    section("Technical Skills")
    skills = [
        ("Frontend", "React, Next.js, TypeScript, JavaScript, Redux Toolkit, TanStack Query, Tailwind CSS, Material UI, Shadcn UI"),
        ("Backend", "Node.js, Express.js, NestJS, REST APIs, GraphQL"),
        ("Database & Cloud", "MongoDB, Redis, AWS S3, AWS EC2, AWS Lambda, AWS CloudFront"),
        ("Tools", "Git, GitHub, GitLab, Docker, CI/CD, Vercel, AI-assisted development"),
    ]
    for label, items in skills:
        pdf.text(x, y, label, 8.6, "F2", INK)
        pdf.text(x + 108, y, items, 8.8, "F1", MUTED)
        y -= 15.5
    y -= 10

    section("Education")
    paragraph(
        "Degree and institution placeholder — add verified education details before publishing.",
        9.2,
        13,
        FAINT,
    )

    y -= 10
    pdf.line(MARGIN, y, PAGE_W - MARGIN, y, LINE, 0.6)
    y -= 14
    pdf.text(
        x,
        y,
        "Placeholder document generated for this portfolio. Verify dates, contact details, and metrics before use.",
        7.6,
        "F1",
        FAINT,
    )

    return pdf.build()


def main() -> None:
    target = Path(__file__).resolve().parent.parent / "public" / "resume" / "dhruv-parasher-resume.pdf"
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_bytes(build_resume())
    print(f"wrote {target} ({target.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
