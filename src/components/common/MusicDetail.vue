<template>
    <div class="detail-box">
        <div class="detail-header">
            <div class="detail-avater">
                <img :src="coverImgUrl" alt="">
            </div>
            <div class="detail-discribe">
                <span class="ListName">{{name}}</span>
                <span>播放量：{{playCount}}</span>
            </div>
        </div>
        <div class="detail-table">
            <el-table
                :row-style="getRowClass" 
                :cell-style="getRowClass" 
                :header-row-style="getHeaderClass" 
                :header-cell-style="getHeaderClass"
                :data="musicInfo"
                style="width: 100%">
                <el-table-column
                    type="index"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="musicIdList"
                    label="操作"
                    width="120">
                    <template v-slot='scope' >
                        <at-button type="text"><i class="iconfont icon-woxihuande"></i></at-button>
                        <at-button type="text" @click="getId(scope.row.musicIdList)"><i class="iconfont icon-erji"></i></at-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="musicNameList"
                    label="音乐标题"
                    width="285">
                </el-table-column>
                <el-table-column
                    prop="musicArtList"
                    label="歌手"
                    width="277">
                </el-table-column>
                <el-table-column
                    prop="musivAlbumList"
                    label="专辑"
                    width="270">
                </el-table-column>
                 <el-table-column
                    prop="musicDurationList"
                    label="时长"
                    width="270">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
// 引入格式化事件脚本
import {FormatDuration, formatTabel} from '../../util/dataFormat.js'
import {_playlistDetail, _getMusicDetail} from '../../api/discover'
export default {
    beforeCreate(){
        sessionStorage.setItem('RecommendId',this.$router.currentRoute.params.id)
    },
    async created(){
        const {data:res} = await _playlistDetail(this.id)
        this.Count = res.playlist.playCount
        this.coverImgUrl = res.playlist.coverImgUrl 
        this.name = res.playlist.name 
        const ids= res.playlist.trackIds.map(v=>v.id)
        // 获取到的详细歌曲信息
        const {data:result}= await _getMusicDetail(...ids)
        let songs = result.songs
        // 歌曲id
        let musicIdList = songs.map(v=>v.id)
        // 歌曲名
        let musicNameList = songs.map(v=>v.name)
        // 专辑名
        let musivAlbumList = songs.map(v=>v.al.name)
        // 歌手
        let musicArtList = songs.map(v=>v.ar[0].name)
        // 时长
        let musicDurationList =  songs.map( v=>FormatDuration(v.dt))
        const result1 = formatTabel([musicIdList,musicNameList,musivAlbumList,musicArtList,musicDurationList])
        this.musicInfo = result1
    },
    name:'MusicDetail',
    data() {
        return {
            Count:'',
            coverImgUrl:'',
            name:'',
            musicInfo:[{
                musicIdList:[],
                musicNameList:[],
                musivAlbumList:[],
                musicArtList:[],
                musicDurationList:[]
            }],
        }
    },
    methods:{
        getRowClass({ row, column, rowIndex, columnIndex }) {
                return "background:#24262c;border:0;color:rgb(175, 173, 173);cursor: pointer;";
        },
        getHeaderClass({row, column, rowIndex, columnIndex}){
                return "background:#1A1C20;"
        },
        getId(id){
           this.$bus.$emit('sendId',id)
        }
    },
    computed:{
        id(){
            let id = ''
            if(sessionStorage.getItem('RecommendId')){
                id = sessionStorage.getItem('RecommendId')
                return id
            }
            return this.$router.currentRoute.params.id
        },
        playCount(){
            let num = 0
            if(this.Count>9999){
                num = this.Count/10000
                return parseInt(num)+ '万'
            }
        }
        
    },
}
</script>

<style scoped>
    .detail-box{
        padding: 10px 20px;
        width: 100%;
        height: 100%;
        overflow: scroll;
        overflow-x: hidden;
        background-color: #24262c;
    }
    ::-webkit-scrollbar {
        width: 6px;
        background-color: #ffffff;
        display: none;
    }
    .detail-header{
        width: 100%;
        height: 300px;
        display: flex;
        align-content: center;
    }
    .detail-avater img{
        width: 300px;
    }
    .detail-discribe{
        margin-top:50px;
        margin-left: 100px;
        color: darkgrey;
    }
    .detail-discribe span{
        margin-top: 50px;
        display: block;
        font-size: 25px;
        color:  #fff;
    }
    .el-table td.el-table__cell {
        border: 0 !important;
        background-color: #24262c ;
    }
    .ListName{
        font-size: 35px !important;
    }
</style>