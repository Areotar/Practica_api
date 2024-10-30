const swaggerJsdoc = require("swagger-jsdoc")

const options = {
    definition: {
      openapi: "3.0.3",
      info: {
        title: "Tracks - Express API with Swagger (OpenAPI 3.0)",
        version: "0.1.0",
        description:
          "This is a CRUD API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Immune",
          url: "https://immune.institute/",
          email: "alejandro.reoyo.ceb@immune.institute",
        },
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
      components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer"
            },
        },
        schemas:{
            user: {
                type: "object",
                required: ["name", "age", "email", "password"],
                properties: {
                    name: {
                        type: "string",
                        example: "Menganito"
                    },
                    age: {
                        type: "integer",
                        example: 20
                    },
                    email: {
                        type: "string",
                        example: "miemail@google.com"
                    },
                    password: {
                        type: "string"
                    },
                },
            },
            login: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: {
                    type: "string",
                    example: "miemail@google.com"
                  },
                password: {
                    type: "string"
                  },
                },
            },
            comerce: {
              type: "object",
              required: ["name", "cif", "email", "telefono", "id_web"],
              properties: {
                  name: {
                      type: "string",
                      example: "Comercio Ejemplo S.L."
                  },
                  cif: {
                      type: "string",
                      example: "B12345678"
                  },
                  direccion: {
                      type: "string",
                      example: "Calle Falsa 123, Madrid"
                  },
                  email: {
                      type: "string",
                      format: "email",
                      example: "info@comercioejemplo.com"
                  },
                  telefono: {
                      type: "string",
                      example: "912345678"
                  },
                  id_web: {
                      type: "integer",
                      example: 1001
                  },
              },
            },
            web: {
              type: "object",
              required: ["ciudad", "actividad", "titulo", "resumen", "textos", "imagenes"],
              properties: {
                  ciudad: {
                      type: "string",
                      example: "Madrid"
                  },
                  actividad: {
                      type: "string",
                      example: "Comercio local"
                  },
                  titulo: {
                      type: "string",
                      example: "Tienda de artesanía en Madrid"
                  },
                  resumen: {
                      type: "string",
                      example: "Una tienda de artesanía con productos únicos en el centro de Madrid."
                  },
                  textos: {
                      type: "array",
                      items: {
                          type: "string"
                      },
                      example: ["Historia de la tienda", "Descripción de productos"]
                  },
                  imagenes: {
                      type: "array",
                      items: {
                          type: "string",
                          format: "uri"
                      },
                      example: [
                          "https://example.com/imagen1.jpg",
                          "https://example.com/imagen2.jpg"
                      ]
                  },
                  reseñas: {
                      type: "object",
                      properties: {
                          scoring: {
                              type: "number",
                              minimum: 0,
                              maximum: 5,
                              example: 4.5
                          },
                          total: {
                              type: "number",
                              example: 120
                          },
                          cuerpo: {
                              type: "string",
                              example: "Excelente experiencia de compra y atención al cliente."
                          }
                      }
                  }
              }
          }                 
        },  
      },
    },
    apis: ["./routes/*.js"],
}
  
module.exports = swaggerJsdoc(options)