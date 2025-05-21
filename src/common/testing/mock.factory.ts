import { ObjectLiteral, Repository } from 'typeorm';

const putMockedFunction = (propsNames: string[]) => {
  return propsNames
    .filter((key: string) => key !== 'constructor')
    .reduce((fncs: Record<string, jest.Mock>, key: string) => {
      fncs[key] = jest.fn();
      return fncs;
    }, {});
};

export type MockedClass<T = unknown> = {
  [K in keyof T]?: jest.Mock;
};

export class MockRepositoryFactory {
  static getMockRepository<T extends Repository<ObjectLiteral>>(
    repository: new (...args: unknown[]) => T,
  ): () => MockedClass<T> {
    return () =>
      putMockedFunction(
        [Repository, repository].flatMap((v) =>
          Object.getOwnPropertyNames(v.prototype),
        ),
      );
  }
}

export class MockServiceFactory {
  static getMockService<T>(
    service: new (...args: unknown[]) => T,
  ): () => MockedClass<T> {
    return () =>
      putMockedFunction(Object.getOwnPropertyNames(service.prototype));
  }
}
