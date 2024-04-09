import { request, response } from "express";
import fs from "fs";
import path from "path";

let cont = 122;
export const CreateSolicitudController = (req = request, res = response) => {
    const {
        id_user,
        user_name,
        user_surname,
        user_phone,
        book_title,
        book_author,
        book_publisher,
        book_year_publisher,
    } = req.body;

    const valueOfUser = () => {
        if (id_user === undefined || id_user === "" && user_name === undefined || user_name === "" && user_surname === undefined || user_surname === "" && user_phone === undefined || user_phone === "") {
            res.status(404).json({
                ok: false,
                message: "la información solicitada del usuario no puede ser null",
            });
            return false;
        }
        return true;
    };

    const valueOfBook = () => {
        if (book_title === undefined || book_title === "" && book_author === undefined || book_author === "" && book_publisher === undefined || book_publisher === "" && book_year_publisher === undefined || book_year_publisher === "") {
            res.status(404).json({
                ok: false,
                message: "la información solicitada del libro no puede ser null",
            });
            return false;
        }
        return true;
    };

    // Verificar los valores de user y book
    const userValid = valueOfUser();
    const bookValid = valueOfBook();

    // Si tanto el usuario como el libro son válidos, procede a guardar los datos
    if (userValid !== false && bookValid !== false) {
        cont++;

        //Modelando la data para el guardado
        const data = {
            user: {
                id: id_user,
                name: user_name,
                surname: user_surname,
                phone: user_phone,
            },
            books: {
                title: book_title,
                author: book_author,
                publisher: book_publisher,
                year_publisher: book_year_publisher,
            },
        };

        //Contador para guardar el nombre de file (id_123)
        let fileName = `id_${cont}.txt`;

        // path donde se guardara el file
        const dataFolder = path.join(process.cwd(), "./src/data");
        const filePath = path.join(dataFolder, fileName);

        // Crear el contenido del archivo de texto
        let fileContent = "";

        for (const [category, properties] of Object.entries(data)) {
            fileContent += `${category.toUpperCase()}\n`;
            for (const [key, value] of Object.entries(properties)) {
                fileContent += `${key}: ${value}\n`;
            }
            fileContent += "\n";
        }

        //Guardado del archivo
        fs.writeFile(filePath, fileContent, (err) => {
            if (err) {
                console.error("Error al guardar el archivo:", err);
                res.status(500).json({
                    ok: false,
                    message: "Error al guardar el archivo",
                });

            } else {
                res.status(200).json({
                    ok: true,
                    message: "Solicitud creada y archivo guardado exitosamente",
                });
            }
        });
    }
};

export const DowloandSolicitudFile = (req = request, res = response) => {
    const { request_number } = req.params

    const filesPath = './src/data'
    const filename = `${request_number}.txt`
    // Comprobamos si el archivo existe en la carpeta
    fs.access(path.join(filesPath, filename), fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).send('El archivo no se encontrado.');
            return;
        }

        // res.setHeader('Content-Type', 'application/pdf')
        res.download(path.join(filesPath, filename), filename, (err) => {
            if (err) {
                res.status(500).send('Ups, ha ocurrido un error al descargar el archivo.');
            }
        });
    });
}