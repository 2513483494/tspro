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
    console.log('getpro', u)
    const datas = u ? JSON.parse(u) : []
    console.log('datas', datas)
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

export const getBrands = () => {
    const u = localStorage.getItem('products')
    const datas = u ? JSON.parse(u) : []
    const brands: string[] = []
    datas.forEach((data: any) => {
        if (!brands.includes(data.brand)) {
            brands.push(data.brand)
        }
    })
    return brands
}


export const getBrandProducts = (brand: string) => {
    const u = localStorage.getItem('products')
    const datas = u ? JSON.parse(u) : []
    const brandProduct = datas.filter((data: any) => {
        return data.brand === brand
    })
    return brandProduct
}

export const addproductToshopcar = (product: any) => {
    const u = localStorage.getItem('shoppingcarProducts')
    const datas = u ? JSON.parse(u) : []
    const t = datas.filter((data: any) => data.name === product.name)
    if (t.length===0) {
        product.buyCount = 1
        datas.push(product)
    } else {
        for (let i in datas) {
            if (datas[i].name === product.name) {
                datas[i].buyCount += 1
            }
        }
    }
    localStorage.setItem('shoppingcarProducts', JSON.stringify(datas))
}

export const getCarProducts = () => {
    const u = localStorage.getItem('shoppingcarProducts')
    const datas = u ? JSON.parse(u) : []
    return datas
}

export const replaceCarProducts = (value: any) => {
    localStorage.setItem('shoppingcarProducts', JSON.stringify(value))
}
