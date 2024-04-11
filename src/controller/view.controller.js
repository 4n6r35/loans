import { request, response } from "express";


export const LoadHomeView = (req = request, res = response) => {
    res.sendFile('index.html', { root: 'public' })
}