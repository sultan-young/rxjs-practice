

export abstract class Actor {
    public height = 0;
    public width = 0;
    public x = 0;
    public y = 0;
    public speed = 0;

    // private actionHooks = {

    // }

    // appendActionHook(action: string, callBack: () => void) {

    // }

    // 下一帧调用的函数
    abstract nextFrame(): void;
}