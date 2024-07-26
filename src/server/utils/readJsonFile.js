import {readFile} from 'fs/promises';

const filename = '../data/animals.json';

readJsonFile(filename);

export async function readJsonFile(filename){
    try {
        const fileBuffer = await readFile(filename);
        const fileString = fileBuffer.toString();
        console.log(fileString);
        const fileJsonReal = JSON.parse(fileString);
        console.log(fileJsonReal);
        console.log(fileJsonReal[0]);
        return fileJsonReal;
    } catch (error) {
        console.log("woops", error)
    };
};