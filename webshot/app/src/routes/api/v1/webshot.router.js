const Router = require('koa-router');
const puppeteer = require('puppeteer');
const logger = require('logger');
const send = require('koa-send');
const tmp = require('tmp');
const url = require('url');
const rimraf = require('rimraf');
const WebshotURLError = require('errors/webshotURL.error');
const WebshotNotFoundError = require('errors/webshotNotFound.error');
const KoaSendError = require('errors/koaSend.error');
const { log } = require('console');

const router = new Router({
    prefix: '/webshot',
});

const viewportDefaultOptions = { width: 1024, height: 768, isMobile: true };
const gotoOptions = { waitUntil: ['networkidle2', 'domcontentloaded'] };
const browserArgs = ['--no-sandbox', '--single-process', '--no-first-run'];

const getDelayParam = (param) => {
    const n = parseInt(param, 10);
    // eslint-disable-next-line no-restricted-globals
    if (typeof n === 'number' && !isNaN(n)) return n;
    return param;
};

const VALID_FORMATS = ['pdf', 'png'];

class WebshotRouter {

    static async removeFolder(path) {
        return new Promise((resolve, reject) => {
            rimraf(path, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }

    static async screenshot(ctx) {
        ctx.assert(ctx.query.url, 400, 'url param is required');
        ctx.assert(ctx.query.filename, 400, 'filename param is required');
        if (ctx.query.format && !VALID_FORMATS.includes(ctx.query.format)) {
            ctx.assert(ctx.query.query, 400, 'format param is invalid');
        }
        logger.info(`Doing screenshot of ${ctx.query.url}`);

        // Validating URL
        const urlObject = url.parse(ctx.query.url);
        ctx.assert(/http|https/.test(urlObject.protocol), 400, 'The protocol in url param is not valid. Use http or https.');

        const viewportOptions = { ...viewportDefaultOptions };
        const tmpDir = tmp.dirSync();
        const saveAs = ctx.query.format || 'pdf';
        const filename = `${ctx.query.filename}-${Date.now()}.${saveAs}`;
        const filePath = `${tmpDir.name}/${filename}`;
        const delay = getDelayParam(ctx.query.waitFor);

        if (ctx.query.landscape && ctx.query.landscape === 'true') viewportOptions.isLandscape = true;
        if (ctx.query.width) viewportOptions.width = parseInt(ctx.query.width, 10);
        if (ctx.query.height) viewportOptions.height = parseInt(ctx.query.height, 10);

        let browser;
        try {
            logger.debug(`Saving in: ${filePath}`);

            // Using Puppeteer
            browser = await puppeteer.launch({ args: browserArgs });
            const page = await browser.newPage();
            await page.setExtraHTTPHeaders({
                'Cookie': ctx.request.headers['cookie']
            });
            await page.setViewport(viewportOptions);
            await page.goto(ctx.query.url, gotoOptions);
            if (delay) await page.waitFor(delay);
            if (ctx.query.mediatype) await page.emulateMedia(ctx.query.mediatype);

            // Whether to include the background
            const printBackground = !!(ctx.query.backgrounds && ctx.query.backgrounds === 'true');
            if (ctx.query.format === 'png') {
                await page.screenshot({
                    path: filePath,
                    printBackground
                });
            } else {
                await page.pdf({
                    path: filePath,
                    format: 'A4',
                    printBackground
                });
            }
        } catch (error) {
            if (error.message === 'not found') {
                throw new WebshotNotFoundError(`Error taking screenshot on URL ${ctx.query.url}: ${error}`);
            } else {
                throw new WebshotURLError(`Error taking screenshot on URL ${ctx.query.url}: ${error}`);
            }
        }

        browser.close();

        try {
            // Sending file to download
            ctx.set('Content-disposition', `attachment; filename=${filename}`);
            const contentType = `application/${saveAs}`;
            ctx.set('Content-type', contentType);
            await send(ctx, filePath, { root: '/' });
        } catch (error) {
            throw new KoaSendError(`Error sending screenshot ${ctx.query.url}: ${error}`);
        }
    }

}

router.get('/', WebshotRouter.screenshot);

module.exports = router;
