class DataHandler {
    constructor() {
        this.assento = '';
        this.assentoID = '';
        this.viagemID = '';
        this.accessToken = '';
        this.refreshToken = '';
        this.userID = '';
    };

    getData() {
        return this.data;
    };

    setData(data){
        this.data = data;
    };

    getAccessToken() {
        return this.accessToken;
    };

    setAccessToken(accessToken){
        this.accessToken = accessToken;
    };

    getRefreshToken() {
        return this.refreshToken;
    };

    setRefreshToken(refreshToken){
        this.refreshToken = refreshToken;
    };

    getUserID() {
        return this.userID;
    };

    setUserID(userID){
        this.userID = userID;
    };

    getAssentoID() {
        return this.assentoID;
    };

    setAssentoID(assentoID){
        this.assentoID = assentoID;
    };

    getAssento() {
        return this.assento;
    };

    setAssento(assento){
        this.assento = assento;
    };

    getViagemID() {
        return this.viagemID;
    };

    setViagemID(viagemID){
        this.viagemID = viagemID;
    };
}

export default DataHandler;