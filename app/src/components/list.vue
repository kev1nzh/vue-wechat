<template>
  <div class="list">
    <el-tabs v-model="activeName"   type="card" stretch='stretch'>
    <el-tab-pane label="私聊" name="first">
      <el-input style="width: 95%;" v-model="search_private_value" size="mini"></el-input>
      <div v-for="(item, index) in private_chat" 
           :key ="index"
           :class="item.isActive ? 'list_private_box_active' : 'list_private_box'"
           @click="getContentPrivate(item)"
      > 
        <div class="list_private_wechatName">{{item.wechatName}}</div>
        <div class="list_private_wechatId">{{item.wechatId}}</div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="群聊" name="second">
      <el-input style="width: 95%;" v-model="search_group_value" size="mini"></el-input>
      <div v-for="(item, index) in group_chat" 
           :key ="index"
           :class="item.isActive ? 'list_group_box_active' : 'list_group_box'"
           @click="getContentGroup(item)"
      > 
        <div>{{item.roomName.length ? item.roomName : item.roomId}}</div>
      </div>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import { getUserList } from "../lib/url";
export default {
  name: "list",
  data() {
    return {
      activeName: "first",
      stretch: true,
      private_chat: [],
      group_chat: [],

      back_private_chat: [],
      back_group_chat: [],

      search_private_value: "",
      search_group_value: ""
    };
  },
  watch: {
    item(v) {
      this.axios.get(getUserList + v.id).then(e => {
        if (e.data.code === 200) {
          for (let i of e.data.data[0]) {
            i.isActive = false;
          }
          for (let i of e.data.data[1]) {
            i.isActive = false;
          }
          this.private_chat = e.data.data[0];
          this.back_private_chat = e.data.data[0];
          this.group_chat = e.data.data[1];
          this.back_group_chat = e.data.data[1];
          console.log(e.data);
        }
      });
    },
    search_private_value(v) {
      if (v == "") {
        this.private_chat = [];
        for (let i = 0; i < this.back_private_chat.length; i++) {
          this.private_chat[i] = this.back_private_chat[i];
        }
      } else {
        this.private_chat = [];
        for (let i of this.back_private_chat) {
          if (i.wechatName.indexOf(v) != -1) {
            this.private_chat.push(i);
          }
        }
      }
    },
    search_group_value(v) {
      if (v == "") {
        this.group_chat = [];
        for (let i = 0; i < this.back_group_chat.length; i++) {
          this.group_chat[i] = this.back_group_chat[i];
        }
      } else {
        this.group = [];
        for (let i of this.group_chat) {
          if (i.wechatName.indexOf(v) != -1) {
            this.group_chat.push(i);
          }
        }
      }
    }
  },
  methods: {
    getContentPrivate(item) {
      for (let i of this.private_chat) {
        i.isActive = false;
      }
      item.isActive = true;
      this.$emit('getTalk', item)
    },
    getContentGroup(item) {
      for (let i of this.group_chat) {
        i.isActive = false;
      }
      item.isActive = true;
      this.$emit('getTalk', item)
    }
  },
  props: {
    item: Object
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$back: #e6e6e6;
$text: #2c2c2c;
$online: #67cea6;
$offline: #ccc;
.list {
  width: 20%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 15%;
  margin-left: 5px;
  border-right: 5px solid rgba(0, 0, 0, 0.1);
  .list_private_box {
    background: $back;
    color: $text;
    margin: 10px;
    border-radius: 4px;
    border: 1px solid $back;
    cursor: pointer;
  }
  .list_private_box_active {
    background: rgb(164, 186, 211);
    color: $text;
    margin: 10px;
    border-radius: 4px;
    border: 1px solid $back;
    cursor: pointer;
  }
  .list_group_box {
    background: $back;
    color: $text;
    margin: 10px;
    border-radius: 4px;
    border: 1px solid $back;
    cursor: pointer;
  }
  .list_group_box_active {
    background: rgb(164, 186, 211);
    color: $text;
    margin: 10px;
    border-radius: 4px;
    border: 1px solid $back;
    cursor: pointer;
  }
}
</style>
