<template>
    <div>
        <form>
            <h1>Поиск режиссера по имени и стране</h1>
            <label>
                Имя
                <input type="text" v-model="name">
            </label>
            <label>
                Страна
                <input type="text" v-model="country">
            </label>
            <input type="button" @click="getDirectorsByNameAndCountry" value="Поиск">
        </form>
        <div>
            <div v-for="director in directors">   {{director.id}} {{director.name}} {{director.country}}</div>
        </div>
        <div> {{info}}</div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                directors:[],
                name: '',
                country: '',
                info: ''
            };
        },
        methods: {
            getDirectorsByNameAndCountry () {
                this.info = '';
                axios.get('http://localhost:8080/api/directors', {
                    params: {
                        name: this.name,
                        country: this.country
                    },
                    headers: {
                        "Authorization" : localStorage.getItem("Authorization")
                    }
                }).then((response) => {
                    console.log(response);
                    if (response.data.empty) {
                        this.info = "Режиссер не найден";
                    } else {
                        this.directors = response.data;
                    }
                }).catch((e) => {
                    this.info = "Вы не авторизованы";
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
