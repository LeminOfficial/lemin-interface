
# Lemin - Payment Streaming Platform

A modern, intuitive platform for creating and managing continuous payment streams on the Celo blockchain.

## Features

- **Linear Streaming**: Send tokens at a constant rate per second
- **Real-time Preview**: See your stream details before creation
- **Multi-token Support**: Stream any ERC-20 token
- **Cancellable Streams**: Optional stream cancellation
- **Beautiful UI**: Modern, responsive design with light/dark themes

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Preview production build:
   ```bash
   npm run preview
   ```

## Deploying with Foundry

These notes show how to deploy the `TokenStream` contract using Foundry (`forge`). The contract lives at `contracts/TokenStream.sol` and has no constructor arguments.

1. Install Foundry (on Linux):

   ```sh
   curl -L https://foundry.paradigm.xyz | bash
   foundryup
   ```

2. From the repository root, install OpenZeppelin (the contract imports OZ):

   ```sh
   forge install OpenZeppelin/openzeppelin-contracts
   ```

3. Copy `.env.example` to `.env` and set values (or export env vars directly):

   - `RPC_URL` — the RPC endpoint for the target network (Celo Forno, or your node)
   - `PRIVATE_KEY` — your deployer's private key (keep secret). The example uses a decimal number for compatibility with `vm.envUint` in the script. Alternatively, you can pass `--private-key` on the CLI.

4. Run the deploy script and broadcast the transaction:

   ```sh
   # using env vars (recommended)
   forge script script/Deploy.s.sol:DeployTokenStream --rpc-url $RPC_URL --private-key $PRIVATE_KEY --broadcast

   # or pass the private key directly on the CLI
   forge script script/Deploy.s.sol:DeployTokenStream --rpc-url $RPC_URL --private-key 0xYOUR_KEY --broadcast
   ```

### Private key formats supported

The `script/Deploy.s.sol` Foundry script now accepts `PRIVATE_KEY` from `.env` in either format:

- Hex (0x...) — put the hex private key in `.env` exactly as `PRIVATE_KEY=0x...`. The script parses 0x-prefixed hex strings.
- Decimal — put the key as a decimal number (`PRIVATE_KEY=123456...`) and the script will parse it too.

If `PRIVATE_KEY` is omitted from `.env`, you can still pass the key on the CLI with `--private-key` when running `forge script`.

Notes:

- After `forge install` you should have a `lib` folder with OpenZeppelin and Foundry will generate the right remappings.
