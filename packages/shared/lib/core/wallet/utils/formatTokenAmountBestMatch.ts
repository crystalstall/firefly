import { getIotaUnit, IOTA_UNIT_MAP } from '@core/utils'
import { formatNumber } from '@lib/currency'

import { ITokenMetadata } from '../interfaces'
import { formatTokenAmountDefault } from './formatTokenAmountDefault'

export function formatTokenAmountBestMatch(
    amount: number,
    tokenMetadata: ITokenMetadata,
    overrideDecimalPlaces?: number,
    withUnit = true
): string {
    let amountWithoutUnit: string
    let amountWithUnit: string

    if (tokenMetadata?.useMetricPrefix) {
        const metricUnit = getIotaUnit(amount)
        const maxDecimals = overrideDecimalPlaces ?? IOTA_UNIT_MAP[metricUnit].decimalPlaces
        const convertedAmount = amount / IOTA_UNIT_MAP[metricUnit].value
        amountWithoutUnit = formatNumber(convertedAmount, 0, maxDecimals, undefined, true)
        amountWithUnit = amountWithoutUnit + ' ' + metricUnit + tokenMetadata.unit
    } else {
        amountWithoutUnit = formatTokenAmountDefault(amount, tokenMetadata)
        amountWithUnit = amountWithoutUnit + (tokenMetadata?.unit ? ' ' + tokenMetadata.unit : '')
    }

    if (withUnit) {
        return amountWithUnit
    }
    return amountWithoutUnit
}
