import { useState, useEffect } from 'react'
import StoreSelect from '@components/storeList'
import './index.less'
import { Form, Row, Col, Input, Button, Select, Checkbox, TreeSelect } from 'antd'
import { getProducts } from '@config/index'
import { debounce } from 'lodash'

const { Option } = Select

const SearchFields = (props: any) => {
    const [form] = Form.useForm()

    //组件返回的已选ids
    const [, setStoreids] = useState()
    //url回填的ids
    const [currentStores, setStores] = useState<any>()
    const [products, setProducts] = useState(getProducts())
    const [ub, setub] = useState()
    useEffect(() => {
        const pros = getProducts()
        setProducts(pros)
    }, [])
    useEffect(() => {
        const brands: any = []
        products.forEach((p: any) => {
            if (brands.indexOf(p.brand) === -1) {
                brands.push(p.brand)
            }
        })
        const ub = brands.map((b: any, index: any) => ({
            title: b,
            value: b,
            key: index,
        }))
        setub(ub)
    }, [products])

    const onFinish = (v: any) => {
        const { name, brand, others } = v
        const finds = products.filter((p: any) => {
            let c1 = name || p.name
            let c2 = others ? (others.indexOf('onsale') === -1 ? p.status : 1) : p.status
            let c3 = brand || [p.brand]
            return p.name.indexOf(c1) !== -1 && c2 === p.status && c3.indexOf(p.brand) !== -1
        })
        props.onChange && props.onChange(finds)
        localStorage.setItem('find', JSON.stringify(finds))
    }
    function handleChange(value: any) {

    }
    const reset = () => {
        form.resetFields()
        localStorage.removeItem("find");
        setStores([])
    }
    const plainOptions = [
        {
            value: 'nopic',
            label: '无图'
        },
        {
            value: 'onsale',
            label: '上线'
        },
    ]
    const changeCheckbox = (v: any) => {
    }
    const debounceSearchName = (name: string) => {
        var re = /[a-zA-Z]/
        if (!re.test(name)) {
            const finds = products.filter((p: any) => {
                return p.name.includes(name)
            })
            props.onChange && props.onChange(finds)
        }
    }
    const changeName = debounce((e) => {
        debounceSearchName(e.target.value)
    }, 300)

    return (
        <div style={{ marginBottom: 20 }}>
            <h1>全国商品池</h1>
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                scrollToFirstError
                className="ant-advanced-search-form"
            >
                <Row gutter={24}>
                    <Col span={8} pull={1}>
                        <Form.Item
                            label='商品名称'
                            name='name'
                        >
                            <Input placeholder='可输入商品名称查询' onChange={changeName} />
                        </Form.Item>
                    </Col>
                    <Col span={8} pull={1}>
                        <Form.Item
                            label='门店列表'
                            name='storesId'
                            getValueFromEvent={(storeIds) => {
                                setStoreids(storeIds)
                            }}
                        >
                            <StoreSelect currentStores={currentStores} />
                        </Form.Item>
                    </Col>
                    <Col span={8} pull={1}>
                        <Form.Item
                            label='品牌'
                            name='brand'
                        >
                            <TreeSelect
                                treeData={ub}
                                value={[]}
                                treeCheckable
                                placeholder='可多选'
                                allowClear
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8} pull={1}>
                        <Form.Item
                            label='库存'
                            name='storeCount'
                        >
                            <Select defaultValue="all" onChange={handleChange}>
                                <Option key='all' value="all">全部</Option>
                                <Option key='yes' value="yes">有库存</Option>
                                <Option key='no' value="no">已售罄</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={8} push={1}>
                        <Form.Item
                            name='others'
                        >
                            <Checkbox.Group options={plainOptions} defaultValue={['Apple']} onChange={changeCheckbox} />
                        </Form.Item>
                    </Col>

                    <Col span={8} pull={1} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit">
                            查询
                        </Button>
                        <Button
                            style={{ margin: '0 8px' }}
                            onClick={() => {
                                props.onChange && props.onChange()
                                reset()
                            }}
                        >
                            清空
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default SearchFields
