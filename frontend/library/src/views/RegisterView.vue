<template>
    <div class="register-view">
        <section class="vh-100" style="background-color: #d99fac;">
            <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-lg-12 col-xl-11">
                        <div class="card text-black" style="border-radius: 25px;">
                            <div class="card-body p-md-5">
                                <div class="row justify-content-center">
                                    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                        <form method="POST" @submit.prevent="registerUser" class="mx-1 mx-md-4">
                                            <label class="form-label" for="username">Username</label>
                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div class="form-outline flex-fill mb-0">
                                                    <input type="text" id="username" class="form-control"
                                                        v-model="posts.username" required="true"/>
                                                </div>
                                            </div>

                                            <label class="form-label" for="password">Password</label>
                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div class="form-outline flex-fill mb-0">
                                                    <input type="password" id="password" class="form-control"
                                                        v-model="posts.password" required="true"/>
                                                </div>
                                            </div>

                                            <label class="form-label" for="typeOf">Vị trí</label>
                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <select class="form-select" id="typeOf" v-model="posts.position" required="true" >
                                                    <option value="Sinh viên">Sinh viên</option>
                                                    <option value="Thủ thư">Thủ thư</option>
                                                </select>
                                            </div>

                                            <label class="form-label" for="name">Your Name</label>
                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-signature fa-lg me-3 fa-fw"></i>
                                                <div class="form-outline flex-fill mb-0">
                                                    <input type="text" id="name" class="form-control"
                                                        v-model="posts.name" required="true"/>
                                                </div>
                                            </div>

                                            <label class="form-label" for="phone">Your Phone</label>
                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-phone  fa-lg me-3 fa-fw"></i>
                                                <div class="form-outline flex-fill mb-0">
                                                    <input type="text" id="phone" class="form-control"
                                                        v-model="posts.phone" required="true"/>
                                                </div>
                                            </div>

                                            <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="submit" class="btn btn-primary ">Register</button>
                                                <button type="button" v-on:click="comebackHome()"
                                                    class="btn btn-secondary ml-5">Về trang chủ</button>
                                            </div>

                                        </form>

                                    </div>
                                    <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <img src="https://cdn.mobilecity.vn/mobilecity-vn/images/2021/12/tong-hop-meo-giup-ban-chup-nhung-buc-anh-dep-hon-ve-thu-cung-cua-minh.jpg.webp"
                                            class="img-fluid" alt="Sample image">

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

import axios from 'axios'
import HeaderView from '../components/HeaderView.vue';
import FooterView from '../components/FooterView.vue';
export default {
    data() {
        return {
            posts: {
                username: null,
                password: null,
                name: null,
                position: null,
                phone: null
            }
        }
    },
    components: { HeaderView, FooterView },

    methods: {
        registerUser() {
            axios.post('http://localhost:8000/admin/register', this.posts)
                .then(res => {
                    if (res.status === 200) {
                        window.alert("Đăng ký thành công");
                        window.location.reload();
                        // this.$router.push('/user/login')
                    }
                    else if (res.status === 500) {
                        window.alert("Đăng ký thất bại");
                    }
                    else{
                        window.alert("Thông tin nhập đã có");
                    }
                })
                .catch(err => console.log(err))
                
        },
        comebackHome() {
            this.$router.push("/");
        }
    }
}
</script>
<style></style>