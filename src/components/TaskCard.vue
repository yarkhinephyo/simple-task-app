<template>
  <b-card class="my-2">
    
    <b-container fluid>
      <b-row>

        <!-- Task Details -->
        <b-col sm="9">
          {{ taskData }}
        </b-col>

        <b-col sm="3">

          <!-- User Options -->
          <b-container fluid>
            <b-row>
              <b-col>
                <a href="#"><b-icon-pencil-fill variant="primary"></b-icon-pencil-fill></a>
              </b-col>
              <b-col>
                <a href="#"><b-icon-check2 variant="success"></b-icon-check2></a>
              </b-col>
              <b-col>
                <a href="#"><b-icon-trash-fill variant="danger"></b-icon-trash-fill></a>
              </b-col>
            </b-row>
          </b-container>

        </b-col>
      </b-row>
    </b-container>

  </b-card>
</template>

<script>
export default {
  name: "TaskCard",
  props: [
    'taskData'
  ]
}
</script>

<style>

</style>