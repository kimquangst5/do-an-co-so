const xuli = (array: any, id: any = "") => {
  const result = [];
  for (const it of array) {
    if (String(it.parentId) == id) {
      const children = xuli(array, String(it.id));
      if (children.length > 0) it.children = children;
      result.push(it);
    }
  }
  return result;
};

const createTree = (array: any, id: any = "") => {
  const result = xuli(array);
  return result;
};
export default createTree;
