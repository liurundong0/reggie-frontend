import {caxios} from "@/js/request";
// 查询列表接口
const getDishPage = (params) => {
    return caxios({
        url: '/dish/page',
        method: 'get',
        params
    })
}

// 删除接口
const deleteDish = (ids) => {
    return caxios({
        url: '/dish',
        method: 'delete',
        params: {ids}
    })
}

// 修改接口
const editDish = (params) => {
    return caxios({
        url: '/dish',
        method: 'put',
        data: {...params}
    })
}

// 新增接口
const addDish = (params) => {
    return caxios({
        url: '/dish',
        method: 'post',
        data: {...params}
    })
}

// 查询详情
const queryDishById = (id) => {
    return caxios({
        url: `/dish/${id}`,
        method: 'get'
    })
}

// 获取菜品分类列表
const getCategoryList = (params) => {
    return caxios({
        url: '/category/list',
        method: 'get',
        params
    })
}
