import test, { expect } from "@playwright/test";
import { register } from "node:module";

test("Reqres API Flow - Create, Get, Update User", async ({ request }) => {
  let userId, verifyEmail, updateEmail;
  let url = "https://reqres.in";

  const createResponse = await request.post(`${url}/api/register`, {
    headers: {
      "x-api-key": "reqres_8ecec93b0d9c462abfdd5f8f63e891f0",
      "content-type": "application/json",
    },
    data: {
      email: "eve.holt@reqres.in",
      password: "pistol",
    },
  });

  expect(createResponse.status()).toBe(200);

  const createBody = await createResponse.json();
  console.log("Create Response:", createBody);

  userId = createBody.id;
  console.log("User ID:", userId);
  expect(userId).toBeTruthy();

  const getResponse = await request.get(`${url}/api/users/${userId}`, {
    headers: {
      "x-api-key": "reqres_8ecec93b0d9c462abfdd5f8f63e891f0",
      "content-type": "application/json",
    },
  });
  expect(getResponse.status()).toBe(200);

  const getBody = await getResponse.json();
  console.log("Get Response:", getBody);

  if (getResponse.status() === 200) {
    expect(getBody.data.id).toEqual(userId);
  }

  const updateResponse = await request.put(`${url}/api/users/${userId}`, {
    headers: {
      "x-api-key": "reqres_8ecec93b0d9c462abfdd5f8f63e891f0",
      "content-type": "application/json",
    },
    data: {
      name: "morpheus",
      job: "zion resident",
    },
  });

  expect(updateResponse.status()).toBe(200);
  const updateBody = await updateResponse.json();
  console.log("Update Response:", updateBody);
  expect(updateBody.name).toEqual("morpheus");
});
