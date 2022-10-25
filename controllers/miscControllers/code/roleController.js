const roleController = {}
const lang = 'TH'

roleController.getRole = (role: String) => {

    switch(role){

        case('leader'):
            return (lang == 'TH') ? 'หัวหน้า' : 'Leader';  
        break;
        case('deputy'):
            return (lang == 'TH') ? 'รองหัวหน้า' : 'Deputy';  
        break;
        case('staff'):
            return (lang == 'TH') ? 'เจ้าหน้าที่' : 'Staff';  
        break;

    }
  
}


module.exports = roleController;