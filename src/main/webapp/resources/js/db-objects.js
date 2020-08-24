
class ListDb {
    constructor(loader) {
        this.loader = loader;
        this.init = false;
        this.db = [];
        this.queue = [];
    }

    load(items) {
        this.db.push(...items);
        this.queue.forEach(item => {
            item();
        });
        this.init = true;
    }

    forAllItems(func) {
        if (this.init) {
            func(this.db);
        } else {
            this.queue.push(() => func(this.db));
        }
    }
}
