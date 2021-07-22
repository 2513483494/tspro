import React, { useState, useEffect } from 'react';
import { TreeSelect, message } from 'antd';

interface IProps {
    onChange?: any;
    currentStores: any;
}

interface storeInfoBase {
    title: string;
    key: string;
    disableCheckbox: boolean;
}
interface storeInfo {
    title: string;
    key: string;
    disableCheckbox: boolean;
    children?: storeInfoBase[];
}
// 封装门店选择组件，可回填
const StoreSelect = (props: IProps): JSX.Element => {
    const t = [
        {
            title: '1',
            key: '1',
            disableCheckbox: false,
            children: [
                {
                    title: '2',
                    key: '2',
                    disableCheckbox: false,
                },
                {
                    title: '3',
                    key: '3',
                    disableCheckbox: false,
                },
                {
                    title: '4',
                    key: '4',
                    disableCheckbox: false,
                },
                {
                    title: '5',
                    key: '5',
                    disableCheckbox: false,
                },
            ],
        },
        {
            title: '6',
            key: '6',
            disableCheckbox: false,
            children: [
                {
                    title: '7',
                    key: '7',
                    disableCheckbox: false,
                },
                {
                    title: '8',
                    key: '8',
                    disableCheckbox: false,
                },
                {
                    title: '9',
                    key: '9',
                    disableCheckbox: false,
                },
                {
                    title: '10',
                    key: '10',
                    disableCheckbox: false,
                },
                {
                    title: '11',
                    key: '11',
                    disableCheckbox: false,
                },
                {
                    title: '12',
                    key: '12',
                    disableCheckbox: false,
                },
                {
                    title: '13',
                    key: '13',
                    disableCheckbox: false,
                },
                {
                    title: '14',
                    key: '14',
                    disableCheckbox: false,
                },
            ],
        },
        {
            title: '16',
            key: '16',
            disableCheckbox: false,
            children: [
                {
                    title: '17',
                    key: '17',
                    disableCheckbox: false,
                },
                {
                    title: '18',
                    key: '18',
                    disableCheckbox: false,
                },
            ],
        },
    ];

    const { onChange, currentStores } = props;
    //门店列表
    const [storeList, setStoreList] = useState<storeInfo[]>([]);
    const [stores, setstores] = useState(currentStores);//回填的stores
    useEffect(() => {
        setstores(currentStores);
    }, [currentStores]);

    useEffect(() => {
        const getData = async () => {
            try {
                const stores = [...t];
                setStoreList(stores);
            } catch (e) {
                message.error('请求错误，情刷新页面重试！');
            }
        };
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 选中的十个之外全不可选,list:所有门店,selectedStores:选中的门店
    const setStatus = (list: storeInfo[], selectedStores: string[]) => {
        list.forEach((item: storeInfo) => {
            item.children?.forEach((child: storeInfoBase) => { child.disableCheckbox = selectedStores.indexOf(child.key) === -1; });
        });
        return [...list];
    };

    // 重置门店列表为全部可选状态
    const reset = (list: storeInfo[]) => {
        list.forEach((item: storeInfo) => {
            item.disableCheckbox = false;
            item.children?.forEach((child: storeInfoBase) => { child.disableCheckbox = false; });
        });
        return [...list];
    };

    const changeSelectedStores = (selectedStores: string[]) => {
        let currStoreList;
        if (selectedStores.length > 10) {
            selectedStores = selectedStores.slice(0, 10);
            message.error('最多选择十个门店！');
            // 其余的均不可选
            currStoreList = setStatus(storeList, selectedStores);
        } else {
            // 重置
            currStoreList = reset(storeList);
        }
        setstores(selectedStores);
        setStoreList(currStoreList);
        // 父组件接收
        onChange && onChange(selectedStores);
    };

    return (
        <TreeSelect
            placeholder="可选择多个门店"
            allowClear
            value={stores}
            onChange={changeSelectedStores}
            treeData={storeList}
            treeCheckable
            treeDefaultExpandAll
            maxTagCount={0}
            maxTagPlaceholder={() => stores ? <div>已选择{stores.length}个门店</div> : ''}
        />
    );
};

export default StoreSelect
