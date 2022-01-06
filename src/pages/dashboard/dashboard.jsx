import React, { useEffect, useReducer, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./dashboard.css";
import { FaDiscord, FaArrowAltCircleLeft } from "react-icons/fa";
import { BsFillChatDotsFill } from "react-icons/bs";
import { IoIosMan } from "react-icons/io";
import { GiOfficeChair, GiWifiRouter } from "react-icons/gi";
import { AiFillSetting, AiFillWarning } from "react-icons/ai";
import Wrapper from "../../component/inputComponents/MultilineInputComponent";
import CustomButton from './components/customButtom/customButton';
import Card from '../../component/rightDrawerCardDiv/cardDiv';
import GuildButton from './components/guildButton/guildButton';
import TouchableCard from "../../component/userCard/userCard";
import axios from 'axios'
import ChannelButton from "./components/channelButton/channelButton";
import AdminIcon from "./components/adminIcon/adminIcon";
import MemberButton from "./components/memberButton/memberButton";
import Cookies, { set } from "js-cookie";
import Switch from "../../component/switch/switch";
import Footer from "../../component/footer/footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from "./components/input/input";

const type = {
  channel: 'CHANNEL',
  dm: 'DM'
}
var newDate = new Date();
var numberOfDaysToAdd = 14;
newDate.setDate(newDate.getDate() + numberOfDaysToAdd);
const calcTimeString = (date) => {
  return (
    date.getFullYear() + "-" +
    `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`}` + '-' +
    `${date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`}` + "T" +
    `${date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`}` + ':' +
    `${date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`}`
  )
}
const extractTimeFromString = (string) => {
  return (
    new Date(`${string.split("T")[0]} ${string.split("T")[1]}:00`.replace(/-/g, "/"))
  )
}
const getContentHeight = (state, drawerNumber) => {
  if (drawerNumber === 1) {
    if (state.isSecondDrawerOpen && state.isThirdDrawerOpen)
      return '28%';
    if (state.isSecondDrawerOpen && !state.isThirdDrawerOpen)
      return '28%';
    if (!state.isSecondDrawerOpen && state.isThirdDrawerOpen)
      return '28%';
    else
      return '85%';
  }
  else if (drawerNumber === 2) {
    if (state.isFirstDrawerOpen && state.isThirdDrawerOpen)
      return '28%';
    if (!state.isFirstDrawerOpen && state.isThirdDrawerOpen)
      return '28%';
    else if (state.isFirstDrawerOpen && !state.isThirdDrawerOpen)
      return '55%';
    else
      return '85%'
  }
  else {
    if (state.isFirstDrawerOpen && state.isSecondDrawerOpen)
      return '28%';
    if (!state.isFirstDrawerOpen && !state.isSecondDrawerOpen)
      return '85%';
    else
      return '61%'
  }

}
const getValue = (term, div) => {
  if (div === 2) {
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
  else {
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
const calculateTop = (state, div) => {
  if (div === 2) {
    if (state.isSecondDrawerOpen) {
      if (state.isFirstDrawerOpen && state.isThirdDrawerOpen)
        return 'equal';
      else if (!state.isFirstDrawerOpen && state.isThirdDrawerOpen)
        return 'open-above'
      else if (state.isFirstDrawerOpen && !state.isThirdDrawerOpen)
        return 'open-below'
      else
        return 'open-full'
    }
    else {
      if (state.isFirstDrawerOpen && !state.isThirdDrawerOpen)
        return 'close-below';
      if (!state.isFirstDrawerOpen && state.isThirdDrawerOpen)
        return 'close-above'
      else
        return 'close'
    }
  }
  else if (div === 3) {
    if (state.isThirdDrawerOpen) {
      if (state.isFirstDrawerOpen && state.isSecondDrawerOpen)
        return 'equal';
      else if (!state.isFirstDrawerOpen && state.isSecondDrawerOpen)
        return 'open-above'
      if (state.isFirstDrawerOpen && !state.isSecondDrawerOpen)
        return 'open-above'
      return 'open-full'
    }
    else {
      if (!state.isFirstDrawerOpen && !state.isSecondDrawerOpen)
        return 'open-full'
      if (!state.isFirstDrawerOpen && state.isSecondDrawerOpen)
        return 'close-full'
      else
        return 'close-full';
    }
  }
}
const rightReducer = (state, action) => {
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
const foundRole = (userRoles, roles) => {
  for (let i = 0; i < roles.length; i++) {
    const e = roles[i];
    for (let j = 0; j < userRoles.length; j++) {
      if (userRoles[j] === e.roleId)
        return e;
    }
  }
  return null;
}
let cancelMemberReq;


function Dashboard({mode,MODETYPE}) {
  const timer = useRef(null)
  const [counter, setCounter] = useState(0)
  const today = useRef(new Date());
  const maxDate = useRef(newDate);
  let { uid, did } = useParams();
  const [messageType, setMessageType] = useState(type.channel);
  const [selectedTime, setSelectedTime] = useState(calcTimeString(today.current));
  const [rightDivVisible, setRightDivVisible] = useState(
    window.innerWidth > 900 ? true : false
  );
  const [leftDivWidthFull, setLeftDivWidthFull] = useState(
    window.innerWidth > 900 ? false : true
  );
  const [bottomBarWidth, setBottomBarWidth] = useState(window.innerWidth < 900 ? '14.28571' : '16.667')
  const [activeButton, setActiveButton] = useState(1)
  const [isRightDivSliderButtonClicked, changeIsRightDivSliderButtonClicked] =
    useState(false);
  const [activeGuild, setActiveGuild] = useState()
  const [focusOne, setFocusOne] = useState(false);
  const [focusTwo, setFocusTwo] = useState(false);
  const [rightDrawerState, rightDrawerDispatch] = useReducer(rightReducer, {
    isFirstDrawerOpen: true,
    isSecondDrawerOpen: true,
    isThirdDrawerOpen: true,
  });
  const [status, setStatus] = useState(
    Cookies.get('temp_id') || Cookies.get('id') ? true : false
  ); //logged in
  const [imageSource, setImageSource] = useState(
    Cookies.get('temp_id') ? Cookies.get("temp_avatar") : Cookies.get('id') ? Cookies.get("avatar") : null
  );
  const [userName, setUserName] = useState(
    Cookies.get('temp_id') ? Cookies.get("temp_userName") : Cookies.get('id') ? Cookies.get("userName") : null
  );
  const [userTag, setUserTag] = useState(
    Cookies.get('temp_id') ? Cookies.get("temp_userTag") : Cookies.get('id') ? Cookies.get("userTag") : null
  );
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [discordData, setDiscordData] = useState(null);

  const [allChannels, setAllChannels] = useState([]);
  const [channels, setChannels] = useState(null);
  const [searchChannel, setSearchChannel] = useState('');
  const [selectedChannels, setSelectedChannels] = useState([])
  
  const [allRoles, setAllRoles] = useState([]);
  const [roles, setRoles] = useState(null)
  const [searchedRole, setSearchedRole] = useState('')
  const [selectedRoles, setSelectedRoles] = useState([])

  const [members, setMembers] = useState([])
  const [searchedMember, setSearchedMember] = useState('')
  const [selectedMembers, setSelectedMembers] = useState([])

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const [checked, setChecked] = useState(true)//getting the dm
  const [isReady, setIsReady] = useState(false)//ready to be sent
  useEffect(() => {
    timer.current = setInterval(() => {
      setCounter((state) => state + 1)
    }, 1000);
    return () => {
      clearInterval(timer.current)
    }
  }, [])
  useEffect(() => {
    if (extractTimeFromString(selectedTime) < new Date()) {
      setSelectedTime(calcTimeString(new Date()))
    }
    return () => {

    }
  }, [counter])
  //temp user
  useEffect(() => {
    if (uid === 'undefined' || did === 'undefined') window.location = `${process.env.REACT_APP_BACKENDAPI}auth/discord`;
    axios.get(`${process.env.REACT_APP_BACKENDAPI}user/info?uid=${uid}&did=${did}`).then(res => {

    }).catch(e => {

    })
  }, []);
  //managing the right div size
  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth > 900 ? setBottomBarWidth(16.667) : setBottomBarWidth(14.28571)
      window.innerWidth > 900
        ? setRightDivVisible(true)
        : setRightDivVisible(false);

    });
    window.addEventListener("resize", () => {
      window.innerWidth > 900
        ? setLeftDivWidthFull(false)
        : setLeftDivWidthFull(true)
    });
    return () => {
      // window.removeEventListener('resize');
    }
  }, []);
  useEffect(() => {
    if (status) {
      axios.get(`${process.env.REACT_APP_BACKENDAPI}discord/permission?did=${did}`).then((res) => {
        setDiscordData(res.data.guilds)
      }).catch((err) => {
        // window.location=`/error/${err.response.status}`
      });

    }
  }, [status])
  useEffect(() => {
    setSelectedRoles([])
    setSelectedMembers([])
    setSelectedChannels([])
  }, [activeGuild])
  useEffect(() => {
    if (activeGuild && status && discordData) {
      axios.get(`${process.env.REACT_APP_BACKENDAPI}discord/channel?did=${did}&gid=${activeGuild.guildId}`).then((res) => {
        setAllChannels(res.data.channels);
        setChannels(res.data.channels);
      }).catch((err) => {

      })
      axios.get(`${process.env.REACT_APP_BACKENDAPI}discord/role?did=${did}&gid=${activeGuild.guildId}`).then((res) => {
        setAllRoles(res.data.roles);
        setRoles(res.data.roles);
      }).catch((err) => {

      })
    }
  }, [activeGuild]);
  useEffect(() => {
    let validChannels = [];
    if (searchChannel === "") {
      setChannels(allChannels);
      return;
    }
    allChannels.forEach(i => {
      const exp = new RegExp(searchChannel, 'gi');
      if (exp.test(i.channelName)) {
        validChannels.push(i)
      }
    });
    setChannels(validChannels);
  }, [searchChannel])
  useEffect(() => {
    let validRoles = [];
    if (searchedRole === "") {
      setRoles(allRoles);
      return;
    }
    allRoles.forEach(i => {
      const exp = new RegExp(searchedRole, 'gi');
      if (exp.test(i.roleName)) {
        validRoles.push(i)
      }
    });
    setRoles(validRoles);
  }, [searchedRole])

  useEffect(() => {
    if (cancelMemberReq) {
      cancelMemberReq();
    }
    if (activeGuild && status && discordData) {
      axios.get(`${process.env.REACT_APP_BACKENDAPI}discord/member?did=${did}&gid=${activeGuild.guildId}&q=${searchedMember}`, {
        cancelToken: new axios.CancelToken(c => {
          cancelMemberReq = c;
        })
      }).then((res) => {
        setMembers(res.data.members);
        console.log(res);
      }).catch((err) => {
        if (!axios.isCancel(err) && err.response) {
          window.location = `/error/${err.response.status}`;
        }
      })
    }
  }, [searchedMember, activeGuild])
  useEffect(() => {
    if (selectedMembers.length === 0 && selectedChannels.length === 0 && selectedRoles.length === 0) {
      setIsReady(false);
    }
  }, [selectedChannels, selectedMembers, selectedRoles])
  const firstTimeToast = useRef(true)
  useEffect(() => {
    setSelectedChannels([]);
    setSelectedRoles([]);
    if (firstTimeToast.current) {
      firstTimeToast.current = false;
      return;
    }
    toast.info(`Switching to ${messageType.toUpperCase()} type`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }, [messageType])
  const handleTextareaChange = (event) => {
    setMessage(event.target.value)
  };
  const handleClick = (id) => {
    setActiveButton(id)
  }
  const handleSwitchChange = (side) => {
    if (side === 'LEFT')
      setMessageType(type.channel)
    else
      setMessageType(type.dm)
  }
  const handleToggleRightDiv = () => {
    changeIsRightDivSliderButtonClicked(!isRightDivSliderButtonClicked)
  }
  const handleGuildButtonClick = (id) => {
    setActiveGuild(discordData.find((e) => e.guildId === id))
  }
  const handleChannelButtonClick = (id) => {
    if (messageType === type.channel) {
      const channel = selectedChannels.find((e) => e.channelId === id);
      if (!channel) {
        setSelectedChannels([...selectedChannels, channels.find(e => e.channelId === id)])
      }
    }
  }
  const handleRoleButtonClick = (id) => {
    if (messageType === type.channel) {
      const role = selectedRoles.find((e) => e.roleId === id);
      if (!role) {
        setSelectedRoles([...selectedRoles, roles.find(e => e.roleId === id)])
      }
    }
  }
  const handleMemberButtonClick = id => {
    const member = selectedMembers.find((e) => e.memberId === id);
    if (!member) {
      setSelectedMembers([...selectedMembers, members.find(e => e.memberId === id)])
    }
  }
  const handleMessageSend = () => {
    if (!activeGuild) {
      return;
    }
    if (messageType === type.channel) {
      if (selectedChannels.length === 0) {
        toast.error('please select atleast a channel', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
    }
    if (messageType === type.dm) {
      if (selectedMembers.length === 0) {
        toast.error('please select atleast a member', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
    }
    if (title.trim().length <= 3) {
      toast.warn('please add a title', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (message.trim().length <= 3) {
      toast.error('message field cannot be left empty', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (activeGuild && (selectedChannels || selectedMembers || selectedRoles)) {
      const id = toast.loading('please wait...');
      axios
        .post(
          `${process.env.REACT_APP_BACKENDAPI}discord/post?did=${did}&gid=${activeGuild.guildId}`,
          {
            title: title,
            message: message,
            selectedRoles: selectedRoles,
            selectedChannels: selectedChannels,
            selectedMembers: selectedMembers,
            selectedTime: extractTimeFromString(selectedTime),
            preview: checked,
            type: messageType
          }
        )
        .then((res) => {
          if (res.status === 200) {
            toast.update(id, { render: "message timmed", type: "success", isLoading: false,autoClose: 3000,draggable:true });
          }
        })
        .catch((err) => {
          toast.update(id, { render: "unknow error-try again", type: "error", isLoading: false, autoClose: 3000,draggable:true });
        });
    }
  }
  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value)
  }
  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={mode === MODETYPE.DARK ? 'dark' : 'light'}
        style={{ fontSize: ".9rem" }}
      />
      <div
        className="dashboard-full-div" style={{ backgroundColor: mode === MODETYPE.DARK ? "#444" : "#cacacaca", }}>
        <div className="dashboard-content-div">
          <div className='dashboard-button-div'
            style={{
              backgroundColor: "#CDD0CB",
              width: leftDivWidthFull ? "100%" : "60%",
            }}
          >
            <CustomButton className='dashboard-button-div__button' id={1} onClick={handleClick} style={{ backgroundColor: activeButton === 1 ? '#cacaca' : '#555', color: activeButton === 1 ? '#00afff' : '#fff' }}>
              <FaDiscord className='dashboard-button-div__button__icon' />
            </CustomButton>
            <CustomButton error={activeGuild ? messageType === type.channel ? false : true : true} count={channels && channels.length != 0 ? channels.length : null} className='dashboard-button-div__button' id={2} onClick={handleClick} style={{ backgroundColor: activeButton === 2 ? '#cacaca' : '#555', color: activeButton === 2 ? '#00afff' : '#fff' }}>
              <GiWifiRouter className='dashboard-button-div__button__icon' />
            </CustomButton>
            <CustomButton error={activeGuild ? messageType === type.channel ? false : true : true} count={roles && roles.length != 0 ? roles.length : null} className='dashboard-button-div__button' id={3} onClick={handleClick} style={{ backgroundColor: activeButton === 3 ? '#cacaca' : '#555', color: activeButton === 3 ? '#00afff' : '#fff' }}>
              <GiOfficeChair className='dashboard-button-div__button__icon' />
            </CustomButton>
            <CustomButton error={activeGuild ? false : true} className='dashboard-button-div__button' id={4} onClick={handleClick} style={{ backgroundColor: activeButton === 4 ? '#cacaca' : '#555', color: activeButton === 4 ? '#00afff' : '#fff' }}>
              <IoIosMan className='dashboard-button-div__button__icon' />
            </CustomButton>
            <CustomButton error={activeGuild ? false : true} className='dashboard-button-div__button' id={5} onClick={handleClick} style={{ backgroundColor: activeButton === 5 ? '#cacaca' : '#555', color: activeButton === 5 ? '#00afff' : '#fff' }}>
              <BsFillChatDotsFill className='dashboard-button-div__button__icon' />
            </CustomButton>
            <CustomButton error={activeGuild ? false : true} className='dashboard-button-div__button' id={6} onClick={handleClick} style={{ backgroundColor: activeButton === 6 ? '#cacaca' : '#555', color: activeButton === 6 ? '#00afff' : '#fff' }}>
              <AiFillSetting className='dashboard-button-div__button__icon' />
            </CustomButton>
            {leftDivWidthFull && <CustomButton className='dashboard-button-div__button' id={7} onClick={handleToggleRightDiv}>
              <FaArrowAltCircleLeft className='dashboard-button-div__button__icon' />
            </CustomButton>}
            <span className='dashboard-button-div_underline'
              style={{ left: `${bottomBarWidth * (activeButton - 1)}%`, width: `${bottomBarWidth}%` }}
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
              <div className='dashboard-left-div__message-div' style={{ zIndex: activeButton === 5 ? '1' : '0' }}>

                <span className='dashboard-left-div-eachdiv__title'>message</span>
                <Wrapper label='title' isFocused={focusOne} classFulldiv='dashboard-left-div__message-div__title'>
                  <input onFocus={() => { setFocusOne(true) }} onBlur={() => { setFocusOne(false) }} value={title} onChange={(e) => { setTitle(e.target.value) }}></input>
                </Wrapper>
                <Wrapper label='message' isFocused={focusTwo} classFulldiv='dashboard-left-div__message-div__message'>
                  <textarea onFocus={() => { setFocusTwo(true) }} onChange={handleTextareaChange} onBlur={() => { setFocusTwo(false) }}></textarea>
                </Wrapper>
              </div>
              <div className='dashboard-left-div__guild-div' style={{ zIndex: activeButton === 1 ? '1' : '0' }}>
                <div className='dashboard-left-div__channel-div__info' style={{ color: mode === MODETYPE.DARK ? '#fff' : 'black' }}>
                  <p>select <GiWifiRouter /> to send a message a channel and <IoIosMan /> to DM a perticular member from discord.Select <GiOfficeChair /> to tag a role [can only be used while sending a message to a channel]</p>
                </div>
                <div className='dashboard-left-div__guild-div__titile'>
                  <div className='dashboard-left-div__guild-div-select-div'>
                    <span>Selected server :</span>
                    {activeGuild ? <GuildButton mode={mode} MODETYPE={MODETYPE} backgroundColor={activeGuild.guildColor} id={activeGuild.guildId} guildName={activeGuild.guildName} avatar={activeGuild.guildAvatar} onClick={() => { }} /> : "none"}
                  </div>
                  <Switch left='Channel' right='DM' onChange={handleSwitchChange} />
                </div>
                <Wrapper label='discord servers' classFulldiv='dashboard-left-div__guild-div__result'>
                  <div className='dashboard-left-div__guild-div__result_wrapper'>
                    {discordData && discordData.map((e) => {
                      return <GuildButton mode={mode} MODETYPE={MODETYPE} backgroundColor={e.guildColor} id={e.guildId} key={e.guildId} guildName={e.guildName} avatar={e.guildAvatar} onClick={handleGuildButtonClick} />
                    })}
                  </div>
                </Wrapper>
              </div>
              <div className='dashboard-left-div__channel-div' style={{ zIndex: activeButton === 2 ? '1' : '0' }}>
                <div className='dashboard-left-div__channel-div__content'>
                  <Input mode={mode} MODETYPE={MODETYPE} placeholder={`Search Channels`} onChange={(e) => { setSearchChannel(e.target.value) }} value={searchChannel}></Input>
                  <Wrapper label='Channels' classFulldiv='dashboard-left-div__channel-div__content-result'>
                    <div className='dashboard-left-div__guild-div__result_wrapper'>
                      {channels && channels.map((c) => {
                        return <ChannelButton mode={mode} MODETYPE={MODETYPE} name={c.channelName} id={c.channelId} key={c.channelId} onClick={handleChannelButtonClick} />
                      })}
                    </div>
                  </Wrapper>
                </div>
              </div>
              <div className='dashboard-left-div__role-div' style={{ zIndex: activeButton === 3 ? '1' : '0' }}>
                <div className='dashboard-left-div__role-div__content'>
                  <Input mode={mode} MODETYPE={MODETYPE} placeholder={`Search roles`} onChange={(e) => { setSearchedRole(e.target.value) }} value={searchedRole}></Input>
                  <Wrapper label='roles' classFulldiv='dashboard-left-div__channel-div__content-result'>
                    <div className='dashboard-left-div__guild-div__result_wrapper'>
                      {roles && roles.map((c) => {
                        return <ChannelButton mode={mode} MODETYPE={MODETYPE} style={{ backgroundColor: c.roleColor, color: '#fff' }} name={c.roleName} id={c.roleId} key={c.roleId} onClick={handleRoleButtonClick} />
                      })}
                    </div>
                  </Wrapper>
                </div>
              </div>
              <div className='dashboard-left-div__member-div' style={{ zIndex: activeButton === 4 ? '1' : '0' }}>
                <div className='dashboard-left-div__channel-div__content'>
                  <Input mode={mode} MODETYPE={MODETYPE} placeholder={`Search members`} onChange={(e) => { setSearchedMember(e.target.value) }} value={searchedMember}></Input>
                  <Wrapper label='members' classFulldiv='dashboard-left-div__channel-div__content-result'>
                    <div className='dashboard-left-div__guild-div__result_wrapper'>
                      {members && members.map((c) => {
                        return <MemberButton mode={mode} MODETYPE={MODETYPE} style={{ backgroundColor: '#545454', color: '#fff' }} type='add' nickName={c.memberNickName} img={c.memberAvatar} userName={c.memberUserName} userTag={c.memberUserTag} id={c.memberId} key={c.memberId} onClick={handleMemberButtonClick} />
                      })}
                    </div>
                  </Wrapper>
                </div>
              </div>
              <div className='dashboard-left-div__final-div' style={{ zIndex: activeButton === 6 ? '1' : '0' }}>
                <Wrapper label='date and time' classFulldiv='dashboard-left-div__final-div-datetime'>
                  <div className='dashboard-left-div__final-div-submit-datepicker'>
                    Pick a Date and Time
                  </div>
                  <div className='dashboard-left-div__final-div-submit-datepicker'>
                    <input
                      type="datetime-local"
                      value={selectedTime}
                      min={calcTimeString(today.current)}
                      max={calcTimeString(maxDate.current)}
                      onChange={handleTimeChange}
                      className='input-time-date'
                      style={{ backgroundColor: mode === MODETYPE.DARK ? '#cacaca' : '#ECECEC' }}
                    />
                  </div>
                </Wrapper>
                <Wrapper label='submit' classFulldiv='dashboard-left-div__final-div-submit'>
                  <div className='dashboard-left-div__final-div-submit-preview'>
                    <div style={{ backgroundColor: isReady ? '#00afff' : '#cacaca' }} className='custom-checkbox' onClick={() => {
                      if (activeGuild && (selectedChannels.length > 0 || selectedMembers.length > 0 || selectedRoles.length > 0)) {
                        setIsReady(!isReady);
                        return;
                      }
                      setIsReady(false);
                    }}></div>
                    <p>click this checkbox in order to continued</p>
                  </div>
                  <div className='dashboard-left-div__final-div-submit-preview'>
                    <div style={{ backgroundColor: checked ? '#00Afff' : '#cacaca' }} className='custom-checkbox' onClick={() => { setChecked(!checked) }}></div>
                    <p>I want the preview of the message to be DM'ed me along with the conformation</p>
                  </div>
                  <div className='dashboard-left-div__final-div-submit-preview'>
                    <button onClick={handleMessageSend} style={{ background: isReady ? '#00cc00' : '#cacaca' }} className='submit-button'>Send</button>
                  </div>
                </Wrapper>
              </div>
            </div>
            <div
              className="dashboard-right-div"
              style={{
                backgroundColor: mode === MODETYPE.DARK ? "#777" : "#cacaca",
                left: leftDivWidthFull ? isRightDivSliderButtonClicked ? '20%' : '100%' : '60%',
              }}
            >
              <Card
                contentHeight={getContentHeight(rightDrawerState, 1)}
                textColor={mode === MODETYPE.DARK ? '#fff' : '#000'}
                headerBackgroundColor={mode === MODETYPE.DARK ? '#333' : '#666'}
                backgroundColor={mode === MODETYPE.DARK ? '#555' : '#cacaca'}
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
                {selectedMembers && selectedMembers.map((c) => {
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
                      mode={mode} MODETYPE={MODETYPE}
                      onClick={(id) => {
                        setSelectedMembers(
                          selectedMembers.filter((e) => e.memberId != id)
                        );
                      }}
                    >
                      {c.isAdmin && <AdminIcon style={{ padding: "0 5px", fontWeight: 700 }} />}
                      {foundRole(c.memberRoles, selectedRoles) && <AiFillWarning style={{ color: 'yellow', fontSize: "1rem" }} />}

                    </MemberButton>
                  );
                })}
              </Card>
              <Card
                contentHeight={getContentHeight(rightDrawerState, 2)}
                textColor={mode === MODETYPE.DARK ? '#fff' : '#000'}
                headerBackgroundColor={mode === MODETYPE.DARK ? '#333' : '#666'}
                backgroundColor={mode === MODETYPE.DARK ? '#555' : '#cacaca'}
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
                {selectedRoles && selectedRoles.map(e => {
                  return <TouchableCard id={e.roleId} title={<>{e.roleName}{e.isAdmin && <AdminIcon />}</>} key={e.roleId} onClick={id => {
                    setSelectedRoles(selectedRoles.filter(e => e.roleId != id))
                  }} />
                })}
              </Card>
              <Card
                contentHeight={getContentHeight(rightDrawerState, 3)}
                textColor={mode === MODETYPE.DARK ? '#fff' : '#000'}
                headerBackgroundColor={mode === MODETYPE.DARK ? '#333' : '#666'}
                color={mode === MODETYPE.DARK ? '#cacaca' : '#222'}
                backgroundColor={mode === MODETYPE.DARK ? '#555' : '#cacaca'}
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
                {selectedChannels && selectedChannels.map(e => {
                  return <TouchableCard id={e.channelId} title={e.channelName} key={e.channelId} onClick={id => {
                    setSelectedChannels(selectedChannels.filter(e => e.channelId != id))
                  }} />
                })}
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer mode={mode} MODETYPE={MODETYPE} />
    </div>
  );
}
export default Dashboard;