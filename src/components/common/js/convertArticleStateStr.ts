import { State } from "../../../models/article";
export function convertArticleStateStr(state: number) {
    switch (state) {
        case State.Temp:
            return State.TempStr;
        case State.Wait:
            return State.WaitStr;
        case State.Reject:
            return State.RejectStr;
        case State.Accept:
            return State.AcceptStr;
    }
}