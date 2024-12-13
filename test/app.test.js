const request = require('supertest')
const app = require('../app')
var cifweb = ""
var commerceToken = ""

describe('users', () => {
    let token = ""
    let id = ""
    let id_nuevo = ""

    it('should register a user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({ "nombre": "Menganito", "email": "user@test.com", "password": "1234", "edad": 20, "ciudad": "Madrid", "intereses": ['caminar'], "ofertas": true, "role": "user" })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.user.email).toEqual('user@test.com')
        token_nuevo = response.body.token
        id_nuevo = response.body.user._id
        // console.log(token, id)
    })

    it('should login a user', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({ "email": "user@test.com", "password": "1234" })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.user.email).toEqual('user@test.com')
        token = response.body.token
        id = response.body.user._id
        console.log(token, id)
    })


    it('should update the user name', async () => {
        const response = await request(app)
            .patch('/api/auth/' + id_nuevo)
            .set('Authorization', `Bearer ${token_nuevo}`)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({ nombre: "Alberto" })
            .expect(200)

        console.log("ID actualizado:", id_nuevo)
        console.log("Nombre actualizado:", response.body.nombre)
    })


    it('should delete a user', async () => {
        const response = await request(app)
            .delete('/api/auth/' + id)
            // .auth(token, { type: 'bearer' })
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(200)
        console.log("id de delete:", id)
    })
})




