import { useCallback, useState } from 'react'
import { useWallet } from 'use-wallet'

import useSushi from './useSushi'
import { getChknLookupContract } from '../sushi/utils'

const useReferral = () => {
  const [currentLink, setCurrentLink] = useState<string>()
  const { account } = useWallet()

  const sushi = useSushi()
  const lookupContract = getChknLookupContract(sushi)

  const generate = useCallback(async () => {
    const randomBuffer = new Uint32Array(1)
    window.crypto.getRandomValues(randomBuffer)

    const res = await lookupContract.methods
      .generateKey(account, '0x' + randomBuffer[0].toString(16))
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })

    console.log('generate res', res)
  }, [account, lookupContract.methods])

  const getReferralLink = useCallback(async () => {
    // const res =
    //   '0x3444550000000000000000000000000000000000000000000000000000000000'
    const res = await lookupContract.methods.getKey(account).call()

    const link =
      res ===
      '0x0000000000000000000000000000000000000000000000000000000000000000'
        ? undefined
        : 'https://www.exchange.chkn.farm/#/pool?referrer=' +
          res.slice(2).replace(/0*$/, '')

    setCurrentLink(link)
  }, [account, lookupContract.methods])

  return { generate, getReferralLink, currentLink }
}

export default useReferral
