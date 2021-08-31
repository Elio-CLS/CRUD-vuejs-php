<template>
  <div class="container">
    <div id="crear"></div>
    <div class="card">
      <div class="card-header">

        <button @click="showCrear()" type="button" class="btn btn-primary">
          Crear
        </button>
        
        <div v-show="crear" class="mt-3 mb-3">
          <div class="container">
            <div class="card">
              <div class="card-header">
                <h2>Formulario</h2>
              </div>
              <div class="card-body">
                <form id="formulario" v-on:submit.prevent="registrar">
                  <div class="form-group">
                    <label for="nombre">Nombre:</label>
                    <input
                      type="text"
                      v-model="registro.nombre"
                      class="form-control"
                      required
                      name="nombre"
                      id="nombre"
                      aria-describedby="helpId"
                      placeholder="Nombre"
                    />
                  </div>
                  <div class="form-group">
                    <label for="correo">Correo:</label>
                    <input
                      type="email"
                      class="form-control"
                      v-model="registro.correo"
                      name="correo"
                      id="correo"
                      required
                      aria-describedby="helpId"
                      placeholder="Correo"
                    />
                  </div>
                  <div
                    class="d-grid gap-2 d-md-block mt-4"
                    role="group"
                    aria-label=""
                  >
                    <button type="submit" class="btn btn-success me-2">
                      Agregar
                    </button>
                    <!-- <router-link :to="{name:'Listar'}" class="btn btn-danger">Cancelar</router-link> -->
                    <button
                      v-on:click="borrarCampos()"
                      type="button"
                      class="btn btn-danger"
                    >
                      Borrar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
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
              <td>{{ empleado.id }}</td>
              <td>{{ empleado.nombre }}</td>
              <td>{{ empleado.correo }}</td>
              <td>
                <div class="d-grid gap-2 d-md-block">

                  <button
                    v-on:click="obtenerInfo(empleado.id)"
                    type="button"
                    class="btn btn-dark btn-sm me-2"
                  >
                    Editar
                  </button>

                  <button
                    v-on:click="borrarEmpleado(empleado.id)"
                    type="button"
                    class="btn btn-danger btn-sm"
                  >
                    Borrar
                  </button>

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
export default {
  data() {
    return {
      empleados: [],
      registro: {},
      crear: false,
      action: false,
      id: null,
    };
  },

  created: function() {
    this.consultarEmpleados();
  },

  methods: {
    // http://localhost/CRUD_vuejs_php/empleados-main/index.php
    consultarEmpleados() {
      fetch("http://localhost/CRUD_vuejs_php/empleados-main/index.php")
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {
          // console.table(datosRespuesta);

          // Valida la informacion
          this.empleados = [];
          if (typeof datosRespuesta[0].success === "undefined") {
            this.empleados = datosRespuesta;
          }
        })
        .catch(console.log);
    },

    borrarEmpleado(id) {
      fetch(
        "http://localhost/CRUD_vuejs_php/empleados-main/index.php?borrar=" + id
      )
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {
          console.log(datosRespuesta);
          this.consultarEmpleados();
        });
    },

    registrar() {
      if (this.action === true) {
        const datosEnviar = {
          id: this.id,
          nombre: this.registro.nombre,
          correo: this.registro.correo,
        };

        console.table(datosEnviar);

        fetch(
          "http://localhost/CRUD_vuejs_php/empleados-main/index.php?actualizar=" +
            this.id,
          {
            method: "POST",
            body: JSON.stringify(datosEnviar),
          }
        )
          .then((respuesta) => respuesta.json())
          .then((datosRespuesta) => {
            console.log(datosRespuesta);
            this.action = false;
            this.id = null;
            this.consultarEmpleados();
            this.showCrear();
          });
      } else {
        const datosEnviar = {
          nombre: this.registro.nombre,
          correo: this.registro.correo,
        };

        fetch(
          "http://localhost/CRUD_vuejs_php/empleados-main/index.php?insertar=1",
          {
            method: "POST",
            body: JSON.stringify(datosEnviar),
          }
        )
          .then((respuesta) => respuesta.json())
          .then((datosRespuesta) => {
            console.log(datosRespuesta);
            this.consultarEmpleados();
            this.showCrear();
          });
      }
    },

    borrarCampos() {
      const reset = document.querySelector("#formulario").reset();
      return reset;
    },

    showCrear() {
      this.crear == false ? (this.crear = true) : (this.crear = false);
    },

    obtenerInfo(id) {
      this.action = true;
      this.id = id;
      fetch(
        "http://localhost/CRUD_vuejs_php/empleados-main/index.php?consultar=" +
          id
      )
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {
          console.table(datosRespuesta);
          console.log(this.id);
          this.registro = datosRespuesta[0];
          this.showCrear();
        })
        .catch(console.log);
    },
  },
};
</script>
