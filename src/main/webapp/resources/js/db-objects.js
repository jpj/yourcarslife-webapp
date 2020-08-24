
class VehicleDb {
    constructor(loader) {
        this.loader = loader;
        this.init = false;
        this.db = [];
        this.queue = [];
    }

    loadDb(items) {
        items.forEach(item => {
            this.db.push(item);
        });
        this.queue.forEach(item => {
            item();
        });
        this.init = true;
    }

    forAllVehicles(func) {
        if (this.init) {
            func(this.db);
        } else {
            this.queue.push(() => func(this.db));
        }
    }
}
