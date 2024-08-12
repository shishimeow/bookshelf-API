const {addListBook, getAllListBook, getListBookById,
    editListBookById, deletListBookById} = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addListBook,
        options: {
            cors: {
                origin: ['*'],
            },
        },
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllListBook,
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getListBookById,
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: editListBookById,
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deletListBookById,
    },
];

module.exports = routes;