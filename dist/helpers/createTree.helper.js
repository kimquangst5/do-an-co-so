"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xuli = (array, id = "") => {
    const result = [];
    for (const it of array) {
        if (String(it.parentId) == id) {
            const children = xuli(array, String(it.id));
            if (children.length > 0)
                it.children = children;
            result.push(it);
        }
    }
    return result;
};
const createTree = (array, id = "") => {
    const result = xuli(array);
    return result;
};
exports.default = createTree;
