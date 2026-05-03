import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import WebLocators from "../../pages/locator";
import * as fs from "fs";

test.describe("Login Page", () => {
  test("should login with valid credentials", async ({ page }) => {
    const userLoginDetails = {
      userName: "admin",
      password: "Admin@123",
    };

    const bookName = "Learning JavaScript Design Patterns";

    const loginPage = new LoginPage(page);
    const locators = new WebLocators(page);

    await loginPage.gotoLoginPage();
    await locators.onBookStore.click();
    await locators.loginButton.click();
    await loginPage.LoginUser(
      userLoginDetails.userName,
      userLoginDetails.password,
    );

    await expect(locators.usernameValidate).toContainText(
      userLoginDetails.userName,
    );

    await expect(locators.logoutButtonVisible).toBeVisible();

    await locators.goToBookStore.click();

    await locators.searchBox.fill(bookName);
    await expect(page.locator(`//a[contains(.,"${bookName}")]`)).toBeVisible();

    const rows = page.locator("tbody");
    const count = await rows.count();

    let book = [];

    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);

      const title = await row.locator("td a").innerText();
      const author = await row.locator("td").nth(2).innerText();
      const publisher = await row.locator("td").nth(3).innerText();

      book.push({
        title,
        author,
        publisher,
      });
    }

    fs.writeFileSync("books.json", JSON.stringify(book, null, 2));

    await locators.logoutButton.click();
    await expect(locators.loginButton).toBeVisible();
  });
});
