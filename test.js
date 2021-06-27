// Pulling required functions from node_modules
const { By, Key, Builder, WebElement, until, WebDriver } = require("selenium-webdriver");
require("chromedriver");
const assert = require('assert');
const puppeteer = require('puppeteer');
const { elementIsVisible } = require("selenium-webdriver/lib/until");

// As a user I want to navigate to Geopal website so I can get more information about company's application. 
// Test to verify that the page loads successfully.
async function test_page_load() {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("https://www.geopal.com/");
  await driver.findElement(By.className("c-hero__lead"));
  assert(driver.findElement(By.className("c-hero__lead")), "Page is not loaded successfully");
  await driver.quit();
}

// As a user I want to navigate to solutions webpage so I can see the services provided by Geopal.
// Test to verify that links in the solution dropdown works correctly.
async function test_links() {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("https://www.geopal.com/");
  let solutionbutton = driver.findElement(By.xpath("/html/body/header/div[2]/div/nav[2]/ul/li[2]/a"));
  driver.actions().mouseMove(solutionbutton).perform();
  await driver.findElement(By.xpath("/html/body/header/div[2]/div/nav[2]/ul/li[2]/ul/li[1]/a")).click();
  assert(driver.findElement(By.className("c-hero__lead")),"Utility Support Services link is not working correctly");

  await driver.get("https://www.geopal.com/");
  let dropdownbutton = driver.findElement(By.xpath("/html/body/header/div[2]/div/nav[2]/ul/li[2]/a"));
  driver.actions().mouseMove(dropdownbutton).perform();
  await driver.findElement(By.xpath("/html/body/header/div[2]/div/nav[2]/ul/li[2]/ul/li[5]/a")).click();
  assert(driver.findElement(By.className("c-hero__title")),"Environmental Services link is not working correctly");
  await driver.quit(); 
}

//As a user I want to navigate to Free Demo webpage so I can fill the form and request a trial of Geopal application.
//Taking a screenshot of the webpage.
async function test_form(){
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("https://www.geopal.com/");
  await driver.findElement(By.xpath("/html/body/header/div[2]/div/nav[2]/ul/li[9]/a")).click();
  await driver.findElement(By.name("firstname")).sendKeys("Tanaj");
  await driver.findElement(By.name("lastname")).sendKeys("Dhawan");
  await driver.findElement(By.name("organization")).sendKeys("Geopal");
  await driver.findElement(By.name("email")).sendKeys("Tanaj@geopal.com");
  await driver.findElement(By.name("phone")).sendKeys("089444444");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.screenshot({ path: 'screenshot.png' });
  await driver.quit(); 
}

//As a user I want to use the search function so I can easily navigate to the desired webpage.
//Test to verify that search feature works correctly
async function test_searchfeature(){
  var searchString = "Management Team";
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("https://www.geopal.com/");
  await driver.findElement(By.xpath("/html/body/header/div[2]/div/nav[2]/ul/li[8]/a")).click();
  await driver.findElement(By.id("edit-search-block-form--2")).sendKeys(searchString,Key.RETURN);
  assert(driver.findElement(By.linkText("Management Team")),"Result does not include the passed string");
  await driver.quit(); 
}

//As an admin user I want to login so I can get access to Geopal application. 
//Test to verify that login button works correctly.
async function test_loginbutton(){
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("https://www.geopal.com/");
  await driver.findElement(By.xpath("/html/body/header/div[2]/div/nav[1]/ul/li[5]/a")).click();
  driver.getAllWindowHandles().then(function gotWindowHandles(allhandles) {
    return driver.switchTo().window(allhandles[allhandles.length - 1]);
  });
  let newtab = By.xpath('//*[@id="login"]');
  await driver.wait(until.elementLocated(newtab));
  await driver.wait(until.elementIsVisible(driver.findElement(newtab)))
  assert(driver.findElement(By.name("login")),"Login field is not loaded");
  assert(driver.findElement(By.name("password")),"Password field is not loaded");
  await driver.quit();
}