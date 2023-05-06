import { getDeep } from "~/utils/helpers";

export function transformData(options: TransformDataOptions) {
  const { data = {}, rules = {} } = options;
  if (typeof rules !== "object" || Array.isArray(rules)) throw new Error("rules should be an object with fieldName as the key");
  return Object.entries(data).reduce((accum, [key, value]) => {
    const processedValue = rules[key]?.targetPath ? getDeep(value, rules[key].targetPath) : value;
    const identity = (v: any) => v;
    const transformFunc = rules[key]?.transform ?? identity;
    return {
      ...accum,
      [key]: transformFunc(processedValue)
    };
  }, {});
}

export async function transformDataAsync(options: TransformDataOptions) {
  const { data = {}, rules = {} } = options;
  if (typeof rules !== "object" || Array.isArray(rules)) throw new Error("rules should be an object with fieldName as the key");
  return await Object.entries(data).reduce(async (accum, [key, value]) => {
    const accumValue = await accum;
    const processedValue = rules[key]?.targetPath ? getDeep(value, rules[key].targetPath) : value;
    const identity = (v: any) => v;
    const transformFunc = rules[key]?.transform ?? identity;
    return Promise.resolve({
      ...accumValue,
      [key]: await transformFunc(processedValue)
    });
  }, Promise.resolve({}));
}


type TransformDataOptions = {
  data: object;
  rules?: { [fieldName: string]: Rule }
}

type Rule = {
  targetPath?: string;
  transform?: (_: any) => any
}
