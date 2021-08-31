<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                Actializar registro de Empleado
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="actualizarRegistro">

                    <div class="form-group">
                      <label for="nombre">Nombre:</label>
                      <input type="text" v-model="empleado.nombre"
                        class="form-control" required name="nombre" id="nombre" aria-describedby="helpId" placeholder="Nombre">
                    </div>

                    <div class="form-group">
                      <label for="correo">Correo:</label>
                      <input type="email"
                        class="form-control" v-model="empleado.correo" name="correo" id="correo" required aria-describedby="helpId" placeholder="Correo">
                    </div>

                    <div class="d-grid gap-2 d-md-block mt-4" role="group" aria-label="">
                        <button type="submit" class="btn btn-success me-2">Actualizar</button>

                        <router-link :to="{name:'Listar'}" class="btn btn-danger">Cancelar</router-link>
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {

        return {
            empleado: {}
        }
    },

    created: function() {
        this.obtenerInfo();
    },

    methods: {

        obtenerInfo() {

            fetch('http://localhost/CRUD_vuejs_php/empleados-main/index.php?consultar='+this.$route.params.id)
                .then(respuesta => respuesta.json())
                .then(datosRespuesta => {
                    console.table(datosRespuesta);
                    this.empleado = datosRespuesta[0];
                })
            .catch(console.log)
        },

        actualizarRegistro() {

            const datosEnviar = {id: this.$route.params.id, nombre : this.empleado.nombre, correo : this.empleado.correo}

            fetch('http://localhost/CRUD_vuejs_php/empleados-main/index.php?actualizar='+this.$route.params.id, {
                method: "POST",
                body: JSON.stringify(datosEnviar)
            })
            .then(respuesta => respuesta.json())
            .then(datosRespuesta => {
                console.log(datosRespuesta);
                window.location.href = '../listar'
            });
        }
    }
}
</script>