import * as create from "./Create.js";
import * as getAll  from "./GetAll.js";
import * as getById from "./GetById.js";
import * as updateById from "./UpdateById.js";
import * as deleteById from "./DeleteById.js";

export const cidadesControlles = {
    ...create,
    ...getAll,
    ...getById,
    ...updateById,
    ...deleteById
};


