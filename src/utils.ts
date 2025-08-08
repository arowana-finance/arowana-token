import { getAddress } from 'ethers';
import { toFixedHex } from 'ethers-opt';

export function bnToHex(bn: bigint | number | string) {
    if (!bn) {
        return '0x';
    }
    let hexString = BigInt(bn).toString(16);
    if (hexString.length % 2 !== 0) {
        hexString = '0' + hexString;
    }
    return '0x' + hexString;
}

export function addressFromBigInt(bn: bigint) {
    return getAddress(toFixedHex(bn, 20));
}
