import React, { useEffect } from "react";
import { request, gql } from "graphql-request";

const Api_Url = `https://gateway-arbitrum.network.thegraph.com/api/7ca7636f3f5928a15f317ab35cd9ac8e/subgraphs/id/JCNWRypm7FYwV8fx5HhzZPSFaMxgkPuw4TnR3Gpi81zk`;

// const testquery = gql`
//   query {
//     tokens(first: 1) {
//       id
//       name
//       symbol
//       decimals
//     }
//     rewardTokens(first: 1) {
//       id
//       token {
//         id
//       }
//       type
//       _distributionEnd
//     }
//   }
// `;
const protocolQuery = gql`
  query ProtocolQuery($address: String!) {
    account(id: $address) {
      id
      depositCount
      liquidateCount
      openPositionCount
      closedPositionCount
      repayCount
      borrowCount
      liquidationCount

      borrows {
        id
        amount
        amountUSD
        asset {
          name
          symbol
          decimals
        }
      }

      liquidations {
        id
        amount
        amountUSD
        asset {
          name
          symbol
          decimals
        }
      }

      repays {
        id
        amount
        amountUSD
        asset {
          name
          symbol
          decimals
        }
      }
    }
    tokens(first: 1) {
      id
      name
      symbol
      decimals
    }
    rewardTokens(first: 1) {
      id
      token {
        id
      }
      type
      _distributionEnd
    }
    borrows(first: 10) {
      id
      amount
      amountUSD
      asset {
        name
        symbol
        decimals
      }
    }
    repays(first: 10) {
      id
      amount
      amountUSD
    }
    withdraws(first: 10) {
      amountUSD
      position {
        liquidationCount
      }
    }
  }
`;

const dexQuery = gql`
  query DexQuery($address: String!) {
    account(id: $address) {
      positions {
        id
        cumulativeDepositUSD
        cumulativeRewardUSD
        cumulativeWithdrawUSD
        pool {
          id
          protocol {
            name
            activeLiquidityUSD
            totalLiquidityUSD
          }
          name
          symbol
        }
      }

      positionCount
    }
  }
`;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export const executeQuery = async (address, type) => {
  for (let i = 0; i < 2; i++) {
    try {
      const url =
        "https://gateway-arbitrum.network.thegraph.com/api/7ca7636f3f5928a15f317ab35cd9ac8e/subgraphs/id/JCNWRypm7FYwV8fx5HhzZPSFaMxgkPuw4TnR3Gpi81zk";
      if (type === "dex") {
        const data = await request(url, dexQuery, { address });
        console.log(data);
        return data;
      } else {
        const data = await request(url, protocolQuery, { address });
        console.log(data);
        return data;
      }
    } catch (e) {
      sleep(2000);
    }
  }
  return 0;
};
