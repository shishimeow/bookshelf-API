const { nanoid } = require('nanoid');
const books = require('./books');

const addListBook = (request, h) => {
    const {name, year, author, summary, 
        publisher, pageCount, readPage, reading} = request.payload;
    
    if (!name || name.trim() === ''){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }    

    if (readPage > pageCount){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }
    
    const id = nanoid(16);

    let finished = false;
    if (pageCount === readPage){
        finished = true;
    }

    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = {
        name, year, author, summary, publisher,
        pageCount, readPage, reading, id, finished,
        insertedAt, updatedAt,
    };

    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;
    if (isSuccess){
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
}


const getAllListBook = () => ({
    status: 'success',
    data: {
        books: books.map(book => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher
        }))
    },
});

/*
const getAllListBook = (request, h) => {
    const {name, reading, finished} = request.query;

    if (name){
        const qname = name.toLowerCase();
        const findBook = books.filter(book => book.name.toLowerCase().includes(qname));

        const response = h.response({
            status: 'success',
            data: {
                books: findBook.map(book => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                })),
            },
        });
        response.code(200);
        return response;
    }

    if (reading){
        const status = reading === '1'? true: false;
        const findBook = books.filter(book => book.reading === status);

        const response = h.response({
            status: 'success',
            data: {
                books: findBook.map(book => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                })),
            },
        });
        response.code(200);
        return response;
    }

    if (finished){
        const status = finished === '1'? true: false;
        const findBook = books.filter(book => book.finished === status);

        const response = h.response({
            status: 'success',
            data: {
                books: findBook.map(book => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                })),
            },
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'success',
        data: {
            books: books.map(book => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher
            }))
        },
    });
    response.code(200);
    return response;
} */


const getListBookById = (request, h) => {
    const {id} = request.params;

    const book = books.filter((n) => n.id === id)[0];

    if (book){
        const response = h.response({
            status: 'success',
            data: {
                book,
            },
        });
        response.code(200);
        return response
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
}

const editListBookById = (request, h) => {
    const {id} = request.params;

    const {name, year, author, summary, 
        publisher, pageCount, readPage, reading} = request.payload;
    
    if (!name || name.trim() === ''){
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }

    if (readPage > pageCount){
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    let finished = false;
    if (pageCount === readPage){
        finished = true;
    }

    const updatedAt = new Date().toISOString();

    const index = books.findIndex((book) => book.id === id);

    if (index !== -1){
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            finished,
            updatedAt
        };

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
}

const deletListBookById = (request, h) => {
    const {id} = request.params;
    const index = books.findIndex((book) => book.id === id);

    if (index !== -1){
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;

}

module.exports = {addListBook, getAllListBook,
                getListBookById, editListBookById,
                deletListBookById};