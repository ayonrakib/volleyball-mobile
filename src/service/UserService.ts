import axios from "axios";
import AsyncStorageLib from '@react-native-async-storage/async-storage';

export class UserService{
    constructor(){

    }
    // check korbe shudhu matro unexpired auth key ase kina
    // sync method => sathe sathe true false return pabe, no promise
    isLoggedIn () {
        this.currentSession().then(response => {
            console.log("current session in the user service file is: ",response)
        })
        return true;
    }

    currentSession = async () => {
        try {
            const values = await AsyncStorageLib.getAllKeys()
            if(values !== null) {
              // value previously stored
              console.log("async storage keys are: ",values)
            }
            else{
              console.log("null storage: ",values)
            }
            const sampleStoredDataInCookie = await AsyncStorageLib.getItem("@name");
            console.log("sample Stored Data In Cookie:", sampleStoredDataInCookie);
            return sampleStoredDataInCookie
          } catch(e) {
            // error reading value
            console.error(e)
          }
    }


    // login method
    // input: email, password
    // return: true if authenticated, error message object if not
    // method:
    //    1. validate email and password as string (input validation) -- do we need it? typescript does it fopr us
    //    2. validate input email and password with db email and password
    //    3. if different:
    //      3.1. send error message saying: "please insert valid email id or password"
    //    4. if validated:
    //      4.1. get a session from get session method
    //      4.2. save the session in the react native storage lib
    //      4.3. if save successful:
    //        4.3.1. return true
    //      4.4. return false
    async login(email:string, password:string){
      console.log("came in login method!")
      var stateDictionary = {
        email: email,
        password: password
      }
      let loginResponse = await axios.post("http://192.168.1.88:8080/login-mariadb", stateDictionary);
      console.log("response from login-mariadb in await axios: ",loginResponse.data)
      if(!(loginResponse.data.data)){
        console.log("user not authenticated in user service!")
        this.deleteSession();
        return (loginResponse.data)
      }
      else{
        console.log("user authenticated in user service!")
        if(this.storeSession(loginResponse.data.data)){
            return(
              {
                data : true,
                error: ""
              }
            )
          }
          else{
            return(
              {
                data : false,
                error:  {
                  errorCode: 600,
                  errorMessage: "Please retry logging in again!",
                },
              }
            )
          }
      }
      // axios({
      //   method: "post",
      //   url:"http://192.168.1.88:8080/login-mariadb",
      //   data: stateDictionary
      // }).then(response => {
      //   console.log("the response is: ",response.data)
      //   if(response.data.data === false){

      //     this.deleteSession()
      //     this.getSession()
      //     loginResponse = {
      //       data : false,
      //       error : response.data.error
      //     };
      //     return loginResponse;
      //   }
      //   else{
      //     console.log("session saved in for the user logged in is:",response.data.data)

      //     if(this.storeSession(response.data.data)){
      //       loginResponse = {
      //         data : true,
      //         error : ""
      //       }
      //       return loginResponse;
      //     }

      //     this.getSession()
      //     // if(response.data.data !== false){
      //     //   navigation.navigate('Homepage')
      //     // }
      //   }
        
      // }).catch(error => console.log(error)).finally(
      //   () => {
      //     return loginResponse;
      //   }
      // )
      
    }



    // logout method


    // get session
    // input: nothing
    // return: session if created, false if not
    // method:
    //    1. try to get session from react native storage object
    //    2. if successful:
    //      2.1. return session
    //    3. else:
    //      3.1. return false
    async getSession(){
      var authenticationObject:any;
      try {
        const values = await AsyncStorageLib.getAllKeys()
        if(values !== null) {
          // value previously stored
          console.log("async storage keys are: ",values)
        }
        else{
          console.log("null storage: ",values)
        }
        const sampleStoredDataInCookie = await AsyncStorageLib.getItem("session");
        console.log("sample Stored Data In Cookie:", sampleStoredDataInCookie);
        return sampleStoredDataInCookie
      } catch(e) {
        // error reading value
        console.log("there was an error reading sessions in getSession method!: ",e)
        return false;
      }
    }

    // store session method
    // input: session
    // return: true if saved, false if not
    // method:
    //    1. try to save session key in react native storage library as a format of authenticationObject["session"] and assign expiry date (7)
    //    2. if successful, return true
    //    3. if failed, return false
    async storeSession(session:string) {
      // var authenticationObject = {session: "", expiry : ""};
      let date = new Date();
      let todayInString = date.toDateString();
      console.log("today in string: ",todayInString)
      date.setDate(date.getDate()+7)
      let aWeekFromNowInString = date.toDateString();
      console.log("a week from now: ",aWeekFromNowInString)
      
      let todayInObject = new Date(todayInString);
      console.log("today in js object: ",todayInObject)
      
      let aWeekFromNowInObject = new Date(aWeekFromNowInString);
      console.log("a week from now in js object: ",aWeekFromNowInObject)
      try{
        await AsyncStorageLib.setItem("session", session);
        // AsyncStorageLib.setItem("authentication", session)
        // authenticationObject.session
        // x123.session
        // ""
        await AsyncStorageLib.setItem("expiry", aWeekFromNowInString);
        return true;
      }
      catch (e){
        return false;
      }
    }

    // 1. assigned empty auth obj
    // 2. created date obj
    // 3. created today date in str
    // 4. created one week from now str
    // 5. try
    //    5.1. in async storage, store auth obj[session] = session
    //    5.2. in async storage, store auth obj[expiry] = a week from now str
    //    5.3. return true
    // 6. if error:
    //    6.1. return false


    // delete session async method
    // input: nothing
    // return: true if deleted, fals eif nothing
    // method:
    //    1. try to delete session from react native storage lib
    //    2. return true if succeeded
    //    3. return false if failed
    async deleteSession(){
      var authenticationObject:any;
      try{
        await AsyncStorageLib.removeItem("session");
        return true;
      }
      catch(e){
        return false;
      }
    }


    // create user method


    // update user method


    // delete user method

    
}

export var userService = new UserService();