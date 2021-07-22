import { Form, PageHeader, Input, Button } from 'antd'
import { useHistory } from 'react-router-dom'
import './index.less'

const Item = Form.Item
const ChangeInfo = () => {
    const history = useHistory()
    const [form] = Form.useForm()
    const index = localStorage.getItem('index') || 0
    const products = localStorage.getItem('products')
    const pros = products ? JSON.parse(products) : []
    const { name = '1', price, brand, storeCount, status } = pros[index]
    const title = `${name}详情`
    const submit = () => {
        const values = form.getFieldsValue(['name', 'price', 'brand', 'storeCount', 'status'])
        console.log(values);
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
            >
                <Item label='商品名称' name='name'>
                    <Input value={name} />
                </Item>
                <Item label='价格' name='price'>
                    <Input value={price} />
                </Item>
                <Item label='品牌' name='brand'>
                    <Input value={brand} />
                </Item>
                <Item label='库存' name='storeCount'>
                    <Input value={storeCount} />
                </Item>
                <Item label='状态' name='status'>
                    <Input value={status} />
                </Item>
                <Item label='状态' name='name'>
                    <Button type='primary' htmlType='submit'>确定</Button>
                </Item>
            </Form>
        </div>
    )
}

export default ChangeInfo
