import styles from './style.module.less'
import { Button, Tabs } from 'antd'
import { getBrandProducts, getBrands } from '@config/index'
import { useState, useEffect } from 'react';

const { TabPane } = Tabs;

const Brandarea = () => {
    const [currTab, setCurrtab] = useState()
    const [currProducts, setCurrProducts] = useState([])
    useEffect(() => {
        const pros = getBrandProducts(currTab || '娃哈哈')
        setCurrProducts(pros)
    }, [currTab])
    function callback(key: any) {
        setCurrtab(key)
    }
    const brands = getBrands()
    return (
        <>
            <Tabs defaultActiveKey="百事" onChange={callback}>
                {brands.map((brand) => {
                    return (
                        <TabPane tab={brand} key={brand}>
                        </TabPane>
                    )
                })}
            </Tabs>
            {currProducts.map((product: any) => {
                return (
                    <div>
                        <div>{product.name}</div>
                        <div>{product.brand}</div>
                        <div>{product.price}</div>
                        <Button>购买</Button>
                    </div>
                )
            })}
        </>
    )
}

export default Brandarea
