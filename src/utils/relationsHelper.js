const relations = {
    user(req = {}) {
        return {
        };
    },
    order(req = {}) {
        return {
            items: true,
            User: true
        }
    }
};


module.exports = {
    relations,
};