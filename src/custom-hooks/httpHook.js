import React, { useState, useEffect} from 'react'
import { encode } from 'base-64'

// GET request
export const useFetch = (url, options) => {
    const [response, setResponse] = React.useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const FetchData = async () => {
            setLoading(true)
            let username = 'memefeed'
            let password = 'Connect12345!'
            let myHeaders = new Headers()
            myHeaders.append('Content-Type', 'multipart/form-data')
            myHeaders.append(
                'Authorization',
                `Basic ${encode(`${username}:${password}`)}`
            )
            
            options.headers = myHeaders
            try {
                const res = await fetch(url, options)
                const json = await res.json()
                // alert(JSON.stringify(json))
                setResponse(json)
                setLoading(false)
            } catch (error) {
                alert(error)
                setError(error)
                setLoading(false)
            }
        }
        FetchData()
    }, [url, options])
    return { response, error }
}