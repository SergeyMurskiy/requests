<template>
    <div>
        <form>
            <h1>Обновление данных режиссера</h1>
            <label>
                Id режиссера
                <input type="text" v-model="director.id">
            </label>
            <label>
                Имя
                <input type="text" v-model="director.name">
            </label>
            <label>
                Страна
                <input type="text" v-model="director.country">
            </label>
            <input type="button" @click="updateDirector" value="Изменить">
        </form>
        <div>{{info}}</div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                director: {
                    id: '',
                    name: '',
                    country: '',
                },
                info: ''
            };
        },
        methods: {
            upDirector() {
                this.info = '';
                let url = 'http://localhost:8080/api/directors?directorId=' + this.director.id +
                        '&name=' + this.director.name + '&country=' + this.director.country
                axios.put(url, {
                    headers: {
                        "Authorization" : localStorage.getItem("Authorization")
                    }
                })
                    .then((response) => {
                        this.info = "Данные режиссера изменены";
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