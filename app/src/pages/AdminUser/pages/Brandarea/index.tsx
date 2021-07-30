import styles from './style.module.less'
import { Tabs } from 'antd'
import { getBrandProducts, getBrands } from '@config/index'

const { TabPane } = Tabs;

const Brandarea = () => {
    function callback(key: any) {
        console.log(key);
    }
    const brands = getBrands()
    console.log('brands', brands)
    return (
        <Tabs defaultActiveKey="1" onChange={callback}>
            {brands.map((brand) => {
                const brandProducts = getBrandProducts(brand)
                return (
                    <TabPane tab={brand} key={brand}>
                        <div className={styles.tabbody}>
                            {brandProducts.map((product: any) => {
                                return (
                                    <div className={styles.tabproduct}>
                                        {product.name}
                                        {product.brand}
                                        {product.price}
                                    </div>
                                )
                            })}
                        </div>
                    </TabPane>
                )
            })}

        </Tabs>
    )
}

export default Brandarea
