/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import styled from "styled-components"
import { allUserRoute, host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from 'socket.io-client'

const Chat = () => {
  const navigate = useNavigate();
  const socket = useRef();


  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined)
  const [currentChat, setCurrentChat] = useState(undefined)
  const [isloading, setIsloading]= useState(false);
  
  useEffect(() => {
    const fetchItem = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login")
      }else{
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
        setIsloading(true);
      }
    }

    fetchItem();
  }, [])

  useEffect(() => {
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser])
  
  useEffect(() => {
    const callApi = async ()=>{
      if(currentUser){
        if(currentUser.isAvatarImageSet){
          const data = await axios.get(`${allUserRoute}/${currentUser._id}`);
          setContacts (data.data);
        }else{
          navigate("/setAvatar");
        }
      }
    }
    callApi()
  }, [currentUser])

  const handelChatChange =(chat) =>{
    setCurrentChat(chat)
  }
  return (
    <>
      <Container>
        <div className='container'>
          <Contacts contacts={contacts} currentUser={currentUser} changeChat={handelChatChange}/>
          {
           isloading && currentChat === undefined ? (<Welcome currentUser={currentUser}/> ):
              (<ChatContainer currentChat={currentChat} currentUser={currentUser}  socket={socket}/>)
          }
        </div>
      </Container>
    </>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vm;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #131324;
  .container{
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 480px) and (max-width: 1080px){
      grid-template-columns: 45% 55%;
    }
    @media screen and (min-width: 360px) and (max-width: 480px){
      grid-template-columns: 45% 55%;
    }
  } 
`;
export default Chat

