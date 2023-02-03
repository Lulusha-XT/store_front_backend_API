import { Order, OrderStore } from "../orders";
import { User, UserStore } from "../users";
import { Product, ProductStore } from "../products";

const orderStore = new OrderStore();

describe("Order Model", () => {
  const UserStoreInstance = new UserStore();
  const productStore = new ProductStore();

  let order: Order, user_id: number, product_id: number;

  async function createOrder(order: Order) {
    return orderStore.create(order);
  }

  async function deleteOrder(id: number) {
    return orderStore.delete(id);
  }

  beforeAll(async () => {
    const user: User = await UserStoreInstance.create({
      first_name: "Birhanu",
      last_name: "Belay",
      password: "password123",
    });

    user_id = user.id!;

    const product: Product = await productStore.create({
      product_name: "OrderSpec Product",
      price: 1000,
    });

    product_id = product.id!;

    order = {
      user_id: user_id,
      status: "open",
    };
  });

  afterAll(async () => {
    await UserStoreInstance.delete(user_id);
    await productStore.delete(product_id);
  });

  it("should have an index method", () => {
    expect(orderStore.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(orderStore).toBeDefined();
  });

  it("should have a add method", () => {
    expect(orderStore.create).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(orderStore.delete).toBeDefined();
  });

  it("add method should add a order", async () => {
    const createdOrder: Order = await createOrder(order);

    expect(createdOrder).toEqual({
      id: createdOrder.id,
      ...order,
    });

    await deleteOrder(createdOrder.id!);
  });

  it("index method should return a list of orders", async () => {
    const createdOrder: Order = await createOrder(order);
    const orderList = await orderStore.index();

    expect(orderList).toEqual([createdOrder]);

    await deleteOrder(createdOrder.id!);
  });

  it("delete method should remove the order", async () => {
    const createdOrder: Order = await createOrder(order);

    await deleteOrder(createdOrder.id!);

    const orderList = await orderStore.index();

    expect(orderList).toEqual([]);
  });
});
