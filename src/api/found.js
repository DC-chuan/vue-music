import axios from "axios";
import './http'

export const FoundMusic = ()=>{
    return axios({
        method:'get',
        url:'homepage/block/page'
    })
}