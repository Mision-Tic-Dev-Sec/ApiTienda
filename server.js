// hacer el import de express tradicional
// const express = require('express');

// hacer el nuevo import
import Express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import Cors from 'cors';

const stringConexion = 'mongodb+srv://carlos:passwordcarlos@devsec3.esivf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const client = new MongoClient(stringConexion, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let baseDeDatos;

const app = Express();

app.use(Express.json());
app.use(Cors());

app.get('/productos', (req, res) => {
  console.log('alguien hizo get en la ruta /productos');
  baseDeDatos
    .collection('producto')
    .find()
    .limit(50)
    .toArray((err, result) => {
      if (err) {
        res.status(500).send('Error consultando los productos');
      } else {
        res.json(result);
      }
    });
});

app.post('/productos/nuevo', (req, res) => {
  console.log(req);
  const datosProducto = req.body;
  console.log('llaves: ', Object.keys(datosProducto));
  try {
    if (
      Object.keys(datosProducto).includes('idProducto') &&
      Object.keys(datosProducto).includes('nombreProducto') &&
      Object.keys(datosProducto).includes('precio')
    ) {
      // implementar código para crear vehículo en la BD
      baseDeDatos.collection('producto').insertOne(datosProducto, (err, result) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          console.log(result);
          res.sendStatus(200);
        }
      });
    } else {
      res.sendStatus(500);
    }
  } catch {
    res.sendStatus(500);
  }
});

app.patch('/productos/editar', (req, res) => {
  const edicion = req.body;
  console.log(edicion);
  const filtroProducto = { _id: new ObjectId(edicion.id) };
  delete edicion.id;
  const operacion = {
    $set: edicion,
  };
  baseDeDatos
    .collection('producto')
    .findOneAndUpdate(
      filtroProducto,
      operacion,
      { upsert: true, returnOriginal: true },
      (err, result) => {
        if (err) {
          console.error('error actualizando el producto: ', err);
          res.sendStatus(500);
        } else {
          console.log('actualizado con exito');
          res.sendStatus(200);
        }
      }
    );
});

app.delete('/productos/eliminar', (req, res) => {
  const filtroProducto = { _id: new ObjectId(req.body.id) };
  baseDeDatos.collection('producto').deleteOne(filtroProducto, (err, result) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

app.get('/usuarios', (req, res) => {
  console.log('alguien hizo get en la ruta /usuarios');
  baseDeDatos
    .collection('usuarios')
    .find()
    .limit(50)
    .toArray((err, result) => {
      if (err) {
        res.status(500).send('Error consultando los usuarios');
      } else {
        res.json(result);
      }
    });  
});

app.post('/usuarios/nuevo', (req, res) => {
  console.log(req);
  const datosUsuario = req.body;
  console.log('llaves: ', Object.keys(datosUsuario));
  try {
    if (
      Object.keys(datosUsuario).includes('name') &&
      Object.keys(datosUsuario).includes('mail') &&
      Object.keys(datosUsuario).includes('rol') &&
      Object.keys(datosUsuario).includes('state') &&
      Object.keys(datosUsuario).includes('date')
    ) {
      // implementar código para crear vehículo en la BD
      baseDeDatos.collection('usuarios').insertOne(datosUsuario, (err, result) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          console.log(result);
          res.sendStatus(200);
        }
      });
    } else {
      res.sendStatus(500);
    }
  } catch {
    res.sendStatus(500);
  }
});
  
app.patch('/usuarios/editar', (req, res) => {
  const edicion = req.body;
  console.log(edicion);
  const filtroUsuario = { _id: new ObjectId(edicion.id) };
  delete edicion.id;
  const operacion = {
    $set: edicion,
  };
  baseDeDatos    
    .collection('usuarios')
    .findOneAndUpdate(
      filtroUsuario,
      operacion,
      { upsert: true, returnOriginal: true },
      (err, result) => {
        if (err) {          
          console.error('error actualizando el usuario: ', err);
          res.sendStatus(500);
        } else {
          console.log('actualizado con exito');
          res.sendStatus(200);
        }
      }
    );
});

app.delete('/usuarios/eliminar', (req, res) => {
  const filtroUsuario = { _id: new ObjectId(req.body.id) };
  baseDeDatos.collection('usuarios').deleteOne(filtroUsuario, (err, result) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

const main = () => {
  client.connect((err, db) => {
    if (err) {
      console.error('Error conectando a la base de datos');
      return 'error';
    }
    baseDeDatos = db.db('tienda');
    console.log('baseDeDatos exitosa');
    return app.listen(5000, () => {
      console.log('escuchando puerto 5000');
    });
  });
};

main();
