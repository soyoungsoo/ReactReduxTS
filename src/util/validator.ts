import {RefObject} from "react";

export default {
    CheckRefValue(arr: RefObject<any>[]) {
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i].current;
            if (!item.value.length) {
                alert(`${item.dataset.name}을(를) 입력해주세요`);
                item.focus();
                return false;
            }

            if (item.dataset.name == "이메일") {
                const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!regExp.test(String(item.value).toLowerCase())) {
                    alert("이메일 형식이 올바르지 않습니다");
                    return false;
                }
            }
        }
        return true;
    }
};
