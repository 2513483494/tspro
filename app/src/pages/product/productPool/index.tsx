import { Tabs } from 'antd';
import Cityproduct from './components/city'
import Stateproduct from './components/state'
import './index.less'
import { useQuery } from '@hooks/index'
import { useEffect, useState } from 'react'

const { TabPane } = Tabs;

const Productpool = () => {
    const [query, setQuery] = useQuery()
    const [activeKey, settab] = useState('')
    function callback(key: string) {
        const params = Object.assign({},query,{activeKey: key})
        setQuery(params)
        settab(key)
    }
    useEffect(() => {
        settab(query.activeKey)
    }, [query.activeKey])
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
