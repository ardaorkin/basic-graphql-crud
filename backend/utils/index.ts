import fs from "fs";
import { sourceFilePath } from "../constants";

export const getNumberOfLines = (): number => {
  const content = fs.readFileSync(sourceFilePath).toString();
  return content.split("\n").length - 1;
};
