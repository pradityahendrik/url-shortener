const test = require('ava');
const sinon = require('sinon');
const urlMappingService = require('../../services/url_mapping_service');

test.beforeEach('Intialize sandbox', (t) => {
    t.context.sandbox = sinon.createSandbox();
});

test.afterEach.always('Restore Sandbox', (t) => {
    t.context.sandbox.restore();
});

test.serial('get by short code', async (t) => {
    const mockGetUrl = t.context.sandbox.mock(urlMappingService).expects('getByShortCode').resolves({
        "message": "success",
        "data": {
          "long_url": "https://www.linkedin.com/in/pradityahendrik",
          "short_url": "https://short.en/ltkivd"
        }
      });

    await urlMappingService.getByShortCode('ltkivd')
        .then((res) => {
            t.true(mockGetUrl.called);
        });
});
