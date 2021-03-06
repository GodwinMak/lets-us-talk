import React, {useState, useEffect} from 'react'
import styled from "styled-components"
import Logo from "../assets/Let's talk-logos_white.png"


const Contacts = ({contacts, currentUser, changeChat}) => {
//     console.log(contacts);
//   console.log(currentUser);
    const [currentUserName, setCurrentUserName] = useState(undefined)
    const [currentUserImage, setCurrentUserImage] = useState(undefined)
    const [currentSelected, setCurrentSelected] = useState(undefined)
    useEffect(() => {
      if(currentUser){
          setCurrentUserImage(currentUser.avatarImage);
          setCurrentUserName(currentUser.username);
      }
    }, [currentUser])

    
    
    const changeCurrentChat = (index,contact) =>{
        setCurrentSelected(index);
        changeChat(contact)
    }
  return (
      <>
        {
            currentUserImage && currentUserName && (
                <Container>
                    <div className='brand'>
                        <img src={Logo} alt='logo'/>
                        <h3>Let's-Talk</h3> 
                    </div>
                    <div className='contacts'>
                        {
                            contacts.map((contact,index)=>{
                                return(
                                    <div className={`contact ${index === currentSelected ? 'selected': ""}`}
                                         key={index} onClick={()=> changeCurrentChat(index,contact)}>
                                        <div className='avatar'>
                                            <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt='avatar'/>
                                        </div>
                                        <div className='username'>
                                            <h3>{contact.username}</h3>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='current-user'>
                        <div className='avatar'>
                            <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt='avatar' />
                        </div>
                        <div className='username'>
                            <h2>{currentUserName}</h2>
                        </div>
                    </div>
                
                </Container>
            )
        }
      </>
  )
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    background-color: #080420;
    // @media screen and (max-width: 920px){
    //     display: none;
    // }
    .brand{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.1rem;
        img{
            height: 6rem;
        }
        h3{
            color: #f8f8f8;
            text-transform: uppercase;
        }
    }
    .contacts{
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;
        &::-webkit-scrollbar{
            width: 0.2rem;
            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }

        }
        .contact{
            background-color: #ffffff39;
            min-height: 5rem;
            width: 90%;
            cursor: pointer;
            border-radius: 0.2rem;
            padding: 0.4rem;
            gap: 1rem;
            align-items: center;
            display: flex;
            transtion: ease-in-out 0.5s;
            .avatar{
                img{
                    height: 3rem;
                }
            }
            .username{
                h3{
                    color: #ffffff;
                }
            }
        }
        .selected{
            background-color: #9186f3;
        }
    }
    .current-user{
        background-color: #0d0b30;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        .avatar{
            img{
                height: 4rem;
                max-inline-size: 100%;
            }
        }
        .username{
            h2{
                color:#ffffff;
            }
        }
        @media screen and (min-width: 720px) and (max-width: 1080px){
            gap: 0.3rem;
            .username{
                h2{
                    font-size: 1rem;
                }
            }
        }
        @media screen and (min-width: 240px) and (max-width: 480px){
            gap: 0.1rem;
            .username{
                h2{
                    font-size: 0.5rem;
                }
            }
        }
    }
`;

export default Contacts