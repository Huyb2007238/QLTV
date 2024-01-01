<template>
    <div class="header-view">
        <header>
            <nav class="navbar navbar-expand-lg navbar-secondary bg-secondary ">
                <!-- Logo -->
                <router-link class="navbar-brand  " to="/">
                    <img src="../assets/image/logo.png" alt="logo" class="logo">
                </router-link>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <!-- Home page -->
                        <li class="nav-item">
                            <router-link to="/" class="nav-link">Tìm kiếm sách mà bạn mong muốn <span
                                    class="sr-only">(current)</span></router-link>
                        </li>
                    </ul>
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <a class="snd" href="">Số người dùng :{{ this.countusr }} </a>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right" v-if="!this.checkStorage">
                        <li class="nav-item">
                            <router-link to="/user/login" class="nav-link btn bg-info text-white">
                                Đăng nhập
                            </router-link>
                        </li>

                        <!-- <li class="nav-item">
                            <router-link to="/user/register" class="nav-link btn bg- text-white mx-2">
                                Đăng ký
                            </router-link>
                        </li> -->
                    </ul>

                    <!-- Dropdown menu -->
                    <ul class="nav navbar-nav navbar-right" v-if="this.checkStorage">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle mb-1" href="#" id="navbarDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {{ this.nameUser }} 
                            </a>
                           


                            <div v-if="this.role == 'Thủ thư'" class="dropdown-menu dropdown-menu-right mt-2 menu-admin"
                                aria-labelledby="navbarDropdown">
                                <!-- <router-link to="/admin/borrows" class="dropdown-item text-dark menu-dropdown-user">
                                    Mượn sách
                                </router-link> -->
                                <router-link to="/admin/books/edit" class="dropdown-item text-dark menu-dropdown-user">
                                    Thêm Sách
                                </router-link>
                                <router-link to="/user/register" class="dropdown-item text-dark menu-dropdown-user">
                                    Đăng ký
                                </router-link>
                                <router-link to="/admin/borrows/edit" class="dropdown-item text-dark menu-dropdown-user">
                                    Mượn Trả
                                </router-link>
                                <router-link to="/admin/books" class="dropdown-item text-dark  menu-dropdown-user">
                                    Xem kho
                                </router-link>
                                <router-link to="/admin/users" class="dropdown-item text-dark  menu-dropdown-user">
                                    Danh sách người dùng
                                </router-link>

                                <router-link v-on:click="logoutUser()" to="/"
                                    class="dropdown-item text-dark btn btn-link ">Đăng xuất</router-link>

                            </div>

                            <div class="dropdown-menu text-dark mt-2 menu-user " aria-labelledby="navbarDropdown">
                                <router-link :to="'/admin/user/' + this.id + '/edit'"
                                    class="dropdown-item text-dark  menu-dropdown-user">
                                    Thông tin cá nhân
                                </router-link>
                                <router-link  v-on:click="logoutUser()" class="dropdown-item text-dark" to="/">
                                    <i class="fas fa-sign-out-alt "></i>
                                    Đăng xuất
                                </router-link>
                            </div> 
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    </div>
</template>

<script>

import axios from 'axios';
export default {
    data() {
        return {
           countusr:''
        };
    },
    computed: {

        id() {
            return JSON.parse(localStorage.getItem("id"))[0];
        },

        checkStorage() {
            return localStorage.getItem("id") != null;
        },
        nameUser() {
            const name = JSON.parse(localStorage.getItem("id"))[1];
            return name || null;
        },
        role() {
            const position = JSON.parse(localStorage.getItem("id"))[2];
            return position || null;
        },
    },
    created() {
        axios.get('http://localhost:8000/user/countusr')
                .then(res => {
                    console.log(res.data);
                    this.countusr =res.data

                })
                .catch(err => console.log(err));
    },
    methods: {
        logoutUser() {
            localStorage.clear();
            // window.location.reload();
            this.$router.push("/user/login");
        }
    },

}
</script>

<style scoped>
.nav-item{
    margin-right:10px !important;
}
.navbar{
    position: fixed;
    z-index: 3;
    top: 0;
    left: 0;
    right: 0;
    
}
.logo {
    width: 40px;
    margin: 0 14px;
}

a {
    color: #fff;
    text-decoration: none;
}

.snd{
    margin-bottom: 10px;
}
.nav-item {
    color: red;
}

i {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    margin: 0 8px 0 0;
}

.dropdown-menu {
    left: -20%
}

.menu-dropdown-user:hover {
    background-color: #eee;
    color: #0e0edc !important;
}
</style>