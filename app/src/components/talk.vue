<template>
  <div class="talk" >
    <el-tabs v-model="activeName"   type="card"  stretch='stretch' style="height:100%;">
    <el-tab-pane label="聊天" name="first" style="height:100%;" >
      <ul class="talk_ul">
        <li v-for="(item,index) in talkItem"
            :key = "index"
        >
          <div class="talk_time">{{new Date(item.timestamp).toLocaleString()}}</div>
          <div :class=" item.owner === 1 ? 'talk_box_right' : 'talk_box_left'">
            <div class="talk_content_author">{{ item.owner === 1 ? item.wechatName : item.anotherWechatName}}：</div>
          <div class="talk_content">
            <div v-if="item.type === 2" class="talk_img" @click="getImg(item)">
              <img  :src="item.url" style="width:100%; height:100%;" />
            </div>
            <p class="talk_content_text" v-else>{{item.content}}</p>
          </div>
          </div>  
        </li>
      </ul>
    </el-tab-pane>
  </el-tabs>
  
  <el-dialog
      title="图片"
      :visible.sync="dialogVisible"
      :before-close="beforeClose">
        <img  :src="mainImgUrl" style="width:100%; height: 100%;" />
    </el-dialog>

  </div>
</template>

<script>
import { getUserTalk } from "../lib/url";
export default {
  name: "talk",
  data() {
    return {
      activeName: "first",
      stretch: true,
      talkItem: [],
      mainImgUrl: "",
      dialogVisible: false
    };
  },
  watch: {
    item(v) {
      this.axios
        .post(getUserTalk, {
          roomId: this.item.roomId,
          wechatId: this.user.wechatId,
          anotherWechatId: this.item.wechatId
        })
        .then(e => {
          if (e.data.code === 200) {
            this.talkItem = e.data.data;
          }
        });
    }
  },
  methods: {
    getImg(item) {
      this.mainImgUrl = item.url;
      this.dialogVisible = true;
    },
    beforeClose() {
      this.dialogVisible = false;
    }
  },
  props: {
    item: Object,
    user: Object
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$back: #e6e6e6;
$text: #2c2c2c;
$online: #67cea6;
$offline: #ccc;
li {
  list-style: none;
  width: 100%;
  min-height: 120px;
  margin: 10px 0;
  overflow: hidden;
}
.el-tabs__content {
  height: 100%;
}
#pane-first {
  height: 100%;
}

.talk_ul {
  overflow: auto;
  height: 100%;
}
.talk div {
  height: 100%;
}
.talk {
  width: 64%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 35%;
  margin-left: 10px;
  .talk_content {
    margin-top: 10px;
  }
  .talk_img {
    width: 100px;
    height: 100px;
  }
  .talk_time {
    font-size: 13px;
    border: 1px solid #ccc;
    background: rgba(204, 204, 204, 0.2);
    width: 20%;
    margin: 0 auto;
    border-radius: 5px;
  }
  .talk_content_author {
    color: $text;
    text-align: left;
  }

  .talk_box_left {
    min-width: 10%;
    max-width: 50%;
    position: relative;
    left: 20px;
    background: #c0c4cc;
    float: left;
    border: 1px solid #ccc;
    border-radius: 10px;
    margin-top: 10px;
    padding: 5px;
  }
  .talk_box_right {
    min-width: 10%;
    max-width: 50%;
    background: #67cea6;
    position: relative;
    right: 20px;
    float: right;
    border: 1px solid #ccc;
    border-radius: 10px;
    margin-top: 10px;
    padding: 10px;
  }
}
</style>
