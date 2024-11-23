export default class Type {
    static STRING = "string";
    static NUMBER = "number";
    static BOOLEAN = "boolean";
    static DATE = "date";
    static TIME = "time";
    static ENUM = "enum";
    static DATETIME = "datetime";

    static toOperator(type) {
        switch (type) {
            case Type.STRING:
                return [
                    {
                        text: "Contient",
                        operator: "contains"
                    },
                    {
                        text: "Ne contient pas",
                        operator: "necontains"
                    },
                    {
                        text: "Commence par",
                        operator: "startwith"
                    },
                    {
                        text: "Fini par",
                        operator: "endwith"
                    }
                ];
            case Type.BOOLEAN:
                return [
                    {
                        text: "Égale",
                        operator: "="
                    }
                ];
            case Type.NUMBER:
                return [
                    {
                        text: "Égale",
                        operator: "eq"
                    },
                    {
                        text: "N'est pas égale",
                        operator: "ne"
                    },
                    {
                        text: "Superieur",
                        operator: "sup"
                    },
                    {
                        text: "Inferieur",
                        operator: "inf"
                    },
                    {
                        text: "Superieur ou égale",
                        operator: "supeq"
                    },
                    {
                        text: "Inferieur ou egale",
                        operator: "infeq"
                    }
                ];
            case Type.DATE:
            case Type.DATETIME:
                return [
                    {
                        text: "Contient",
                        operator: "contains"
                    },
                ];
            case Type.TIME:
                return [
                    {
                        text: "Contient",
                        operator: "contains"
                    },
                ];
        }
    }
}