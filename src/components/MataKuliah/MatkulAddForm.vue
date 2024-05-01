<template>
    <form @submit.prevent="addMatkul">
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
  <button type="submit" class="btn btn-primary">Add Matkul</button>&nbsp;
  <router-link :to="{ name: 'matkulList' }" class="btn btn-danger">Back</router-link>

   <!-- Success message textbox -->
  <div v-if="showSuccessMessage" class="alert alert-success" role="alert">
    Sukses menambah mata kuliah
  </div>

  <!-- Failure message textbox -->
  <div v-if="showFailureMessage" class="alert alert-danger" role="alert">
      Gagal menambah mata kuliah. Silakan coba lagi.
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
  methods: {
    async addMatkul() {
      // Create an object with form data
      const formData = {
        Kd_matkul: this.kodeMatkul,
        Nama_matkul: this.namaMatkul,
        SKS: this.sks,
        Jurusan: this.jurusan
      };

      try {
        const response = await axios.post('http://localhost:8000/api/matkul', formData, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });

        if (response.status === 201) { // Check for successful creation (201 Created)
          console.log('Matkul added successfully');
          this.showSuccessMessage=true;
          // Reset the form fields after successful submission
          this.kodeMatkul = '';
          this.namaMatkul = '';
          this.sks = '';
          this.jurusan = '';
        } else {

          console.error('Failed to add Matkul with status:', response.status);

        }
      } catch (error) {
        console.error('Error adding Matkul:', error);
        this.showFailureMessage=true;
      }
    }
  }
};
</script>

<style>

</style>