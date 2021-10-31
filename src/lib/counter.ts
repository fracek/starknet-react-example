import React from 'react'
import { Contract, Abi } from 'starknet'

import COUNTER from './abi/counter.json'

const ADDRESS = '0x05ee069079158344aef3526153db4ba7a3e39481a285059f21c34c4592ed5b2d'

/**
 * Load the counter contract.
 * 
 * This example uses a hook because the contract address could depend on the
 * chain or come from an external api.
 * @returns The `counter` contract or undefined.
 */
export function useCounterContract(): Contract | undefined {
    const [contract, setContract] = React.useState<Contract | undefined>(undefined)

    React.useEffect(() => {
        setContract(new Contract(COUNTER as Abi[], ADDRESS))
    }, [])

    return contract
}