<template>
    <HeaderView />

    <div class="container light-style flex-grow-1 container-p-y" style="height: 600px">
        <h4 class="font-weight-bold py-3 mb-4" style="height: 62px">
            Account settings
        </h4>

        <div class="card overflow-hidden">
            <div class="row no-gutters row-bordered row-border-light">
                <div class="col-md-3 pt-0">
                    <div class="list-group list-group-flush account-settings-links">
                        <a class="list-group-item list-group-item-action active" data-toggle="list"
                            href="#account-general">General</a>
                        <a class="list-group-item list-group-item-action" data-toggle="list"
                            href="#account-change-password">Change password</a>
                        <a class="list-group-item list-group-item-action" data-toggle="list" href="#book-borrow">Sách đã
                            mượn</a>
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="tab-content">
                        <div class="tab-pane fade active show" id="account-general">


                            <hr class="border-light m-0">

                            <div class="card-body">
                                <div class="form-group">
                                    <label class="form-label">Username</label>
                                    <input type="text" class="form-control" v-model="this.user.username" disabled>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Name</label>
                                    <input type="text" class="form-control" v-model="this.user.name" disabled>
                                </div>

                                <div class="form-group">
                                    <label class="form-label">Phone</label>
                                    <input type="text" class="form-control" v-model="this.user.phone" disabled>
                                </div>
                            </div>

                        </div>
                        <from class="tab-pane fade" id="account-change-password">
                            <div class="card-body pb-2">

                                <div class="form-group">
                                    <label class="form-label">Current password</label>
                                    <input type="text" class="form-control" v-model="pass.username">
                                </div>

                                <div class="form-group">
                                    <label class="form-label">New password</label>
                                    <input type="password" class="form-control" v-model="pass.password">
                                </div>

                                <div class="form-group">
                                    <label class="form-label">Repeat new password</label>
                                    <input type="password" class="form-control" v-model="pass.newpassword">
                                </div>
                                <div class="text-right mt-3 " style="height: 62px">
                                    <button type="submit" class="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </from>
                        <div class="tab-pane fade" id="book-borrow">
                            <div>
                                <table class="table table-bordered" >
                                    <thead class="thead-dark">
                                        <tr>
                                            <th scope="col">STT</th>
                                            <th scope="col">Mã sách</th>
                                            <th scope="col">Ngày mượn</th>
                                            <th scope="col">Hạn Trả</th>
                                            <th scope="col">Ngày trả</th>
                                            <th scope="col">Trạng thái </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>CTU0001</td>
                                            <td>2023-11-15</td>
                                            <td>2021-12-31</td>
                                            <td>2022-02-01</td>
                                            <td>Đã trả</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>CTU0002</td>
                                            <td>2023-11-15</td>
                                            <td>2021-12-31</td>
                                            <td>2022-02-01</td>
                                            <td>Đã trả</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>CTU0003</td>
                                            <td>2023-11-15</td>
                                            <td>2021-12-31</td>
                                            <td>2022-02-01</td>
                                            <td>Đã trả</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">4</th>
                                            <td>CTU0004</td>
                                            <td>2023-11-15</td>
                                            <td>2021-12-31</td>
                                            <td>2022-02-01</td>
                                            <td>Đã trả</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">5</th>
                                            <td>CTU0005</td>
                                            <td>2023-11-15</td>
                                            <td>2021-12-31</td>
                                            <td>2022-02-01</td>
                                            <td>Đã trả</td>
                                        </tr>
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>

    <FooterView />
</template>

<script>

import HeaderView from '../components/HeaderView.vue';
import FooterView from '../components/FooterView.vue';
import axios from 'axios';

export default {
    data() {
        return {
            user: {
                username: '',
                password: '',
                name: '',
                position: '',
                phone: ''
            },
            pass: {
                username: '',
                password: '',
                newpassword: ''
            }

        }
    },
    components: { HeaderView, FooterView },
    computed: {
        id() {
            return this.$route.params.id;
        }
    },
    created() {
        const x = JSON.parse(localStorage.getItem('id'))[0]
        if (x !== this.id) {
            this.$router.push('/');
        }
        axios.get('http://localhost:8000/admin/user/' + this.id + '/edit')
            .then(res => {
                this.user = res.data;
                // console.log(localStorage.getItem("id")[0]);
                console.log();
            })
            .catch(err => {
                console.log(err)
            })

    },

    methods: {
        changePassword() {
            // if(this.pass.newpassword == this.pass.repeatpassword){
            console.log(this.pass.new.password);
            axios.post(`http:localhost:8000/user/${id}/edit`)
                .then(res => {
                    if (res.status === 200) {
                        window.alert("Cập nhật thông tin thành công")
                    }
                    else (res.status == 500)
                    window.alert("Cập nhật không thành công")
                })
            // }else{
            //     window.alert("Mật khẩu không trùng khớp")
            // }

        },

        updateuser() {
            axios.put('http://localhost:8000/admin/user/' + this.id + '/edit', this.pass)
                .then(res => {
                    if (res.data.status === 201) {
                        this.$router.push('/admin/stored/user');
                        window.alert("Cập nhật thông tin thành công")
                    }
                    else if (res.data.status === 501) {
                        window.alert("Cập nhật thông tin thất bại")
                    }

                })
                .catch(err => console.log(err))
        },
    }
}
</script>

<style>
body {
    background: #f5f5f5;
    /* margin-top: 20px; */
}

.btn-default {
    border-color: rgba(24, 28, 33, 0.1);
    background: rgba(0, 0, 0, 0);
    color: #4E5155;
}

label.btn {
    margin-bottom: 0;
}

.btn-outline-primary {
    border-color: #26B4FF;
    background: transparent;
    color: #26B4FF;
}

.btn {
    cursor: pointer;
}

.text-light {
    color: #babbbc !important;
}

.card {
    background-clip: padding-box;
    box-shadow: 0 1px 4px rgba(24, 28, 33, 0.012);
}

.row-bordered {
    overflow: hidden;
}

.account-settings-fileinput {
    position: absolute;
    visibility: hidden;
    width: 1px;
    height: 1px;
    opacity: 0;
}

.account-settings-links .list-group-item.active {
    font-weight: bold !important;
}

html:not(.dark-style) .account-settings-links .list-group-item.active {
    background: transparent !important;
}

.account-settings-multiselect~.select2-container {
    width: 100% !important;
}

.light-style .account-settings-links .list-group-item {
    padding: 0.85rem 1.5rem;
    border-color: rgba(24, 28, 33, 0.03) !important;
}

.light-style .account-settings-links .list-group-item.active {
    color: #4e5155 !important;
}

.material-style .account-settings-links .list-group-item {
    padding: 0.85rem 1.5rem;
    border-color: rgba(24, 28, 33, 0.03) !important;
}

.material-style .account-settings-links .list-group-item.active {
    color: #4e5155 !important;
}

.dark-style .account-settings-links .list-group-item {
    padding: 0.85rem 1.5rem;
    border-color: rgba(255, 255, 255, 0.03) !important;
}

.dark-style .account-settings-links .list-group-item.active {
    color: #fff !important;
}

.light-style .account-settings-links .list-group-item.active {
    color: #4E5155 !important;
}

.light-style .account-settings-links .list-group-item {
    padding: 0.85rem 1.5rem;
    border-color: rgba(24, 28, 33, 0.03) !important;
}
.table, th, td {
border: 1px solid;
}
</style>