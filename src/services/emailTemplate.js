export function generateOrderConfirmationEmail(orderData) {
  const {
    customerName,
    customerEmail,
    items,
    subtotal,
    shippingCost,
    shippingMethod,
    customerAddress,
    customerApartment,
    customerCity,
    customerProvince,
    customerPostalCode,
    orderId,
  } = orderData

  const total = subtotal + (shippingCost || 0)

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation - 70X7</title>
      <style>
        body {
          font-family: 'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          line-height: 1.6;
          color: #333;
          background: #f5f5f5;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          border-top: 4px solid #b89449;
        }
        .header {
          background: linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%);
          color: #f0f0f0;
          padding: 40px 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0 0 10px;
          font-size: 32px;
          letter-spacing: 2px;
          font-weight: 700;
        }
        .header .subtitle {
          margin: 0;
          color: #b89449;
          font-size: 14px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .content {
          padding: 40px 30px;
        }
        .greeting {
          margin-bottom: 30px;
          color: #333;
        }
        .greeting h2 {
          margin: 0 0 10px;
          font-size: 20px;
          color: #1a1a1a;
        }
        .greeting p {
          margin: 0;
          color: #666;
        }
        .order-number {
          background: #f9f9f9;
          border-left: 4px solid #b89449;
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .order-number .label {
          color: #b89449;
          font-size: 12px;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-weight: 700;
          display: block;
          margin-bottom: 5px;
        }
        .order-number .value {
          font-family: monospace;
          font-size: 16px;
          color: #333;
          word-break: break-all;
        }
        .section-title {
          margin: 30px 0 15px;
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
          border-bottom: 2px solid #b89449;
          padding-bottom: 10px;
        }
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        .items-table th {
          background: #f9f9f9;
          padding: 12px;
          text-align: left;
          font-size: 12px;
          font-weight: 700;
          color: #666;
          border-bottom: 1px solid #ddd;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .items-table td {
          padding: 15px 12px;
          border-bottom: 1px solid #eee;
        }
        .items-table tr:last-child td {
          border-bottom: none;
        }
        .item-name {
          font-weight: 600;
          color: #1a1a1a;
        }
        .item-qty {
          text-align: center;
          color: #666;
        }
        .item-price {
          text-align: right;
          font-weight: 600;
          color: #b89449;
        }
        .summary {
          margin: 30px 0;
          padding: 20px;
          background: #f9f9f9;
          border-radius: 4px;
        }
        .summary-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 20px;
          margin-bottom: 12px;
          font-size: 14px;
          align-items: center;
        }
        .summary-row:last-child {
          margin-bottom: 0;
        }
        .summary-row.total {
          border-top: 2px solid #ddd;
          padding-top: 12px;
          margin-top: 12px;
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
        }
        .summary-label {
          color: #666;
          text-align: left;
        }
        .summary-value {
          color: #1a1a1a;
          font-weight: 600;
          text-align: right;
          white-space: nowrap;
        }
        .address-block {
          background: #f9f9f9;
          padding: 15px;
          border-radius: 4px;
          margin: 10px 0;
        }
        .address-block p {
          margin: 0 0 5px;
          font-size: 13px;
          color: #333;
          line-height: 1.6;
        }
        .address-block p:last-child {
          margin-bottom: 0;
        }
        .apartment-note {
          color: #888;
          font-size: 12px;
          font-style: italic;
          margin-left: 10px;
        }
        .shipping-method {
          background: #f0f0f0;
          padding: 12px;
          border-radius: 4px;
          font-size: 13px;
          color: #555;
          margin: 10px 0;
        }
        .footer {
          background: #f9f9f9;
          padding: 30px;
          text-align: center;
          border-top: 1px solid #ddd;
          font-size: 12px;
          color: #666;
        }
        .footer-brand {
          display: block;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 1px;
          color: #b89449;
          margin-bottom: 10px;
        }
        .footer a {
          color: #b89449;
          text-decoration: none;
        }
        .footer a:hover {
          text-decoration: underline;
        }
        .cta-button {
          display: inline-block;
          background: linear-gradient(145deg, #e4c989 0%, #a98337 100%);
          color: #000000 !important;
          padding: 12px 30px;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-top: 20px;
          border: 1px solid #9c7a34;
          display: inline-block;
        }
        .cta-button:hover {
          opacity: 0.9;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>70X7</h1>
          <p class="subtitle">Order Confirmation</p>
        </div>

        <div class="content">
          <div class="greeting">
            <h2>Thank you for your order, ${customerName}!</h2>
            <p>Your order has been confirmed and will be processed shortly. We appreciate your purchase and look forward to getting your items to you.</p>
          </div>

          <div class="order-number">
            <span class="label">Order Number</span>
            <span class="value">${orderId}</span>
          </div>

          <h3 class="section-title">Order Summary</h3>
          <table class="items-table">
            <thead>
              <tr>
                <th>Product</th>
                <th class="item-qty">Qty</th>
                <th class="item-price">Price</th>
              </tr>
            </thead>
            <tbody>
              ${items
                .map(
                  (item) => `
                <tr>
                  <td class="item-name">${item.name}</td>
                  <td class="item-qty">${item.quantity}</td>
                  <td class="item-price">$${(item.itemPrice * item.quantity).toFixed(2)}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>

          <div class="summary">
            <div class="summary-row">
              <span class="summary-label">Subtotal</span>
              <span class="summary-value">$${subtotal.toFixed(2)}</span>
            </div>
            ${
              shippingCost
                ? `
              <div class="summary-row">
                <span class="summary-label">Shipping (${shippingMethod || 'Standard'})</span>
                <span class="summary-value">$${shippingCost.toFixed(2)}</span>
              </div>
            `
                : ''
            }
            <div class="summary-row total">
              <span class="summary-label">Total</span>
              <span class="summary-value">$${total.toFixed(2)}</span>
            </div>
          </div>

          <h3 class="section-title">Shipping Address</h3>
          <div class="address-block">
            <p>${customerAddress}${customerApartment ? `<span class="apartment-note">${customerApartment}</span>` : ''}</p>
            <p>${customerCity}, ${customerProvince} ${customerPostalCode}</p>
          </div>

          ${
            shippingMethod
              ? `
            <h3 class="section-title">Delivery Method</h3>
            <div class="shipping-method">
              ${shippingMethod}
            </div>
          `
              : ''
          }

          <div style="text-align: center; margin-top: 40px;">
            <a href="https://70x7.ca" class="cta-button">Visit Our Store</a>
          </div>
        </div>

        <div class="footer">
          <span class="footer-brand">70X7</span>
          <p>Thank you for supporting our mission.</p>
          <p>Questions? Contact us at <a href="mailto:support@70x7.ca">support@70x7.ca</a></p>
          <p style="margin-top: 15px; border-top: 1px solid #ddd; padding-top: 15px; color: #999;">
            © 2026 70X7. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}
