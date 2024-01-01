<template>
    <HeaderView />
    <div class="edit-borrow container" v-if="borrow.books.length > 0">
        <h3 class="text-uppercase mt-4 mb-4 ">Chỉnh sửa mượn sách</h3>

        <form method="POST" @submit.prevent="updateBorrow()" action="">
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputID">ID người mượn</label>
                    <input type="text" class="form-control" id="inputID" required="true" v-model="this.borrow.user.code">
                </div>
                <div class="form-group col-md-6">
                    <label for="inputFullname">Họ và tên</label>
                    <input type="text" class="form-control" id="inputFullname" placeholder="Fullname" required="true"
                        v-model="this.borrow.user.fullname">
                </div>
            </div>


            <div class="row" v-for="(item, index) in this.borrow.books" :key="index">
                <div class="form-group">
                    <label for="inputAddress1">ID sách</label>
                    <input type="text" class="form-control" id="inputAddress1" placeholder="CTUxxxx" required="true"
                        v-model="borrow.books[index].id">
                </div>
                <div class="form-group">
                    <label for="inputAddress2">Ngày Mượn</label>
                    <input type="date" class="form-control" id="inputAddress2" placeholder="" required="true"
                        v-model="borrow.books[index].dateBorrow.split('T')[0]">
                </div>
                <div class="form-group">
                    <label for="inputAddress3">Hạn Trả</label>
                    <input type="date" class="form-control" id="inputAddress3" placeholder="" required="true"
                        v-model="borrow.books[index].dateDue.split('T')[0]">
                </div>
                <div class="form-group">
                    <label for="inputAddress4">Ngày trả</label>
                    <input v-if="borrow.books[index].dateReturn" type="date" class="form-control" id="inputAddress4" placeholder=""
                        v-model="borrow.books[index].dateReturn.split('T')[0]">
                    <input v-else type="date" class="form-control" id="inputAddress4" placeholder=""
                        v-model="borrow.books[index].dateReturn">
                </div>
                <div class="form-row">
                    <div class="form-group col-md-3">
                        <button id="xoa" type="button" class="btn btn-dark" style="width: 100px; font: 1em sans-serif"
                            margin="padding" @click="removeElement(index)">
                            + Xóa
                        </button>
                    </div>
                </div>


            </div>
            <div class="form-group col-md-2">
                <!-- <button id="them" type="button" class="btn btn-dark" style="width: 170px; font: 1em sans-serif"
                    margin="padding" @click="addElement()">
                    + Thêm mượn sách
                </button> -->
            </div>
            <button id="btnsubmit" type="submit" class="btn btn-primary">Thêm mới</button>
        </form>
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
            borrow: {
                user: {
                    code: "",
                    fullname: ""
                },
                books: [
                    {
                        id: "",
                        dateBorrow: "",
                        dateDue: "",
                        dateReturn: "",
                        state: false
                    }
                ]
            },
        }
    },
    components: {
        HeaderView,
        FooterView
    },
    computed: {
        id() {
            return this.$route.params.id;
        }
    },
    async created() {
        const res = await axios.get('http://localhost:8000/admin/borrows/' + this.id + '/edit')
        this.borrow = res.data
        //    console.log(this.borrow);
    },
    methods: {
        addElement() {
            this.borrow.books.push({ id: "", dateDue: "", dateReturn: "" });
        },
        removeElement(idx) {
            this.borrow.books.splice(idx, 1);
        },
        getitem() {
            axios.get('http://localhost:8000/admin/borrows/' + this.id + '/edit')
                .then(res => {

                    this.borrow = res.data;

                })
                .catch(err => console.log(err));
        },
        updateBorrow() {
            const x = JSON.parse(localStorage.getItem('id'))[2]
            if (x !== 'Thủ thư') {
                this.$router.push('/');
            }
            axios
                // .put('http://localhost:8000/admin/borrows/'+this.id+'/edit')
                .put(`http://localhost:8000/admin/borrows/${this.id}/edit`, this.borrow)
                .then(res => {
                    this.getitem()
                    console.log(res.data);
                    if (res.status === 200) {
                        // this.$router.push('/admin/borrows/edit');
                        window.alert("Cập nhật thông tin thành công")
                    }
                    else if (res.status === 500) {
                        window.alert("Cập nhật thông tin thất bại")
                    }
                })
                .catch(err => console.error('Error updating borrow:', err))
            window.alert("Thông tin nhập đã có");
        },
    }
}


</script>

<style>
.edit-borrow {
    margin: 16px auto;
    margin-top: 100px;
}

#xoa {
    margin-top: 3px;
}

#them {
    margin-left: -14px;
}

#btnsubmit {
    margin-bottom: 20px;
}
</style>