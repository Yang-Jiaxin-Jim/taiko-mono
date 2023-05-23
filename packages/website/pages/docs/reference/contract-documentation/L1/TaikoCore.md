---
title: TaikoCore
---

## TaikoCore

### state

```solidity
struct TaikoData.State state
```

### receive

```solidity
receive() external payable
```

### \_init

```solidity
function _init(address _addressManager, bytes32 _genesisBlockHash) internal virtual
```

Initialize the rollup.

#### Parameters

| Name               | Type    | Description                          |
| ------------------ | ------- | ------------------------------------ |
| \_addressManager   | address | The AddressManager address.          |
| \_genesisBlockHash | bytes32 | The block hash of the genesis block. |

### proposeBlock

```solidity
function proposeBlock(bytes input, bytes txList) external returns (struct TaikoData.BlockMetadata meta)
```

Propose a Taiko L2 block.

#### Parameters

| Name   | Type  | Description                                                                                                                                                                                                                                                                 |
| ------ | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| input  | bytes | An abi-encoded BlockMetadataInput that the actual L2 block header must satisfy.                                                                                                                                                                                             |
| txList | bytes | A list of transactions in this block, encoded with RLP. Note, in the corresponding L2 block an _anchor transaction_ will be the first transaction in the block -- if there are `n` transactions in `txList`, then there will be up to `n + 1` transactions in the L2 block. |

### proveBlock

```solidity
function proveBlock(uint256 blockId, bytes input) external
```

Prove a block with a zero-knowledge proof.

#### Parameters

| Name    | Type    | Description                                                                                    |
| ------- | ------- | ---------------------------------------------------------------------------------------------- |
| blockId | uint256 | The index of the block to prove. This is also used to select the right implementation version. |
| input   | bytes   | An abi-encoded TaikoData.BlockEvidence object.                                                 |

### verifyBlocks

```solidity
function verifyBlocks(uint256 maxBlocks) external
```

Verify up to N blocks.

#### Parameters

| Name      | Type    | Description                     |
| --------- | ------- | ------------------------------- |
| maxBlocks | uint256 | Max number of blocks to verify. |

### depositEtherToL2

```solidity
function depositEtherToL2() public payable
```

### getBlock

```solidity
function getBlock(uint256 blockId) public view returns (bytes32 _metaHash, address _proposer, uint64 _proposedAt)
```

### getForkChoice

```solidity
function getForkChoice(uint256 blockId, bytes32 parentHash, uint32 parentGasUsed) public view returns (struct TaikoData.ForkChoice)
```

### getCrossChainBlockHash

```solidity
function getCrossChainBlockHash(uint256 blockId) public view returns (bytes32)
```

### getCrossChainSignalRoot

```solidity
function getCrossChainSignalRoot(uint256 blockId) public view returns (bytes32)
```

### getStateVariables

```solidity
function getStateVariables() public view returns (struct TaikoData.StateVariables)
```

### getConfig

```solidity
function getConfig() public pure virtual returns (struct TaikoData.Config)
```

### getVerifierName

```solidity
function getVerifierName(uint16 id) public pure returns (bytes32)
```

---

## title: ProxiedTaikoCore

## ProxiedTaikoCore

### init

```solidity
function init(address _addressManager, bytes32 _genesisBlockHash) external
```