import { Input, Space, Button } from 'antd'
import { ShoppingCartOutlined, CameraOutlined, SearchOutlined } from '@ant-design/icons'
import gift from './gift.gif'
import styles from './style.module.less'
import QRCode from 'qrcode.react'
import Count from './components/Count/Count'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCarProducts } from '@config/index'

const { Search } = Input
const onSearch = (value: any) => console.log(value)
const suffix = (
    <CameraOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
)

const Userhome = (props: any) => {
    const [buyProducts, setBuypros] = useState()
    useEffect(() => {
        const pros = getCarProducts()
        setBuypros(pros.length)
    }, [])
    const { carPros } = props
    const history = useHistory()
    return (
        <>
            <div className={styles.userhomeheader}>
                <Button type='link'><img src={gift} alt="gift" /></Button>
                <div>
                    <Space>
                        <Search
                            placeholder="饮水机 立式"
                            enterButton={<SearchOutlined />}
                            suffix={suffix}
                            onSearch={onSearch}
                            style={{ width: 500 }}
                        />
                        <Button onClick={() => history.replace('/adminuser/shoppingcar')}><ShoppingCartOutlined /><Count count={carPros.length || buyProducts} />我的购物车</Button>
                    </Space>
                </div>
                <QRCode
                    value='欢迎大家留言交流讨论'// 生成二维码的内容
                    size={70} // 二维码的大小
                    fgColor="#000000" // 二维码的颜色
                />
            </div >
            <div className={styles.funcTabs}>
                <Button type='link'>秒杀</Button>
                <Button type='link'>优惠券</Button>
                <Button type='link'>拍卖房</Button>
            </div>
        </>
    )
}

export default Userhome
