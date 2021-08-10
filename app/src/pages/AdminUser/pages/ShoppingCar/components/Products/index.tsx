import { Table, InputNumber, Button, message } from 'antd'
import { getCarProducts, replaceCarProducts } from '@config/index'

const Products = (props: any) => {
    const carPros = getCarProducts()
    const datas = carPros.map((p: any) => {
        return {
            key: p.key,
            name: p.name,
            price: p.price,
            buyCount: p.buyCount,
        }
    })

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
                    < InputNumber
                        defaultValue={text}
                        onChange={(v: any) => {
                            record.buyCount = v
                            const pros = getCarProducts()
                            let newPros: any = []
                            for (let i in pros) {
                                if (pros[i].key === record.key) {
                                    newPros = [...pros.slice(0, i), record, ...pros.slice(i + 1, pros.length - 1)]
                                }
                            }
                            replaceCarProducts(newPros)
                            message.success(`成功修改${record.name}数量为${v}`)
                            let allprice = 0
                            newPros.forEach((pro: any) => {
                                allprice += pro.buyCount * pro.price
                            })
                            props.getAllprice(allprice)
                        }}
                        max={100}
                        min={0}
                    />
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
