import { useState, useEffect } from 'react'
import StoreSelect from '@components/storeList'
import { useQuery } from '@hooks/index'
import './index.less'
import { Form, Row, Col, Input, Button, Select, Checkbox } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import debounce from 'lodash/debounce'

const { Option } = Select

const SearchFields = () => {
    const [expand, setExpand] = useState(false)
    const [others, setothers] = useState()
    const [form] = Form.useForm()

    //组件返回的已选ids
    const [storeIds, setStoreids] = useState()
    //url回填的ids
    const [currentStores, setStores] = useState<any>()
    const [query, setQuery] = useQuery()
    useEffect(() => {
        const { name = '', storeIds = 'none', others = '' } = query
        setStores(storeIds.split(','))
        form.setFieldsValue({
            name,
            others
        })
    }, [form, query])

    const onFinish = debounce(() => {
        const value = form.getFieldsValue(['name'])
        const { page, pageSize } = query
        setQuery({
            name: value.name || '',
            storeIds: storeIds || [],
            activeKey: 'state',
            others,
            page,
            pageSize
        })
    }, 500)
    function handleChange(value: any) {

    }
    const reset = () => {
        form.resetFields()
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
        setothers(v)
    }
    return (
        <div>
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
                            <Input />
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
                            <Select defaultValue="ln" onChange={handleChange}>
                                <Option key='ln' value="ln">李宁</Option>
                                <Option key='nk' value="nk">耐克</Option>
                                <Option key='pk' value="pk">匹克</Option>
                            </Select>
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
                    <Col span={8} pull={1}>
                        <Form.Item
                            label='品牌'
                            name='brand'
                        >
                            <Select defaultValue="ln" onChange={handleChange}>
                                <Option key='ln' value="ln">李宁</Option>
                                <Option key='nk' value="nk">耐克</Option>
                                <Option key='pk' value="pk">匹克</Option>
                            </Select>
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
                    {
                        expand ? (
                            <>
                                <Col span={8} pull={1}>
                                    <Form.Item
                                        label='品牌'
                                        name='brand'
                                    >
                                        <Select defaultValue="ln" onChange={handleChange}>
                                            <Option key='ln' value="ln">李宁</Option>
                                            <Option key='nk' value="nk">耐克</Option>
                                            <Option key='pk' value="pk">匹克</Option>
                                        </Select>
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
                            </>
                        ) : null
                    }

                </Row>

                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit">
                            查询
                        </Button>
                        <Button
                            style={{ margin: '0 8px' }}
                            onClick={() => reset()}
                        >
                            清空
                        </Button>
                        <Button
                            onClick={() => {
                                setExpand(!expand)
                            }}
                        >
                            {expand ? <UpOutlined /> : <DownOutlined />} 展开
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default SearchFields
