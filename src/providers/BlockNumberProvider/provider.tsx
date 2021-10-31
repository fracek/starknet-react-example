import React from 'react'
import { BlockNumberContext} from './context'
import {getBlock} from 'starknet'

interface BlockNumberProviderProps {
    children: React.ReactNode
    interval?: number
}

export function BlockNumberProvider({ interval, children }: BlockNumberProviderProps): JSX.Element {
    const [blockNumber, setBlockNumber] = React.useState<number | undefined>(undefined)

    const fetchBlockNumber = React.useCallback(() => {
        getBlock().then(block => {
            setBlockNumber(block.block_id)
        })
    }, [])

    React.useEffect(() => {
        fetchBlockNumber()
        const intervalId = setInterval(() => {
            fetchBlockNumber()
        }, interval ?? 5000)
        return () => clearInterval(intervalId)
    }, [interval, fetchBlockNumber])

    return <BlockNumberContext.Provider value={blockNumber} children={children} />
}