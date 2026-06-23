export function list2tree(
    list,
    keyField,
    parentField,
    childrenField
) {
    const map = {};
    const tree = [];

    // 将数组转换成 map
    for (const item of list) {
        map[item[keyField]] = item;
    }

    // 构建树结构
    for (const key in map) {
        const item = map[key];

        if (parentField in item && map[item[parentField]]) {
            const parent = map[item[parentField]];

            if (!parent[childrenField]) {
                parent[childrenField] = [];
            }

            parent[childrenField].push(item);

            parent[childrenField].sort((a, b) => a.sortNum - b.sortNum);
        } else {
            tree.push(item);
        }
    }

    return tree;
}


export function tree2list(tree) {
    let data = [];
    while (tree.length) {
        let { children, ...item } = tree.pop();
        if (item.menuType === 4) continue;
        else if (item.menuType === 2) {
            permissions.push(item.menuUrl);
            continue;
        }

        let obj = {
            path: item.menuUrl,
            name: item.menuName,
            component: item.menuWinformName,
            sortNum: item.sortNum,
            meta: { closable: true, icon: item.menuIcon },
            menuId: item.menuId,
            menuParentId: item.menuParentId,
        };
        if (item.menuWinArgs) {
            obj.meta.taskWorkFlowId = item.menuWinArgs.split("&")?.[0].split("=")?.[1];
            obj.meta.diagTitle = item.menuWinArgs.split("&")?.[1].split("=")?.[1];
        }
        data.push(obj);
        if (children) for (let i = children.length - 1; i >= 0; i--) tree.push(children[i]);
    }
    return data;
}