const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");

exports.handler = async function (event, context) {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: { height: 630, width: 1200 },
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  await page.setContent("<body>This is a <strong>Demo</strong></body>");
  await page.waitForTimeout(1000);

  const buffer = await page.screenshot();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "image/png",
    },
    body: buffer.toString("base64"),
    isBase64Encoded: true,
  };
};
