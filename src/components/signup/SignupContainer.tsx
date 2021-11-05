import React from "react";
import SignupTerms from "./SignupTerms";
import SignupSuccess from "./SignupSuccess";
import SignupInput from "./SignupInput";
import "./css/SignupContainer.scss";
import qs from "query-string";
import {RouteComponentProps} from "react-router-dom";

function SignupContainer(props: RouteComponentProps) {
    const type = Number(qs.parse(props.location.search).type || 1);
    const isTerms = type === 1;
    const isInput = type === 2;
    const isSuccess = type === 3;

    const onNextStep = (query?: string) => {
        props.history.push(`?type=${type + 1}${query || ''}`);
    };

    return (
        <div id="SignupContainer">
            {
                isTerms && <SignupTerms funcNext={onNextStep}/>
            }
            {
                isInput && <SignupInput funcNext={onNextStep}/>
            }
            {
                isSuccess && <SignupSuccess {...props}/>
            }
        </div>
    )
}

export default SignupContainer;