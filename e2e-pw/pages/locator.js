class WebLocators {
  constructor(page) {
    this.page = page;

    this.userName = page.locator("#userName");
    this.password = page.locator("#password");
    this.submit = page.getByRole("button", { name: "Login" });

    this.onBookStore = page.getByText("Book Store Application");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.usernameValidate = page.locator("#userName-value");
    this.logoutButtonVisible = page.getByRole("button", { name: "Logout" });
    this.goToBookStore = page.getByRole("button", { name: "Go To Book Store" });
    this.searchBox = page.locator("#searchBox");
    this.logoutButton = page.getByRole("button", { name: "Log out" });
  }
}

export default WebLocators;
