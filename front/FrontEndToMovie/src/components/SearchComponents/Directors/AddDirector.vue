<template>
    <div>
        <form>
            <h1>Добавление режиссера</h1>
            <label>
                Имя
                <input type="text" v-model="director.name">
            </label>
            <label>
                Страна
                <input type="text" v-model="director.country">
            </label>
            <input type="button" @click="addDirector" value="Добавить">
        </form>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                director: {
                    name: '',
                    country: '',
                },
                info: false
            };
        },
        methods: {
            addDirector() {
                axios.post('http://localhost:8080/api/directors?name=' + this.director.name +
                '&country=' + this.director.country, {
                    headers: {
                        "Authorization" : localStorage.getItem("Authorization")
                    }
                })
                    .then((response) => {
                    console.log(response.data);
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
