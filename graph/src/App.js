import React, { useEffect, useState } from "react";
import { config } from "./Credit/config";
import { executeQuery } from "./Credit/subgraph";

export function calculateTotals(data) {
  // Aggregate totalBorrowed by summing up the amountUSD of each borrow transaction
  const totalBorrowed = data.borrows.reduce((sum, borrow) => {
    return sum + parseFloat(borrow.amountUSD);
  }, 0);

  // Aggregate totalRepaid by summing up the amountUSD of each repay transaction
  const totalRepaid = data.repays.reduce((sum, repay) => {
    return sum + parseFloat(repay.amountUSD);
  }, 0);

  console.log(totalBorrowed, totalRepaid);

  const openPositions = data.account ? data.account.openPositionCount : 0;
  const closedPositions = data.account ? data.account.closedPositionCount : 1;
  const liquidationCount = data.account
    ? data.withdraws.position.liquidationCount
    : 0;
  console.log(
    totalBorrowed,
    totalRepaid,
    openPositions,
    closedPositions,
    liquidationCount
  );

  return {
    totalBorrowed,
    totalRepaid,
    openPositions,
    closedPositions,
    liquidationCount,
  };
}

const scaleTo1000 = (number) => {
  if (number <= 0) {
    return 0;
  }

  const scaledNumber = Math.log(number);
  return Math.min(1000, scaledNumber * (1000 / Math.log(10000000)));
};

const parseProtocolData = (data) => {
  const {
    totalBorrowed,
    totalRepaid,
    openPositions,
    closedPositions,
    liquidationCount,
  } = calculateTotals(data);

  const weights = {
    delta: 0.3,
    gamma: 0.8,
    lambda: 1,
    vouch: 0.01,
  };

  const delta = (totalRepaid - totalBorrowed) / totalRepaid;
  const gamma = closedPositions / (openPositions + closedPositions);
  const lambda = liquidationCount ** 2;

  const score = Math.abs(
    weights.gamma * gamma - weights.delta * delta - weights.lambda * lambda
  );

  const scaledScore = scaleTo1000(score);

  console.log({ score, scaledScore });

  return scaledScore;
};

async function getReputation(address) {
  let total = 0;
  // for (const protocol in config.protocol) {
  //   const chains = config.protocol[protocol];
  //   for (const chain in chains) {
  //     const id = chains[chain];
  //     const data = await executeQuery(id, address, "protocol");
  //     const score = parseProtocolData(data);
  //     total += score;
  //   }
  // }
  try {
    const data = await executeQuery(address, "protocol");
    const score = parseProtocolData(data);
    total += score;
  } catch (e) {
    console.log(e);
  }
  return Math.floor(total);
}
function App() {
  const [reputation, setReputation] = useState(0);
  const [address, setAddress] = useState("0x");
  useEffect(() => {
    getReputation(address);
  }, [address]);
  return (
    <div className="App">
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <h1>{reputation}</h1>
    </div>
  );
}

export default App;
