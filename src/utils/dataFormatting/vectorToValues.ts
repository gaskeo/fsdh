interface VectorToValues<T> {
    vector: number[];
    data: T[];
}

function vectorToValues<T>({vector, data}: VectorToValues<T>): T[] {
    if (vector.length !== data.length) {
        return [];
    }

    return data.filter((_, index) => vector[index]);
}

export {vectorToValues}