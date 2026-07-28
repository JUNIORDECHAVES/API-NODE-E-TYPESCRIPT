import * as create  from "./Create.js";
import * as getAll  from "./GetAll.js";
import * as getById  from "./GetById.js";
import * as updatById  from "./UpdateById.js";
import * as deleteById  from "./DeleteById.js";

export const pessoasControlles = {
    ...create,
    ...getAll,
    ...getById,
    ...updatById,
    ...deleteById
};