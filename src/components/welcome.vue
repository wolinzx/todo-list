<template>
    <div class="body">
         <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="16">
            </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="4" align="center">
                <div class="grid-content bg-purple">
                    <p>{{title}}</p>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-input v-model="newItem" @keyup.native.enter="addItem" placeholder="请输入内容"></el-input>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="16" type="flex" justify="center">
            <el-col :span="4">
                <!-- 没有实际作用，还在开发中.... -->
                <div>
                    <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose">
                    <el-submenu index="1">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>导航一</span>
                        </template>
                        <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                        <el-menu-item index="1-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="1-4-1">选项1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航二</span>
                    </el-menu-item>
                    <el-menu-item index="3" disabled>
                        <i class="el-icon-document"></i>
                        <span slot="title">导航三</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>
                    </el-menu>
                </div>
            </el-col>
            <el-col :span="12">
                <div>
                    <el-collapse v-model="activeNames">
                        <el-collapse-item title="未完成事件" name="1">
                            <el-table :data="items" stripe style="width: 100%" max-height="500" align="center">
                                <el-table-column fixed="left" label="#" type="index" :index="indexMethod"></el-table-column>
                                <el-table-column prop="label" label="标签" ></el-table-column>  
                                <el-table-column prop="date" fixed="right" label="编辑时间" width="150" header-align="center"></el-table-column>                     
                                <el-table-column fixed="right" label="操作" width="115" header-align="center">
                                    <template slot-scope="scope">
                                        <!-- <el-button @click="editItem(scope.$index,scope.row)" type="text" size="small">编辑</el-button> -->
                                        <el-button @click="finishItem(scope.$index,scope.row)" size="mini" type="success" icon="el-icon-check" circle></el-button>                                
                                        <el-button  @click="deleteItem(scope.$index)" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
                                    </template>
                                </el-table-column>
                            </el-table> 
                        </el-collapse-item>
                        <el-collapse-item title="已完成事件" name="2">
                            <el-table :data="finishItems" stripe style="width: 100%" max-height="500" align="center">
                                <el-table-column fixed="left" label="#" type="index" :index="indexMethod"></el-table-column>
                                <el-table-column prop="label" label="标签" ></el-table-column>  
                                <el-table-column prop="date" fixed="right" label="编辑时间" width="150" header-align="center"></el-table-column>                     
                                <el-table-column fixed="right" label="操作" width="115" header-align="center">
                                    <template slot-scope="scope">
                                        <!-- <el-button @click="editItem(scope.$index,scope.row)" type="text" size="small">编辑</el-button> -->
                                        <el-button @click="finishItem(scope.$index,scope.row)" size="mini" type="success" icon="el-icon-edit" circle></el-button>                                
                                        <el-button  @click="deleteItem(scope.$index)" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </el-col>                
        </el-row>
    </div>
</template>

<script>
// ES6语法

//导入store.js
import Store from "../store.js";
//日期格式化工具
import Formatdate from "../date.js";

export default {
  name: "welcome",
  data() {
    return {
      title: "TODO List",
      items: Store.fetch('unfinish'), // localStorage读取未完成事件数据
      finishItems: Store.fetch('finish'),
      newItem: "",
      editlabel: null,
      indexMethod: 0,
      activeNames: ['1']
    };
  },
  methods: {
    //   暂时放弃这想法吧，后面再想怎么优化
    togalFinish: function(item) {
      item.isFinished = !item.isFinished;
    },
    addItem: function() {
      console.log();
      // 插入对象数据到items
      this.items.push({
        label: this.editlabel || this.newItem,
        // isFinished: false, // 因为要使用两个json，所以根据这个值判断是否完成已经没有必要啦
        date: Formatdate(new Date(), "yyyy-MM-dd hh:mm"), // 日期格式转换，需要导入date.js
      });
      this.newItem = "";
    },
    //暂时加两个来处理，虽然代码冗余了，但是后面学习模块化的时候再优化吧
    addFinishItem: function(row) {
      // 插入对象数据到items
      this.finishItems.push({
        label: row.label,
        // isFinished: false, // 因为要使用两个json，所以根据这个值判断是否完成已经没有必要啦
        date: Formatdate(new Date(), "yyyy-MM-dd hh:mm"), // 日期格式转换，需要导入date.js
      });
      this.newItem = "";
    },
    deleteItem: function(objeckt,index) {
      this.items.splice(index, 1); // 删除items里第index对象
    },
    editItem: function(index, row) {
      let editword = prompt("请输入新标签：");
      if (editword != null) {
        //删除此条记录
        this.deleteItem(index);
        this.editlabel = editword;
        //添加新纪录
        this.addItem();
        this.editlabel = null;
      }
    },
    finishItem: function(index,row){
        //删除已完成记录
        this.deleteItem(index);
        //加入完成清单
        this.addFinishItem(row);
    },

    handleOpen(key, keyPath) {
        console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
        console.log(key, keyPath);
    }
  },
  // 监听items改动，如有改动则执行handler
  watch: {
    items: {
      handler: function(items) {
        Store.save('unfinish',items); // localStorage写入json数据
      },
      deep: true // 深度监听，true为监听items里的每一个键值改动
    },
    finishItems: {
      handler: function(finishItems) {
        Store.save('finish',finishItems); // localStorage写入json数据
      },
      deep: true // 深度监听，true为监听finishItems里的每一个键值改动
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.body p {
  font-size: 30px;
  font-weight: bold;
}
.finished {
  color: red;
}

/*
element css
*/
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>


