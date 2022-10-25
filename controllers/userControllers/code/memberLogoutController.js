import client from '../../client';
import {removeSession} from '../../storageControllers'
import { removeToken } from '../../notificationControllers';

const memberLogoutController = async (id:String,role:String) => {
 
    try {
        
        await removeToken(id,role);
        await removeSession();

    } catch (err) {
        throw err;
    }

}

module.exports = memberLogoutController;