import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getTitleText(){
    return element(by.css('app-login form h2')).getText() as Promise<string>;
  }
}
