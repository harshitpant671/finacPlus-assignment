import { Page } from "@playwright/test";
import WebLocators from "./locator";

export class LoginPage {
  page: Page;
  locators: WebLocators;

  constructor(page: Page) {
    this.page = page;
    this.locators = new WebLocators(page);
  }

  async gotoLoginPage() {
    await this.page.goto("");
  }

  async fillUsername(username: string) {
    await this.locators.userName.fill(username);
  }

  async fillPassword(password: string) {
    await this.locators.password.fill(password);
  }

  async submit() {
    await this.locators.submit.click();
  }

  async LoginUser(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.submit();
  }
}