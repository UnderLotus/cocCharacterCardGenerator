const fs=require("fs"); 
const { Agent } = require("http");

function roll3d6(){
    let first = Math.floor(Math.random()*6)+1
    let second = Math.floor(Math.random()*6)+1
    let third = Math.floor(Math.random()*6)+1
    // console.log(`${first},${second},${third}`)
    return first+second+third
}

function roll2d6n6(){
    let first = Math.floor(Math.random()*6)+1
    let second = Math.floor(Math.random()*6)+1
    return first+second+6
}

let status = {
    STR:roll3d6(),
    DEX:roll3d6(),
    CON:roll3d6(),
    APP:roll3d6(),
    POW:roll3d6(),
    INT:roll2d6n6(),
    SIZ:roll2d6n6(),
    EDU:roll3d6()+6,
}

let HP = Math.ceil((status.CON+status.SIZ)/2)
let MP = status.POW
let SAN = status.POW*5
let KNOW = status.EDU*5
let LUCK = status.POW*5
let IDEA = status.INT*5
let jobPoint = status.EDU*20
let personaPoint = status.INT*10
let AGE = status.EDU+6

function db(){
    let db = status.STR+status.SIZ
    if(db<13){
        db = '-1D6'
    }else if(db<17){
        db = '-1D4'
    }else if(db<25){
        db = '0'
    }else if(db<33){
        db = '1D4'
    }else if(db<41){
        db = '1D6'
    }else if(db<57){
        db = '2D6'
    }else if(db<73){
        db = '3D6'
    }else {
        db = '4D6'
    }
    return db
}

// let finalStatus = {
//     '力量':status.STR,
//     '敏捷':status.DEX,
//     '意志':status.POW,
//     '體質':status.CON,
//     '外表':status.APP,
//     '體型':status.SIZ,
//     '智慧':status.INT,
//     '知識':KNOW,
//     '幸運':LUCK,
//     '靈感':IDEA,
//     '教育':status.EDU,
//     '傷害修正':db(),
//     'HP':HP,
//     'MP':MP,
//     'SAN':SAN,
//     '年齡':AGE,
//     '職業技能點數':jobPoint,
//     '個人技能點數':personaPoint
// }

let finalStatusString = `力量：${status.STR} 敏捷：${status.DEX} 意志：${status.POW}
體質：${status.CON} 外表：${status.APP} 智慧：${status.INT}
體型：${status.SIZ} 知識：${KNOW} 幸運：${LUCK}
靈感：${IDEA} 教育：${status.EDU} DB：${db()}
HP：${HP} MP：${MP} SAN：${SAN} 年齡：${AGE}
職業技能點數：${jobPoint} 個人技能點數：${personaPoint}`

// console.log(finalStatus)
// console.log(finalStatusString)

fs.writeFile('./output.txt', finalStatusString, function (err) {
    if (err)
        console.log(err);
    else
        console.log('Create Success');
})