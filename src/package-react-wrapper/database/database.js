export default {
    read(table, key) {
        const current = this.getCurrent(table);

        return current[key] !== undefined
            ? current[key]
            : null;
    },
    write(table, key, value) {
        const current = this.getCurrent(table);
        current[key] = value;
        localStorage.setItem(table, JSON.stringify(current));
    },
    getCurrent(table) {
        let current = localStorage.getItem(table);
        return current !== null
            ? JSON.parse(current)
            : {};
    }
}
