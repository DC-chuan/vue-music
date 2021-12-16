export  const FormatDuration = function(value){
    let time = parseInt(value/1000)
    let m = parseInt(time / 60)
    let s = parseInt(time % 60)
    if(s<10){s = '0'+s}
    return '0'+m+':'+s
}

export const formatTabel = function demo (list) {
    return list[0].map((item,index)=>({
        musicIdList: item,
        musicNameList: list[1][index],
        musivAlbumList: list[2][index],
        musicArtList: list[3][index],
        musicDurationList :list[4][index]
    }))
}
