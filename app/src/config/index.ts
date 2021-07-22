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
                key: 'productPool',
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
