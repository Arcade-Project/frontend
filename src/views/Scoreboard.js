import React, { useEffect, useState } from 'react';
import { Card, Table, Select } from 'antd';
import { useDispatch } from 'react-redux';
import axios from 'axios';

export default function Scoreboard() {
  const dispatch = useDispatch();
  dispatch({ type: 'PLAYING', payload: false });
  
  const { Option } = Select;

  const dummy = [
    {
      key: '1',
      name: 'Mike',
      score: 32
    },
    {
      key: '2',
      name: 'John',
      score: 42
    }
  ];

  const games = ['Pong', 'HangMan', 'HeadSoccer'];

  const [scores, setScores] = useState(dummy);

  useEffect(()=>{
          axios.get('/score/high', {timeout: 100000})
          .then(res => setScores([res.data]))
          .catch(err => console.log('error get score', err))
  },[])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score'
    }
  ];

  const onGameChange = e => {
    axios.post('/score/from_game', {game: e}, {timeout: 10000})
          .then(res => setScores([res.data]))
          .catch(err => console.log('error get score', err))
  };

  return (
    <React.Fragment>
      <Card className='centered-div' style={{ width: '80vw', height: '75vh' }}>
      <Select defaultValue="" style={{ width: 120 }} onChange={onGameChange}>
      {games.map(game => <Option value={game}>{game}</Option>)}
    </Select>
        <Table dataSource={scores} columns={columns} />
      </Card>
    </React.Fragment>
  );
}
