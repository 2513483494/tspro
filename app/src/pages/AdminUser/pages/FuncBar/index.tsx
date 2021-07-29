import styles from './style.module.less'
import { Button, Divider, Dropdown } from 'antd'
import { provinces } from '@config/index'
import Logout from '@components/Header/components/logout'
import { useState } from 'react'

const FunctionBar = () => {
    const provincesButtonName = (
        <div className={styles.provincebutton}>
            {provinces.map((p, i) => <span key={i} className={styles.pbutton}><Button onClick={() => setProvince(p)} type='link' key={i}>{p}</Button ></span>)}
        </div>
    );
    const service = (
        <div className={styles.backService}>
            <div>
                <p className={styles.title}>用户</p>
                <div><Button type='link'>售后服务</Button><Button type='link'>在线客服</Button></div>
                <div><Button type='link'>意见建议</Button><Button type='link'>客服邮箱</Button></div>
            </div>
            <Divider />
            <div>
                <p className={styles.title}>商家</p>
                <div><Button type='link'>合作招商</Button><Button type='link'>商家帮助</Button></div>
                <div><Button type='link'>商家后台</Button><Button type='link'>规则平台</Button></div>
            </div>
        </div>
    )
    const myJD = (
        <div className={styles.backService}>
            <div><Button type='link'>京东会员</Button><Button type='link'>我的优惠券</Button></div>
            <div><Button type='link'>我的京豆</Button><Button type='link'>我的理财</Button></div>
        </div>
    )
    const [currProvince, setProvince] = useState<string>()
    return (
        <div className={styles.funcBody}>
            <span>
                <Dropdown overlay={provincesButtonName}>
                    <Button type='link'>{currProvince || '四川'}</Button>
                </Dropdown>
            </span>
            <span className={styles.funcButton}>
                <Button type='link'>我的订单</Button>
                <Dropdown overlay={service}>
                    <Button type='link'>客户服务</Button>
                </Dropdown>
                <Dropdown overlay={myJD}>
                    <Button type='link'>我的京东</Button>
                </Dropdown>
                <Logout />
            </span>
        </div>
    )
}

export default FunctionBar
