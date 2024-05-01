import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from './components/LoginForm.vue';

import MatkulList from './components/MataKuliah/MatkulList.vue';
import MatkulForm from './components/MataKuliah/MatkulAddForm.vue';
import MatkulUpdateForm from './components/MataKuliah/MatkulUpdateForm.vue'

import MahasiswaList from './components/Mahasiswa/MahasiswaList.vue';
import MahasiswaAddForm from './components/Mahasiswa/MahasiswaAddForm.vue';
import MahasiswaUpdateForm from './components/Mahasiswa/MahasiswaUpdateForm.vue';

import DosenList from './components/Dosen/DosenList.vue';
import DosenAddForm from './components/Dosen/DosenAddForm.vue';
import DosenUpdateForm from './components/Dosen/DosenUpdateForm';

import DaftarPengajarList from './components/DaftarPengajar/DaftarPengajarList.vue';
import DaftarPengajarAddForm from './components/DaftarPengajar/DaftarPengajarAddForm.vue';
import DaftarPengajarUpdateForm from './components/DaftarPengajar/DaftarPengajarUpdateForm.vue';


const routes=[
    //Router for LoginForm and as base page
    {
        path:'/',
        name:'LoginForm',
        component:LoginForm
    },
    //Router for Mata Kuliah Pages
    {
        path:'/matkul-list',
        name:'matkulList',
        component:MatkulList
    },
    {
        path:'/matkul-add-form',
        name:'matkulAddForm',
        component:MatkulForm
    },
    {
        path:'/matkul-update-form/:Id_matkul',
        name:'matkulUpdateForm',
        component:MatkulUpdateForm
    },
    //Router for Mahasiswa pages
    {
        path:'/mahasiswa-list',
        name:'mahasiswaList',
        component:MahasiswaList
    },
    {
        path:'/mahasiswa-add-form',
        name:'mahasiswaAddForm',
        component:MahasiswaAddForm
    },
    {
        path:'/mahasiswa-update-form/:Id_mahasiswa',
        name:'mahasiswaUpdateForm',
        component:MahasiswaUpdateForm
    },

    //Router for Dosen pages
    {
        path:'/dosen-list',
        name:'dosenList',
        component:DosenList
    },
    {
        path:'/dosen-add-form',
        name:'dosenAddForm',
        component:DosenAddForm
    },
    {
        path:'/dosen-update-form/:Id_dosen',
        name:'dosenUpdateForm',
        component:DosenUpdateForm
    },

     //Router for Dosen pages
     {
        path:'/daftar-pengajar-list',
        name:'daftarPengajarList',
        component:DaftarPengajarList
    },
    {
        path:'/daftar-pengajar-add-form',
        name:'daftarPengajarAddForm',
        component:DaftarPengajarAddForm
    },
    {
        path:'/daftar-pengajar-update-form/:Id_pengajar',
        name:'daftarPengajarUpdateForm',
        component:DaftarPengajarUpdateForm
    }


];

const router=createRouter({
    history: createWebHistory(),
    routes
});

export default router;