class CustomQueue implements Iterator<number> {
    private counter = 0;
    public next(): IteratorResult<number> {
        return {
            done: false,
            value: this.counter++
        }
    }

}