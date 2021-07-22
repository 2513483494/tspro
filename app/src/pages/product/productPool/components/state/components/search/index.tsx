import { useState } from 'react'
import StoreSelect from '@components/storeList'
import './index.less'
import { Form, Row, Col, Input, Button, Select, Checkbox, TreeSelect } from 'antd'
import { addOneProduct } from '@config/index'

const { Option } = Select

const SearchFields = () => {
    const [others, setothers] = useState()
    const [form] = Form.useForm()

    //组件返回的已选ids
    const [storeIds, setStoreids] = useState()
    //url回填的ids
    const [currentStores, setStores] = useState<any>()

    const onFinish = (v: any) => {
    }
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
    const mockData = [
        {
            title: '李宁',
            value: 'ln',
            key: 'ln',
        },
        {
            title: '耐克',
            value: 'nk',
            key: 'nk',
        },
        {
            title: '阿迪',
            value: 'ad',
            key: 'ad',
        },
    ]
    return (
        <div style={{marginBottom: 20}}>
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
                            <Input placeholder='可输入商品名称查询' />
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
                                treeData={mockData}
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
                            onClick={() => reset()}
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
