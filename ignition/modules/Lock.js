const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");



module.exports = buildModule("Web3IdEmblemModule", (m) => {
 

  const Web3IDEmblems = m.contract("Web3IDEmblems"
  );

  return { Web3IDEmblems };
});
