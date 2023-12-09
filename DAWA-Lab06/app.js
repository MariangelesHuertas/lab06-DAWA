const express = require('express');
const app = express();
const port = 3000;

const portafolios = [
  {
    id: '1',
    nombre: 'Victoria Aguilar',
    descripcion: 'Soy un desarrolladora web con experiencia en la creación de aplicaciones web y sitios responsivos. Me apasiona la tecnología y estoy constantemente aprendiendo nuevas habilidades.',
    proyectos: [
      {
        nombre: 'Tienda en línea',
        descripcion: 'Desarrollo de una tienda en línea con integración de pago y carrito de compras.',
      },
      {
        nombre: 'Blog personal',
        descripcion: 'Creación de un blog personal utilizando tecnologías modernas como React y Node.js.',
      },
    ],
    user: {
      correo: 'victoria@example.com',
      linkedin: 'https://www.linkedin.com/in/victoria',
      github: 'https://github.com/victoria',
    },
    habilidades: ['HTML5', 'JavaScript', 'React', 'Node.js'],
    tecnologias: ['Express.js', 'MongoDB', 'SASS'],
  },
  {
    id: '2',
    nombre: 'María González',
    descripcion: 'Soy una ingeniera de software con experiencia en el desarrollo de aplicaciones móviles y sistemas empresariales. Me encanta resolver problemas complejos y trabajar en equipo.',
    proyectos: [
      {
        nombre: 'Aplicación de gestión de tareas',
        descripcion: 'Desarrollo de una aplicación para gestionar tareas y recordatorios.',
      },
      {
        nombre: 'Sistema de contabilidad',
        descripcion: 'Creación de un sistema de contabilidad empresarial con generación de informes financieros.',
      },
    ],
    user: {
      correo: 'maria@example.com',
      linkedin: 'https://www.linkedin.com/in/mariagonzalez',
      github: 'https://github.com/mariagonzalez',
    },
    habilidades: ['Java', 'Swift', 'Python', 'SQL'],
    tecnologias: ['Android Studio', 'iOS SDK', 'Spring Boot'],
  },
  {
    id: '3',
    nombre: 'Carlos Rodríguez',
    descripcion: 'Soy un entusiasta de la inteligencia artificial y la ciencia de datos. Mi objetivo es aplicar el aprendizaje automático para resolver problemas del mundo real y tomar decisiones informadas.',
    proyectos: [
      {
        nombre: 'Sistema de recomendación de películas',
        descripcion: 'Desarrollo de un sistema de recomendación de películas basado en el historial de visualización.',
      },
      {
        nombre: 'Análisis de datos de ventas',
        descripcion: 'Análisis de datos de ventas para identificar tendencias y oportunidades de mejora.',
      },
    ],
    user: {
      correo: 'carlos@example.com',
      linkedin: 'https://www.linkedin.com/in/carlosrodriguez',
      github: 'https://github.com/carlosrodriguez',
    },
    habilidades: ['Python', 'Machine Learning', 'Deep Learning', 'Data Analysis'],
    tecnologias: ['TensorFlow', 'Scikit-Learn', 'Jupyter Notebook'],
  },
];


app.set('view engine', 'pug');
app.use(express.static('public'));

// Middleware para configurar informacionPersonal
app.use('/:id', (req, res, next) => {
  const id = req.params.id;
  if (id >= 1 && id <= portafolios.length) {
    req.informacionPersonal = portafolios[id - 1];
    req.id = id; // Agregar el ID a la solicitud
    next(); // Continúa con el manejo de la ruta
  } else {
    res.status(404).send('Portafolio no encontrado');
  }
});

// Rutas que utilizan informacionPersonal y devuelven el ID
app.get('/:id', (req, res) => {
  res.render('index', { 
    informacionPersonal: req.informacionPersonal,
    id: req.id,
    nombre: req.informacionPersonal.nombre });
});

app.get('/', (req, res) => {
  res.render('default');
});

app.get('/:id/skills', (req, res) => {
  res.render('skills', { 
    habilidades: req.informacionPersonal.habilidades, 
    tecnologias: req.informacionPersonal.tecnologias, 
    id: req.id, 
    nombre: req.informacionPersonal.nombre
  });
});

app.get('/:id/contact', (req, res) => {
  res.render('contact', { 
    user: req.informacionPersonal.user, 
    id: req.id, 
    nombre: req.informacionPersonal.nombre
  });
});


// Ruta para archivos estáticos (CSS, JS, imágenes, etc.)
app.use('/public', express.static('public'));

app.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});