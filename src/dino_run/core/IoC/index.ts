import "reflect-metadata";
import { Type, Injectable, IocContainer } from "./IoC";

// 场景
@Injectable({
  providedIn: "root",
})
class SceneService {
  scale() {
    console.log("SceneService => scale");
  }
}

// 视觉服务
@Injectable()
class VisualService {
  constructor(private scene: SceneService) {}
  scale() {
    console.log("VisualService => scale");
    this.scene.scale();
  }
}

@Injectable()
class Man {
  constructor(private visualService: VisualService) {}

  // 放出绝招
  releaseTrick() {
    console.log("Man => scale");
    this.visualService.scale();
  }
}

IocContainer.get(Man).releaseTrick();
