import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AddBookView from '../views/AddBookView.vue';
import StoredBook from '../views/StoredBook.vue';
import EditBookView from '../views/EditBookView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import UserList from '../views/UserList.vue';
import ProfileView from '../views/ProfileView.vue';
import BorrowView from '../views/BorrowView.vue';
import AddBorrowView from '../views/AddBorrowView.vue';
import EditBorrowView from '../views/EditBorrowView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/admin/books/edit',
            name: 'add-book',
            component: AddBookView,
        },
        {
            path: '/admin/books',
            name: 'stored-book',
            component: StoredBook,
        },
        {
            path: '/admin/user/edit',
            name: 'profile',
            component: ProfileView,
        },
        {
            path: '/user/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/user/register',
            name: 'register',
            component: RegisterView,
        },
        {
            path: '/admin/users',
            name: 'userlist',
            component: UserList,
        },
        {
            path: '/admin/user/:id/edit',
            name: 'edit-user',
            component: ProfileView,
        },
        {
            path: '/admin/books/:id/edit',
            name: 'edit-book',
            component: EditBookView,
        },
        {
            path: '/admin/borrows/edit',
            name: 'borrow-book',
            component: BorrowView,
        },
        // {
        //     path: '/admin/borrows',
        //     name: 'add-borrow',
        //     component: AddBorrowView,
        // },
        {
            path: '/admin/borrows/:id',
            name: 'add-borrow',
            component: AddBorrowView,
        },
        {
            path: '/admin/borrows/:id/edit',
            name: 'edit-borrow',
            component: EditBorrowView,
        },
    ],
});

export default router;
