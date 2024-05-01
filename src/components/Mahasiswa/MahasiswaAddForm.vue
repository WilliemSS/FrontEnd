<template>
    <form @submit.prevent="addMahasiswa">
  <div class="form-row">
    <div class="col-md-6 mb-3">
      <label for="nim">NIM:</label>
      <input type="number" class="form-control" id="nim" v-model="nim" required>
      <!-- Example invalid feedback -->
      <div class="invalid-feedback">
        Please provide a valid NIM.
      </div>
    </div>
    <div class="col-md-6 mb-3">
      <label for="namaDepan">Nama Depan:</label>
      <input type="text" class="form-control" id="namaDepan" v-model="namaDepan" required>
      <!-- Example invalid feedback -->
      <div class="invalid-feedback">
        Please provide a valid Nama Depan.
      </div>
    </div>
  </div>
  <div class="form-row">
    <div class="col-md-6 mb-3">
      <label for="namaBelakang">Nama Belakang:</label>
      <input type="text" class="form-control" id="namaBelakang" v-model="namaBelakang" required>
      <!-- Example invalid feedback -->
      <div class="invalid-feedback">
        Please provide a valid Nama Belakang.
      </div>
    </div>
    <div class="col-md-6 mb-3">
      <label for="alamat">Alamat:</label>
      <input type="text" class="form-control" id="alamat" v-model="alamat" required>
      <!-- Example invalid feedback -->
      <div class="invalid-feedback">
        Please provide a valid Alamat.
      </div>
    </div>
  </div>
  <div class="form-row">
    <div class="col-md-6 mb-3">
      <label for="noTelepon">No Telepon:</label>
      <input type="text" class="form-control" id="noTelepon" v-model="noTelepon" v-mask="'###-####-####'" required>
      <!-- Example invalid feedback -->
      <div class="invalid-feedback">
        Please provide a valid No Telepon.
      </div>
    </div>
    <div class="col-md-6 mb-3">
      <label for="jurusan">Jurusan:</label>
      <select class="form-control"  v-model="selectedJurusan" required>
        <option v-for="jurusan in uniqueJurusanList " :key="jurusan" :value="jurusan">{{ jurusan }}</option>
      </select>
      <!-- Example invalid feedback -->
      <div class="invalid-feedback">
        Please provide a valid Jurusan.
      </div>
    </div>
  </div>
  <button type="submit" class="btn btn-primary">Add Mahasiswa</button>&nbsp;
  <router-link :to="{ name: 'mahasiswaList' }" class="btn btn-danger">Back</router-link>

   <!-- Success message textbox -->
  <div v-if="showSuccessMessage" class="alert alert-success" role="alert">
    Sukses menambah data mahasiswa
  </div>

  <!-- Failure message textbox -->
  <div v-if="showFailureMessage" class="alert alert-danger" role="alert">
      Gagal menambah data mahasiswa. Silakan coba lagi.
    </div>
</form>
</template>

<script>
    import axios from 'axios';
    export default {
  data() {
    return {
      showSuccessMessage:false,
      showFailureMessage:false,
      nim: '',
      namaDepan: '',
      namaBelakang: '',
      alamat:'',
      noTelepon:'',
      jurusan: '',
      selectedJurusan:'',
      jurusanList:[],
    };
  },
  created(){
    this.fetchJurusanList();
  },
  computed:{
    uniqueJurusanList(){
        //Use a Set to get unique values, then convert back to an array
        return [...new Set(this.jurusanList)];
    }
  },
  methods: {
    async fetchJurusanList(){
        try{
            const response=await axios.get('http://localhost:8000/api/matkul');
            this.jurusanList=response.data.map(item=>item.Jurusan);
        }catch(error){
            console.error('Error fetching Jurusan list:',error);
        }
    },
    async addMahasiswa() {
      // Create an object with form data
      const formData = {
        NIM: this.nim,
        Nama_depan: this.namaDepan,
        Nama_belakang:this.namaBelakang,
        Alamat: this.alamat,
        No_telp:this.noTelepon,
        Jurusan: this.selectedJurusan
      };

      try {
        const response = await axios.post('http://localhost:8000/api/mahasiswa', formData, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });

        if (response.status === 201) { // Check for successful creation (201 Created)
          console.log('Mahasiswa added successfully');
          this.showSuccessMessage=true;
          // Reset the form fields after successful submission
          this.nim = '';
          this.namaDepan = '';
          this.namaBelakang='';
          this.alamat='';
          this.noTelepon = '';
          this.selectedJurusan = '';
        } else {

          console.error('Failed to add Mahasiswa with status:', response.status);

        }
      } catch (error) {
        console.error('Error adding Mahasiswa:', error);
        this.showFailureMessage=true;
      }
    }
  }
};
</script>

<style>

</style>