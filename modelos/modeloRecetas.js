const mysql = require('mysql');
const conexion = require('../conn');

const nuevaReceta = (req,callback) =>{
	
	conexion.query('INSERT INTO recetas (nombre,descripcion) VALUES ("'+req.body.nombre+'","'+req.body.descripcion+'");',(err,result)=>{
    
		return callback(err,result);
		
	});
};
const recetaExistente =(id,callback)=>{

	conexion.query('SELECT nombre,fecha_publicacion,descripcion FROM recetas  WHERE id_receta=?',id,(err1,result1)=>{
		
		return callback(err1,result1);
});
};

const eliminarReceta = (nombre,callback)=>{
	conexion.query('DELETE FROM recetas WHERE nombre like "%"?"%"',nombre,(err,result)=>{
		if(err) throw err;
		else{
			return callback(err,result);
		}

	});

};
const todasRecetas = (callback)=>{
	conexion.query('SELECT * FROM recetas',(err,result)=>{
		if(err) throw err;
		else{
			return callback(err,result);
		}
	});
}

const modificarReceta = (receta,callback)=>{
	conexion.query('UPDATE  recetas SET nombre="?",descripcion="?" WHERE id_recta=?',[receta.nombre,receta.descripcion,receta.id_receta],(err,result)=>{

	});
}

module.exports = {nuevaReceta,recetaExistente,eliminarReceta,todasRecetas,modificarReceta};

