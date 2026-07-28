"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface PayPalTestProps {
  amount: number;
  onSuccess?: () => void;
}

export default function PayPalTestButton({ amount, onSuccess }: PayPalTestProps) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
        currency: "USD",
      }}
    >
      <div className="w-full max-w-md mx-auto my-4 z-0">
        <PayPalButtons
          style={{ layout: "vertical", color: "gold", shape: "rect", label: "pay" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: amount.toFixed(2),
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            if (actions.order) {
              const details = await actions.order.capture();
              alert(`Testing Successful! Transaction ID: ${details.id}`);
              if (onSuccess) onSuccess();
            }
          }}
          onError={(err) => {
            console.error("PayPal Error:", err);
            alert("PayPal Test Payment Failed or Canceled.");
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
}