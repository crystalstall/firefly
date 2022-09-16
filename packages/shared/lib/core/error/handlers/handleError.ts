import { WalletRsError } from '../enums'
import { IError } from '../interfaces'
import { handleGenericError } from './handleGenericError'
import { handleWalletRsError } from './walletRs'

export function handleError(err: IError): void {
    if (err?.type in WalletRsError) {
        handleWalletRsError({ ...err, message: err?.message })
    } else {
        handleGenericError(err)
    }
}