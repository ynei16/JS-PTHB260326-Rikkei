enum OrderStatus {
  Pending = "Pending",
  Shipped = "Shipped",
  Delivered = "Delivered",
}

class Order {
  status: OrderStatus;
  constructor(status: OrderStatus) {
    this.status = status;
  }
}

function checkOrder(order: Order) {
  if (order.status === OrderStatus.Delivered) {
    console.log("Order finished");
  }
}
