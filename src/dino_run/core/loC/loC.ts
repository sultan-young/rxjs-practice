import 'reflect-metadata'

enum InjectableType {
  Sprite,
  Service,
}

export interface anyObject {
  [prop: string]: any
}


export const Inject = (service: any) => {
  return (target: any, key: string, descriptor: number) => {
  };
};
export class InjectionToken {}

// 配合Sprite装饰器使用
export const Input  = <T>(property?: T) => {

  // target 为类的原型对象
  return (target: object, propertyKey: string | symbol) => {
    const spriteInputs = Reflect.getMetadata('sprite:input', target.constructor) || [];
    spriteInputs.push(propertyKey);
    Reflect.defineMetadata('sprite:input', spriteInputs, target.constructor);
  }
}


// 一个装饰器，标明该类是一个sprite，不可直接注入到service中，但是可以在Sprite类中注入service
export const Sprite = (metadata?: IInjectable): ClassDecorator => {
  
  // target 为类的构造函数
  return (target: any) => {
    Reflect.defineMetadata('InjectableType', InjectableType.Sprite, target);
    // console.log(Reflect.getMetadata('sprite:input', target), 222);
  }
}

// 一个装饰器，标明该类是一个service，可以被注入到Sprite和Service中
export const Injectable = (metadata?: IInjectable): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata('InjectableType', InjectableType.Service, target);
    // console.log(1111, Reflect.getMetadata("design:paramtypes", target));
  };
};

export class LocContainer {
  group = new Map();
  // 获取所有注入的服务
  static get<T>(target: Type<T>, params?: anyObject): T {
    const providers = Reflect.getMetadata("design:paramtypes", target) as Type[] || []; // [OtherService]
    const args = providers.map((provider: Type) => {
        if (provider.length) {
            return LocContainer.get(provider)
        } else {
            return new provider();
        }
    });
    const instance = new target(...args) as any;
    const propKeys: string[] = Reflect.getMetadata('sprite:input', (instance as any).constructor) || [];
    if (params) {
      // 将props添加到实例中
      propKeys.forEach(prop => {
        if (params[prop]) {
          instance[prop] = params[prop];
        }
      })
    };

    // 触发init生命周期
    if (instance.onInit && typeof instance.onInit === 'function') {
      instance.onInit()
    }
    return instance;
  }
}

export declare interface Type<T = any> extends Function {
  new (...args: any[]): T;
}
export declare interface IInjectable {
  providedIn?: Type<any> | "root" | "platform" | "any" | null;
}

// xxx.get(Dino, {
//   baseX: 1,
//   baseY: 2,
// })