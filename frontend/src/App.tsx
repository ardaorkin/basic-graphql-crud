import { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import { Input } from "./components/Input";
import { IPerson } from "./types";
import { addPerson, deletePerson, getPeople, updatePerson } from "./api";
import People from "./containers/People";

function App() {
  const [personData, setPersonData] = useState<Omit<IPerson, "id">>({
    name: "",
    age: "",
  });

  const [people, setPeople] = useState<IPerson[] | []>([]);

  useEffect(() => {
    getPeople()
      .then((result) => setPeople(result.data.getAllPersons))
      .catch(console.log);
  }, []);

  const handlePersonName = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    setPersonData({ ...personData, [name]: value });
  };

  const handleAddPerson = () => {
    addPerson(personData)
      .then((result) => {
        const { data } = result;
        setPeople(data.createPerson);
      })
      .catch(console.error);
  };

  const handleUpdate = (id: string, data: Omit<IPerson, "id">) => {
    updatePerson(id, data)
      .then((result) => {
        const {
          data: { updatePerson: updatedData },
        } = result;
        setPeople(updatedData);
      })
      .catch(console.error);
  };

  const handleDelete = (id: string) => {
    deletePerson(id)
      .then((result) => {
        const {
          data: { deletePerson: _people },
        } = result;
        setPeople(_people);
      })
      .catch(console.error);
  };

  return (
    <div className="flex flex-col space-y-4 justify-start items-start">
      <h1 className="text-3xl font-bold">Add Your People</h1>
      <Input label="Name" key="name" name="name" onChange={handlePersonName} />
      <Input
        label="Age"
        name="age"
        key="age"
        type="number"
        min="19"
        onChange={handlePersonName}
      />
      <button
        className="w-48 rounded p-2 bg-indigo-600 text-white"
        onClick={handleAddPerson}
      >
        Add Person
      </button>
      <People people={people} onUpdate={handleUpdate} onDelete={handleDelete} />
    </div>
  );
}

export default App;
