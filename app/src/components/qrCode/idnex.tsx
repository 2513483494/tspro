import QRCode from 'qrcode.react';

const Qrcode = (props: any) => {
    return (
        <QRCode
            value={props.url}// 生成二维码的内容
            size={82} // 二维码的大小
            fgColor="#000000" // 二维码的颜色

        />
    )
}

export default Qrcode
