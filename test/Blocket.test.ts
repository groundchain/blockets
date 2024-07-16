import { expect } from "chai";
import { ethers } from "hardhat";
import { Blockets } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("Blocket", function () {
  let blocket: Blockets;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy a new Blocket contract before each test
    blocket = await ethers.deployContract("Blocket");
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await blocket.owner()).to.equal(owner.address);
    });

    it("Should set the right admin", async function () {
      expect(await blocket.admin()).to.equal(owner.address);
    });

    it("Should have the correct name and symbol", async function () {
      expect(await blocket.name()).to.equal("Blocket");
      expect(await blocket.symbol()).to.equal("BKT");
    });
  });

  describe("Minting", function () {
    it("Should allow owner to mint", async function () {
      await blocket.mint(addr1.address);
      expect(await blocket.ownerOf(0)).to.equal(addr1.address);
    });

    it("Should increment token ID after minting", async function () {
      await blocket.mint(addr1.address);
      await blocket.mint(addr2.address);
      expect(await blocket.ownerOf(0)).to.equal(addr1.address);
      expect(await blocket.ownerOf(1)).to.equal(addr2.address);
    });

    it("Should not allow non-owners to mint", async function () {
      await expect(
        blocket.connect(addr1).mint(addr2.address)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Base URI", function () {
    it("Should return the correct base URI", async function () {
      await blocket.mint(addr1.address);
      expect(await blocket.tokenURI(0)).to.equal("https://yourdomain.com/metadata/0");
    });
  });

  it("Should mint and transfer an NFT to someone", async function () {
    const [owner, addr1] = await ethers.getSigners();

    let balance = await blocket.balanceOf(addr1.address);
    expect(balance).to.equal(0);

    const mintTx = await blocket.mint(addr1.address);
    await mintTx.wait();

    balance = await blocket.balanceOf(addr1.address);
    expect(balance).to.equal(1);
  });
});