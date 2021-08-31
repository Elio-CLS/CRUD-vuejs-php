<template>
    <div class="container">
        <div id="crear"></div>
        <div class="card">
            <div class="card-header">
                <!-- <router-link :to="{name:'Crear'}" class="btn btn-primary">Crear Nuevo</router-link> -->

                    <!-- <button @click="showCrear()" type="button" class="btn btn-primary">Crear</button>
                    <div v-show="crear"> -->
                        <Crear/>
                    <!-- </div> -->

            </div>
            <div class="card-body">
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="empleado in empleados" :key="empleado.id">
                            <td>{{empleado.id}}</td>
                            <td>{{empleado.nombre}}</td>
                            <td>{{empleado.correo}}</td>
                            <td>

                                <div class="d-grid gap-2 d-md-block">
                                    <router-link :to="{name: 'Editar', params: {id: empleado.id}}" class="btn btn-dark btn-sm me-2">Editar</router-link>

                                    <button v-on:click="borrarEmpleado(empleado.id)" type="button" class="btn btn-danger btn-sm">Borrar</button>
                                </div>

                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import Crear from "./Crear.vue";

export default {
    data() {
        
        return {
            empleados: [],
            // crear: false
        }
    },

    created:function() {

        this.consultarEmpleados();
    },

    methods: {

        // showCrear() {
            
        //     this.crear == false ? this.crear = true : this.crear = false
        // },

        // http://localhost/CRUD_vuejs_php/empleados-main/index.php
        consultarEmpleados() {

            fetch('http://localhost/CRUD_vuejs_php/empleados-main/index.php')
                .then(respuesta => respuesta.json())
                .then(datosRespuesta => {
                    // console.table(datosRespuesta);

                    // Valida la informacion
                    this.empleados = []
                    if(typeof datosRespuesta[0].success === 'undefined') {
                        this.empleados = datosRespuesta;
                    }
                })
            .catch(console.log)
        },

        borrarEmpleado(id) {

            fetch('http://localhost/CRUD_vuejs_php/empleados-main/index.php?borrar='+id)
                .then(respuesta => respuesta.json())
                .then(datosRespuesta => {
                    console.log(datosRespuesta);
                    this.consultarEmpleados();
                    // Redirije a la misma pagina de listar
                    // window.location.href='listar';
                });
            console.log(id);
        },
    },

    components: {
        Crear
    }
}

</script>