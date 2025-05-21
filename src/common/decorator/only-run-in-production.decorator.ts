export const OnlyRunInProduction =
  () => (_target: unknown, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value as (
      ...args: unknown[]
    ) => unknown[];

    const wrapper = (...args: unknown[]): unknown => {
      const { NODE_ENV } = process.env;
      if (NODE_ENV !== 'production') {
        console.warn(
          `Method ${key.toString()} is not running in production environment.`,
        );
        return;
      }

      return originalMethod.apply(this, args);
    };

    Object.setPrototypeOf(wrapper, originalMethod);
    descriptor.value = wrapper;

    return descriptor;
  };
