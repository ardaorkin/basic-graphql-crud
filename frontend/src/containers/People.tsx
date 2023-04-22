import * as React from "react";
import { IPerson } from "../types";
import { Card } from "../components/Card";
import { Input } from "../components/Input";

interface IPeopleProps {
  people: IPerson[] | [];
  onUpdate: (id: string, data: any) => void;
  onDelete: (id: string) => void;
}

const People: React.FunctionComponent<IPeopleProps> = ({
  people,
  onUpdate,
  onDelete,
}) => {
  const [dataWillUpdate, setDataWillUpdate] = React.useState<
    Omit<IPerson, "id"> | object
  >({});
  const [id, setID] = React.useState<string>("");

  const handleChange = (id: string, data: Omit<IPerson, "id">) => {
    setDataWillUpdate(data);
    setID(id);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {people.map(({ id, name, age }) => (
        <Card key={id}>
          <div className="flex flex-row space-x-1">
            <label htmlFor="name">
              <strong>Name: </strong>
            </label>
            <Input
              id="name"
              defaultValue={name}
              onChange={({ target: { value } }) =>
                handleChange(id, { name: value, age })
              }
            />
          </div>
          <div className="flex flex-row space-x-1">
            <label htmlFor="age">
              <strong>Age:</strong>
            </label>
            <Input
              id="age"
              defaultValue={age}
              onChange={({ target: { value } }) =>
                handleChange(id, { age: value, name })
              }
            />
          </div>

          <div className="flex flex-row space-x-4">
            <button
              className="rounded w-32 bg-indigo-600 p-2 text-white"
              onClick={() => onUpdate(id, dataWillUpdate)}
            >
              Update
            </button>
            <button
              className="rounded w-32 bg-rose-600 p-2 text-white"
              onClick={() => onDelete(id)}
            >
              Delete
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default People;
