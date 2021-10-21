export default function unique(objs) {
  return Array.from(new Set(objs));
}

export function uniqueByField(objs, field) {
  return Object.values(
    objs.reduce(
      (dict, obj) => ({
        ...dict,
        [obj[field]]: obj,
      }),
      {}
    )
  );
}
