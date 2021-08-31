<template>
<button @click="showCrear()" type="button" class="btn btn-primary">Crear</button>
    <div v-show="crear" class="mt-3 mb-3">
        <div class="container">
            <div class="card">
                <div class="card-header">
                    Agregar nuevo Empleado
                </div>
                <div class="card-body">
                    <form v-on:submit.prevent="agregarRegistro" id="formulario">
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
                            <button type="submit" class="btn btn-success me-2">Agregar</button>
                            <!-- <router-link :to="{name:'Listar'}" class="btn btn-danger">Cancelar</router-link> -->
                            <button v-on:click="borrarCampos()" type="button" class="btn btn-danger">Borrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {

        return {
            empleado: {},
            crear: false
        }
    },

    methods: {
        
        agregarRegistro() {
            
            console.log(this.empleado);

            const datosEnviar = {nombre : this.empleado.nombre, correo : this.empleado.correo}

            fetch('http://localhost/CRUD_vuejs_php/empleados-main/index.php?insertar=1', {
                method: "POST",
                body: JSON.stringify(datosEnviar)
            })
            .then(respuesta => respuesta.json())
            .then(datosRespuesta => {
                console.log(datosRespuesta);
                // window.location.href = 'listar'
            });
        },

        borrarCampos() {
            
            document.getElementById('formulario').reset();
            this.showCrear();
             
        },

        showCrear() {

            this.crear == false ? this.crear = true : this.crear = false
        },
    },
}
</script>