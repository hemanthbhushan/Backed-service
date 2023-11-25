import dotenv from "dotenv";
import Web3 from "web3";
import POOL_ABI from "../abi/POOL_ABI";
import {
  aaveV3Mainnet,
  aaveV3Optimism,
  aaveV3Arbitrum,
  aaveV3Polygon,
  aaveV3Avalanch,
  RPC_ETHEREUM_MAINNET,RPC_OPTIMISM,RPC_ARBITRUM,RPC_POLYGON,RPC_AVALANCHE
} from "../commom/constants";

interface BlockchainConfig {
  rpcUrl: string;
  contractAddress: string;
}
const blockchainConfigs: Record<string, BlockchainConfig> = {
  ethereumMainnet: {
    rpcUrl: RPC_ETHEREUM_MAINNET as string,
    contractAddress: aaveV3Mainnet as string,
  },
  optimism: {
    rpcUrl: RPC_OPTIMISM as string,
    contractAddress: aaveV3Optimism as string,
  },
  arbitrum: {
    rpcUrl: RPC_ARBITRUM as string,
    contractAddress: aaveV3Arbitrum as string,
  },
  polygon: {
    rpcUrl: RPC_POLYGON as string,
    contractAddress: aaveV3Polygon as string,
  },
  avalanche: {
    rpcUrl: RPC_AVALANCHE as string,
    contractAddress: aaveV3Avalanch as string,
  },
};

class FetchData {
  constructor() {
    dotenv.config();
  }

public fetchDataForBlockchain = async (blockchain: string)=> {
  try {
    const config = blockchainConfigs[blockchain];

    if (!config) {
      throw new Error(`Configuration not defined for blockchain: ${blockchain}`);
    }

    const { rpcUrl, contractAddress } = config;
    console.log(contractAddress,"contractAddress");
    console.log(rpcUrl,"rpcUrl");

    const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));
    console.log(`Fetching data from ${blockchain}...`);

    const poolContract = new web3.eth.Contract(POOL_ABI as any, contractAddress as string);
    const data = await poolContract.methods.ADDRESSES_PROVIDER().call();

    console.log(`Data from ${blockchain}:`, data);

    return data;
  } catch (error) {
    console.error(`Error fetching data for ${blockchain}:`, error);
    return null;
  }
}



public fetchDataChainWise = async ()=> {
  const blockchains = Object.keys(blockchainConfigs);

  for (const blockchain of blockchains) {
    await this.fetchDataForBlockchain(blockchain);
  }
}


}

export default new FetchData();





