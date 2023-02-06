export function randInteger(min: number, max: number) {
  return  Math.floor(Math.random() * (max - min + 1)) + min
}

export function randBoolean() {
  return Boolean(randInteger(0, 1));
}

export function randItem(arr: any[]) {
  return arr[randInteger(0, arr.length - 1)];
}
