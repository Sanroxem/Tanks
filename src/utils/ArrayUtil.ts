export function shuffleArray<T extends any>(array: Array<T>): Array<T> {
  let tmp: T;
  let current: number;
  let top = array.length;

  if (top) {
    while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
  }

  return array;
}
