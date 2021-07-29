import { Checkbox, Button, Popover } from 'antd';
import styles from './style.module.less'

function onChange(e: any) {
    console.log(`checked = ${e.target.checked}`);
}

const CarFoot = () => {
    //选中商品信息
    const content = (
        <div>1</div>
    )
    return (
        <div className={styles.carfoot}>
            <Checkbox onChange={onChange}>全选</Checkbox>
            <Button type='link'>删除选中商品</Button>
            <Button type='link'>清空购物车</Button>
            <Popover content={content} title="Title">
                <Button type="primary">Hover me</Button>
            </Popover>
            <span>总价：{allPrice}</span>
            <Button type='primary'>结算</Button>
        </div>

    )
}

export default CarFoot
