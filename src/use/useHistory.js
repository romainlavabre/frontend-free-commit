import database from "../database/database";
import isNull from "../mixin/global/isNull";

const MAX_ITEM = 10;
export default function () {
    return {
        put: builtHistory => {
            let current = database.read(database.TABLE_OPERATIONAL_HISTORY, "history");

            if (isNull(current)) {
                current = [];
            }

            current.push(builtHistory);

            if (current.length > MAX_ITEM) {
                current = current.reverse();
                current.length = MAX_ITEM;
                current = current.reverse();
            }

            database.write(database.TABLE_OPERATIONAL_HISTORY, "history", current);
        }
    }
}