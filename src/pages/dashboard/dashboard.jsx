import React, { useEffect, useReducer, useRef, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../../component/navbar/navbar";
import useMode from "../../customhooks/useMode";
import "./dashboard.css";
import { FaDiscord,FaArrowAltCircleLeft } from "react-icons/fa";
import { BsFillChatDotsFill } from "react-icons/bs";
import { IoIosMan } from "react-icons/io";
import { GiOfficeChair,GiWifiRouter } from "react-icons/gi";
import { AiFillSetting,AiFillWarning } from "react-icons/ai";
import {configButtonColor} from './components/configButtonColor';
import Wrapper from "../../component/inputComponents/MultilineInputComponent";
import CustomButton from './components/customButtom/customButton';
import Card from '../../component/rightDrawerCardDiv/cardDiv';
import GuildButton from './components/guildButton/guildButton';
import TouchableCard from "../../component/userCard/userCard";
import randomColor from 'randomcolor'
import { RiErrorWarningFill, RiWindowLine } from 'react-icons/ri';
import axios from 'axios'
import ChannelButton from "./components/channelButton/channelButton";
import AdminIcon from "./components/adminIcon/adminIcon";
import MemberButton from "./components/memberButton/memberButton";
import Clock from 'react-clock';
import Calendar from 'react-calendar';

import DateTimePicker from "react-datetime-picker";
import Cookies, { set } from "js-cookie";
var maxDate = new Date();
var numberOfDaysToAdd = 14;
maxDate.setDate(maxDate.getDate() + numberOfDaysToAdd);

var minDate = new Date();
minDate.setDate(minDate.getDate());
const getContentHeight=(state,drawerNumber)=>{
  if(drawerNumber===1)
  {
    if(state.isSecondDrawerOpen && state.isThirdDrawerOpen)
      return '28%';
    if(state.isSecondDrawerOpen && !state.isThirdDrawerOpen)
      return '28%';
    if(!state.isSecondDrawerOpen && state.isThirdDrawerOpen)
      return '28%';
    else 
      return '85%';
  }
  else if(drawerNumber===2)
  {
    if(state.isFirstDrawerOpen && state.isThirdDrawerOpen)
      return '28%';
    if(!state.isFirstDrawerOpen && state.isThirdDrawerOpen)
      return '28%';
    else if(state.isFirstDrawerOpen && !state.isThirdDrawerOpen)
      return '55%';
    else
      return '85%'
  }
  else
  {
    if(state.isFirstDrawerOpen && state.isSecondDrawerOpen)
      return '28%';
    if(!state.isFirstDrawerOpen && !state.isSecondDrawerOpen)
      return '85%';
    else 
      return '61%' 
  }
  
}
const getValue=(term,div)=>{
  if(div===2)
  {
    switch (term) {
      case 'equal':
        return '33%'
      case 'open-above':
        return '5%'
      case 'close':
        return '33%';
      case 'open-below':
        return '33%';
      case 'close-below':
        return '90%'
      case 'close-above':
        return '5%'
      default://open full
        return '5%'
    }
  }
  else
  {
    switch (term) {
      case 'equal':
        return '66%'
      case 'open-above':
        return '38%'
      case 'open-full':
        return '10%'
      default:
        return '95%';
    }
  }
}
const calculateTop=(state,div)=>{
  if(div===2)
  {
    if(state.isSecondDrawerOpen)
    {
      if(state.isFirstDrawerOpen && state.isThirdDrawerOpen)
        return 'equal';
      else if(!state.isFirstDrawerOpen && state.isThirdDrawerOpen)
        return 'open-above'
      else if(state.isFirstDrawerOpen && !state.isThirdDrawerOpen)
        return 'open-below'
      else 
        return 'open-full'
    }
    else
    {
      if(state.isFirstDrawerOpen && !state.isThirdDrawerOpen)
        return 'close-below';
      if(!state.isFirstDrawerOpen && state.isThirdDrawerOpen)
       return 'close-above'
      else 
       return 'close' 
    }
  }
  else if(div===3)
  {
    if(state.isThirdDrawerOpen)
    {
      if(state.isFirstDrawerOpen && state.isSecondDrawerOpen)
        return 'equal';
      else if(!state.isFirstDrawerOpen && state.isSecondDrawerOpen)
        return 'open-above'
      if(state.isFirstDrawerOpen && !state.isSecondDrawerOpen)
        return 'open-above'
      return 'open-full'
    }
    else
    {
      if(!state.isFirstDrawerOpen && !state.isSecondDrawerOpen)
        return 'open-full'
      if(!state.isFirstDrawerOpen && state.isSecondDrawerOpen)
        return 'close-full'
      else
        return 'close-full';
    }
  }
}
const rightReducer=(state,action)=>{
  switch (action.rightDrawer) {
    case 1:
      return {
        isFirstDrawerOpen: !state.isFirstDrawerOpen,
        isSecondDrawerOpen: state.isSecondDrawerOpen,
        isThirdDrawerOpen: state.isThirdDrawerOpen,
      };
      case 2:
        return {
          isFirstDrawerOpen: state.isFirstDrawerOpen,
          isSecondDrawerOpen: !state.isSecondDrawerOpen,
          isThirdDrawerOpen: state.isThirdDrawerOpen,
        };
      case 3:
      return {
        isFirstDrawerOpen: state.isFirstDrawerOpen,
        isSecondDrawerOpen: state.isSecondDrawerOpen,
        isThirdDrawerOpen: !state.isThirdDrawerOpen,
      };
    default:
      break;
  }
}
const fetchData=async(id)=>{
  try {
      const res=await axios.post('http://localhost:5000/auth/discord/verify',{userId:id})
      if(res.status===200)
      {
          return res;
      }
      return null;
  } catch (error) {
      const res=error.response;
      if(res)
      {
          return res;
      }
  }
}
const foundRole=(userRoles,roles)=>{
  for (let i = 0; i < roles.length; i++) {
    const e = roles[i];
    for (let j = 0; j < userRoles.length; j++) {
      if(userRoles[j]===e.roleId)
        return e;
    }
  }
  return null;
}
let cancelChannelReq;
let cancelRoleReq;
let cancelMemberReq;
function Dashboard(props) {
  let { uid, sid, did } = useParams();
  const [mode, changeMode, MODETYPE, updateMode] = useMode();
  const [value, onChange] = useState(new Date());
  const [rightDivVisible, setRightDivVisible] = useState(
    window.innerWidth > 900 ? true : false
  );
  const [leftDivWidthFull, setLeftDivWidthFull] = useState(
    window.innerWidth > 900 ? false : true
  );
  const [bottomBarWidth, setBottomBarWidth] = useState(window.innerWidth<900?'14.28571':'16.667')
  const [activeButton, setActiveButton] = useState(1)
  const [isRightDivSliderButtonClicked, changeIsRightDivSliderButtonClicked] =
    useState(false);
  const [activeGuild, setActiveGuild] = useState()
  const [focusOne, setFocusOne] = useState(false);
  const [focusTwo, setFocusTwo] = useState(false);
  const data = useRef();
  const [rightDrawerState, rightDrawerDispatch] = useReducer(rightReducer, {
    isFirstDrawerOpen: true,
    isSecondDrawerOpen: true,
    isThirdDrawerOpen: true,
  });
  const [status, setStatus] = useState(
    sid === "null" && Cookies.get("id") ? true : false
  ); //logged in
  const [isTemp, setIsTemp] = useState(
    sid === "null" && Cookies.get("id") ? false : true
  ); //logged in
  const [imageSource, setImageSource] = useState(
    sid === "null" && Cookies.get("avatar") ? Cookies.get("avatar") : null
  );
  const [userName, setUserName] = useState(
    sid === "null" && Cookies.get("userName") ? Cookies.get("userName") : false
  );
  const [userTag, setUserTag] = useState(
    sid === "null" && Cookies.get("userTag") ? Cookies.get("userTag") : false
  );
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [discordData,setDiscordData]=useState(null);

  const [channels, setChannels] = useState(null)
  const [searchChannel, setSearchChannel] = useState('')
  const [selectedChannels, setSelectedChannels] = useState([])
  
  const [roles, setRoles] = useState(null)
  const [searchedRole, setSearchedRole] = useState('')
  const [selectedRoles, setSelectedRoles] = useState([])

  const [members, setMembers] = useState([])
  const [searchedMember, setSearchedMember] = useState('')
  const [selectedMembers, setSelectedMembers] = useState([])
  
  const [title, setTitle] = useState('');
  const [message,setMessage]=useState('');

  const [checked, setChecked] = useState(true)

  useEffect(() => {
    if (
      sid !== "null" &&
      uid === "null" &&
      Cookies.get("discordId") !== undefined &&
      did === Cookies.get("discordId")
    ) {
      setIsTemp(false);
      setStatus(true);
      setUserName(Cookies.get("userName"));
      setImageSource(Cookies.get("avatar"));
      setUserTag(Cookies.get("userTag"));
    }
    if (sid !== "null") {
      setLoadingPercentage(0.2);
      
      axios
        .get(`http://localhost:5000/link/info?did=${did}&sid=${sid}`)
        .then((res) => {
          setLoadingPercentage(1);
          if (res.status === 200) {
            data.current = JSON.parse(res.data);
            if (data.current) {
              setStatus(true);
              setIsTemp(true);
              setUserName(data.current.userName);
              setUserTag(data.current.userTag);
              setImageSource(
                `https://cdn.discordapp.com/avatars/${data.current.discordId}/${data.current.avatar}`
              );
            }
          }
          setTimeout(() => {
            setLoadingPercentage(0);
          }, 200);
        })
        .catch((error) => {
          window.location = `/error/${error.response.status}`;
        });
    }
  }, []);
  const handleLogout = () => {
    setStatus((status) => !status);
    Cookies.remove("id");
    Cookies.remove("userName");
    Cookies.remove("userTag");
    Cookies.remove("avatar");
  };
  const handleOnModeUpdate = () => {
    updateMode();
  };
  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth>900?setBottomBarWidth(16.667):setBottomBarWidth(14.28571)
      changeIsRightDivSliderButtonClicked(false);
      window.innerWidth > 900
        ? setRightDivVisible(true)
        : setRightDivVisible(false);
    
    });
    window.addEventListener("resize", () => {
      changeIsRightDivSliderButtonClicked(false);
      window.innerWidth > 900
        ? setLeftDivWidthFull(false)
        : setLeftDivWidthFull(true)
    });
  }, []);
  useEffect(() => {
    if(status)
    {
      axios.get(`http://localhost:5000/discord/permission?discordId=${did}`).then((res)=>{
        setDiscordData(res.data.guilds)
      }).catch((err)=>{
        window.location=`/error/${err.response.status}`
      })
    }
  }, [status])
  useEffect(() => {
    if(cancelChannelReq)
    {
      cancelChannelReq();
    }
    if(activeGuild && status && discordData)
    {
      axios.get(`http://localhost:5000/discord/channel?did=${did}&gid=${activeGuild.guildId}&q=${searchChannel}`,{cancelToken:new axios.CancelToken(c=>{
        cancelChannelReq=c;
      })}).then((res)=>{
        setChannels(res.data.channels);
      }).catch((err)=>{
        console.log(err);
        if(!axios.isCancel(err) && err.response)
        {
          window.location=`/error/${err.response.status}`;
        }
      })
    }
  }, [searchChannel,activeGuild])
  useEffect(() => {
    if(cancelRoleReq)
    {
      cancelRoleReq();
    }
    if(activeGuild && status && discordData)
    {
      axios.get(`http://localhost:5000/discord/role?did=${did}&gid=${activeGuild.guildId}&q=${searchedRole}`,{cancelToken:new axios.CancelToken(c=>{
        cancelRoleReq=c;
      })}).then((res)=>{
        setRoles(res.data.roles);
      }).catch((err)=>{
        if(!axios.isCancel(err)&& err.response )
        {
          window.location=`/error/${err.response.status}`;
        }
      })
    }
  }, [searchedRole,activeGuild])
  useEffect(() => {
    if(cancelMemberReq)
    {
      cancelMemberReq();
    }
    if(activeGuild && status && discordData)
    {
      axios.get(`http://localhost:5000/discord/member?did=${did}&gid=${activeGuild.guildId}&q=${searchedMember}`,{cancelToken:new axios.CancelToken(c=>{
        cancelMemberReq=c;
      })}).then((res)=>{
        setMembers(res.data.members);
      }).catch((err)=>{
        if(!axios.isCancel(err) && err.response)
        {
          window.location=`/error/${err.response.status}`;
        }
      })
    }
  }, [searchedMember,activeGuild])
  const handleTextareaChange = (event) => {
    setMessage(event.target.value)
  };
  const handleClick=(id)=>{
      setActiveButton(id)
  }
  const handleToggleRightDiv=()=>{
    changeIsRightDivSliderButtonClicked(!isRightDivSliderButtonClicked)
  }
  const handleGuildButtonClick=(id)=>{
    setActiveGuild(discordData.find((e)=>e.guildId===id))
  }
  const handleChannelButtonClick=(id)=>{
    const channel=selectedChannels.find((e)=>e.channelId===id);
    if(!channel)
    {
      setSelectedChannels([...selectedChannels,channels.find(e=>e.channelId===id)])
    }
  }
  const handleRoleButtonClick=(id)=>{
    const role=selectedRoles.find((e)=>e.roleId===id);
    if(!role)
    {
      setSelectedRoles([...selectedRoles,roles.find(e=>e.roleId===id)])
    }
  }
  const handleMemberButtonClick=id=>{
    const member=selectedMembers.find((e)=>e.memberId===id);
    if(!member)
    {
      setSelectedMembers([...selectedMembers,members.find(e=>e.memberId===id)])
    }
  }
  const handleMessageSend=()=>{
    axios.post(`http://localhost:5000/discord/post?did=${did}&gid=${activeGuild.guildId}`,
    {message:message,selectedRoles:selectedRoles,selectedChannels:selectedChannels,selectedMembers:selectedMembers}).then(res=>{
      console.log(res);
    }).catch(err=>{

    })
  }
  return (
    <>
      <Navbar
        onUpdateMode={handleOnModeUpdate}
        userName={userName}
        userTag={userTag}
        imageSource={imageSource}
        status={status}
        handleLogout={handleLogout}
        isTemp={isTemp}
        loadingPercentage={loadingPercentage}
      />
      <div
        className="dashboard-full-div"
        style={{
          backgroundColor: mode === MODETYPE.DARK ? "#444" : "#cacacaca",
        }}
      >
        <div className="dashboard-content-div">
          <div className='dashboard-button-div'
            style={{
              backgroundColor: "#CDD0CB",
              width: leftDivWidthFull ? "100%" : "60%",
            }}
            >
            <CustomButton  className='dashboard-button-div__button' id={1} onClick={handleClick} style={{backgroundColor:activeButton===1?'#cacaca':'#555',color:activeButton===1?'#00afff':'#fff'}}>
              <FaDiscord className='dashboard-button-div__button__icon'/>
            </CustomButton>
            <CustomButton error={activeGuild?false:true} count={channels&&channels.length!=0?channels.length:null} className='dashboard-button-div__button' id={2}  onClick={handleClick}  style={{backgroundColor:activeButton===2?'#cacaca':'#555',color:activeButton===2?'#00afff':'#fff'}}>
              <GiWifiRouter className='dashboard-button-div__button__icon'/>
            </CustomButton>
            <CustomButton error={activeGuild?false:true} count={roles&&roles.length!=0?roles.length:null} className='dashboard-button-div__button' id={3} onClick={handleClick}  style={{backgroundColor:activeButton===3?'#cacaca':'#555',color:activeButton===3?'#00afff':'#fff'}}>
              <GiOfficeChair className='dashboard-button-div__button__icon'/>
            </CustomButton>
            <CustomButton error={activeGuild?false:true} className='dashboard-button-div__button' id={4} onClick={handleClick} style={{backgroundColor:activeButton===4?'#cacaca':'#555',color:activeButton===4?'#00afff':'#fff'}}>
              <IoIosMan className='dashboard-button-div__button__icon'/>
            </CustomButton>
            <CustomButton error={activeGuild?false:true} className='dashboard-button-div__button' id={5} onClick={handleClick} style={{backgroundColor:activeButton===5?'#cacaca':'#555',color:activeButton===5?'#00afff':'#fff'}}>
              <BsFillChatDotsFill className='dashboard-button-div__button__icon'/>
            </CustomButton>
            <CustomButton error={activeGuild?false:true} className='dashboard-button-div__button' id={6} onClick={handleClick} style={{backgroundColor:activeButton===6?'#cacaca':'#555',color:activeButton===6?'#00afff':'#fff'}}>
              <AiFillSetting  className='dashboard-button-div__button__icon'/>
            </CustomButton>
            {leftDivWidthFull && <CustomButton className='dashboard-button-div__button' id={7} onClick={handleToggleRightDiv}>
              <FaArrowAltCircleLeft  className='dashboard-button-div__button__icon'/>
            </CustomButton>}
            <span className='dashboard-button-div_underline'
              style={{left:`${bottomBarWidth*(activeButton-1)}%`,width:`${bottomBarWidth}%`}}
              ></span>
          </div>
          <div className="dashboard-leftright-wrapper-div">
            <div
              className="dashboard-left-div"
              style={{
                backgroundColor: mode === MODETYPE.DARK ? "#666" : "#CDD0CB",
                width: leftDivWidthFull ? "100%" : "60%",
              }}
            >
              <div className='dashboard-left-div__message-div'  style={{zIndex:activeButton===5?'1':'0'}}>
                <span className='dashboard-left-div-eachdiv__title'>message</span>
                <Wrapper label='title' isFocused={focusOne} classFulldiv='dashboard-left-div__message-div__title'>
                  <input onFocus={()=>{setFocusOne(true)}} onBlur={()=>{setFocusOne(false)}}></input>
                </Wrapper>
                <Wrapper label='message' isFocused={focusTwo} classFulldiv='dashboard-left-div__message-div__message'>
                  <textarea onFocus={()=>{setFocusTwo(true)}} onChange={handleTextareaChange} onBlur={()=>{setFocusTwo(false)}}></textarea>
                </Wrapper>
              </div>
              <div className='dashboard-left-div__guild-div' style={{zIndex:activeButton===1?'1':'0'}}>
                <div className='dashboard-left-div__guild-div__titile'>
                  <span>Selected server :</span>
                  {activeGuild?<GuildButton backgroundColor={activeGuild.guildColor} id={activeGuild.guildId} guildName={activeGuild.guildName} avatar={activeGuild.guildAvatar} onClick={()=>{}}/>:"none"}
                </div>
                <Wrapper label='discord servers' classFulldiv='dashboard-left-div__guild-div__result'>
                  <div className='dashboard-left-div__guild-div__result_wrapper'>
                    {discordData && discordData.map((e)=>{
                      return <GuildButton backgroundColor={e.guildColor} id={e.guildId} key={e.guildId} guildName={e.guildName} avatar={e.guildAvatar} onClick={handleGuildButtonClick}/>
                    })}
                  </div>
                </Wrapper>
              </div>
              <div className='dashboard-left-div__channel-div' style={{zIndex:activeButton===2?'1':'0'}}>
                <div className='dashboard-left-div__channel-div__info'>
                  <p>Channels<GiWifiRouter/> and Roles<GiOfficeChair/> have higher priority than members<IoIosMan/>.If a member with same channel and role is selected then the channel will be priortise first then the role and lastly the user.</p>
                  <p>Channels,roles and members marked with <RiErrorWarningFill style={{color:'yellow'}}/> are ignored</p>
                </div>
                <div className='dashboard-left-div__channel-div__content'>
                    <Wrapper isFocused={focusOne} label={focusOne?'search':'Search Channels'} classFulldiv='dashboard-left-div__channel-div__content-search'>
                      <input onFocus={()=>{setFocusOne(true)}} onBlur={()=>{setFocusOne(false)}} onChange={(e)=>{setSearchChannel(e.target.value)}} value={searchChannel}></input>
                    </Wrapper>
                    <Wrapper label='Channels' classFulldiv='dashboard-left-div__channel-div__content-result'>
                      <div className='dashboard-left-div__guild-div__result_wrapper'>
                        {channels && channels.map((c)=>{
                          return <ChannelButton style={{backgroundColor:c.channelColor}} name={c.channelName} id={c.channelId} key={c.channelId} onClick={handleChannelButtonClick} />
                        })}
                      </div>
                    </Wrapper>
                </div>
              </div>
              <div className='dashboard-left-div__role-div' style={{zIndex:activeButton===3?'1':'0'}}>
                <div className='dashboard-left-div__role-div__content'>
                      <Wrapper isFocused={focusOne} label={focusOne?'search':'Search Roles'} classFulldiv='dashboard-left-div__channel-div__content-search'>
                        <input onFocus={()=>{setFocusOne(true)}} onBlur={()=>{setFocusOne(false)}} onChange={(e)=>{setSearchedRole(e.target.value)}} value={searchedRole}></input>
                      </Wrapper>
                      <Wrapper label='roles' classFulldiv='dashboard-left-div__channel-div__content-result'>
                        <div className='dashboard-left-div__guild-div__result_wrapper'>
                          {roles && roles.map((c)=>{
                            return <ChannelButton style={{backgroundColor:c.roleColor,color:'#fff'}} name={c.roleName} id={c.roleId} key={c.roleId} onClick={handleRoleButtonClick} />
                          })}
                        </div>
                      </Wrapper>
                  </div>
              </div>
              <div className='dashboard-left-div__member-div' style={{zIndex:activeButton===4?'1':'0'}}>
                <div className='dashboard-left-div__channel-div__content'>
                      <Wrapper isFocused={focusOne} label={focusOne?'search':'Search members'} classFulldiv='dashboard-left-div__channel-div__content-search'>
                        <input onFocus={()=>{setFocusOne(true)}} onBlur={()=>{setFocusOne(false)}} onChange={(e)=>{setSearchedMember(e.target.value)}} value={searchedMember}></input>
                      </Wrapper>
                      <Wrapper label='roles' classFulldiv='dashboard-left-div__channel-div__content-result'>
                        <div className='dashboard-left-div__guild-div__result_wrapper'>
                          {members && members.map((c)=>{
                            return <MemberButton style={{backgroundColor:'#545454',color:'#fff'}} type='add' nickName={c.memberNickName} img={c.memberAvatar} userName={c.memberUserName} userTag={c.memberUserTag} id={c.memberId} key={c.memberId} onClick={handleMemberButtonClick} />
                          })}
                        </div>
                      </Wrapper>
                </div>
              </div>
              <div className='dashboard-left-div__final-div' style={{zIndex:activeButton===6?'1':'0'}}>
                <Wrapper label='date and time' classFulldiv='dashboard-left-div__final-div-datetime'>
                  <div className='dashboard-left-div__final-div-submit-datepicker'>
                    Pick a Date and Time
                    <DateTimePicker
                        onChange={onChange}
                        value={value}
                        minDate={minDate}
                        maxDate={maxDate}
                        disableClock={true}
                      />
                  </div>
                </Wrapper>
                <Wrapper label='submit' classFulldiv='dashboard-left-div__final-div-submit'>
                  <div className='dashboard-left-div__final-div-submit-preview'>
                    <div style={{ backgroundColor: checked ? '#00Afff' : '#cacaca' }} className='custom-checkbox' onClick={() => { setChecked(!checked) }}></div>
                    <p>I want the preview to be DM'ed me along with the conformation</p>
                  </div>
                  <button onClick={handleMessageSend} className='submit-button'>Send</button>
                </Wrapper>
              </div>
            </div>
            <div
              className="dashboard-right-div"
              style={{
                backgroundColor: mode === MODETYPE.DARK ? "#777" : "#cacaca",
                left:leftDivWidthFull?isRightDivSliderButtonClicked?'20%':'100%':'60%',
              }}
              >
              <Card
                contentHeight={getContentHeight(rightDrawerState, 1)}
                headerBackgroundColor="#eeedad"
                backgroundColor="teal"
                isOpen={rightDrawerState.isFirstDrawerOpen}
                top="0"
                headerTitle="members"
                onClick={() => {
                  if (
                    !rightDrawerState.isThirdDrawerOpen &&
                    !rightDrawerState.isSecondDrawerOpen
                  )
                    return;
                  rightDrawerDispatch({ rightDrawer: 1 });
                }}
                >
                {selectedMembers && selectedMembers.map((c)=>{
                  return (
                    <MemberButton
                      classNameChildrenDiv='card-memberbutton'
                      style={{ backgroundColor: "#545454", color: "#fff" }}
                      type="remove"
                      nickName={c.memberNickName}
                      img={c.memberAvatar}
                      userName={c.memberUserName}
                      userTag={c.memberUserTag}
                      id={c.memberId}
                      key={c.memberId}
                      onClick={(id) => {
                        setSelectedMembers(
                          selectedMembers.filter((e) => e.memberId != id)
                        );
                      }}
                    >
                      {c.isAdmin && <AdminIcon style={{padding:"0 5px",fontWeight:700}} />}
                      {foundRole(c.memberRoles,selectedRoles) && <AiFillWarning style={{color:'yellow',fontSize:"1rem"}} />}

                    </MemberButton>
                  );
                })}
              </Card>
              <Card
                contentHeight={getContentHeight(rightDrawerState, 2)}
                headerBackgroundColor="#555"
                backgroundColor="#cacaca"
                isOpen={rightDrawerState.isSecondDrawerOpen}
                top={getValue(calculateTop(rightDrawerState, 2), 2)}
                headerTitle="roles"
                onClick={() => {
                  if (
                    !rightDrawerState.isThirdDrawerOpen &&
                    !rightDrawerState.isFirstDrawerOpen
                  )
                    return;
                  rightDrawerDispatch({ rightDrawer: 2 });
                }}
              >
                {selectedRoles && selectedRoles.map(e=>{
                  return <TouchableCard id={e.roleId} title={<>{e.roleName}{e.isAdmin &&<AdminIcon />}</>} key={e.roleId} onClick={id=>{
                    setSelectedRoles(selectedRoles.filter(e=>e.roleId!=id))
                  }}/>
                })}
              </Card>
              <Card
                contentHeight={getContentHeight(rightDrawerState, 3)}
                headerBackgroundColor="skyblue"
                backgroundColor="#545454"
                isOpen={rightDrawerState.isThirdDrawerOpen}
                top={getValue(calculateTop(rightDrawerState, 3), 3)}
                headerTitle="channels"
                onClick={() => {
                  if (
                    !rightDrawerState.isFirstDrawerOpen &&
                    !rightDrawerState.isSecondDrawerOpen
                  )
                    return;
                  rightDrawerDispatch({ rightDrawer: 3 });
                }}
              >
                {selectedChannels && selectedChannels.map(e=>{
                  return <TouchableCard id={e.channelId} title={e.channelName} key={e.channelId} onClick={id=>{
                    setSelectedChannels(selectedChannels.filter(e=>e.channelId!=id))
                  }}/>
                })}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;