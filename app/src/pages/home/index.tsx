import { Chart, Line, Point, Tooltip, Legend, Interaction } from "bizcharts";
import './index.less'
import { useState, useEffect } from 'react'
import { getProducts } from '@config/index'

const Home = () => {
    const [data1, setData] = useState<any>()
    useEffect(() => {
        const products = getProducts()
        const formatdata = []
        const brand: any = []
        for (let i in products) {
            if (brand.includes(products[i].brand)) {
                continue
            }
            brand.push(products[i].brand)
            let cprice = 0
            let ccount = 0
            for (let j in products) {
                if (products[j].brand === products[i].brand) {
                    cprice += +products[j].price
                    ccount += +products[j].storeCount
                }
            }
            cprice = +(cprice/products.length).toFixed(2)
            ccount = +(ccount/(products.length * 50)).toFixed(2)
            formatdata.push({
                brand: products[i].brand,
                city: "库存",
                price: ccount,
            })
            formatdata.push({
                brand: products[i].brand,
                city: "价格",
                price: cprice,
            })
        }
        console.log(formatdata)
        setData(formatdata)
    }, [])
    return (
        <div>

            <div className='home-chart'>
                <h1>各品牌平均库存量与价格对照图</h1>
                <Chart scale={{ price: { min: 0, type: 'linear-strict' } }} autoFit height={300} width={500} data={data1}>
                    <Line shape="smooth" position="brand*price" color="city" />
                    <Point position="brand*price" color="city" />
                    <Tooltip shared={true} showCrosshairs />
                    <Legend
                        name="city"
                        itemName={{
                            style: {
                                fill: "#333",
                            },
                        }}
                        onChange={(e: any) => {
                            const { item, view } = e;
                            const legend = view.getController("legend").components[0].component;
                            const items = legend.getItems();
                            view.filter("city", (city: any) => {
                                debugger
                                if (items.some((it: any) => it.value !== item.value && it.unchecked)) {
                                    return true;
                                } else {
                                    return city === item.value;
                                }
                            });
                            view.render();
                        }}
                    />
                    <Interaction type="legend-filter" />
                </Chart>
            </div>
        </div>

    );
}

export default Home
