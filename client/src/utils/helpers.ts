export function swapKeys<T, S extends string | number>(obj: Record<T, S>) {
  const res: any = {}; // I'm not worried about impl safety
  for (var key in obj) {
    res[obj[key]] = key;
  }
  return res as Record<S, T>;
}
