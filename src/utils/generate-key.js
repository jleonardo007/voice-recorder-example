import { v4 as uuid } from "uuid";

function generateKey() {
  return uuid();
}

export default generateKey;
