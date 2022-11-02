import axios from "axios";

import { userService, UserService } from "./UserService";

export class PollService{
    userService:UserService;
    
    constructor(userService:UserService){
        if(userService == null){
            throw new Error("Poll service requires userservice.")
        }
        this.userService = userService;
    }

    // save poll selection in mariadb
    // input: user session, poll selection
    // return: true if saved in db, false if not
    // method:
    //      1. call backend to save user poll selection
    //      2. if response true:
    //          2.1. return true
    //      3. return false
    async savePollSelection(pollId: number, pollSelection:string):Promise<boolean>{
        const sessionObject = await this.userService.getSession();
        const pollDetails = {
            session: sessionObject.session,
            pollID: pollId,
            pollSelection: pollSelection
        }
        const isPollSaved = await axios.post("http://192.168.1.88:8080/save-selection-in-poll-database-mariadb",pollDetails);
        return true;
    }

}

export var pollService = new PollService(userService);