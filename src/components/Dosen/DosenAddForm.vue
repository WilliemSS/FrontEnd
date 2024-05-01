<template>
    <form @submit.prevent="addDosen">
  <div class="form-row">
    <div class="col-md-6 mb-3">
      <label for="nid">NID:</label>
      <input type="number" class="form-control" id="nid" v-model="nid" required>
      <!-- Example invalid feedback -->
      <div class="invalid-feedback">
        Please provide a valid NID.
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
      <label for="namaMatkul">Mengajar:</label>
      <select class="form-control"  v-model="selectedNamaMatkul" required>
        <option v-for="namaMatkul in uniqueNamaMatkulList " :key="namaMatkul" :value="namaMatkul">{{ namaMatkul }}</option>
      </select>
      <!-- Example invalid feedback -->
      <div class="invalid-feedback">
        Please provide a valid Mata Kuliah.
      </div>
    </div>
  </div>
  <button type="submit" class="btn btn-primary">Add Dosen</button>&nbsp;
  <router-link :to="{ name: 'dosenList' }" class="btn btn-danger">Back</router-link>

   <!-- Success message textbox -->
  <div v-if="showSuccessMessage" class="alert alert-success" role="alert">
    Sukses menambah data dosen
  </div>

  <!-- Failure message textbox -->
  <div v-if="showFailureMessage" class="alert alert-danger" role="alert">
      Gagal menambah data dosen. Silakan coba lagi.
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
      nid: '',
      namaDepan: '',
      namaBelakang: '',
      alamat:'',
      noTelepon:'',
      selectedNamaMatkul:'',
      namaMatkulList:[],
    };
  },
  created(){
    this.fetchNamaMatkulList();
  },
  computed:{
    uniqueNamaMatkulList(){
        //Use a Set to get unique values, then convert back to an array
        return [...new Set(this.namaMatkulList)];
    }
  },
  methods: {
    async fetchNamaMatkulList(){
        try{
            const response=await axios.get('http://localhost:8000/api/matkul');
            this.namaMatkulList=response.data.map(item=>item.Nama_matkul);
        }catch(error){
            console.error('Error fetching Jurusan list:',error);
        }
    },
    async addDosen() {
      // Create an object with form data
      const formData = {
        NID: this.nid,
        Nama_depan: this.namaDepan,
        Nama_belakang:this.namaBelakang,
        Alamat: this.alamat,
        No_telp:this.noTelepon,
        Nama_matkul: this.selectedNamaMatkul
      };

      try {
        const response = await axios.post('http://localhost:8000/api/dosen', formData, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });

        if (response.status === 201) { // Check for successful creation (201 Created)
          console.log('Dosen added successfully');
          this.showSuccessMessage=true;
          // Reset the form fields after successful submission
          this.nid = '';
          this.namaDepan = '';
          this.namaBelakang='';
          this.alamat='';
          this.noTelepon = '';
          this.selectedNamaMatkul = '';
        } else {

          console.error('Failed to add Dosen with status:', response.status);

        }
      } catch (error) {
        console.error('Error adding Dosen:', error);
        this.showFailureMessage=true;
      }
    }
  }
};
</script>

<style>

</style>