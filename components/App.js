import React, { useState, useEffect } from 'react';
import BoardList from './BoardList';
import AddBoardForm from './AddBoardForm';
import Slides from "./Slides";
import './styles.css';

function App() {
  const [boards, setBoards] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  const fetchBoards = async () => {
    try {
      const response = await fetch('/api/boards'); // Endpoint to fetch data from your backend
      if (response.ok) {
        const data = await response.json();
        setBoards(data.boards); // Assuming 'boards' is the array fetched from the backend
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const onNewBoard = async (name, description, designs, colors, phone, email) => {

    try {
      const response = await fetch('/api/addBoard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, designs, colors, phone, email }),
      });

      if (response.ok) {
        fetchBoards(); // Fetch updated data after adding a new board
      } else {
        console.error('Failed to add new board');
      }
    } catch (error) {
      console.error('Error adding new board:', error);
    }
  };

  const onRateBoard = (user, ratingChange) => {
    const updatedBoards = boards.map((board) => {
      if (board.user === user) {
        board.score += ratingChange;
      }
      return board;
    });
    setBoards(updatedBoards);
  };

  return (
    <>
      <div>
        <div className= "website-top">
        <h1 className = "website-name"> Interior designs </h1>
        <h4> Home for great interiors </h4>
        </div>

        <button onClick={handleButtonClick} className="create-form">
          Create an interior design company
        </button>
        {showForm && <AddBoardForm onNewBoard={onNewBoard} />}
      </div>

      <BoardList boards={boards} onRate={(user, ratingChange) => onRateBoard(user, ratingChange)} />
    </>
  );
}

export default App;
