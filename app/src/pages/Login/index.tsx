import { Form, Input, Button, Modal, message } from 'antd'
import './index.less'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { lazy, Suspense, useState, useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import Qrcode from '@components/qrCode/idnex'
import styles from './style.module.less'

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
    const [loginType, setLoginType] = useState(true)//二维码登录，账号密码登录
    const [users, setusers] = useState<any>()
    const [loginModel, setModel] = useState(true)//true商家版，false用户版
    useEffect(() => {
        const u = localStorage.getItem("users")
        const users = u ? JSON.parse(u) : []
        setusers(users)
    }, [])
    useEffect(() => {
        const info = loginModel ? '当前为商家版登录模式' : '当前为用户版登录模式'
        message.info(info)
    }, [loginModel])
    const onFinish = (values: userInfo) => {
        for (let i in users) {
            if (users[i].name === values.username && users[i].psw === values.password) {
                message.success('登陆成功！')
                const login = loginModel ? '1' : '0'
                localStorage.setItem('isLogedIn', 'true')
                localStorage.setItem('loginModel', login)//登录模式 1--商家版，0--用户版
                localStorage.setItem('currentUser', values.username)
                const goto = loginModel ? '/admin' : '/adminuser'
                history.push(goto)
            }
        }
        if (localStorage.getItem('isLogedIn') !== 'true') {
            message.error('用户名或密码错误，请重新输入！')
            mainform.resetFields()
        }
    }
    const register = () => {
        form.resetFields()
        setIsModalVisible(true)
    }
    const changeLoginType = () => {
        setLoginType(!loginType)
    }
    const [isModalVisible, setIsModalVisible] = useState(false)
    if (localStorage.getItem('isLogedIn') === 'true') {
        console.log()
        if (localStorage.getItem('loginModel') === '1') {
            return <Redirect to='/admin'></Redirect>
        } else {
            return <Redirect to='/adminuser'></Redirect>
        }
    }
    const handleOk = () => {
        setIsModalVisible(false)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const setUser = () => {
        if (form.getFieldValue('psw') === form.getFieldValue('confirmpsw')) {
            const value = form.getFieldsValue(['name', 'psw'])
            const u = localStorage.getItem("users")
            const users = u ? JSON.parse(u) : []
            setusers(users)
            users.push(value)
            localStorage.setItem('users', JSON.stringify(users))
            message.success('注册成功')
            setIsModalVisible(false)
        } else {
            message.error('两次密码输入不同，请重新输入')
            form.resetFields(['psw', 'confirmpsw'])
        }
    }

    return (
        <div className={styles.loginbody}>
            <div>
                <Loginheader />
                <Button type='primary' onClick={() => setModel(!loginModel)}>{loginModel ? '当前为商家登录模式' : '当前为用户登录模式'}</Button>
            </div>
            <div className={styles.loginform}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
                    form={mainform}
                >
                    {loginType ? (
                        <>
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: '请输入用户名！' }]}
                            >
                                <Input prefix={<UserOutlined />} placeholder='请输入用户名' />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: '请输入密码！' }]}
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder='请输入密码' />
                            </Form.Item>
                        </>) : (
                        <Form.Item
                            name="qrcode"
                        >
                            <div style={{ position: 'relative', left: 120 }}>
                                <Qrcode url={localStorage.getItem('username') || 'admin'} />
                            </div>
                        </Form.Item>
                    )}
                    <Form.Item
                        name="extra"
                    >
                        <Button type='link' style={{ color: 'green', right: 10, fontSize: 15, fontWeight: 'bolder' }} onClick={() => register()}>注册</Button>
                        <Button type='link' style={{ color: 'red', left: 200, fontSize: 15, fontWeight: 'bolder' }} onClick={() => changeLoginType()}>{loginType ? '扫码登录' : '账号登录'}</Button>
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
                    footer={null}
                >
                    <Form form={form} onFinish={setUser}>
                        <Form.Item
                            name="name"
                            rules={[{
                                validator: (rule: any, value: string, callback: any) => {
                                    if (value) {
                                        if (!users) {
                                            return Promise.resolve();
                                        } else {
                                            for (let i in users) {
                                                if (users[i].name === value) {
                                                    return Promise.reject(new Error('用户名相同，请重新输入！'));
                                                }
                                            }
                                        }
                                        return Promise.resolve();
                                    } else {
                                        return Promise.reject(new Error('请输入用户名！'));
                                    }
                                },
                            }]}
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
                        <Form.Item wrapperCol={{ span: 16 }}>
                            <Button type="primary" htmlType="submit" style={{ width: 473 }}>
                                注册
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div >
        </div >
    )
}

export default Login
