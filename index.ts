import CacheEngineInterface from './CacheEngineInterface';
import InMemoryCache from './InMemoryCache';

const DEFAULT_HEADERS: object = {};
const DEFAULT_CACHE: InMemoryCache = new InMemoryCache();
const DEFAULT_CACHE_IN_MS: number = 0;

type Response = {
  status: number,

  errors: string[],
  data: object,
}

interface Endpoint { (req: object, res: object): void }

type GlobalConfiguration = {
  headers?: {},

  cacheEngine?: CacheEngineInterface,
  cacheTimeInMs?: number,
}

type QueryOptions = {
  name: String,
  variables: object,

  headers?: {},

  cacheEngine?: CacheEngineInterface,
  cacheTimeInMs?: number,
}

const exampleResponse: Response = {
  status: 200,

  errors: [],
  data: {},
};

export default class GraphQLClient {
  static RawQuery(schema: string, options?: QueryOptions): Response {
    return new GraphQLClient(schema).query(options);
  }

  private headers: object;

  private cacheEngine: CacheEngineInterface;
  private cacheTimeInMs: number;

  constructor(public schema: string, options: GlobalConfiguration = {}) {
    this.headers = DEFAULT_HEADERS;

    this.cacheEngine = options.cacheEngine || DEFAULT_CACHE;
    this.cacheTimeInMs = options.cacheTimeInMs || DEFAULT_CACHE_IN_MS;
  }

  public query(options: QueryOptions): Response;
  public query(name: string, variables?: object): Response;
  public query(nameOrOptions: string | QueryOptions, variablesOrNull?: object): Response {
    const options = this.convertArgumentsToQueryOptions(nameOrOptions, variablesOrNull);

    return exampleResponse;
  }

  public mutation(options: QueryOptions): Response;
  public mutation(name: string, variables?: object): Response;
  public mutation(nameOrOptions: string | QueryOptions, variablesOrNull?: object): Response {
    const options = this.convertArgumentsToQueryOptions(nameOrOptions, variablesOrNull);

    return exampleResponse;
  }
  
  public endpoint(options: QueryOptions): Endpoint;
  public endpoint(name: string, variables?: object): Endpoint;
  public endpoint(nameOrOptions: string | QueryOptions, variablesOrNull?: object): Endpoint {
    const options = this.convertArgumentsToQueryOptions(nameOrOptions, variablesOrNull);

    return async function graphQLClientEndpoint(_, res): Promise<void> {
      const response = await exampleResponse;

      res.send(response);
    };
  }

  private convertArgumentsToQueryOptions(nameOrOptions: string | QueryOptions, variablesOrNull?: object): QueryOptions {
    if (typeof nameOrOptions === 'string') {
      const name: string = nameOrOptions;
      const variables: object = variablesOrNull || {};

      return {
        name,
        variables,
      };
    }

    const options: QueryOptions = nameOrOptions;

    return options;
  }
}
