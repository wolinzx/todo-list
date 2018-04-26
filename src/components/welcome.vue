<template>
    <div class="body">
        <!-- {{  }}相当于 v-text 数据绑定 -->
        <p>{{title}}</p>
        <!-- v-model双向绑定，与newItem进行绑定，input的value值会与newItem互相影响 -->
        <!-- @keyup为键盘输入事件，.enter为输入enter后触发 -->
        <input type="text" v-model="newItem" @keyup.enter="addItem">
        <ul>
            <!-- v-for 循环遍历数据 -->
            <!-- :class为v-bind:class缩写 具体用法看文档 -->
            <li v-for="(item,index) in items" :class="{finished: item.isFinished}" @click="togalFinish(item)" >
                <input type="checkbox" name="delete" id="" value="删除">
                {{item.lable}}
                <button @click="deleteItem(index)">删除</button>
            </li>
        </ul>
    </div>
</template>

<script>
// ES6语法
import Store from '../store.js';

export default {
  name: 'welcome',
  data(){
      return {
          title: 'This is a to do list',
          items: Store.fetch(), // localStorage读取json数据
          newItem: ''
      }
  },
  methods: {
      togalFinish: function(item){
          item.isFinished = !item.isFinished;
      },
      addItem: function(){
          // 插入对象数据到items
          this.items.push({
                lable: this.newItem,
                isFinished: false,
          });
          this.newItem = '';
      },
      deleteItem: function(index){
          this.items.splice(index,1); // 删除items里第index对象
      }
  },
  // 监听items改动，如有改动则执行handler
  watch: {
       items:  {
            handler: function (items) {
                Store.save(items); // localStorage写入json数据
             },
            deep: true // 深度监听，true为监听items里的每一个键值改动
    },
  }
}
</script>

<style scoped>
.body p{
    font-size: 40px;
    font-weight: bold;
}
.finished{
    color: red;
}
</style>


