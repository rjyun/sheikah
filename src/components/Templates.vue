<template>

<div>
  <TopBar :tabs="tabs" />
  <div class="container-templates">
    <TemplateCard class="card" v-for="template in templates" :key="template.content">
      <template v-slot:title>
        {{template.header}}
      </template>
      <template v-slot:description>
        {{template.content}}
      </template>
    </TemplateCard>
    <router-link class="add" to="/request/editor">
    <img @click="setCurrentTemplate" class="add-btn" src="@/resources/svg/add.svg">
    </router-link>
  </div>
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

  data (){
    return {
      tabs: [
        { name: 'Templates', link: '/request/templates' },
      ],
    }
  },

  computed:{
     ...mapState({
      templates: state => state.rad.templates,
    }),
  },

  methods: {
    setCurrentTemplate: function () {
      this.$store.commit('setCurrentTemplate')
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
}

</style>
