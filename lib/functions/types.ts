import { Chain, Hex } from 'viem'

export type GlobalConfig = {
    viemChain: Chain
    compilerVersion: string
    useWallet: boolean
}

export type DeployContractParams = {
    chainId: string
    contractName: string
    sourceCode: string
    constructorArgs: Array<string | string[]>
}

export type DeployContractResults = {
    sourceCode: string
    explorerUrl: string
    ipfsUrl: string
    verifyingContractConfig: VerifyContractParams
    abi: any
    standarcJsonInput: string
}

export type VerifyContractParams = {
    deployHash: Hex
    standardJsonInput: string
    encodedConstructorArgs: string
    fileName: string
    contractName: string
    viemChain: Chain
}

export type LastDeploymentData = {
    address?: Hex
    transactionHash: Hex
    explorerUrl: string
    abi: string
    verificationStatus: string
    standardJsonInput: string
    sourceCode: string
}