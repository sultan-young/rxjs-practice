import 'reflect-metadata'

export const Inject = (service: any) => {
  return (target: any, key: string, descriptor: number) => {
    // console.log(Reflect.getMetadata("design:type", target, key), key);
    // console.log(target, key, descriptor);

    // Reflect.get
    // console.log(Reflect.getMetadata('design:type', target, key))
    // return descriptor;
  };
};
export class InjectionToken {}

export const Injectable = (metadata?: IInjectable): ClassDecorator => {
//   console.log("metadata: ", metadata);
  return (target) => {
    // console.log(1111, Reflect.getMetadata("design:paramtypes", target));
  };
};

export class LocContainer {
  group = new Map();
  // 获取所有注入的服务
  static get<T>(target: Type<T>): T {
    const providers = Reflect.getMetadata("design:paramtypes", target) as Type[]; // [OtherService]
    // TODO: 对provider中的依赖进行分析，并再次注入
    const args = providers.map((provider: Type) => {
      // console.log('provider: ', provider);
        if (provider.length) {
            // console.log('providers111: ', providers);
            return LocContainer.get(provider)
        } else {
            return new provider();
        }
    });
    return new target(...args);
  }
}

export declare interface Type<T = any> extends Function {
  new (...args: any[]): T;
}
export declare interface IInjectable {
  /**
   * Determines which injectors will provide the injectable.
   *
   * - `Type<any>` - associates the injectable with an `@NgModule` or other `InjectorType`,
   * - 'null' : Equivalent to `undefined`. The injectable is not provided in any scope automatically
   * and must be added to a `providers` array of an [@NgModule](api/core/NgModule#providers),
   * [@Component](api/core/Directive#providers) or [@Directive](api/core/Directive#providers).
   *
   * The following options specify that this injectable should be provided in one of the following
   * injectors:
   * - 'root' : The application-level injector in most apps.
   * - 'platform' : A special singleton platform injector shared by all
   * applications on the page.
   * - 'any' : Provides a unique instance in each lazy loaded module while all eagerly loaded
   * modules share one instance.
   *
   */
  providedIn?: Type<any> | "root" | "platform" | "any" | null;
}
