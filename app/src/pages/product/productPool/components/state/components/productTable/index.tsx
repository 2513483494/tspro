import { Table, Pagination, Button, Modal, Input, InputNumber, message } from 'antd'
import { useState, useEffect } from 'react'
import './index.less'
import { addOneProduct, replaceProducts } from '@config/index'
import { useHistory } from 'react-router-dom'

interface productType {
    key: number;
    name: string;
    price: number;
    brand: string;
    status: boolean;
    storeCount: number;
}

const ProductTable = () => {
    const history = useHistory()
    const [currPage, setcurrPage] = useState<number>()
    const [dataSource, setdata] = useState<productType[]>([])
    const [price, setPrice] = useState<number>()
    const [onChangedProductIndex, setIndex] = useState<number>(1)
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        dataSource[onChangedProductIndex].price = price || 1
        const newData = [...dataSource.slice(0, onChangedProductIndex), dataSource[onChangedProductIndex], ...dataSource.slice(onChangedProductIndex + 1)]
        replaceProducts(newData)
        setdata(newData)
        setIsModalVisible(false);
        message.success('修改成功')
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    useEffect(() => {
        const data = localStorage.getItem('products') || ''
        const data1 = JSON.parse(data)
        setdata(data1)
    }, [])

    const changePrice = (v: number) => {
        console.log(v)
        setPrice(v)
    }
    const changeProductPrice = (index: number) => {
        setIndex(index)
        showModal()
    }
    const changeStatus = (index: number) => {
        dataSource[index].status = !dataSource[index].status
        const newData = [...dataSource.slice(0, index), dataSource[index], ...dataSource.slice(index + 1)]
        replaceProducts(newData)
        setdata(newData)
        setIsModalVisible(false);
        message.success('修改成功')
    }
    const changeInfo = (record: any, index: number) => {
        console.log(record)
        localStorage.setItem('index', index.toString())
        history.push('/admin/productpool/changeinfo')
    }
    const columns = [
        {
            title: '商品名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            render: (v: any, record: any, index: any) => (
                <>
                    <span>{v}</span>
                    <Button type='link' onClick={() => changeProductPrice(index)}>改价</Button>
                </>
            )
        },
        {
            title: '品牌',
            dataIndex: 'brand',
            key: 'brand',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (v: any, record: any, index: any) => {
                return (
                    <Button type={v ? 'ghost' : 'primary'} onClick={() => changeStatus(index)}>{v ? '在售' : '下架'}</Button>
                )
            }
        },
        {
            title: '库存',
            dataIndex: 'storeCount',
            key: 'storeCount',
        },
        {
            title: '操作',
            key: 'brand',
            render: (v: any, record: any, index: any) => (
                <>
                    <Button type='link' onClick={() => changeInfo(record, index)}>修改</Button>
                    <Button type='link'>详情</Button>
                    <Button type='link'>删除</Button>
                </>
            )
        },
    ]

    const changepage = (p: number) => {
        setcurrPage(p)
    }
    const changesize = (p: number, s: number) => {
        setcurrPage(p)
    }
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
        <>
            <Table dataSource={dataSource} columns={columns} bordered pagination={false} rowSelection={{ ...rowSelection }} />
            <div className='pagination'>
                <Pagination
                    size="small"
                    total={50}
                    showSizeChanger
                    current={currPage}
                    onChange={changepage}
                    onShowSizeChange={changesize}
                />
            </div>
            <Modal title="改价" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <InputNumber
                    min={1}
                    max={100}
                    defaultValue={0}
                    onChange={changePrice}
                />
            </Modal>
        </>
    )
}

export default ProductTable
