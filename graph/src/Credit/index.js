const config = require("./config");
const { executeQuery } = require("./subgraph");

function calculateTotals(data) {
  const totalBorrowed =
    data.account.borrows.reduce(
      (sum, borrow) => sum + parseFloat(borrow.amountUSD),
      0
    ) || data.borrows.amountUSD;

  const totalRepaid =
    data.account.repays.reduce(
      (sum, repay) => sum + parseFloat(repay.amountUSD),
      0
    ) || data.repays.amountUSD;

  const openPositions = data.account.openPositionCount || 0;
  const closedPositions = data.account.closedPositionCount || 1;
  const liquidationCount =
    data.account.liquidations.length ||
    data.withdraws.position.liquidationCount ||
    0;

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
  };

  const delta = totalBorrowed - totalRepaid;
  const gamma =
    openPositions + closedPositions === 0
      ? 0
      : closedPositions / (openPositions + closedPositions);
  const lambda = liquidationCount ** 2;

  const score = Math.abs(
    weights.gamma * gamma - weights.delta * delta - weights.lambda * lambda
  );

  const scaledScore = scaleTo1000(score);

  console.log({ score, scaledScore });

  return scaledScore;
};

async function getReputation(address) {
  const whitelistAddressesForDemo = process.env.WHITELIST_ADDRESSES?.split(",");
  if (whitelistAddressesForDemo?.indexOf(address) !== -1) {
    return Math.floor(Math.random() * 1000);
  }

  let total = 0;
  for (const protocol in config.protocol) {
    const chains = config.protocol[protocol];
    for (const chain in chains) {
      const id = chains[chain];
      const data = await executeQuery(id, address, "protocol");
      const score = parseProtocolData(data);
      total += score;
    }
  }
  return Math.floor(total);
}

module.exports = { getReputation };
