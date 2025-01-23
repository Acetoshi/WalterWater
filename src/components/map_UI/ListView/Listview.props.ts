import { Dispatch, SetStateAction } from "react";

export default interface ListViewProps {
  listState: {
    listIsDisplayed: boolean;
    setListIsDisplayed: Dispatch<
      SetStateAction<boolean>
    >;
  };
}
