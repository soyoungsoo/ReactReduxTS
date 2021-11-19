import _ from "lodash";
import variable from "../const/variable";

export default {
    getParams() {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        return params;
    },

    convertDate(date:number, defaultValue?: string) {
        if (!date) return defaultValue || "";
        let convertDate = new Date(Number(date));
        return convertDate.getFullYear() + '.' + (convertDate.getMonth() + 1).toString().padStart(2, '0') + '.' + convertDate.getDate().toString().padStart(2, '0');
    },

    convertTime(date:number, defaultValue?: string) {
        if (!date) return defaultValue || "";
        let convertDate = new Date(Number(date));
        return convertDate.getFullYear() + '-' + (convertDate.getMonth() + 1).toString().padStart(2, '0') + '-' + convertDate.getDate().toString().padStart(2, '0') + " " + convertDate.getHours().toString().padStart(2, '0') + ":" + convertDate.getMinutes().toString().padStart(2, '0')
    },

    convertFileSize(bytes: number, dp=1) {
        const thresh = 1000;
        const units = ['KM', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const r = 10**dp;
        let u = -1;

        if (Math.abs(bytes) < thresh) {
            return bytes + ' B';
        }

        do {
            bytes /= thresh;
            ++u;
        } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

        return bytes.toFixed(dp) + ' ' + units[u];
    },

    getImageCDN(url: string) {
        return variable.imageCDN + url;
    },

    removeHTML(str: string) {
        return str.replace(/<[^>]*>/g, '');
    },

    readImage(data: Blob | File) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => {
                let img = new Image();
                img.onerror = reject;
                img.onload = () => {
                    resolve(reader.result);
                };
                if (typeof reader.result === "string") {
                    img.src = reader.result;
                }
            };
            if(typeof data == "object") {
                reader.readAsDataURL(data);
            } else {
                // data가 파일 객체가 아니라 data uri일 경우
                reader.readAsDataURL(this.dataURItoBlob(data));
            }
        });
    },

    dataURItoBlob(dataURI: string) {
        let byteString = atob(dataURI.split(',')[1]);
        let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        let ab = new ArrayBuffer(byteString.length);
        let ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], {type: mimeString});
    },

    numberRegx(str: string) {
        let regexp = /[^0-9]/g;

        if (str.length === 0) {
            str = str.substring(1);
        }
        return str.replace(regexp,'');
    },

    isEmptyObject(param: Object) {
        return Object.keys(param).length === 0 && param.constructor === Object;
    },
}