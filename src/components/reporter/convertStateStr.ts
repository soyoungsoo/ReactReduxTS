import { State } from "../../models/Article";
export default {
    convertState: (state: number) => {
        switch (state) {
            case State.Temp:
                return State.TempStr;
            case State.Wait:
                return State.WaitStr;
            case State.Reject:
                return State.TempStr;
            case State.AcceptStr:
                return State.RejectStr;
        }
    }
}