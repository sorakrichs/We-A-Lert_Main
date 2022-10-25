




const dateController = {}
const lang = 'TH'

dateController.getDay = (stringDate: String) => {

    let date = new Date(stringDate);
    const day = (lang == 'TH') ? ["วันอาทิตย์","วันจันทร์","วันอังคาร","วันพุธ","วันพฤหัสบดี","วันศุกร์","วันเสาร์"] 
        : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const month = (lang == 'TH') ? ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"]
        : ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const year = (lang == 'TH') ? date.getFullYear() + 543 : date.getFullYear();

    return (lang == 'TH') ? `${day[date.getDay()]}ที่ ${date.getUTCDate()} ${month[date.getMonth()]} พ.ศ. ${year}` 
        : `${day[date.getDay()]}, ${date.getUTCDate()} ${month[date.getMonth()]} ${year}`
}

dateController.getTime = (stringDate: String) => {

    let date = new Date(stringDate);
    const hour = (date.getHours() < 10) 

    return `${(date.getHours() < 10) ? '0' : ''}${date.getHours()}:${(date.getMinutes() < 10) ? '0' : ''}${date.getMinutes()}:${(date.getSeconds() < 10) ? '0' : ''}${date.getSeconds()}`



}

module.exports = dateController;