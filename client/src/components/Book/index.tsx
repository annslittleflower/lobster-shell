import * as React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
// @ts-ignore
import DateTimePicker from 'react-datetime-picker';
import * as moment from 'moment';

import { PostContext } from '../../pages/Post';
import { AuthContext } from '../../context/auth';
import BookTimeList from '../BookTimeList'; 

interface Check {
  bookPost: boolean;
}

interface Vars {
  postId: string;
  start: number;
  end: number;
}

const Book = () => {
  const { postId } = React.useContext(PostContext);
  const [stateDate, setStateDate] = React.useState<Date>(new Date());
  const [stateDate2, setStateDate2] = React.useState<Date>(new Date());
  const [ bookPost, { data, loading, error }] = useMutation<Check, Vars>(BOOK_POST);
  const { user } = React.useContext(AuthContext);

  React.useEffect(() => {
    console.log(moment(stateDate.getTime()).format('MM/DD/YYYY HH:mm'));
    console.log(stateDate)
  });
  
  const onTimeChange = (date:Date) => setStateDate(date);
  const onTimeChange2 = (date:Date) => setStateDate2(date);

  return (
    <div className="zIndex(4) pos(r)">
      {
        user ?
          <>
            <DateTimePicker
              onChange={onTimeChange}
              value={stateDate}
              />
            <DateTimePicker
              onChange={onTimeChange2}
              value={stateDate2}
              />
            <button 
              onClick={() => 
                bookPost({ 
                  variables: { 
                    postId, 
                    start: stateDate.getTime(), 
                    end: stateDate2.getTime(),
                  } })}
              >
                Rent
            </button>
          </> :
          <h1>Log in to book this place</h1>
      }
      {
        data && (data.bookPost ? <h2>Taken</h2> : <h2>Not Taken</h2>)
      }

      <BookTimeList />
    </div>
  )
}

const BOOK_POST = gql`
  mutation bookPost($postId: ID!, $start: Date!, $end: Date!) {
    bookPost(postId: $postId, start: $start, end: $end) 
  }
`;

export default Book;