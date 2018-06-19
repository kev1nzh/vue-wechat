<template>
  <div class="user">
     <el-tabs v-model="activeName"   type="card" stretch='stretch'>
    <el-tab-pane label="定制师" name="first">
         <ul>
        <div class="search_button">
          <el-input style="width: 95%;" v-model="search_value" size="mini"></el-input>
        </div>
        <li v-for="(item, index) in user_items"  
            :key="index" 
            :class="item.isActive ? 'user_box_active' : 'user_box'"
            @click="getContent(item)"
            v-show="user_items.length"
            >
          <div class="user_box_nickName user_box_children">{{item.nickname}}</div>  
          <div class="user_box_wechatName user_box_children">{{item.wechatName}}</div>
          
          <span :class="item.status == '离线' ? 'el-icon-error userLoginIcon' : 'el-icon-success userLoginIcon'"></span>
        </li>
        <p v-show="!user_items.length" class="isNone"> 暂无用户</p>
    </ul>
    </el-tab-pane>
     </el-tabs>
   
  </div>
</template>

<script>
import { getUserUrl, getUserList } from "../lib/url";
export default {
  name: "user",
  data() {
    return {
      search_value: "",
      user_items: [],
      back_items: [],
      activeName: 'first',
    };
  },
  watch: {
    search_value(v) {
      if (v == "") {
        this.user_items = [];
        for (let i = 0; i < this.back_items.length; i++) {
          this.user_items[i] = this.back_items[i];
        }
      } else {
        this.user_items = [];
        for (let i of this.back_items) {
          if (i.nickname.indexOf(v) != -1) {
            this.user_items.push(i);
          }
        }
      }
    }
  },
  created() {
    this.getUser();
  },
  methods: {
    getContent(item) {
      for (let i of this.user_items) {
        i.isActive = false;
      }
      item.isActive = true;
      this.$emit("getList", item);
    },
    getUser() {
      this.axios.get(getUserUrl).then(e => {
        const { code, data } = e.data;
        if (code === 200) {
          for (let i of data) {
            i.isActive = false;
          }
          this.user_items = data;
          this.back_items = data;
        } else {
          alert(data);
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$back: #e6e6e6;
$text: #2c2c2c;
$online: #67cea6;
$offline: #ccc;
.user {
  width: 15%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-right: 5px solid rgba(0, 0, 0, 0.1);
  ul {
    margin: 0 10px;
    padding: 0;
    height: 100%;
    overflow: auto;
  }
  .user_box_children {
    text-align: left;
    margin: 0 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .userLoginIcon{
    float:right;
    position: relative;
    bottom:27px;
    right:5px;
  }
  .user_box_nickName {
    font-size: 16px;
  }
  .user_box_wechatName {
    font-size: 13px;
    color: #494848;
  }
  .user_box {
    background: $back;
    color: $text;
    margin: 10px 0;
    border-radius: 10px;
    border: 1px solid $back;
    cursor: pointer;
  }
  .user_box_active {
    background: rgb(164, 186, 211);
    color: $text;
    margin: 10px 0;
    border-radius: 10px;
    border: 1px solid $back;
    cursor: pointer;
  }
  .search_button {
    margin-top: 10px;
    text-align: center;
  }
}
</style>
