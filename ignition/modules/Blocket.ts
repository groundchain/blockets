import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("BlocketModule", (m) => {
  const blocket = m.contract("Blocket");

  return { blocket };
});
