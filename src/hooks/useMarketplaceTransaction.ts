import { useCallback } from 'react'
import { BigNumberish } from '@ethersproject/bignumber'
import {
  CLPublicKey,
  CLValueBuilder,
  decodeBase16,
  encodeBase16,
} from 'casper-js-sdk'
import { toast } from 'react-toastify'

import {
  NEXT_PUBLIC_CASPER_CHAIN_NAME,
  NEXT_PUBLIC_CASPER_NODE_ADDRESS,
  contracts,
} from '@/config'
import { openCsprExplorer } from '@/utils/hash'
import { useCasperWeb3Provider } from '../provider/CasperWeb3Provider'
import useCEP47 from './useCEP47'
import useMarketplace from './useMarketplace'

export default function useMarketplaceTransaction(contractHash: string) {
  const { currentAccount, getDeploy, signDeploy } = useCasperWeb3Provider()
  const { createSellOrder, buySellOrderCspr, createBuyOrderCspr } =
    useMarketplace()
  const { approve, getAllowance } = useCEP47(contractHash)

  const sellToken = useCallback(
    async (id: string) => {
      if (currentAccount === undefined) return

      toast.info('Checking allownace')
      let shouldApprove = true
      try {
        const allowance = await getAllowance(
          CLPublicKey.fromHex(currentAccount),
          id,
        )

        const parsedAllowance = CLValueBuilder.byteArray(
          decodeBase16(allowance.slice(13)),
        )
        const marketplaceContractPackageHash = CLValueBuilder.byteArray(
          decodeBase16(
            contracts.marketplace[
              NEXT_PUBLIC_CASPER_CHAIN_NAME
            ].contractPackageHash.slice(5),
          ),
        )
        shouldApprove =
          encodeBase16(parsedAllowance.data) !==
          encodeBase16(marketplaceContractPackageHash.data)
        // eslint-disable-next-line no-empty
      } catch (error: any) {}

      // Approve if allowance is incorrect
      if (shouldApprove) {
        toast.info('Approve request submitted.')
        const approveDeploy = await approve(
          CLValueBuilder.byteArray(
            decodeBase16(
              contracts.marketplace[
                NEXT_PUBLIC_CASPER_CHAIN_NAME
              ].contractPackageHash.slice(5),
            ),
          ),
          [id],
          '500000000',
          CLPublicKey.fromHex(currentAccount),
        )
        const signedApproveDeploy = await signDeploy(
          approveDeploy,
          currentAccount,
        )

        const arppoveDeployHash = await signedApproveDeploy.send(
          NEXT_PUBLIC_CASPER_NODE_ADDRESS,
        )

        const _ = await getDeploy(arppoveDeployHash)
      }

      const tokens = new Map<BigNumberish, BigNumberish>([[id, '1000000']])
      toast.info('Sign sell request transaction')
      const deployHash = await createSellOrder(
        Date.now(),
        contractHash,
        tokens,
        currentAccount!,
        '5000000000',
      )

      const _ = await getDeploy(deployHash)
    },
    [
      contractHash,
      currentAccount,
      createSellOrder,
      getDeploy,
      getAllowance,
      approve,
      signDeploy,
    ],
  )

  const buyToken = useCallback(
    async (id: string, price: string) => {
      //
      try {
        if (currentAccount === undefined) return
        const deployHash = await buySellOrderCspr(
          contractHash,
          id,
          price,
          '8000000000',
          currentAccount,
        )
        toast.info('Transaction submitted')
        const _ = await getDeploy(deployHash)
        toast.success('Transaction confirmed')
      } catch (error: any) {
        toast.error('Transaction failed')
      }
    },
    [contractHash, currentAccount, buySellOrderCspr, getDeploy],
  )

  const offerToken = useCallback(
    async (id: string, amount: BigNumberish) => {
      // TODO Check token owner is not caller and marketplace
      if (!currentAccount) throw Error('')
      const deployHash = await createBuyOrderCspr(
        contractHash,
        id,
        amount,
        '1000000000',
        CLPublicKey.fromHex(currentAccount),
      )
      toast.info(`Transaction created: ${deployHash}`, {
        autoClose: false,
        onClick: () => openCsprExplorer(deployHash),
      })
      const _ = await getDeploy(deployHash)
      toast.success(`Transaction confirmed`)
    },
    [contractHash, createBuyOrderCspr, currentAccount, getDeploy],
  )

  return {
    sellToken,
    buyToken,
    offerToken,
  }
}