import { User, UserStore } from "../users";

const UserStoreInstance = new UserStore();

describe("User Model", () => {
  const user: User = {
    first_name: "Birhanu",
    last_name: "Belay",
    password: "password123",
  };

  async function createUser(user: User) {
    return UserStoreInstance.create(user);
  }

  async function deleteUser(id: number) {
    return UserStoreInstance.delete(id);
  }

  it("should have an index method", () => {
    expect(UserStoreInstance.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(UserStoreInstance.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(UserStoreInstance.create).toBeDefined();
  });

  it("should have a remove method", () => {
    expect(UserStoreInstance.delete).toBeDefined();
  });

  it("create method should create a user", async () => {
    const createdUser: User = await createUser(user);

    if (createdUser) {
      const { first_name, last_name } = createdUser;

      expect(first_name).toBe(user.first_name);
      expect(last_name).toBe(user.last_name);
    }

    await deleteUser(createdUser.id!);
  });

  it("index method should return a list of users", async () => {
    const createdUser: User = await createUser(user);
    const userList = await UserStoreInstance.index();

    expect(userList).toEqual([createdUser]);

    await deleteUser(createdUser.id!);
  });

  it("show method should return the correct users", async () => {
    const createdUser: User = await createUser(user);
    const userFromDb = await UserStoreInstance.show(createdUser.id!);

    expect(userFromDb).toEqual(createdUser);

    await deleteUser(createdUser.id!);
  });

  it("remove method should remove the user", async () => {
    const createdUser: User = await createUser(user);

    await deleteUser(createdUser.id!);

    const userList = await UserStoreInstance.index();

    expect(userList).toEqual([]);
  });
});
