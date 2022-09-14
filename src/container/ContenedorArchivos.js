import { promises as fs } from 'fs';
import moment from 'moment';

export class ContenedorArchivo{

    constructor(ruta){
        this.ruta = ruta;
    }

    async listar(id){
        const objs = await this.listarTodos();
        const obj = objs.find(o => o.id == id);
        return obj;
    }

    async listarTodos(){
        try{
            const objs = await fs.readFile(this.ruta, 'utf-8');
            return JSON.parse(objs);
        }catch(error){
            return[];
        }
    }

    async guardar(obj){
        const objs = await this.listarTodos();
        let newId;

        if (objs.length !== 0) {
            newId = objs[objs.length - 1].id + 1;
        }else{
            newId = 1;
        }

        const newObj = {id: newId, timestamp: moment().format("DD/MM/YYYY hh:mm:ss"), ...obj};
        objs.push(newObj);

        try{
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
            return newId;
        }catch(error){
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async actualizar(campo, id){
        const objs = await this.listarTodos();
        const index = objs.findIndex(o => o.id == id);
        if(index == -1){
            throw new Error(`Error al actualizar, no se encontro el ID: ${id}`);
        }else{
            objs[index] = {...campo, id}
            try{
                await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
                return id;
            }catch (error){
                throw new Error(`Error al actualizar: ${error}`);
            }
        }
    }

    async borrar(id){
        const objs = await this.listarTodos();
        const index = objs.findIndex(o => o.id == id);
        if(index == -1){
            throw new Error(`Error al borrar, no se encontro el ID: ${id}`);
        }

        objs.splice(index, 1);

        try{
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
            return index;
        }catch (error){
            throw new Error(`Error al borrar: ${error}`);
        }
    }

}