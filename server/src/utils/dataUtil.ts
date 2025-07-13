function removeUndefined<T extends object>(obj: T): Partial<T> {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, v]) => v !== undefined)
    ) as Partial<T>;
}

function generateRestrainedRandomNum(rowCount: number) : number {

    if (rowCount === 0) {
        throw new Error('Table is empty — cannot generate a row count.');
    }

    return Math.floor(Math.random() * rowCount);
}

export { removeUndefined, generateRestrainedRandomNum };