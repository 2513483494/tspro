import { Table, InputNumber, Button } from 'antd'
import { getCarProducts } from '@config/index'
import { useState } from 'react'

const Products = () => {
    const carPros = getCarProducts()
    const [price, setPrice] = useState()
    const datas = carPros.map((p: any) => {
        return {
            key: p.key,
            name: p.name,
            price: p.price,
            buyCount: p.buyCount,
        }
    })
    const changePrice = (v: any) => {
        console.log(v)
        setPrice(v)
    }
    const procol = [
        {
            title: '商品名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '数量',
            dataIndex: 'buyCount',
            key: 'buyCount',
            render: (text: any, record: any) => {
                return (
                    < InputNumber value={text} onChange={changePrice} />
                )
            }
        },
        {
            title: '操作',
            key: 'handle',
            render: () => {
                return (
                    <Button type='link'>删除</Button>
                )
            }
        },
    ];
    const rowSelection = {
        onChange: (selectedRowKeys: any, selectedRows: any) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record: any, selected: any, selectedRows: any) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
            console.log(selected, selectedRows, changeRows);
        },
    };

    return (
        <Table
            columns={procol}
            dataSource={datas}
            pagination={false}
            rowSelection={{ ...rowSelection }}
            bordered
        />
    )
}

export default Products