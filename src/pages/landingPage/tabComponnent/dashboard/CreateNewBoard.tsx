import React from "react";
import {MyBox, MySpan, MyLabel} from "./CreateNewBoard.style";


const CreateNewBoard: React.FC = () => {

    return (
        <MyBox>
            <MySpan>+</MySpan><MyLabel> create a new board</MyLabel>
        </MyBox>
      )
}
export default CreateNewBoard