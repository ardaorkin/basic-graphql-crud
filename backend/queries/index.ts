import fs from "fs";
import { sourceFilePath } from "../constants";
import { IPerson } from "../types";
export const createPerson = ({ input: { name, age } }) => {
  const people = getAllPersons() || [];
  const { id } = people[people.length - 1] || { id: "0" };
  const newID = +id + 1;
  fs.appendFileSync(sourceFilePath, `${newID},${name},${age}\n`);
  return getAllPersons();
};

export const getAllPersons = (): IPerson[] => {
  const data = fs.readFileSync(sourceFilePath);
  const result = data
    .toString()
    .split("\n")
    .filter((line) => line)
    .reduce((prev, line) => {
      const [id, name, age] = line.split(",");
      return [...prev, { id, name, age }];
    }, []);
  return result;
};

export const updatePerson = (data: {
  id: string;
  input: Omit<IPerson, "id">;
}): IPerson[] => {
  const persons = getAllPersons();
  const updatedData = persons.reduce((prev, record): IPerson[] => {
    if (record.id === data.id) {
      return [...prev, { ...record, ...data.input }];
    }
    return [...prev, record];
  }, []);

  const csvData = updatedData.reduce((prev, person): string => {
    const line = Object.values(person).join(",");
    return prev + line + "\n";
  }, "");

  fs.writeFileSync(sourceFilePath, csvData);

  return updatedData;
};

export const deletePerson = (data: { id: string }): IPerson[] => {
  const people = getAllPersons();
  const updatedPeople = people.filter(
    ({ id: personID }) => personID !== data.id
  );

  const csvData = updatedPeople.reduce((prev, person): string => {
    const line = Object.values(person).join(",");
    return prev + line + "\n";
  }, "");

  fs.writeFileSync(sourceFilePath, csvData);

  return updatedPeople;
};
