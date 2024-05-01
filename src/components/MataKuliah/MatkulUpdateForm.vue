<template>
    <form @submit.prevent="updateMatkul">
  <div class="form-row">
    <div class="col-md-6 mb-3">
      <label for="kodeMatkul">Kode Mata Kuliah:</label>
      <input type="text" class="form-control" id="kodeMatkul" v-model="kodeMatkul" required>
      <!-- Example invalid feedback -->
      <div class="invalid-feedback">
        Please provide a valid Kode Mata Kuliah.
      </div>
    </div>
    <div class="col-md-6 mb-3">
      <label for="namaMatkul">Nama Mata Kuliah:</label>
      <input type="text" class="form-control" id="namaMatkul" v-model="namaMatkul" required>
      <!-- Example invalid feedback -->
      <div class="invalid-feedback">
        Please provide a valid Nama Mata Kuliah.
      </div>
    </div>
  </div>
  <div class="form-row">
    <div class="col-md-6 mb-3">
      <label for="sks">SKS:</label>
      <input type="number" class="form-control" id="sks" v-model="sks" required>
      <!-- Example invalid feedback -->
      <div class="invalid-feedback">
        Please provide a valid SKS.
      </div>
    </div>
    <div class="col-md-6 mb-3">
      <label for="jurusan">Jurusan:</label>
      <input type="text" class="form-control" id="jurusan" v-model="jurusan" required>
      <!-- Example invalid feedback -->
      <div class="invalid-feedback">
        Please provide a valid Jurusan.
      </div>
    </div>
  </div>
  <button @click="updateMatkul" type="submit" class="btn btn-primary">Update </button>&nbsp;
  <router-link :to="{ name: 'matkulList' }" class="btn btn-danger">Back</router-link>

   <!-- Success message textbox -->
  <div v-if="showSuccessMessage" class="alert alert-success" role="alert">
    Sukses update mata kuliah
  </div>

  <!-- Failure message textbox -->
  <div v-if="showFailureMessage" class="alert alert-danger" role="alert">
    Gagal update mata kuliah. Silakan coba lagi.
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
      kodeMatkul: '',
      namaMatkul: '',
      sks: '',
      jurusan: ''
    };
  },
  created(){
    this.fetchMatkulDetails();
  },
  methods: {
    async fetchMatkulDetails(){
        const Id_matkul=this.$route.params.Id_matkul;
        try{
            const response = await axios.get(`http://localhost:8000/api/matkul/${Id_matkul}`);
            //Assign the fetched mata kuliah data to component data fields
            this.kodeMatkul=response.data.Kd_matkul;
            this.namaMatkul=response.data.Nama_matkul;
            this.sks=response.data.SKS;
            this.jurusan=response.data.Jurusan;
        }catch(error){
            console.error('Error fetching mata kuliah details',error);
        }
    },
    async updateMatkul() {
      // Create an object with the updated mata kuliah data
      const updatedMatkulData = {
        Kd_matkul: this.kodeMatkul,
        Nama_matkul: this.namaMatkul,
        SKS: this.sks,
        Jurusan: this.jurusan
      };

      try {
        const Id_matkul=this.$route.params.Id_matkul;
        const response = await axios.put(`http://localhost:8000/api/matkul/${Id_matkul}`, updatedMatkulData);

        if (response.status === 200) { // Check if updated was successful 
          console.log('Mata kuliah updated successfully');
          this.showSuccessMessage=true;
          // Reset the form fields after successful submission
        } else {
            console.error('Failed to update mata kuliah with status:', response.status);
            this.showFailureMessage=true;
        }
      } catch (error) {
        console.error('Error updating Matkul:', error);
        this.showFailureMessage=true;
      }
    }
  }
};
</script>

<style>

</style>