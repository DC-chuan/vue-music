<template>
  <div class="search-detail">
    <div class="search-detail-top">
      <p><span style="font-size:16px;color:#ccc;">搜索{{keyName}}，找到{{data1.length}}首单曲</span></p>
    </div>
    <div class="search-detail-tab">
      <Tabs value="name1">
        <TabPane label="单曲" name="name1">
          <div class="search-detail-table">
            <Table :columns="columns1" :data="data1" stripe>
              <h1>1111</h1>
            </Table>
          </div>
        </TabPane>
        <TabPane label="歌手" name="name2">标签二的内容</TabPane>
        <TabPane label="专辑" name="name3">标签三的内容</TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
import { FormatDuration } from '../../util/dataFormat'
import { _search } from '../../api/found'
export default {
  created () {
    this.getInfo()
  },
  data () {
    return {
      keyName: '',
      keyWords: '',
      data1: [],
      columns1: [
        {
          title: '',
          type: 'index',
          width: 80
        },
        {
          title: '操作',
          width: 140,
          render: (h, { row }) => {
            return h('div', [
              h('i', {
                class: ['iconfont icon-woxihuande']
              }),
              h('i', {
                class: ['iconfont icon-xiazai'],
                style: {
                  marginLeft: '10px'
                }
              })
            ])
          }
        },
        {
          title: '单曲',
          width: 400,
          render: (h, { row, cloumn, index }) => {
            return h('div', {
              style: {
                cursor: 'pointer'
              },
              on: {
                dblclick: () => {
                  this.sendId(row.id)
                }
              }
            }, row.name)
          }
        },
        {
          title: '歌手',
          width: '300',
          render: (h, { row }) => {
            return h('div', row.artists[0].name)
          },
        },
        {
          title: '专辑',
          width: '290',
          render: (h, { row }) => {
            return h('div', row.album.name)
          },
        },
        {
          title: '时长',
          width: '100',
          render (h, { row, index, cloumn }) {
            return h('div', FormatDuration(row.duration))
          },
        },
      ],
    }
  },
  watch: {
    data1 (newV, oldV) {
      if (newV) {
        this.getInfo()
      }
    }
  },
  mounted () {
    console.log(this.$router);
  },
  methods: {
    sendId (id) {
      this.$bus.$emit('IdFromSearch', id)
    },
    rowClassName () {
      return 'row-CLassName'
    },
    async getInfo () {
      this.keyWords = this.$route.query.keyWords
      const { data: res } = await _search(this.keyWords)
      this.data1 = res.result.songs
      this.keyName = this.$router.currentRoute.params.name;
    }
  }
}
</script>

<style scoped>
.search-detail {
  overflow: scroll;
  overflow-x: hidden;
  line-height: 80px;
}

.search-detail p {
  margin-left: 28px;
}
::-webkit-scrollbar {
  width: 6px;
  background-color: #333333;
}
.search-detail-table {
  width: 100%;
  height: 500px;
  overflow: scroll;
  overflow-x: hidden;
}
.row-CLassName {
  background-color: #2db7f5;
  color: #fff;
}
</style>