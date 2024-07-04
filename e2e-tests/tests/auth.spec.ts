import { test, expect } from "@playwright/test";

const UI_URI = "http://localhost:5173/";
test("should allow the user to sign in", async ({ page }) => {
  await page.goto(UI_URI);
  //get the sign in button
  await page.getByRole("link", { name: "Zaloguj" }).click();
  await expect(page.getByRole("heading", { name: "Zaloguj" })).toBeVisible();
  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("password123");

  await page.getByRole("button", { name: "Zaloguj" }).click();

  await expect(page.getByText("Pomyślnie zalogowano")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Moje Rezerwacje" })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Moje Hotele" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Wyloguj" })).toBeVisible();
});

test("should allow user to register", async ({ page }) => {
  const testEmail = `test_register_${
    Math.floor(Math.random() * 90000) + 10000
  }@test.com`;
  await page.goto(UI_URI);
  await page.getByRole("link", { name: "Zaloguj" }).click();
  await page.getByRole("link", { name: "Stwórz konto" }).click();
  await expect(
    page.getByRole("heading", { name: "Utwórz konto" })
  ).toBeVisible();

  await page.locator("[name=firstName]").fill("test_firstName");
  await page.locator("[name=lastName]").fill("test_lastName");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("password123");
  await page.locator("[name=confirmPassword]").fill("password123");

  await page.getByRole("button", { name: "Stwórz konto" }).click();

  await expect(page.getByText("Konto założone")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Moje Rezerwacje" })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Moje Hotele" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Wyloguj" })).toBeVisible();
});
