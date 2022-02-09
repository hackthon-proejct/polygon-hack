const Machine = artifacts.require("Machine");
const MintSubmission = artifacts.require("MintSubmission");

module.exports = function (deployer) {
  deployer.deploy(Machine);
  //deployer.deploy(MintSubmission);
};
