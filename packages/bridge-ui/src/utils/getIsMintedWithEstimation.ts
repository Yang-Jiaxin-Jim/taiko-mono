import { type Signer, Contract, BigNumber } from 'ethers';
import type { Token } from '../domain/token';
import { freeMintErc20ABI } from '../constants/abi';
import { getLogger } from './logger';

const log = getLogger('util:minting');

/**
 * This function returns a boolean indicating whether the user has already claimed
 * the test token on L1, and the estimated cost of the transaction for minting if not.
 */
export async function getIsMintedWithEstimation(
  signer: Signer,
  token: Token,
): Promise<[boolean, BigNumber]> {
  const address = signer.getAddress();

  const l1TokenContract = new Contract(
    token.addresses[0].address, // L1 address
    freeMintErc20ABI,
    signer,
  );

  try {
    const userHasAlreadyClaimed = await l1TokenContract.minters(address);

    log(`Has user already claimed ${token.symbol}? ${userHasAlreadyClaimed}`);

    if (userHasAlreadyClaimed) {
      return [true, null]; // already claimed, no gas cost is needed
    }
  } catch (error) {
    throw new Error(`there was an issue getting minters for ${token.symbol}`, {
      cause: error,
    });
  }

  try {
    const gas = await l1TokenContract.estimateGas.mint(address);
    const gasPrice = await signer.getGasPrice();
    const estimatedGas = BigNumber.from(gas).mul(gasPrice);

    log(`Estimated gas to mint token ${token.symbol}: ${estimatedGas}`);

    return [false, estimatedGas];
  } catch (error) {
    throw new Error(`failed to estimate gas to mint token ${token.symbol}`, {
      cause: error,
    });
  }
}
