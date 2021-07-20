import { Form, Input, Button, Modal, message } from 'antd'
import './index.less'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { lazy, Suspense, useState } from 'react'
import { useHistory } from 'react-router-dom'

const Bear = lazy(() => import('./components/bear'));
const Loginheader = lazy(() => import('./components/header'));
const Loginfooter = lazy(() => import('./components/loginfooter'));

interface userInfo {
    username: string
    password: string
    extra: any
}
const Login = (): JSX.Element => {
    const [form] = Form.useForm()
    const [mainform] = Form.useForm()
    const history = useHistory()
    const onFinish = (values: userInfo) => {
        if (values.username === localStorage.getItem('username') && values.password === localStorage.getItem('password')) {
            message.success('登陆成功！')
            history.push('/admin')
        } else {
            message.error('用户名和密码错误，请重新输入！')
            mainform.resetFields()
        }
    }
    const register = () => {
        form.resetFields()
        setIsModalVisible(true)
    }
    const forgetPws = () => {
        message.info('请重置密码！')
        setIsModalVisible(true)
        form.setFieldsValue({
            name: localStorage.getItem('username')
        })
    }
    const [isModalVisible, setIsModalVisible] = useState(false)

    const handleOk = () => {
        setIsModalVisible(false)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }
    const setUser = () => {
        if (form.getFieldValue('psw') === form.getFieldValue('confirmpsw')) {
            const value = form.getFieldsValue(['name', 'psw'])
            localStorage.setItem('username', value.name)
            localStorage.setItem('password', value.psw)
            message.success('注册成功')
            setIsModalVisible(false)
        } else {
            message.error('两次密码输入不同，请重新输入')
            form.resetFields(['psw', 'confirmpsw'])
        }
    }
    return (
        <div className='loginbody'>
            <div>
                <Loginheader />
            </div>
            <div className='loginform'>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
                    form={mainform}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入用户名！' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder='请输入用户名'/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码！' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder='请输入密码'/>
                    </Form.Item>

                    <Form.Item
                        name="extra"
                    >
                        <Button type='link' style={{ color: 'green', right: 10, fontSize: 15, fontWeight: 'bolder' }} onClick={() => register()}>注册</Button>
                        <Button type='link' style={{ color: 'red', left: 200, fontSize: 15, fontWeight: 'bolder' }} onClick={() => forgetPws()}>忘记密码</Button>
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 16 }}>
                        <Button type="primary" htmlType="submit" style={{ width: 335 }}>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
                <Suspense fallback={<div>Loading...</div>}>
                    <Bear />
                    <Loginfooter />
                </Suspense>
                <Modal
                    title="请填入信息"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                        <Button type='primary' onClick={() => setUser()}>确定</Button>,
                        <Button onClick={() => setIsModalVisible(false)}>取消</Button>
                    ]}
                >
                    <Form form={form}>
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: '请输入用户名！' }]}
                        >
                            <Input placeholder='请输入用户名' prefix={<UserOutlined />} />
                        </Form.Item>
                        <Form.Item
                            name="psw"
                            rules={[{ required: true, message: '输入密码！' }]}
                        >
                            <Input.Password placeholder='请输入密码' prefix={<LockOutlined />} />
                        </Form.Item>
                        <Form.Item
                            name="confirmpsw"
                            rules={[{ required: true, message: '请确认密码！' }]}
                        >
                            <Input.Password placeholder='确认密码！' />
                        </Form.Item>
                    </Form>
                </Modal>
            </div >
        </div >
    )
}

export default Login
