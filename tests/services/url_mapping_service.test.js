const test = require('ava');
const sinon = require('sinon');
const redisClient = require('../../databases/redis');
const urlMappingService = require('../../services/url_mapping_service');
const urlMappingRepository = require('../../repositories/url_mapping_repository');
const helper = require('../../utils/helpers/helper');

test.beforeEach('Intialize sandbox', (t) => {
    t.context.sandbox = sinon.createSandbox();
});

test.afterEach.always('Restore Sandbox', (t) => {
    t.context.sandbox.restore();
});

test.serial('get by short code (cache) - success', async (t) => {
    const mockCache = t.context.sandbox.mock(redisClient).expects('get').resolves("{\"id\":\"ae228674-41b0-4e71-b314-dd4832c89d77\",\"long_url\":\"https://www.linkedin.com/in/pradityahendrik\",\"short_code\":\"ltkivd\",\"updatedAt\":\"2024-04-01T00:37:58.840Z\",\"createdAt\":\"2024-04-01T00:37:58.840Z\",\"deletedAt\":null}");

    await urlMappingService.getByShortCode('ltkivd')
        .then((res) => {
            t.true(mockCache.called);
            t.deepEqual(res, {
                code: 200,
                response: {
                  message: 'success',
                  data: {
                    long_url: 'https://www.linkedin.com/in/pradityahendrik',
                    short_url: 'https://short.en/ltkivd'
                  }
                }
            });
        });
});

test.serial('get by short code (fallback to db) - success', async (t) => {
    const mockCache = t.context.sandbox.mock(redisClient).expects('get').resolves(null);
    const mockDb = t.context.sandbox.mock(urlMappingRepository).expects('findOne').resolves({
        "long_url": "https://www.linkedin.com/in/pradityahendrik",
        "short_code": "ltkivd"
    });
    const mockCacheSet = t.context.sandbox.mock(redisClient).expects('set').resolves();
    await urlMappingService.getByShortCode('ltkivd')
        .then((res) => {
            t.true(mockCache.called);
            t.true(mockDb.called);
            t.true(mockCacheSet.called);
            t.deepEqual(res, {
                code: 200,
                response: {
                  message: 'success',
                  data: {
                    long_url: 'https://www.linkedin.com/in/pradityahendrik',
                    short_url: 'https://short.en/ltkivd'
                  }
                }
            })
        });
});

test.serial('get by short code - not found', async (t) => {
    const mockCache = t.context.sandbox.mock(redisClient).expects('get').resolves(null);
    const mockDb = t.context.sandbox.mock(urlMappingRepository).expects('findOne').resolves(null);
    await urlMappingService.getByShortCode('ltkivd')
        .then((res) => {
            t.true(mockCache.called);
            t.true(mockDb.called);
            t.deepEqual(res, { code: 404, response: { message: 'Data not found', data: null } })
        });
});

test.serial('shorten - success', async (t) => {
    const mockGenerateCode = t.context.sandbox.mock(helper).expects('generateShortCode').resolves('ltkivd');
    const mockCheck = t.context.sandbox.mock(urlMappingRepository).expects('findOne').resolves(null);
    const mockSave = t.context.sandbox.mock(urlMappingRepository).expects('save').resolves({
        "long_url": "https://www.linkedin.com/in/pradityahendrik",
        "short_code": "ltkivd"
    });
    const mockCacheSet = t.context.sandbox.mock(redisClient).expects('set').resolves();

    await urlMappingService.shorten('https://github.com/pradityahendrik')
        .then((res) => {
            t.true(mockGenerateCode.called);
            t.true(mockCheck.called);
            t.true(mockSave.called);
            t.true(mockCacheSet.called);
            t.deepEqual(res, {
                code: 200,
                response: {
                  message: 'success',
                  data: {
                    long_url: 'https://www.linkedin.com/in/pradityahendrik',
                    short_url: 'https://short.en/ltkivd'
                  }
                }
            });
        });
});

test.serial('shorten already exist - success', async (t) => {
    const mockGenerateCode = t.context.sandbox.mock(helper).expects('generateShortCode').resolves('ltkivd');
    const mockCheck = t.context.sandbox.mock(urlMappingRepository).expects('findOne').resolves({
        "long_url": "https://www.linkedin.com/in/pradityahendrik",
        "short_code": "ltkivd"
    });
    const mockSave = t.context.sandbox.mock(urlMappingRepository).expects('save').resolves();
    const mockCacheSet = t.context.sandbox.mock(redisClient).expects('set').resolves();

    await urlMappingService.shorten('https://github.com/pradityahendrik')
        .then((res) => {
            t.true(mockGenerateCode.called);
            t.true(mockCheck.called);
            t.true(mockSave.notCalled);
            t.true(mockCacheSet.notCalled);
            t.deepEqual(res, {
                code: 200,
                response: {
                  message: 'success',
                  data: {
                    long_url: 'https://www.linkedin.com/in/pradityahendrik',
                    short_url: 'https://short.en/ltkivd'
                  }
                }
            });
        });
});

test.serial('shorten already exist - error', async (t) => {
    const mockGenerateCode = t.context.sandbox.mock(helper).expects('generateShortCode').rejects();
    const mockCheck = t.context.sandbox.mock(urlMappingRepository).expects('findOne').resolves();
    const mockSave = t.context.sandbox.mock(urlMappingRepository).expects('save').resolves();
    const mockCacheSet = t.context.sandbox.mock(redisClient).expects('set').resolves();

    await urlMappingService.shorten('https://github.com/pradityahendrik')
        .then((res) => {
            t.true(mockGenerateCode.called);
            t.true(mockCheck.notCalled);
            t.true(mockSave.notCalled);
            t.true(mockCacheSet.notCalled);
            t.deepEqual(res, {
                code: 200,
                response: {
                  message: 'Error',
                  data: null
                }
            });
        });
});
