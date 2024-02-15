# Hedera Whitelist DApp

## Overview

This project is a decentralized application (DApp) built on the Hedera Hashgraph network for whitelisting accounts. The purpose of the DApp is to allow project owners to whitelist accounts for Initial DeX Offerings (IDOs) on the Hedera network. Users can whitelist their accounts or check if a specific account is whitelisted.

## Setup

Clone the repository and navigate into the project directory:

```
git clone https://github.com/CeliktepeMurat/Whitelist-Dapp.git
cd headstarter-whitelist-dapp
```

Install dependencies:

```
npm install
```

Set the Contract ID on Config/constants.ts

```
CONTRACT_ID = "Enter your contract ID here";
```

Start the development server:

```
npm start
```

Open your browser and navigate to http://localhost:3000 to view the application.

## Usage

- Enter the account address you want to whitelist in the input field.
- Click the "Whitelist" button to whitelist the account.
- To check if an account is whitelisted, enter the account address and click the "Check Whitelist" button.
- Transaction IDs and status updates will be displayed in real-time.
