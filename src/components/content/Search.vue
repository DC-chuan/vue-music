<template>
  <div class="search-box">
    <div class="search-input">
      <at-input placeholder="请输入内容" append-button v-model="keyWords" @input="antiShake" @keyup.enter="antiShake"
        @focus="getSearchHot" @blur="closeHistory">
        <template slot="append">
          <i class="icon icon-search" @click="searchKeywords"></i>
        </template>
      </at-input>
    </div>
    <div class="search-detail" v-show="isFocus" @mouseenter="isHover = true" @mouseleave="isHover = false">
      <div class="detail-header">
        <span>搜索历史</span>
        <i class="iconfont icon-shanchu" @click="deleteAllHistory"></i>
      </div>
      <div class="search-history">
        <div v-for="item in searchHistory" :key="item">
          <span @click="selectHistory(item)"> {{item}}</span>
          <i class="iconfont icon-shanchu" @click="deleteHistoryItem(item)" style="margin-left:4px;"></i>
        </div>
      </div>
      <div class="hot-list">
        <div class="hot-header">
          <span>热搜榜</span>
        </div>
        <div class="hot-item" v-for="(item,index) in hotList" :key="item.score" @click="chooseKeyword(item.searchWord)">
          <div class="hot-index">
            {{index +1}}
          </div>
          <div class="hot-item-detail">
            <div class="hot-name">
              {{item.searchWord}}
            </div>
            <div class="hot-detail">
              {{item.content}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { _searchHot } from '../../api/found'
export default {
  data () {
    return {
      keyWords: '',
      timer: null,
      isFocus: false,
      hotList: [],
      isHover: false,//判断鼠标是否进入搜索历史盒子的变量
    }
  },
  watch: {
    keyWords (newV, oldV) {
      if (newV) {
        this.searchKeywords()
      }
    }
  },
  computed: {
    ...mapGetters({ searchHistory: 'getSearchList' })
  },
  methods: {
    antiShake () {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.searchKeywords(this.keyWords)
      }, 700)
    },
    ValidataInput (value) {
      if (value.length) return true
      return false
    },
    async searchKeywords () {
      if (!this.ValidataInput(this.keyWords)) return

      this.$store.commit('SaveSearchHistory', this.keyWords)
      this.$router.push({
        name: '/searchdetail',
        query: { keyWords: this.keyWords }
      })
    },
    async getSearchHot () {
      const { data: res } = await _searchHot()
      this.hotList = res.data
      this.isFocus = true
    },
    selectHistory (item) {
      this.keyWords = item;
      this.isFocus = false;
    },
    closeDetail () {
      this.isFocus = false;
    },
    // 点击榜单拿到排行榜关键词
    chooseKeyword (keyWords) {
      this.keyWords = keyWords
      this.searchKeywords(keyWords)
      this.isFocus = false;
    },
    // 点击删除按钮，删除当前的一项历史记录
    deleteHistoryItem (item) {
      this.$store.commit('deleteHistoryItem', item)
    },
    // 删除全部历史
    deleteAllHistory () {
      if (this.searchHistory.length == 0) return this.$Message.info('历史记录为空')
      this.$confirm('确认删除全部历史记录?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消', type: 'warning'
      })
        .then(() => {
          this.$store.commit('deleteAllHistory')
          this.$Message.success('删除成功')
        }).catch(() => {
          this.$Message.info('已取消删除')
        });
    },
    // 输入框失去焦点，关闭搜索历史
    closeHistory () {
      if (this.isHover) return
      this.isFocus = false
    }
  }
}
</script>

<style scoped>
.search-box {
  position: relative;
}
.search-input {
  margin-top: 6px;
}
.search-detail {
  margin-top: 10px;
  padding: 0 10px;
  position: relative;
  width: 500px;
  height: 400px;
  background-color: #2d2f33;
  z-index: 899;
  overflow: scroll;
  overflow-x: hidden;
}
.search-detail::-webkit-scrollbar-track {
  background-color: #212124;
}
.search-detail::-webkit-scrollbar-thumb {
  background-color: rgb(55, 66, 66);
}
.search-detail::-webkit-scrollbar {
  width: 15px;
  background-color: rgb(20, 19, 19);
}
.search-detail::before {
  position: absolute;
  width: 0;
  height: 0;
  border-width: 10px;
  border-style: solid;
  border-color: transparent transparent #2d2f33 transparent;
  content: ' ';
  left: 13px;
  top: -20px;
}
.detail-header {
  display: flex;
  color: #828385;
}
.detail-header span {
  font-size: 15px;
}
.detail-header i {
  font-size: 20px;
  cursor: pointer;
}
.search-history {
  width: 100%;
  height: 60px;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
}
.search-history div {
  height: 25px;
  margin-top: 5px;
  font-size: 12px;
  line-height: 21px;
  border: 1px solid #ccc;
  margin-left: 8px;
  border-radius: 10px;
  cursor: pointer;
}
.hot-list {
  width: 100px;
}
.hot-list span {
  font-size: 18px;
  color: #828385;
}
.hot-item {
  width: 500px;
  display: flex;
  height: 50px;
  cursor: pointer;
}
.hot-item:hover {
  background-color: #242529;
}
.hot-index {
  width: 50px;
  text-align: center;
  line-height: 50px;
  color: #7c8192;
  font-size: 16px;
}
.hot-item-detail {
  flex-flow: column;
  height: 50px;
  width: 100%;
}
.hot-name,
.hot-detail {
  width: 300px;
  line-height: 25px;
  font-size: 12px;
}
.hot-detail {
  color: #828385;
}
</style>