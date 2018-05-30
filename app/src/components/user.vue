<template>
  <div class="user">
      
    
    <ul>

        <div class="search_button">
                <el-select v-model="search_value" filterable placeholder="请选择" size="mini" style="width: 50%;">
                    <el-option                    
                        v-for="(item, index) in user_items"
                        :key="index"
                        :label="item.username"
                        :value="item.wechatId">
                    </el-option>
                </el-select>
                <el-button type="default" size="mini">搜索</el-button>
                <el-button type="danger" size="mini">清空</el-button>
        </div>
        <li v-for="(item, index) in user_items" :keys="index" class="user_box">
            <div class="user_box_username">
                {{item.username}}
            </div>
            <div class="user_box_wechatId">
                {{item.wechatId}}
            </div>
        </li>
    </ul>
  </div>
</template>

<script>
import { getUserUrl } from "../lib/url";
export default {
  name: "user",
  data() {
    return {
      search_value: "",
      user_items: [
        {
          username: "aaa",
          wechatId: "asdsads"
        },
        {
          username: "aaa",
          wechatId: "asdsads"
        },
        {
          username: "aaa",
          wechatId: "asdsads"
        },
        {
          username: "aaa",
          wechatId: "asdsads"
        },
        {
          username: "aaa",
          wechatId: "asdsads"
        },
        {
          username: "aaa",
          wechatId: "asdsads"
        },
        {
          username: "aaa",
          wechatId: "asdsads"
        },

        {
          username: "aaa",
          wechatId: "asdsads"
        },
        {
          username: "aaa",
          wechatId: "asdsads"
        },
        {
          username: "aaa",
          wechatId: "asdsads"
        },
        {
          username: "aaa",
          wechatId: "asdsads"
        },
        {
          username: "aaa",
          wechatId: "asdsads"
        },
        {
          username: "aaa",
          wechatId: "asdsads"
        },
        {
          username: "aaa",
          wechatId: "asdsads"
        },
        {
          username: "aaa",
          wechatId: "asdsads"
        },

        {
          username: "aaa",
          wechatId: "asdsads"
        }
      ]
    };
  },
  created() {
    //   this.getUser()
  },
  methods: {
    getUser() {
      this.axios.get(getUserUrl).then(e => {
        const { code, data } = e.data;
        if (code === 200) {
          this.user_items = data;
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
.user {
  width: 22%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  ul {
    margin: 0 10px;
    padding: 0;
    width: 90%;
    height: 100%;
    overflow: auto;

  }
  .user_box {
    list-style: none;
    background: $back;
    color: $text;
    margin: 10px 0;
  }
  .search_button {
    margin-top: 10px;
    text-align: center;
  }
}
</style>
