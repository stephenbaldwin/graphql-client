export default interface CacheEngineInterface {
	get(key: string): string
	set(key: string, value: string, cacheTimeInMs: number): void
}
