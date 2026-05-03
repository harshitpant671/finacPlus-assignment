import WebLocators from "./locator";

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.locators = new WebLocators(page);
  }

  async gotoLoginPage() {
    await this.page.goto("");
  }

  async fillUsername(username) {
    await this.locators.userName.fill(username);
  }

  async fillPassword(password) {
    await this.locators.password.fill(password);
  }

  async submit() {
    await this.locators.submit.click();
  }

  async LoginUser(username, password) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.submit();
  }
}

export default LoginPage;
