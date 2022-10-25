const lang = 'TH'

const reportStatusController = (status: String) => {

    switch(status) {
        case('inprocess'):
            return (lang == 'TH') ? 'กำลังดำเนินการ' : 'In Process';
        break;
        case('finish'):
            return (lang == 'TH') ? 'เสร็จสิ้น' : 'Finish';
        break;
        case('cancel'):
            return (lang == 'TH') ? 'ถูกยกเลิก' : 'Cancel';
        break;

    }

}


module.exports = reportStatusController;