import { getTime } from "../util/time";

export class Watch {
    public startTime = 0;
    public isRunning = false;
    
    start() {
        this.isRunning = true;
        this.startTime = getTime();
    }
    pause() {
        this.isRunning = false;
    }
}