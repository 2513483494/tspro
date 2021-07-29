import { Tabs } from 'antd';
import Cityproduct from './components/city'
import Stateproduct from './components/state'
import './index.less'
import { useState, useEffect } from 'react'

const { TabPane } = Tabs;

const Productpool = () => {
    const [activeKey, settab] = useState('')
    function callback(key: string) {
        settab(key)
    }
    useEffect(() => {
        settab(activeKey || 'state')
    }, [activeKey])
    return (
        <div className='tabstyle'>
            <Tabs defaultActiveKey="state" onChange={callback} size='large' activeKey={activeKey}>
                <TabPane tab="全国" key="state">
                    <Stateproduct />
                </TabPane>
                <TabPane tab="城市" key="city">
                    <Cityproduct />
                </TabPane>
            </Tabs>
        </div>

    )
}

export default Productpool
