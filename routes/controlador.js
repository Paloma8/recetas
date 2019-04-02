const express = require('express');
var router = express.Router();

const modelo = require('../modelos/modeloRecetas');

router.get('/nuevaReceta',(req,res)=>{
	
	res.render('nuevaReceta');
});


router.post('/nuevaReceta',(req,res)=>{
	

	modelo.nuevaReceta(req,(err,result)=>res.redirect('/nuevaReceta'));

});

router.get('/consultaRecetas/:id',(req,res)=>{
	

	modelo.recetaExistente(req.params.id,(err,result) => res.render('recetario',{registros:result}) );

});

router.get('/eliminaRecetas', (req,res)=>{
	res.render('eliminarRecetas');
});

router.delete('/eliminaRecetas/eliminar',(req,res)=>{
	modelo.eliminarReceta(req.body.nombre,(err,result)=>{res.render('eliminarRecetas',{mensaje:"Se eliminaron las recetas cuyo nombre incluia el texto:" + req.body.nombre})});
});

router.get('/actualizaReceta',(req,res)=>{
	modelo.todasRecetas((err,result)=>{
		if(!req.query.nombresRecetas){
				console.log("entro");
		      res.render('actualizarRecetas',{registros:result})
		}else{
			modelo.recetaExistente(req.query.nombresRecetas,(err2,result2)=>{
				res.render('actualizarRecetas',{registros:result,registros2:result2})
			})
		}
	})
});

router.put('/actualizaReceta/actualizar',(req,res)=>{
	modelo.modificarReceta(req.body,(err,result)=>{res.redirect("/actualizaReceta")})
});

module.exports = router;