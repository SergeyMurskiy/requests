<template>
    <div>
        <form>
            <h1>Поиск режиссера по id</h1>
            <label>
                Id
                <input type="text" v-model="id">
            </label>
            <input type="button" @click="getDirectorById" value="Поиск">
        </form>
        <div>
            <div>{{director.id}} {{director.name}} {{director.country}}</div>
        </div>
        <div v-if="error">Режиссер не найден</div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                director: '',
                id: '',
                error: false
            };
        },
        methods: {
            getDirectorById () {
                this.director = '';
                this.error = false;
                axios.get('http://localhost:8080/api/directors/director', {
                    params: {
                        directorId: this.id,
                    },
                    headers: {
                        "Authorization" : localStorage.getItem("Authorization")
                    }
                }).then((response) => {
                    console.log(response.data)
                    this.director = response.data;
                }).catch(() => {
                    this.error = true;
                });
            }
        }
    }
</script>
<style>
    label {
        padding: 5px;
    }
</style>
