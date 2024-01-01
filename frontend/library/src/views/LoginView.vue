<template>
    <div class="login-view">
        <section class="vh-100" style="background-color: #d99fac;">
            <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col col-xl-10">
                        <div class="card" style="border-radius: 1rem;">
                            <div class="row g-0">
                                <div class="col-md-6 col-lg-5 d-none d-md-block">
                                    <img src="../pic/Papel pintado Joslina rojo.jfif"
                                        alt="login form" class="img-fluid" style="border-radius: 1rem 0 0 1rem;" />
                                </div>
                                <div class="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div class="card-body p-4 p-lg-5 text-black">

                                        <form method="POST" @submit.prevent="loginUser">

                                            <div class="d-flex align-items-center mb-3 pb-1">
                                                <i class="fa fa-book fa-2x me-3" style="color: #ff6219;"></i>
                                                <span class="h1 fw-bold mb-0 ">Thư Viện Meme</span>
                                            </div>

                                            <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">
                                                Sign into your account
                                            </h5>

                                            <div class="form-outline mb-4">
                                                <input required="true" type="text" id="username" class="form-control form-control-lg"
                                                    v-model="login.username" />
                                                <label class="form-label" for="username">Username</label>
                                            </div>

                                            <div class="form-outline mb-4">
                                                <input required="true" type="password" id="pwd" class="form-control form-control-lg"
                                                    v-model="login.password" />
                                                <label class="form-label" for="pwd">Password</label>
                                            </div>

                                            <div class="pt-1 mb-4">
                                                <button class="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                                            </div>

                                            <!-- <p class="mb-5 pb-lg-2" style="color: #393f81;">
                                                Don't have an account? <router-link to="/user/register"
                                                    style="color: #393f81;">Register here</router-link>
                                            </p> -->

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    data() {
        return {
            login: {
                username: null,
                password: null
            }
        }
    },
    methods: {
        async loginUser() {
            await axios.post('http://localhost:8000/user/login', this.login)
                .then(res => {console.log(res.data);
                    if (res.status === 200) {
                        const values = [res.data._id,res.data.name, res.data.position,res.data.username];
                        if(res.data.position == "Thủ thư"){
                            window.alert('Đăng nhập thành công với vai trò admin\nXin chào ' + res.data.name);
                            localStorage.setItem('id', JSON.stringify(values));
                            this.$router.push('/admin/books');
                        }
                        else{
                            window.alert('Đăng nhập thành công \nXin chào ' + res.data.name);
                            localStorage.setItem('id', JSON.stringify(values));
                            this.$router.push('/');
                        }
                    }
                    if (res.data.status == 404) {
                        window.alert("Sai tài khoản hoặc mật khẩu")
                    }
                })
                .catch(err => console.log(err));
        },
    }
}
</script>
<style scoped></style>