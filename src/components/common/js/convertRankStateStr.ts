import {MediaInfoType} from "../../../models/member";
export function convertRankStateStr(state: number) {
    switch (state) {
        case MediaInfoType.normalUser:
            return MediaInfoType.normalUserStr;
        case MediaInfoType.reporter:
            return MediaInfoType.reporterStr;
        case MediaInfoType.admin:
            return MediaInfoType.adminStr;
        case MediaInfoType.mediaMaster:
            return MediaInfoType.mediaMasterStr;
        case MediaInfoType.contractor:
            return MediaInfoType.contractorStr;
    }
}