import { fileURLToPath } from "url";
import { dirname } from "path";

const _fileName = fileURLToPath(import.meta.url);
export const _dirname = dirname(_fileName);
