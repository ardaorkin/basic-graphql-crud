import { IPerson } from "../types";

const API_URL = "http://localhost:4000/graphql";

export const addPerson = async (
  person: Omit<IPerson, "id">
): Promise<IPerson[] | any> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `mutation CreatePerson($input: PersonInput) {
          createPerson(input: $input) {
            id
            name
            age
          }
        }`,
        variables: { input: person },
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

export const getPeople = async (): Promise<any> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query { getAllPersons {
          id
          name
          age
        } }`,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

export const updatePerson = async (
  id: string,
  data: Omit<IPerson, "id">
): Promise<any> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `mutation UpdatePerson($id: String!, $input: PersonInput){
          updatePerson(id: $id, input: $input) {
            id
            name
            age
        }}`,
        variables: { id, input: { ...data } },
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

export const deletePerson = async (id: string): Promise<any> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `mutation DeletePerson($id: String!){
          deletePerson(id: $id){
            id
            name
            age
        }
      }`,
        variables: { id },
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
