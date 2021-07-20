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
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}