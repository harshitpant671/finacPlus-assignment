import { test, expect } from "@playwright/test";

test("Reqres API Flow - Create, Get, Update User", async ({ request }) => {
  const url = "https://reqres.in";

  const headers = {
    "x-api-key": process.env.API_KEY,
  };

  const createResponse = await request.post(`${url}/api/users`, {
    headers,
    data: {
      name: "John",
      job: "QA Engineer",
    },
  });

  expect(createResponse.status()).toBe(201);

  const createBody = await createResponse.json();
  const userId = createBody.id;

  console.log("Created User ID:", userId);
  expect(userId).toBeTruthy();

  const getResponse = await request.get(`${url}/api/users/${userId}`, {
    headers,
  });

  expect([200, 404]).toContain(getResponse.status());

  const getBody = await getResponse.json();
  console.log("Get Response:", getBody);

  if (getResponse.status() === 200) {
    expect(getBody.data).toHaveProperty("id");
  }

  const updateResponse = await request.put(`${url}/api/users/${userId}`, {
    headers,
    data: {
      name: "morpheus",
      job: "zion resident",
    },
  });

  expect(updateResponse.status()).toBe(200);

  const updateBody = await updateResponse.json();
  console.log("Update Response:", updateBody);

  expect(updateBody.name).toBe("morpheus");
});
