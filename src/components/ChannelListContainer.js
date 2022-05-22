import React, {useState} from 'react'
import { ChannelList, useChatContext } from 'stream-chat-react'
import Cookies  from 'universal-cookie'


import ChannelSearch from './ChannelSearch'
import TeamChannelList from './TeamChannelList'
import HospitalIcon from '../assets/hospital.png'
import LogoutIcon from '../assets/logout.png'
import TeamChannelPreview from './TeamChannelPreview'

const cookies = new Cookies();

const SideBar = ({logout}) => 
  (
    <div className="channel-list__sidebar">
      <div className="channel-list__sidebar__icon1">
        <div className="icon1__inner">
          <img src={HospitalIcon} alt='chart' width='30'/>
        </div>
      </div>
      <div className="channel-list__sidebar__icon2">
        <div className="icon1__inner" onClick={logout}>
          <img src={LogoutIcon} alt='Logout' width='30'/>
        </div>
      </div>
    </div>
  )

const CompanyHeader = () => (
  <div className='channel-list__header'>
    <p className='channel-list__header__text'>We Chat</p>
  </div>
)  

const customChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team');
}

const customChannelMessagingFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging');
}

const ChannelListContent = ({isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer}) => {
  const {client} = useChatContext();
  const logout = () =>{
    cookies.remove("token");
    cookies.remove('userId');
    cookies.remove('username');
    cookies.remove('fullName');
    cookies.remove('avatarURL');
    cookies.remove('hashedPassword');
    cookies.remove('phoneNumber');

    window.location.reload();
  }

  const filter = {members: {$in: [client.userID]}}
  return (
    <>
      <SideBar logout={logout}/>
      <div className='channel-list__list__wrapper'>
        <CompanyHeader/>
        <ChannelSearch/>
        <ChannelList
            filters={filter}
            channelRenderFilterFn={customChannelTeamFilter}
            List={(listProps)=>(
              <TeamChannelList
                {...listProps}
                type='team'
                setToggleContainer={setToggleContainer}
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                setCreateType={setCreateType}
                setIsEditing={setIsEditing}
              />
            )}
            Preview={(previewProps)=> (
              <TeamChannelPreview
                {...previewProps}
                setToggleContainer={setToggleContainer}
                type='team'
                setCreateType={setCreateType}
                setIsEditing={setIsEditing}
                setIsCreating={setIsCreating}
              />
            )}
        />
        <ChannelList
            filters={filter}
            channelRenderFilterFn={customChannelMessagingFilter}
            List={(listProps)=>(
              <TeamChannelList
                {...listProps}
                type='messaging'
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                setCreateType={setCreateType}
                setIsEditing={setIsEditing}
                setToggleContainer={setToggleContainer}
              />
            )}
            Preview={(previewProps)=> (
              <TeamChannelPreview
                {...previewProps}
                type='messaging'
                setCreateType={setCreateType}
                setIsEditing={setIsEditing}
                setToggleContainer={setToggleContainer}
                setIsCreating={setIsCreating}
              />
            )}
        />
      </div>
      
    </>
  )
}

const ChannelListContainer = ({setCreateType, setIsCreating, setIsEditing}) =>{
  const [toggleContainer, setToggleContainer] = useState(false)
  return (
    <>
      <div className='channel-list__container'>
        <ChannelListContent
          setCreateType={setCreateType}
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
        />
      </div>

      <div className='channel-list__container-responsive'
        style={{left: toggleContainer ? '0%' : "-89%", backroundColor: "#0055ff"}}
      >
        <div className='channel-list__container-toggle'onClick={()=> setToggleContainer((prevTogglecontainer)=> !prevTogglecontainer)}></div>
        <ChannelListContent
            setCreateType={setCreateType}
            setIsCreating={setIsCreating}
            setIsEditing={setIsEditing}
            setToggleContainer={setToggleContainer}
        />
      </div>
    
    </>
  )
}

export default ChannelListContainer