import { Product, ProductStore } from "../products";

const productStore = new ProductStore();

describe("Product Model", () => {
  const product: Product = {
    product_name: "Laptop",
    price: 2000,
  };

  async function createProduct(product: Product) {
    return productStore.create(product);
  }

  async function deleteProduct(id: number) {
    return productStore.delete(id);
  }

  it("should have an index method", () => {
    expect(productStore.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(productStore.show).toBeDefined();
  });

  it("should have a add method", () => {
    expect(productStore.create).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(productStore.delete).toBeDefined();
  });

  it("add method should add a product", async () => {
    const createdProduct: Product = await createProduct(product);

    expect(createdProduct).toEqual({
      id: createdProduct.id,
      ...product,
    });

    await deleteProduct(createdProduct.id!);
  });

  it("index method should return a list of products", async () => {
    const createdProduct: Product = await createProduct(product);
    const productList = await productStore.index();

    expect(productList).toEqual([createdProduct]);

    await deleteProduct(createdProduct.id!);
  });

  it("show method should return the correct product", async () => {
    const createdProduct: Product = await createProduct(product);
    const productFromDb = await productStore.show(createdProduct.id!);

    expect(productFromDb).toEqual(createdProduct);

    await deleteProduct(createdProduct.id!);
  });

  it("delete method should remove the product", async () => {
    const createdProduct: Product = await createProduct(product);

    await deleteProduct(createdProduct.id!);

    const productList = await productStore.index();

    expect(productList).toEqual([]);
  });
});
