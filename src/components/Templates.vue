<template>
<div>
  <TopBar :tabs="tabs" />
    <div v-if="Object.entries(templates)" class="container-templates">

    <TemplateCard 
      v-for="template in templates"
      class="card" 
      :name="template.name"
      :id="template.id"
      :description="template.description"
      :key="template.id"
    />
    </div>
    <div v-else>You don't have templates yet.</div>
    <router-link class="add" to="/request/editor">
    <img @click="createTemplate" class="add-btn" src="@/resources/svg/add.svg">
    </router-link>
</div>
</template>

<script>
import TemplateCard from './card/TemplateCard'
import TopBar from '@/components/TopBar.vue'
import {mapState} from 'vuex'

export default {
  name: 'Templates',
  components:{
    TemplateCard,
    TopBar,
  },

  beforeMount(){
    console.log('Before Mount Get Templates------>')
    this.$store.dispatch('getTemplates')
  },

  data (){
    console.log('Object.entries(templates)', this.templates)
    return {
      tabs: [
        { name: 'Templates', link: '/request/templates' },
      ],
    }
  },

  computed:{
     ...mapState({
      templates: state => Object.entries(state.rad.templates)
        .map((template) => {
          return {
            id: template[0], 
            ...template[1],
          }
        })
        .sort((a , b) => parseInt(a.creationDate) - parseInt(b.creationDate)
      )
    }),
  },
  watch: {
    templates: function(value) {
      console.log('value', value)
    }
  },
  methods: {
    createTemplate: function () {
      this.$store.commit('createTemplate')
    }
  },
}
</script>
<style lang="scss">
.container-templates{
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  margin:25px;

  .card{
    flex: 0 1 calc(30% - 1em);
    margin:20px;
  }
}
  .add{
    display: flex;
    justify-content: center;
    flex: 0 1 calc(30% - 1em);
    margin:20px;
    
    .add-btn{
      width: 50px;
      &:hover{
        cursor: pointer;
      }
    }
}

</style>
