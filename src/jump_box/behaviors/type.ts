export interface Behavior {
    execute: () => void,
}

export enum BehaviorEnum {
    Jump,
    Run,
}