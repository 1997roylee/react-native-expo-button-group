// src/utils.ts
export function xor(originArr: any[], key: string | number) {
  if (originArr.indexOf(key) > -1)
    return originArr.filter((item) => item !== key);
  return [...originArr, key];
}
