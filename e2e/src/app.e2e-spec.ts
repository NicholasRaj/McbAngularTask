import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';
import { doesNotReject } from 'assert';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Working flow', async () => {
    await page.navigateTo();
    expect(await page.getTitleText()).toEqual('Login');
    var userNameField = browser.driver.findElement(by.name('userName'));
    var userPassField = browser.driver.findElement(by.name('password'));
    var userLoginBtn  = browser.driver.findElement(by.css('.submit-btn button'));

    userNameField.sendKeys('mcb');
    userPassField.sendKeys('mcb@123');

    userLoginBtn.click();
    element(by.css('app-home .home-container #transaction')).click();
    // browser.waitForAngular();
    // var trans = element(by.css('app-new-transaction form input')).getText();
    // element(by.css('.home-container form input')).sendKeys("10");
    // var ref  = browser.driver.findElement(by.css('.flex-box .reference input'));
    // ref.sendKeys("1");
  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
