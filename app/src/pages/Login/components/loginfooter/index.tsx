import './index.less'
import { Button } from 'antd'

export const Loginfooter = (): JSX.Element => {
    return (
        <div className='loginfooter'>
            <div><Button type='link'>author: xjq</Button></div>
            <div><Button type='link'>tel: 15834813471</Button></div>
            <div><Button type='link' onClick={() => window.location.href = 'https://2513483494.github.io/'}>blog</Button></div>
        </div>
    )
}