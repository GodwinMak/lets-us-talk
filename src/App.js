import React, { useState } from 'react'
import {StreamChat} from 'stream-chat'
import {Chat} from 'stream-chat-react'
import Cookies from 'universal-cookie'
import { ChannelListContainer, ChannelContainer, Auth } from './components/index'

import 'stream-chat-react/dist/css/index.css';
import './App.css'

const cookies = new Cookies();

const api_key = 'g7p7myd4ddbw'
const authToken = cookies.get("token");


const client = StreamChat.getInstance(api_key);

if(authToken){
  client.connectUser({
    id: cookies.get('userId'),
    name: cookies.get('userName'),
    fullName: cookies.get('fullName'),
    image: cookies.get('avatarUrl'),
    hashedPassword: cookies.get('hashedPassword'),
    phoneNumber: cookies.get('phoneNumber'),
  }, authToken);
}


const App = () => {
  const [createType, setCreateType]= useState('');
  const [isCreating, setIsCreating]= useState(false);
  const [ isEditing, setIsEditing ] = useState(false);


  if(!authToken) return <Auth/>

  return (
    <div className='app__wrapper'>
      <Chat client={client} theme='team-light'>
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          isEditing={isEditing}
          createType={createType}
        />
      </Chat>
    </div>
  )
}

export default App