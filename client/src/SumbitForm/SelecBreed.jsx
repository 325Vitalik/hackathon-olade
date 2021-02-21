import { Dropdown } from "semantic-ui-react";

export const animalBreeds = {
  cat: [
    { key: "abyssinian", value: "abyssinian", text: "Абісинська" },
    { key: "aegean", value: "aegean", text: "Егейська" },
    { key: "bobtail", value: "bobtail", text: "Бобтейл" },
    { key: "other", value: "other", text: "Інша" },
  ],
  dog: [
    { key: "shepherd", value: "shepherd", text: "Вівчарка" },
    { key: "labrador", value: "labrador", text: "Лабрадор-ретривер" },
    { key: "laika", value: "laika", text: "Лайка" },
    { key: "other", value: "other", text: "Інша" },
  ],
};

const SelectBreed = ({ onChange, animalType }) => (
  <Dropdown
    onChange={onChange}
    placeholder={"Оберіть породу"}
    selection
    search
    disabled={!animalBreeds[animalType]}
    options={animalBreeds[animalType] || []}
  />
);

export default SelectBreed;
