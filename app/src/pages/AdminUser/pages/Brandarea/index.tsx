import styles from './style.module.less'
import { Button, Tabs } from 'antd'
import { addproductToshopcar, getBrandProducts, getBrands } from '@config/index'
import { useState, useEffect } from 'react';
import p1 from './imgs/1.webp'

const { TabPane } = Tabs;

const Brandarea = (props: any) => {
    const [currTab, setCurrtab] = useState("哇哈哈")
    const [currProducts, setCurrProducts] = useState([])
    useEffect(() => {
        const pros = getBrandProducts(currTab || '娃哈哈')
        setCurrProducts(pros)
    }, [currTab])
    function callback(key: any) {
        setCurrtab(key)
    }
    const brands = getBrands()
    const addToShopcar = (product: any) => {
        props.getCarPros(product)
    }
    return (
        <div>
            <Tabs defaultActiveKey="哇哈哈" onChange={callback}>
                {brands.map((brand) => {
                    return (
                        <TabPane tab={brand} key={brand}>
                        </TabPane>
                    )
                })}
            </Tabs>
            <div className={styles.producttab}>
                {currProducts.map((product: any) => {
                    return (
                        <div className={styles.product}>
                            <img src={p1} />
                            <div>{product.name}</div>
                            <div>{product.price}￥</div>
                            <Button type='primary' onClick={() => addToShopcar(product)}>购买</Button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Brandarea
