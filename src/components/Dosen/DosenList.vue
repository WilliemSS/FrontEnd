<template>
    <div>
      <NavBarList/>
      <h1>List Dosen</h1>
      <table class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">NID</th>
            <th scope="col">Nama Lengkap</th>
            <th scope="col">Alamat</th>
            <th scope="col">No.Telp</th>
            <th scope="col">Mengajar</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in listview" :key="item.Id_list">
            <td>{{ item.NID }}</td>
            <td>{{ item.Nama_depan + ' ' + item.Nama_belakang }}</td>
            <td>{{ item.Alamat }}</td>
            <td>{{ item.No_telp }}</td>
            <td>{{ item.Nama_matkul }}</td>
            <td>
              <button @click="updateDosen(item.Id_dosen)" class="btn btn-primary">Update</button>
              &nbsp;
              <button @click="deleteDosen(item.Id_dosen)" class="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <router-link :to="{name: 'dosenAddForm'}" class="btn btn-primary">Tambah Dosen</router-link>
    </div>
  </template>
  
  <script >
      import NavBarList from '@/components/navBarList.vue';
      import axios from 'axios';
      export default{
          components:{
            NavBarList,
          },
          data(){
              return{
                  listview:[],
              };
          },
          created(){
              this.fetchData();
          },
          methods:{
              async fetchData(){
                  try{
                      const response=await axios.get('http://localhost:8000/api/dosen');
                      this.listview=response.data;
                  }catch(error){
                      console.error('Error fetching data: ',error);
                      //For handling error
                  }
              },
              async deleteDosen(Id_dosen){
                try{
                  await axios.delete(`http://localhost:8000/api/dosen/${Id_dosen}`);
                  this.fetchData();//refresh the Data after deleteion
                }catch(error){
                  console.error('Error deleting mata kuliah :',error);
                }
              },
              updateDosen(Id_dosen){
                //use vue router to navigate to DosenUpdateForm
                this.$router.push({name:'dosenUpdateForm',params:{Id_dosen}});
              }
          }
      }
  </script>
  
  