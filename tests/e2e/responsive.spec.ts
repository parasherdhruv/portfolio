import { expect, test } from "@playwright/test";

const viewports = [
  { name: "small phone", width: 320, height: 740 },
  { name: "phone", width: 360, height: 800 },
  { name: "large phone", width: 390, height: 844 },
  { name: "wide phone", width: 430, height: 932 },
  { name: "small tablet", width: 600, height: 960 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "small laptop", width: 1024, height: 768 },
  { name: "desktop", width: 1280, height: 900 },
  { name: "wide desktop", width: 1600, height: 1000 },
];

for (const viewport of viewports) {
  test(`content fits ${viewport.name} (${viewport.width}px)`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toBeVisible();

    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
    }));
    expect(dimensions.document, `document overflow: ${JSON.stringify(dimensions)}`).toBeLessThanOrEqual(dimensions.viewport);
    expect(dimensions.body, `body overflow: ${JSON.stringify(dimensions)}`).toBeLessThanOrEqual(dimensions.viewport);

    const name = page.getByText("Hi, I'm Dhruv Parasher");
    await expect(name).toBeVisible();
    const heading = await page.locator("h1").boundingBox();
    expect(heading).not.toBeNull();
    expect(heading!.x).toBeGreaterThanOrEqual(0);
    expect(heading!.x + heading!.width).toBeLessThanOrEqual(viewport.width + 1);

    const statValues = page.locator("#top dl dd").filter({ hasText: /^(4|5|Full-Stack)$/ });
    await expect(statValues).toHaveCount(3);
    for (const value of await statValues.all()) {
      const box = await value.boundingBox();
      expect(box).not.toBeNull();
      const textWidth = await value.evaluate((el) => el.scrollWidth);
      expect(box!.width).toBeGreaterThanOrEqual(textWidth - 1);
    }
  });
}

test("mobile navigation hides desktop CTA and menu works", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("link", { name: "Let's talk" })).toBeHidden();
  const menu = page.getByRole("button", { name: "Open menu" });
  await expect(menu).toBeVisible();
  await menu.click();
  await expect(page.locator("#mobile-menu")).toBeVisible();
  const mobileWorkLink = page.locator("#mobile-menu").getByRole("link", { name: /Work/ });
  await expect(mobileWorkLink).toBeVisible();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await mobileWorkLink.click();
  await expect(page.locator("#mobile-menu")).toBeHidden();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

test("tablet and desktop navigation expose the expected controls", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 900 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("link", { name: "Let's talk" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();

  await page.setViewportSize({ width: 1024, height: 900 });
  await expect(page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "About" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Open menu" })).toBeHidden();
});

test("theme popover stays inside narrow viewport and controls remain usable", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Customize appearance" }).click();
  const panel = page.getByRole("dialog", { name: "Theme settings" });
  await expect(panel).toBeVisible();
  const box = await panel.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(320);
  await expect(page.getByRole("radio", { name: "Dark" })).toBeVisible();
  await expect(page.getByRole("radio", { name: /Amber/ })).toBeVisible();
});

test("sections and contact form remain usable at phone and tablet widths", async ({ page }) => {
  for (const width of [320, 390, 600, 768]) {
    await page.setViewportSize({ width, height: 850 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    for (const id of ["about", "experience", "work", "skills", "philosophy", "contact"]) {
      const section = page.locator(`#${id}`);
      await expect(section).toHaveCount(1);
      const box = await section.boundingBox();
      expect(box, `${id} should be laid out at ${width}px`).not.toBeNull();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(width + 1);
    }
    await expect(page.getByLabel(/Name/)).toBeVisible();
    await expect(page.getByLabel(/Email/)).toBeVisible();
    await expect(page.getByLabel("Message*")).toBeVisible();
  }
});
