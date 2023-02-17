
//USER ____________________________________________________________________________ USER

const getRegisterURL = () => {
    return 'user/register/';
}

const getLoginURL = () => {
    return 'user/login/';
}

const getGetAllUsersURL = () => {
    return `user/auth/getall`;
}

const getGetUserURL = (idUser) => {
    return `user/auth/${idUser}/detail`;
}

const getUpdateUserURL = (idUser) => {
    return `user/auth/${idUser}/update/`;
}

//PRIVATE MESSAGE _________________________________________________________________ PRIVATE MESSAGE

const getGetMessageUserURL = (idUser) => {
    return `messageuser/getdiscussion/${idUser}`;
}

const getSendMessageUserURL = () => {
    return 'messageuser/send/';
}

//ROOM MESSAGE ____________________________________________________________________ ROOM MESSAGE

const getGetMessageSalonURL = (idSalon) => {
    return `messagesalon/getall/${idSalon}`;
}

const getSendMessageSalonURL = () => {
    return 'messagesalon/send/';
}

// TRANSLATION _____________________________________________________________________ TRANSLATION

const getTranslationsURL = () => {
    return 'translate/getAll/';
}

// EXPORT MODULE ___________________________________________________________________ EXPORT MODULE

module.exports = {
    //user
    getRegisterURL,
    getLoginURL,
    getGetAllUsersURL,
    getGetUserURL,
    getUpdateUserURL,
    //message private
    getGetMessageUserURL,
    getSendMessageUserURL,
    //message room
    getGetMessageSalonURL,
    getSendMessageSalonURL,
    //translations
    getTranslationsURL
}