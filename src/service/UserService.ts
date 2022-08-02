import axios from "axios";
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { ApiError } from "../utils/exception";
import { Response } from "../utils/rest";

export class UserService{
    constructor(){

    }
    // check korbe shudhu matro unexpired auth key ase kina
    // sync method => sathe sathe true false return pabe, no promise
    async isLoggedIn () {

      console.log("came in isloggedin user service method!");
      const currentSavedSession = await userService.getSession();
      console.log("currentSavedSession in islogged in method in user service: ",currentSavedSession)
  
      if (currentSavedSession !== null) {

        const loginResponse = await axios.post("http://192.168.1.88:8080/validate-cookie-mariadb", { data: currentSavedSession.session });
        console.log("loginResponse.data in islogged in method in user service: ",loginResponse.data)
        return loginResponse;
      }

      return ({
        data: false, 
        error: null
      })
      
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


    // get 7 days from now
    // input: nothing
    // return: 7 days in obj
    // method:
    //    1. get todays date
    //    2. add 7 days to it
    //    3. return the future date
    getSevenDaysFromNow():Date{
      let date = new Date();
      let todayInString = date.toDateString();
      console.log("today in string: ",todayInString)
      date.setDate(date.getDate()+7)
      let aWeekFromNowInString = date.toDateString();
      console.log("a week from now: ",aWeekFromNowInString)
      
      let todayInObject = new Date(todayInString);
      console.log("today in js object: ",todayInObject)
      
      let aWeekFromNowInObject = new Date(aWeekFromNowInString);
      return aWeekFromNowInObject;
    }


    // save session
    // input: session as string
    // return: true if saved properly with expiry, false if not
    // method:
    //    1. create an authentication object with session and expiry date of 7 days
    //    2. stringify the auth obj
    //    3. try to save the obj in react native
    //    4. if successful:
    //      4.1. return true
    //    5. return false
    async saveSession(session:string):Promise<boolean>{
      console.log("session in saveSession method is userservice is: ",session)
      const authentication = { 
                                session : session,
                                expiry : this.getSevenDaysFromNow()
                             }
      const authenticationString = JSON.stringify(authentication);
      console.log("authenticationString in saveSession method is userservice is: ",authenticationString)
      try {
        await AsyncStorageLib.setItem("authentication", authenticationString);
        var currentSessionSaved = await AsyncStorageLib.getItem("authentication");
        console.log("currenSession in saveSession method in user service is: ",currentSessionSaved)
        return true;
      } catch (error) {
        return false;
      }
    }



    // delete session async method
    // input: nothing
    // return: true if deleted, fals eif nothing
    // method:
    //    1. try to delete authentication obj from react native storage lib
    //    2. return true if succeeded
    //    3. return false if failed
    async deleteSession():Promise<boolean>{
      try {
        await AsyncStorageLib.removeItem("authentication");
        return true;
      } catch (error) {
        return false;
      }
    }


    // update session method
    // input: Response obj
    // return: true if saved successfully, false if not
    // method:
    //    1. if the Response object.data is null:
    //      1.1. try to delete the session cookie
    //      1.2. if delete is successful:
    //        1.2.1. return true
    //      1.3. else:
    //        1.3.1. return false
    //    2. else:
    //      2.1. call save session method with response obj.data as param which also saves expiry of 7 days
    //      2.2. return the value of saveSession method
    async updateSession(session:string | null):Promise<boolean>{
      console.log("session in update session is: ",session)
      if (session === null) {

        return this.deleteSession();

      } else {

        return this.saveSession(session);

      }
    }
    

    // login method overview
    // 1. validate email and password in the backend
    // 2. update/delete session
    // 3. return response



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
    async login(email:string, password:string):Promise<{data: boolean, error: {} | null}>{
      console.log("came in login method!")
      var stateDictionary = {
        email: email,
        password: password
      }

      let loginResponse = await axios.post("http://192.168.1.88:8080/login-mariadb", stateDictionary);
      console.log("response from login-mariadb in await axios: ",loginResponse.data)

      const error = ApiError.fromApiError(loginResponse.data.error); 
      let response = new Response(loginResponse.data.data, error);

      console.log("response in login is: ",response)
      console.log("response data in uservice is: ",response.data)
      console.log("response error in uservice is: ",response.error)
      // console.log("response error message of Error in uservice is: ", response.error.message)

      if (response.data === null) {

        if (this.deleteSession()) {
          console.log("response error message of Error in unauthentication in uservice is: ", response.error.message)
          return { data : false, error: response };

        }

      } else {
        if(this.updateSession(response.data)) {

          return {data: true, error: null};

        } else {

          return {data: false, error: null};

        }
      }
    }


    // register-mariadb
    // input: dictionary of first name, last name, email, password
    // return: session if successfully created user, null if not
    // method:
    //    1. call back end url with first name, last name, email, password
    //    2. if response data is null:
    //      2.1. show the error message in the screen
    //    3. else:
    //      3.1. save the session in the react native async storage
    //      3.2. reload component
   async registerInMariadb(stateDictionary : any) {
    // console.log("state dict in registerInMariadb method in user service is: ",stateDictionary)
    const registrationResponse = await axios.post("http://192.168.1.88:8080/register-mariadb",stateDictionary);
    console.log("response from register-mariadb in registerInMariadb method in user service is: ",registrationResponse.data);
    return registrationResponse.data
   }


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
        const sampleStoredDataInCookie = await AsyncStorageLib.getItem("authentication");
        console.log("sample Stored Data In Cookie:", sampleStoredDataInCookie);
        const JSONParsedSession = JSON.parse(sampleStoredDataInCookie);
        return JSONParsedSession
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


    // create user method


    // update user method


    // delete user method

    
}

export var userService = new UserService();