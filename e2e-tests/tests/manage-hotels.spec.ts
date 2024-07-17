import { test, expect } from "@playwright/test";
import path from "path";

const UI_URI = "http://localhost:5173/";
test.beforeEach(async ({ page }) => {
  await page.goto(UI_URI);
  //get the sign in button
  await page.getByRole("link", { name: "Zaloguj" }).click();
  await expect(page.getByRole("heading", { name: "Zaloguj" })).toBeVisible();
  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("password123");

  await page.getByRole("button", { name: "Zaloguj" }).click();

  await expect(page.getByText("Pomyślnie zalogowano")).toBeVisible();
});

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URI}add-hotel`);
  await page.locator('[name="name"]').fill("Test Hotel");
  await page.locator('[name="city"]').fill("Test City");
  await page.locator('[name="country"]').fill("Test Country");
  await page
    .locator('[name="description"]')
    .fill("This is a description for the Test Hotel");
  await page.locator('[name="pricePerNight"]').fill("100");
  await page.selectOption('select[name="starRating"]', "3");
  await page.getByText("budzetowy").click();
  await page.getByLabel("parking").check();
  await page.getByLabel("basen").check();

  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("3");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "1.png"),
    path.join(__dirname, "files", "2.png"),
  ]);
  await page.getByRole("button", { name: "Zapisz" }).click();
  await expect(page.getByText("Hotel Zapisany!")).toBeVisible();
});
