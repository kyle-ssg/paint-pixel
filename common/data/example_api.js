module.exports = {
    getCollection(id) {
        return new Promise((resolve, reject)=> {
            setTimeout(()=> {
                resolve({ id, title:'This is a response' });
            }, 200);
        });
    }
};