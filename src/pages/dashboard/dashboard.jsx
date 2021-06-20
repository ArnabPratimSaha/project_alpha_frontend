import React, { useEffect, useReducer, useRef, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../../component/navbar/navbar";
import useMode from "../../customhooks/useMode";
import "./dashboard.css";
import { MdArrowDropDownCircle } from "react-icons/md";
import {configButtonColor} from './components/configButtonColor';
import MultilineInputComponent from "../../component/inputComponents/MultilineInputComponent";
import Card from '../../component/rightDrawerCardDiv/cardDiv';
import axios from 'axios'

import DateTimePicker from "react-datetime-picker";
import Cookies, { set } from "js-cookie";
var maxDate = new Date();
var numberOfDaysToAdd = 6;
maxDate.setDate(maxDate.getDate() + numberOfDaysToAdd);

var minDate = new Date();
minDate.setDate(minDate.getDate() - 1);
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
const initialState = {
  btnOneStatus: true,
  btnTwoStatus: false,
  btnThreeStatus: false,
};
const reducer = (state, action) => {
  switch (action.btnNumber) {
    case "ONE":
      return { btnOneStatus: true, btnTwoStatus: false, btnThreeStatus: false };
    case "TWO":
      return { btnOneStatus: false, btnTwoStatus: true, btnThreeStatus: false };
    case "THREE":
      return { btnOneStatus: false, btnTwoStatus: false, btnThreeStatus: true };
    default:
      return state;
  }
};
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
function Dashboard(props) {
  let { uid, sid,did } = useParams();
  const [mode, changeMode, MODETYPE, updateMode] = useMode();
  const [value, onChange] = useState(new Date());
  const [rightDivPosition, changeRightDivPosition] = useState(
    window.innerWidth > 900 ? 60 : 100
  );
  const [isRightDivSliderButtonClicked, changeIsRightDivSliderButtonClicked] =
    useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [focusThree,setFocusThree]=useState(false);
  const [focusFour,setFocusFour]=useState(false);
  const data=useRef()
  const [rightDrawerState,rightDrawerDispatch]=useReducer(rightReducer,{
    isFirstDrawerOpen:true,
    isSecondDrawerOpen:true,
    isThirdDrawerOpen:true
  });
  const [status, setStatus] = useState(sid==='null'&&Cookies.get('id')?true:false); //logged in
  const [isTemp, setIsTemp] = useState(sid==='null'&&Cookies.get('id')?false:true); //logged in
  const [imageSource, setImageSource] = useState(sid==='null'&&Cookies.get('avatar')?Cookies.get('avatar'):null);
  const [userName, setUserName] = useState(sid==='null'&&Cookies.get('userName')?Cookies.get('userName'):false);
  const [userTag, setUserTag] = useState(sid==='null'&&Cookies.get('userTag')?Cookies.get('userTag'):false);
  const [loadingPercentage,setLoadingPercentage]=useState(0);
  useEffect(() => {
    if(sid!=='null' && uid==='null' && Cookies.get('discordId')!==undefined && did===Cookies.get('discordId'))
    {
      setIsTemp(false);
      setStatus(true);
      setUserName(Cookies.get('userName'))
      setImageSource(Cookies.get('avatar'))
      setUserTag(Cookies.get('userTag'))
    }
    if(sid!=='null')
    {
      setLoadingPercentage(.2)
      axios.get(`http://localhost:5000/link/info?did=${did}&sid=${sid}`).then((res)=>{
        setLoadingPercentage(1)
        if(res.status===200)
        {
          data.current =JSON.parse(res.data)
          if(data.current)
          {
            setStatus(true);
            setIsTemp(true);
            setUserName(data.current.userName);
            setUserTag(data.current.userTag);
            setImageSource(`https://cdn.discordapp.com/avatars/${data.current.discordId}/${data.current.avatar}`)
          }
        }
        setTimeout(() => {
          setLoadingPercentage(0)
        }, 200);
      }).catch((error)=>{
        window.location=`/error/${error.response.status}`
      })
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
      changeIsRightDivSliderButtonClicked(false);
      window.innerWidth > 900
        ? changeRightDivPosition(60)
        : changeRightDivPosition(100);
    });
  }, []);
  const onTextareaChange = (event) => {
    const textArea = document.getElementsByName("messagearea")[0];
    // textArea.style.height = (textArea.value.split(/\r*\n/).length) * 1.5.toLocaleString() + "rem";
  };
  const onTextareaFocus = (e) => {
    if (e.target.name === "messagearea") {
      const div = document.getElementsByClassName(
        "dashboard-message-input-wrapper"
      )[0];
      div.style.boxShadow = "5px 5px 6px #444";
      div.style.backgroundColor = mode === MODETYPE.DARK ? "#777" : "#e6e6e6";
      div.style.border = "3px solid #fff";
    }
    if (e.target.name === "messagetitle") {
      const div = document.getElementsByClassName(
        "dashboard-message-div__info"
      )[0];
      div.style.boxShadow = "5px 5px 6px #444";
      div.style.backgroundColor = mode === MODETYPE.DARK ? "#777" : "#e6e6e6";
      div.style.border = "3px solid #fff";
    }
  };
  const handleBlur = (e) => {
    if (e.target.name === "messagearea") {
      const div = document.getElementsByClassName(
        "dashboard-message-input-wrapper"
      )[0];
      div.style.boxShadow = "none";
      div.style.border = "1px solid #000";
      div.style.backgroundColor = "transparent";
    }
    if (e.target.name === "messagetitle") {
      const div = document.getElementsByClassName(
        "dashboard-message-div__info"
      )[0];
      div.style.boxShadow = "none";
      div.style.backgroundColor = "transparent";
      div.style.border = "1px solid #000";
    }
  };
  const handleTogglerClick = () => {
    changeIsRightDivSliderButtonClicked(!isRightDivSliderButtonClicked);
    !isRightDivSliderButtonClicked
      ? changeRightDivPosition(20)
      : changeRightDivPosition(100);
  };
  const handleTabButtonClick = (e) => {
    const messageDiv = document.getElementsByClassName(
      "dashboard-message-div"
    )[0];
    const memberDiv = document.getElementsByClassName(
      "dashboard-memberselect-div"
    )[0];
    const roleDiv = document.getElementsByClassName(
      "dashboard-roleselect-div"
    )[0];
    if (e.target.name === "message") {
      if (state.btnOneStatus) return;
      messageDiv.style.zIndex = "2";
      memberDiv.style.zIndex = "1";
      roleDiv.style.zIndex = "1";
      dispatch({ btnNumber: "ONE" });
    } else if (e.target.name === "members") {
      if (state.btnTwoStatus) return;
      messageDiv.style.zIndex = "1";
      memberDiv.style.zIndex = "2";
      roleDiv.style.zIndex = "1";
      dispatch({ btnNumber: "TWO" });
    } else {
      if (state.btnThreeStatus) return;
      messageDiv.style.zIndex = "1";
      memberDiv.style.zIndex = "1";
      roleDiv.style.zIndex = "2";
      dispatch({ btnNumber: "THREE" });
    }
  };
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
          <div className="dashboard-toggle-button">
            <MdArrowDropDownCircle
              className="dashboard-toggle-button__icon"
              onClick={handleTogglerClick}
              style={{
                transform: `translateY(-50%) rotateZ(${
                  isRightDivSliderButtonClicked ? `-90deg` : `90deg`
                })`,
              }}
            />
          </div>
          <div
            className="dashboard-left-div"
            style={{
              backgroundColor: mode === MODETYPE.DARK ? "#666" : "#CDD0CB",
            }}
          >
            <div className="dashboard-button-div">
              <div
                className="dashboard-label"
                style={{
                  backgroundColor: mode === MODETYPE.DARK ? "#666" : "#f2f2f2",
                }}
              >
                <p>members & roles</p>
              </div>
              <button
                type="button"
                name="message"
                className="dashboard-button-div__message"
                onClick={handleTabButtonClick}
                style={{
                  ...configButtonColor(state.btnOneStatus, mode),
                  fontWeight: 600,
                }}
              >
                message
              </button>
              <button
                type="button"
                name="members"
                className="dashboard-button-div__members"
                onClick={handleTabButtonClick}
                style={{
                  ...configButtonColor(state.btnTwoStatus, mode),
                  fontWeight: 600,
                }}
              >
                members
              </button>
              <button
                type="button"
                name="rolesandchannels"
                className="dashboard-button-div__rolesandchannels"
                onClick={handleTabButtonClick}
                style={{
                  ...configButtonColor(state.btnThreeStatus, mode),
                  fontWeight: 600,
                }}
              >
                roles & channels
              </button>
            </div>
            <div
              className="dashboard-message-div"
              style={{
                backgroundColor: mode === MODETYPE.DARK ? "#666" : "#f2f2f2",
              }}
            >
              <div className="dashboard-message-div__info">
                <div
                  className="dashboard-label"
                  style={{
                    backgroundColor:
                      mode === MODETYPE.DARK ? "#666" : "#f2f2f2",
                  }}
                >
                  <p>message title</p>
                </div>
                <input
                  type="text"
                  name="messagetitle"
                  onFocus={onTextareaFocus}
                  onBlur={handleBlur}
                ></input>
              </div>
              <div className="dashboard-message-input-wrapper">
                <div
                  className="dashboard-label"
                  style={{
                    backgroundColor:
                      mode === MODETYPE.DARK ? "#666" : "#f2f2f2",
                  }}
                >
                  <p>message body</p>
                </div>
                <textarea
                  name="messagearea"
                  onChange={onTextareaChange}
                  onFocus={onTextareaFocus}
                  onBlur={handleBlur}
                ></textarea>
              </div>
              <div className="dashboard-message-datetime-picker">
                <div
                  className="dashboard-label"
                  style={{
                    backgroundColor:
                      mode === MODETYPE.DARK ? "#666" : "#f2f2f2",
                  }}
                >
                  <p>Date & Time Picker</p>
                </div>
                <DateTimePicker
                  onChange={onChange}
                  value={value}
                  disableClock="true"
                  maxDate={maxDate}
                  minDate={minDate}
                  format="dd-MM-y h:mm:ss a"
                  className="dashboard-message-datetime-picker__datepicker"
                />
              </div>
              <div className="dashboard-message-send-div">
                <span>send</span>
              </div>
            </div>
            <div
              className="dashboard-memberselect-div"
              style={{
                backgroundColor: mode === MODETYPE.DARK ? "#666" : "#f2f2f2",
              }}
            >
              <div className="dashboard-memberselect-div__search-div">
                <MultilineInputComponent
                  isFocused={focusThree}
                  mode={mode}
                  label={focusThree ? "search" : "search members"}
                >
                  <input
                    placeholder="search for a member"
                    className="MultilineInputComponent_input"
                    onFocus={() => {
                      setFocusThree(true);
                    }}
                    onBlur={() => {
                      setFocusThree(false);
                    }}
                    type="text"
                    style={{ color: mode === MODETYPE.DARK ? "#fff" : "#333" }}
                  ></input>
                </MultilineInputComponent>
              </div>
              <div className="dashboard-memberselect-div__result-div">
                <MultilineInputComponent
                  label="members"
                  mode={mode}
                ></MultilineInputComponent>
              </div>
            </div>
            <div
              className="dashboard-roleselect-div"
              style={{
                backgroundColor: mode === MODETYPE.DARK ? "#666" : "#f2f2f2",
              }}
            >
              <div className="dashboard-roleselect-div__search-div">
                <MultilineInputComponent
                  label={focusFour ? "search" : "search roles"}
                  isFocused={focusFour}
                  mode={mode}
                >
                  <input
                    placeholder="search for a role or channel"
                    className="MultilineInputComponent_input"
                    autoCorrect="off"
                    onFocus={() => {
                      setFocusFour(true);
                    }}
                    onBlur={() => {
                      setFocusFour(false);
                    }}
                    type="text"
                    style={{ color: mode === MODETYPE.DARK ? "#fff" : "#333" }}
                  ></input>
                </MultilineInputComponent>
              </div>
              <div className="dashboard-roleselect-div__result-div">
                <MultilineInputComponent label="roles" mode={mode}>
                  <div className="searchresult-div">
                    <div style={{ width: "10rem", background: "red" }}></div>
                    <div style={{ width: "15rem", background: "yellow" }}></div>
                    <div style={{ width: "20rem", background: "blue" }}></div>
                    <div style={{ width: "10rem", background: "green" }}></div>
                  </div>
                </MultilineInputComponent>
              </div>
            </div>
          </div>
          <div
            className="dashboard-right-div"
            style={{
              backgroundColor: mode === MODETYPE.DARK ? "#777" : "#cacaca",
              left: rightDivPosition.toString() + "%",
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
            ></Card>
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
            ></Card>
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
            ></Card>
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;