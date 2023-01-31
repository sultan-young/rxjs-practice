import { BehaviorControl } from "./behaviorControl";

interface Point2D {
    x: number;
    y: number;
}

export class BaseBox {
    el!: HTMLElement;
    size = 60;
    color: string = 'pink';
    speed = 10;
    worldPosition: Point2D = {
        x: 0,
        y: 0,
    }
    offsetPosition: Point2D = {
        x: 0,
        y: 0,
    }
    constructor(private behaviorControl: BehaviorControl) {
        
    }
}