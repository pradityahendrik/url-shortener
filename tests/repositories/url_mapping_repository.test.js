const test = require('ava');
const sinon = require('sinon');
const urlMappingRepository = require('../../repositories/url_mapping_repository');
var UrlMapping = require('../../databases/models/url_mapping');

test.beforeEach('Intialize sandbox', (t) => {
    t.context.sandbox = sinon.createSandbox();
});

test.afterEach.always('Restore Sandbox', (t) => {
    t.context.sandbox.restore();
});

test.serial('save - success', async (t) => {
    const mockCreate = t.context.sandbox.mock(UrlMapping).expects('create').resolves();
    await urlMappingRepository.save({
        "id": "uuid",
        "long_url": "https://linkedin.com/pradityahendrik",
        "short_code": "plokij"
    }).then((res) => {
        t.true(mockCreate.called);
    });
});

test.serial('findOne - success', async (t) => {
    const mockCreate = t.context.sandbox.mock(UrlMapping).expects('findOne').resolves({
        "long_url": "https://www.linkedin.com/in/pradityahendrik",
        "short_code": "ltkivd"
    });
    await urlMappingRepository.findOne('plokij').then((res) => {
        t.true(mockCreate.called);
    });
});
