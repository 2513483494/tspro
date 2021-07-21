import { Table, Pagination } from 'antd'
import { useState, useEffect } from 'react'
import { useQuery } from '@hooks/index'
import './index.less'

const dataSource = [
    {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
    },
    {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
    },
]

const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
    },
]

const ProductTable = () => {
    const [currPage, setcurrPage] = useState(1)
    const [pagesize, setpagesize] = useState(10)

    const [query, setQuery] = useQuery()
    useEffect(() => {
        console.log(query)
        const { page = 1, pageSize = 10 } = query
        setcurrPage(page)
        setpagesize(pageSize)
    }, [])
    useEffect(() => {
        const queryParams = { page: currPage, pageSize: pagesize || 10 }
        setQuery(queryParams)
    }, [currPage, pagesize])
    const changepage = (p: any) => {
        console.log(p)
        setcurrPage(p)
    }
    const changesize = (p: any, s: any) => {
        console.log(p, s)
        setpagesize(s)
    }
    return (
        <>
            <Table dataSource={dataSource} columns={columns} bordered pagination={false} />
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

        </>
    )
}

export default ProductTable