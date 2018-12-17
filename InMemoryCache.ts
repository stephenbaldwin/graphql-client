import CacheEngineInterface from './CacheEngineInterface';

const STORE_EXPIRATION_CHECK_IN_MS = 10;

export default class InMemoryCache implements CacheEngineInterface {
  private store: object = {};
  private storeCacheExpiration: object = {};

  constructor() {
    this.monitorStoreForExpiredValues();
  }

  get(key) {
    return this.store[key];
  }

  set(key, value, cacheTimeInMs) {
    this.store[key] = value;

    this.storeCacheExpiration[key] = new Date().getTime() + cacheTimeInMs;
  }

  private monitorStoreForExpiredValues() {
    const { store, storeCacheExpiration } = this;

    setInterval((): void => {
      const currentTime = new Date().getTime();

      Object.keys(storeCacheExpiration).forEach((key: string): void => {
        if (storeCacheExpiration[key] < currentTime) {
          delete storeCacheExpiration[key];
          delete store[key]
        }
      });
    }, STORE_EXPIRATION_CHECK_IN_MS);
  }
}
