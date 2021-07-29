import { Form, PageHeader, Input, Button, message, InputNumber, Row, Col, Select, Popconfirm } from 'antd'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import './index.less'
import { replaceProducts, addOneProduct } from '@config/index'

const Item = Form.Item
const { Option } = Select
const ChangeInfo = () => {
    const history = useHistory()
    const [form] = Form.useForm()
    const index = localStorage.getItem('index') || 0
    const products = localStorage.getItem('products')
    const pros = products ? JSON.parse(products) : []
    const { key, name, price, brand, storeCount, status } = pros[index] || {}
    const title = index < 0 ? '添加商品' : `${name}详情`
    const submit = () => {
        const values = form.getFieldsValue(['key', 'name', 'price', 'brand', 'storeCount', 'status'])
        if (index < 0) {
            addOneProduct(values)
        } else {
            const newData = [...pros.slice(0, index), values, ...pros.slice(+index + 1)]
            replaceProducts(newData)
            message.success('修改成功')
        }

        history.push('/admin/productpool')
    }
    const handleChange = () => {

    }
    useEffect(() => {
        form.setFieldsValue({
            key, name, price, brand, storeCount, status: status ? '已上架' : '已下架'
        })
    }, [brand, form, key, name, price, status, storeCount])
    function confirm(e: any) {
        submit()
    }

    function cancel(e: any) {
        
    }
    return (
        <div className='productInfo'>
            <PageHeader
                onBack={() => history.push('/admin/productpool')}
                title={title}
            />
            <Form
                form={form}
                onFinish={submit}
                layout='vertical'
            >
                <Row>
                    <Col span={6}>
                        <Item label='商品号' name='key'>
                            <Input disabled={index > -1} />
                        </Item>
                    </Col>
                    <Col span={16}>
                        <Item label='商品名称' name='name'>
                            <Input />
                        </Item>
                    </Col>
                    <Col span={6}>
                        <Item label='价格' name='price'>
                            <InputNumber />
                        </Item>
                    </Col>
                    <Col span={16}>
                        <Item label='品牌' name='brand'>
                            <Input />
                        </Item>
                    </Col>
                    <Col span={6}>
                        <Item label='库存' name='storeCount'>
                            <Input />
                        </Item>
                    </Col>
                    <Col span={16}>
                        <Item label='状态' name='status'>
                            <Select defaultValue={1} onChange={handleChange}>
                                <Option value={1}>已上架</Option>
                                <Option value={-1}>已下架</Option>
                            </Select>
                        </Item>
                    </Col>
                    <Col span={16}>
                        <Item name='name'>
                            <Popconfirm
                                title="确认修改吗?"
                                onConfirm={confirm}
                                onCancel={cancel}
                                okText="确认"
                                cancelText="取消"
                                placement="bottom"
                            >
                                <Button type='primary' htmlType='submit'>确定</Button>
                            </Popconfirm>
                        </Item>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default ChangeInfo
