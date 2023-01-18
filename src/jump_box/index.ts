import "reflect-metadata";

type Constructor<T = any> = new (...args: any[]) => T;

const Injectable = (): ClassDecorator => (target) => {};

const Factory = <T>(target: Constructor<T>): T => {
  // 获取所有注入的服务
  const providers = Reflect.getMetadata("design:paramtypes", target); // [OtherService]

  // TODO: 对provider中的依赖进行分析，并再次注入
  const args = providers.map((provider: Constructor) => new provider());
  return new target(...args);
};

const Inject = (service: any) => {
  return (target: any, key: string, descriptor: number) => {
    console.log(Reflect.getMetadata("design:type", target, key), key);
    // console.log(target, key, descriptor);

    // Reflect.get
    // console.log(Reflect.getMetadata('design:type', target, key))
    // return descriptor;
  };
};

// 场景
@Injectable()
class SceneService {
}

// 视觉服务
@Injectable()
class VisualService {
  a = 1;
  constructor(private scene: SceneService) {}
  scale() {
    console.log("scale");
  }
}

@Injectable()
class Man {
  constructor(private visualService: VisualService) {}

  // 放出绝招
  releaseTrick() {
    this.visualService.scale();
  }
}

Factory(Man).releaseTrick();
