import { Testimonial } from "../models/Testimonial.js";

const guardarTestimonial = async (req, res) => {

    //Validar Form
    const { nombre, correo, mensaje } = req.body;

    let errores = [];

    if(nombre.trim() === '') {
        errores.push({mensaje: 'El nombre está vacio'});
    }

    if(correo.trim() === '') {
        errores.push({mensaje: 'El correo está vacio'});
    }

    if(mensaje.trim() === '') {
        errores.push({mensaje: 'El mensaje está vacio'});
    }

    if(errores.length > 0) {

        const testimoniales = await Testimonial.findAll();

        //Mostrar errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        });
    } else {
        //Almacenar testimonial

        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });

            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }

    }
}

export {
    guardarTestimonial
}