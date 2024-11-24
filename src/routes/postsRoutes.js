import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// windows
const upload = multer({dest:"./uploads", storage});
// linux ou mac
// const upload = multer({dest:"./uploads"});

const routes = (app) => {
    // Configura o aplicativo para analisar solicitações com corpo JSON
    app.use(express.json());
    app.use(cors(corsOptions))
    // Define uma rota GET para "/posts"
    app.get("/posts", listarPosts);
    // Rota para criar um post
    app.post("/posts", postarNovoPost);
    app.post("/upload", upload.single("imagem"), uploadImagem);
    app.put("/upload/:id", atualizarNovoPost)
};

export default routes;