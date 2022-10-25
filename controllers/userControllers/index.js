module.exports = {


    memberLogin: require('./code/memberLoginController'),
    memberLogout: require('./code/memberLogoutController'),
    memberRegister: require('./code/memberRegisterController'),
    getMemberAddress: require('./code/getMemberAddressController'),
    userLocationUpdate: require('./code/userLocationUpdateController'),
    volunteerLogin: require('./code/volunteerLoginController'),
    organizationRegister: require('./code/organizationRegisterController'),
    getUserData: require('./code/getUserDataController'),
    editUserData: require('./code/editUserDataController'),
    editUserPassword: require('./code/editUserPasswordController'),
    updateProfileImage: require('./code/updateProfileImageController'),
    updateAddress: require('./code/updateAddressController'),
    getOrganizeData: require('./code/getOrganizeDataController'),
    editVolunteerData: require('./code/editVolunteerDataController'),
    updateOrganizeAddress: require('./code/updateOrganizeAddressController'),
    editOrganizeData: require('./code/editOrganizeDataController'),
    updatePhone : require('./code/updatePhoneController'),
    addVolunteer : require('./code/addVolunteerController'),
    userNotification : require('./code/userNotificationController'),
    getUserLocation: require('./code/getUserLocationController'),
    findUserByPhone: require('./code/findUserByPhoneController'),
    changePasswordBytoken: require('./code/changePasswordBytoken'),
    banUser: require('./code/banUserController')
}