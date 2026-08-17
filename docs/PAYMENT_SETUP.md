# Payment Setup

The public site is intentionally safe by default. No payment method becomes active until verified public payment information is added to `app.js`.

## Naira

Use a hosted Nigerian payment page from a provider such as Paystack or Flutterwave. Do not place secret API keys in this repository.

Update `SITE_CONFIG.ngn` in `app.js`:

```js
ngn: {
  enabled: true,
  provider: "Paystack",
  paymentUrl: "https://..."
}
```

Only the public hosted payment URL belongs in the repository.

## Cryptocurrency

Only public receiving addresses belong in this repository. Never commit a seed phrase, private key, exchange password, recovery phrase, or API secret.

Example:

```js
bitcoin: {
  enabled: true,
  name: "Bitcoin",
  symbol: "BTC",
  network: "Bitcoin",
  address: "PUBLIC_RECEIVING_ADDRESS"
}
```

For USDC or USDT, specify the exact network and verify that the wallet can receive that asset on that network before enabling it.

## Security boundary

GitHub Pages serves static files only. Card and bank data should be collected only by the selected hosted payment provider. Cryptocurrency transfers should go directly to verified public receiving addresses.
