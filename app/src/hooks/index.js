import { useState, useEffect } from 'react'
import axios from 'axios'

export const useTitle = (title) => {
    useEffect(() => {
        document.title = title
    }, [title])

    return
}
export const useUpdate = () => {
    const [, setFlag] = useState()
    const update = () => {
        setFlag(Date.now())
    }
    return update
}
//query为参数键值对象
export function useQuery() {
    const [query, setQueryObject] = useState('');
    const mapParamsToQuery = () => {
        const queryObject = {}
        const paramsString = window.location.href.indexOf('?') === -1 ? '' : window.location.href.slice(window.location.href.indexOf('?') + 1)
        const paramsList = paramsString.split('&')
        paramsList.forEach((item) => {
            const key = item.slice(0, item.indexOf('='))
            const value = item.slice(item.indexOf('=') + 1)
            const query = {
                [key]: value
            }
            Object.assign(queryObject, query)
        })
        setQueryObject(queryObject)
    }

    // 刷新页面重置query
    useEffect(() => {
        mapParamsToQuery()
    }, [])
    const format = (obj) => {
        let str = '?'
        for (let i in obj) {
            if (obj.hasOwnProperty(i)) {
                str = `${str}${i}=${obj[i]}&`
            }
        }
        return str
    }
    const setQuery = (obj) => {
        window.location.href = window.location.href.indexOf('?') === -1 ?
            window.location.href + format(obj) :
            window.location.href.slice(0, window.location.href.indexOf('?')) + format(obj);
        window.location.href = window.location.href.slice(0, window.location.href.length - 1)
        mapParamsToQuery()
    }

    return [query, setQuery]
}
export const useFetch = (url, data1 = {}, type = 'GET') => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        let promise
        // 1. 执行异步ajax请求
        if (type === 'GET') { // 发GET请求
            promise = axios.get(url, { // 配置对象
                params: data1 // 指定请求参数
            })
        } else { // 发POST请求
            promise = axios.post(url, data1)
        }
        promise.then(response => {
            setData(response.data)
        }).catch(error => {
            setError(error);
        }).finally(() => setLoading(false))
    }, [url, type])
    return { loading, error, data };
}

export function useLocationStorage(key = 'default', value = '') {
    const [v, setv] = useState(value)
    const setValue = (v1) => {
        localStorage.setItem(key, v1)
        setv(v1)
    }
    const getValue = () => {
        localStorage.getItem(key)
    }
    useEffect(() => {
        localStorage.setItem(key, value)
    }, [key, value])
    return [v, setValue, getValue]
}