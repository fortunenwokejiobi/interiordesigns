
import React, {useState} from "react";
import Board from "./Boards";

export default function BoardList(
    {boards = [],
    onRate = (f) => f })
    {
        if(!boards.length) return <div>No Messages Listed</div>
        return(
            <div>
                {
                boards.map((board) => (
                    <Board
                    key={board.user}
                    {...board}
                    onRate={(ratingChange) => onRate(board.user, ratingChange)}
                    />
                    ))
                }
            </div>
        );
}