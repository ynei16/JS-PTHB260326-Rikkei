abstract class PaymentMethod {
  abstract processPayment(amount: number): void;
}

class CreditCardPayment extends PaymentMethod {
  processPayment(amount: number) {
    console.log(`Paid ${amount} via Credit Card`);
  }
}

class PaypalPayment extends PaymentMethod {
  processPayment(amount: number) {
    console.log(`Paid ${amount} via Paypal`);
  }
}
