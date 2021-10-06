// hacer el import de express tradicional
// const express = require('express');

// hacer el nuevo import
import Express from 'express';

const app = Express();

app.use(Express.json());

app.get('/usuarios', (req, res) => {
  console.log('alguien hizo get en la ruta /usuarios');
  const usuarios = [
    { id: '001', name: 'Raul Gonzales', mail: 'raul@gmail.com', rol: 'Administrador', state: 'Autorizado', date:'12/01/2021 18:00' },
    { id: '002', name: 'Manuel Moncada', mail: 'manuel@gmail.com', rol: 'vendedor', state: 'pendiente', date: '24/02/2021 14:00' },
    { id: '003', name: 'Juana Perez', mail: 'Juana@gmail.com', rol: 'vendedor', state: 'no autorizado', date: '24/05/2020 08:00' },
  ];
  res.send(usuarios);
});

app.post('/vehiculos/nuevo', (req, res) => {
  console.log(req);
  const datosVehiculo = req.body;
  console.log('llaves: ', Object.keys(datosVehiculo));
  try {
    if (
      Object.keys(datosVehiculo).includes('name') &&
      Object.keys(datosVehiculo).includes('brand') &&
      Object.keys(datosVehiculo).includes('model')
    ) {
      // implementar código para crear vehículo en la BD
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } catch {
    res.sendStatus(500);
  }
});

app.listen(5000, () => {
  console.log('escuchando puerto 5000');
});
