import { Table, Pagination, Button, Modal, InputNumber, message } from 'antd'
import { useState, useEffect } from 'react'
import './index.less'
import { replaceProducts, delProduct } from '@config/index'
import { useHistory } from 'react-router-dom'

interface productType {
    key: number;
    name: string;
    price: number;
    brand: string;
    status: number;
    storeCount: number;
}

const ProductTable = (props: any) => {
    const history = useHistory()
    const [currPage, setcurrPage] = useState<number>(1)
    const [pagesize, setpagesize] = useState<number>(5)

    const [dataSource, setdata] = useState<productType[]>([])
    const [currData, setCurrdata] = useState<productType[]>([])

    const [dataType, setDatetype] = useState(true)

    const [selectedProducts, setSelectedProducts] = useState<string[]>([])

    const [price, setPrice] = useState<number>()
    const [currprice, setCurrprice] = useState<number>(1)
    const [title, setTitle] = useState<string>()

    const [onChangedProductIndex, setIndex] = useState<number>(1)
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };
    const { finds } = props
    const [find, setFind] = useState(finds || [])
    useEffect(() => {
        if (finds) {
            setFind(finds)
            setDatetype(false)
        } else {
            setDatetype(true)
        }
    }, [find, finds])
    const handleOk = () => {
        let newData = [...dataSource]
        if (selectedProducts.length) {
            selectedProducts.forEach((p: any) => {
                newData.forEach((d: any) => {
                    if (d.key === p) {
                        d.price = price
                    }
                })
            })
        } else {
            dataSource[onChangedProductIndex].price = price || 1
            newData = [...dataSource.slice(0, onChangedProductIndex), dataSource[onChangedProductIndex], ...dataSource.slice(onChangedProductIndex + 1)]
        }
        replaceProducts(newData)
        setdata(newData)
        setIsModalVisible(false);
        message.success('修改成功')
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    useEffect(() => {
        const index = (currPage - 1) * pagesize
        setCurrdata(dataSource.slice(index, index + pagesize))
    }, [currPage, dataSource, pagesize])

    useEffect(() => {
        const data = localStorage.getItem('products') || ''
        const allData = JSON.parse(data)
        setdata(allData || [])
    }, [])
    const changePrice = (v: number) => {
        setPrice(v)
    }
    useEffect(() => {
        setTitle(`原价为${currprice},请输入修改后的价格：`)

    }, [currprice])
    const changeProductPrice = (v: any, index: number) => {
        setCurrprice(v)
        setTimeout(() => {
            selectedProducts.splice(selectedProducts.length - 1, 1)
            setSelectedProducts([...selectedProducts])
        }, 0);
        setIndex(index)
        showModal()
    }
    const changeStatus = (index: number) => {
        setTimeout(() => {
            selectedProducts.splice(selectedProducts.length - 1, 1)
            setSelectedProducts([...selectedProducts])
        }, 0);
        dataSource[index].status = -dataSource[index].status
        const newData = [...dataSource.slice(0, index), dataSource[index], ...dataSource.slice(index + 1)]
        replaceProducts(newData)
        setdata(newData)
        setIsModalVisible(false);
        message.success('修改成功')
    }
    const changeInfo = (record: any, index: number) => {
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
                    <Button type='link' onClick={() => changeProductPrice(v, index)}>改价</Button>
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
                    <Button type={v === 1 ? 'ghost' : 'primary'} onClick={() => changeStatus(index)}>{v === 1 ? '在售' : '下架'}</Button>
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
                    <Button type='link' onClick={() => delTheProduct(index)}>删除</Button>
                </>
            )
        },
    ]

    const changepage = (p: number) => {
        setcurrPage(p)
    }
    const changesize = (p: number, s: number) => {
        setcurrPage(p)
        setpagesize(s)
    }
    const rowSelection = {
        onChange: (selectedRowKeys: any, selectedRows: any) => {
            setSelectedProducts(selectedRowKeys)
        },
        selectedRowKeys: selectedProducts
    };
    const delTheProduct = (index: number) => {
        setdata(delProduct(index))
    }
    const patchChangePrice = () => {
        setIsModalVisible(true)
    }
    const pageSizes = ['5', '10', '15']

    return (
        <>
            <Button type='primary' onClick={() => changeInfo({}, -1)} style={{ marginBottom: 20 }}>添加商品</Button>
            <Button type='primary' disabled={selectedProducts.length ? false : true} onClick={() => patchChangePrice()} style={{ marginLeft: 20 }}>批量改价</Button>

            <Table
                dataSource={dataType ? currData : find}
                columns={columns}
                bordered
                pagination={false}
                rowSelection={{ ...rowSelection }}
                onRow={record => {
                    return {
                        onClick: event => {
                            const i = selectedProducts.indexOf(record.key.toString())
                            if (i === -1) {
                                setSelectedProducts([...selectedProducts, record.key.toString()])
                            } else {
                                selectedProducts.splice(i, 1)
                                setSelectedProducts([...selectedProducts])
                            }
                        },
                        onDoubleClick: event => { },
                        onContextMenu: event => { },
                        onMouseEnter: event => { }, // 鼠标移入行
                        onMouseLeave: event => { },
                    };
                }}
            />
            <div className='pagination'>
                <Pagination
                    size="small"
                    total={dataType ? dataSource.length : find.length}
                    showSizeChanger
                    current={currPage}
                    onChange={changepage}
                    onShowSizeChange={changesize}
                    pageSizeOptions={pageSizes}
                    defaultPageSize={5}
                />
            </div>
            <Modal title={title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                修改为：
                <InputNumber
                    min={1}
                    max={100}
                    value={currprice}
                    onChange={changePrice}
                />
                元
            </Modal>
        </>
    )
}

export default ProductTable