describe('comerce', () => {
    // Cambiar cuando caduca
    const adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzMxZjJjM2EwMTFiM2RjNTVjODA4MWUiLCJjaWYiOm51bGwsImlhdCI6MTczMjU1MDYwNSwiZXhwIjoxNzMyNjM3MDA1fQ.jUkFPu47qllhpvCIRkIhgsNO5oD2E2GnDf4NR69R9is"
    let cif = ""
    


    it('should retrieve all commerces', async () => {
        const response = await request(app)
            .get('/api/comerce')
            .set('Authorization', `Bearer ${adminToken}`)
            .set('Accept', 'application/json')
            .expect(200)

        expect(Array.isArray(response.body)).toBe(true)

        expect(response.body.length).toBeGreaterThan(0)

        console.log("Primer comercio:", response.body[0])
    })

    it('should retrieve a commerce by CIF', async () => {
        const cif = "test2"
        const response = await request(app)
            .get(`/api/comerce/${cif}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .set('Accept', 'application/json')
            .expect(200)

        expect(response.body).toBeDefined()
        expect(response.body.cif).toEqual(cif)

        console.log("Comercio obtenido por CIF:", response.body)
    })

    it('should create a new commerce', async () => {
        const newCommerce = {
            name: "prueba4",
            cif: "test4",
            direccion: "test4",
            email: "test4",
            telefono: "test4",
            id_web: 4
        };

        const response = await request(app)
            .post('/api/comerce')
            .set('Authorization', `Bearer ${adminToken}`)
            .set('Content-Type', 'application/json')
            .send(newCommerce)
            .expect(200)

        commerceToken = response.body.token
        cif = response.body.user.cif
        console.log("Cif del comercio:", cif)
        console.log("Comercio creado:", response.body);
        console.log("Token del comercio:", response.body.token)
    });

    it('should update a commerce by CIF', async () => {
        const updateData = {
            name: "prueba_cuatro",
            cif: "test4",
            direccion: "test4",
            email: "test4",
            telefono: "test4",
            id_web: 4
        };

        const response = await request(app)
            .put(`/api/comerce/${cif}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .set('Content-Type', 'application/json')
            .send(updateData)
            .expect(200)

        console.log("Comercio actualizado:", response.body);
    });

    it('should delete a commerce by CIF', async () => {

        const deleteResponse = await request(app)
            .delete(`/api/comerce/${cif}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .expect(200)
    });
})

describe('web', () => {
    // No caduca
    const permanentcomercetoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOm51bGwsImNpZiI6InRlc3Q1IiwiaWF0IjoxNzMyMjA4MzA4LCJleHAiOjE3NjM3NjU5MDh9.U8KEq2wG5CcL20Xw_8rH6BM4fQhmQM_2rLvp739hVgA"
    // Cambiar cuando caduca
    const admintoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzMxZjJjM2EwMTFiM2RjNTVjODA4MWUiLCJjaWYiOm51bGwsImlhdCI6MTczMjU1MDYwNSwiZXhwIjoxNzMyNjM3MDA1fQ.jUkFPu47qllhpvCIRkIhgsNO5oD2E2GnDf4NR69R9is"

    it('should create a new web entry for a commerce', async () => {
        const newWebData = {
            cif: "test5",
            ciudad: "Madrid",
            actividad: "programación",
            titulo: "Tienda Online de Tecnología",
            resumen: "La mejor tienda de productos tecnológicos en línea.",
            textos: [
                "Ofrecemos una amplia gama de productos electrónicos.",
                "Envío rápido y seguro a nivel nacional."
            ],
            imagenes: [
                "https://ejemplo.com/imagen1.jpg"
            ],
        };

        const response = await request(app)
            .post('/api/web')
            .set('Authorization', `Bearer ${admintoken}`)
            .set('Content-Type', 'application/json')
            .send(newWebData)
            .expect(200);
            cifweb = (response.body.cif)

            

        console.log("cif de la web:", response.body.cif)
        console.log("Nueva entrada web creada:", response.body);

    })

    it('should return webs that match the filters', async () => {
        const response = await request(app)
            .get('/api/web/buscador')
            .query({
                ciudad: 'Palencia',
                actividad: 'Textil',
                ordenar: 'asc'
            })
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);

        console.log('Resultados del buscador:', response.body);
    });

    it('should return all webs if no filters are provided', async () => {
        const response = await request(app)
            .get('/api/web/buscador')
            .expect(200);

        expect(response.body.length).toBeGreaterThan(0);

        console.log('Todas las webs:', response.body);
    });

    it('should return a web entry by its ID', async () => {
        const response = await request(app)
            .get("/api/web/6729ff0c3f945b61d3b0c972")
            .expect(200)

        console.log('Detalles de la web obtenida:', response.body);
    });

    it('should return interested users for a valid CIF', async () => {
        const response = await request(app)
            .get('/api/web/interes/test1')
            .set('Authorization', `Bearer ${permanentcomercetoken}`)
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
        response.body.forEach(user => {
            expect(user).toHaveProperty('email');
        });

        console.log("Usuarios interesados:", response.body);
    });

    it('should update the web page successfully', async () => {
        const updateData = {
            cif: "test1",
            ciudad: "Palencia",
            actividad: "Comercio Electrónico",
            titulo: "Tienda Online de Tecnología",
            resumen: "La mejor tienda de productos tecnológicos en línea.",
            textos: [
                "Ofrecemos una amplia gama de productos electrónicos.",
                "Envío rápido y seguro a nivel nacional."
            ],
            imagenes: [
                "https://ejemplo.com/imagen1.jpg"
            ]
        };

        const response = await request(app)
            .put("/api/web/test1")
            .set('Authorization', `Bearer ${permanentcomercetoken}`)
            .set('Content-Type', 'application/json')
            .send(updateData)
            .expect(200);

        expect(response.body).toHaveProperty('ciudad', 'Palencia');
        console.log("Web actualizada correctamente:", response.body);
    });

    it('should logically delete (archive) a web page', async () => {

        console.log("pueba", cifweb, commerceToken)
        const response = await request(app)    
            .delete(`/api/web/${cifweb}?logic=true`)
            .set('Authorization', `Bearer ${permanentcomercetoken}`)
            .expect(200);
        console.log("prueba coño", response.body)
        expect(response.text).toBe("Borrado de manera logica");
    });

    it('should physically delete a web page', async () => {
        console.log("Cif de la web:",cifweb)

        const response = await request(app)
            .delete(`/api/web/${cifweb}?logic=false`)
            .set('Authorization', `Bearer ${permanentcomercetoken}`)
            .expect(200);

        expect(response.text).toBe("Borrado de manera fisica");
    });

    it('should add a review with a comment and score to a web page', async () => {
        const webId = "67335bf901572ff0d7962743";
        const reviewData = {
            comentario: "Todo mal",
            puntuacion: 1
        };

        const response = await request(app)
            .patch(`/api/web/comentarios/${webId}`)
            .set('Content-Type', 'application/json')
            .send(reviewData)
            .expect(200);

        console.log("Nueva reseña:", response.body)
    });
});