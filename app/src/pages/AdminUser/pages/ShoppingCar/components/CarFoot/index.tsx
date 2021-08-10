import { Checkbox, Button, Popover } from 'antd';
import { useState, useEffect } from 'react'
import styles from './style.module.less'
import { getCarProducts } from '@config/index'
import p from './1.jpg'

function onChange(e: any) {
    console.log(`checked = ${e.target.checked}`);
}

const CarFoot = (props: any) => {
    //选中商品信息
    const content = (
        <div>1</div>
    )

    const [allPrice, setAllprice] = useState(0)
    //const [imgsrc, seti] = useState('')
    const countBill = () => {
        // var src = p;
        // function set(key: any) {
        //     var img = document.createElement('img');
        //     img.addEventListener("load", function () {
        //         var imgCanvas = document.createElement("canvas");
        //         const imgContext = imgCanvas.getContext("2d");
        //         imgCanvas.width = this.width;
        //         imgCanvas.height = this.height;
        //         imgContext?.drawImage(this, 0, 0, this.width, this.height);
        //         try {
        //             var imgAsDataURL = imgCanvas.toDataURL("image/png");
        //             localStorage.setItem(key, imgAsDataURL);
        //         } catch (e) {
        //             console.log("storage failed" + e);
        //         }
        //     }, false);
        //     img.src = src;
        // }

        // function get(key: any) {
        //     var srcStr = localStorage.getItem(key) || '';
        //     return srcStr
        // }
        // set('img')
        // seti(get('img'))
    }
    useEffect(() => {
        const pros = getCarProducts()
        let p = 0
        pros.forEach((pro: any) => {
            p += pro.price * pro.buyCount
        })
        setAllprice(p)
    }, [])
    return (
        <div className={styles.carfoot}>
            <Checkbox onChange={onChange}>全选</Checkbox>
            <Button type='link'>删除选中商品</Button>
            <Button type='link'>清空购物车</Button>
            <Popover content={content} title="Title">
                <Button type="primary">Hover me</Button>
            </Popover>
            <span>总价：{props.price || allPrice}</span>
            <Button type='primary' onClick={countBill}>结算</Button>
            {/* <img src={imgsrc} /> */}
        </div>
    )
}

export default CarFoot
