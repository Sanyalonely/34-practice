require('dotenv').config()

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const router = require('./router/router')
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express()

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'NotatkaHub API',
        version: '1.0.0',
        description: 'Документація API для менеджера нотаток',
      },
      servers: [{ url: process.env.API_URL + '/api'}],
      components: {
        securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            }
        },
        schemas: {
          User: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              username: { type: 'string' },
              email: { type: 'string' },
              isActivated: { type: 'boolean' }
            }
          },
          Note: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              title: { type: 'string' },
              content: { type: 'string' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
              isPinned: { type: 'boolean' }
            }
          },
          Trash: {
            type: 'object',
            properties: {
              id: { type: 'string', description: 'ID запису саме у смітнику' },
              title: { type: 'string' },
              content: { type: 'string' },
              createdAt: { type: 'string', format: 'date-time', description: 'Дата створення оригіналу' },
              updatedAt: { type: 'string', format: 'date-time', description: 'Дата останнього редагування' }
            }
          }
        }
      }      
    },
    apis: ['./router/router.js'],
  };
  
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL 
}));
app.use(cookieParser())
app.use(express.json())
app.use('/api',router)


const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        app.listen(process.env.PORT || 3000, () => console.log('server started on port 3000'))
    } catch (e) {
        console.error(e)
    }
}

start()














