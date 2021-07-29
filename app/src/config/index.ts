import { useState } from 'react'

export const menu = [
    {
        title: '首页',
        key: 'admin',
        path: '/admin'
    },
    {
        title: '商品',
        key: 'product',
        children: [
            {
                title: '商品池',
                key: 'productpool',
                path: '/admin/productpool'
            },
            {
                title: '门店商品',
                key: 'storeproduct',
                path: '/admin/storeproduct'
            },
        ]
    }
]

export const formatTime = (t: any) => {
    if (!t) {
        return ''
    }
    const date = new Date()
    const second = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${second}`
}

export const addOneProduct = (value: any) => {
    const u = localStorage.getItem('products')
    const datas = u ? JSON.parse(u) : []
    datas.push(value)
    localStorage.setItem('products', JSON.stringify(datas))
}

export const replaceProducts = (value: any) => {
    localStorage.setItem('products', JSON.stringify(value))
}

export const delProduct = (index: number) => {
    const u = localStorage.getItem('products')
    const datas = u ? JSON.parse(u) : []
    datas.splice(index, 1)
    localStorage.setItem('products', JSON.stringify(datas))
    return datas
}

export const getProducts = () => {
    const u = localStorage.getItem('products')
    const datas = u ? JSON.parse(u) : []
    return datas
}

export const useUpdate = () => {
    const [, setFlag] = useState<number>()
    const update = () => {
        setFlag(Date.now())
    }

    return update
}

export const provinces = [
    '河北', '山西', '辽宁', '吉林', '台湾', '江苏', '浙江', '安徽', '福建',
    '江西', '山东', '河南', '湖北', '湖南', '广东', '海南', '四川', '贵州',
    '云南', '陕西', '甘肃', '青海', '黑龙江'
]

