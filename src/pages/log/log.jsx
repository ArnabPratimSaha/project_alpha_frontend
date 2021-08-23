import React, { useEffect, useReducer, useRef, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../../component/navbar/navbar";
import useMode from "../../customhooks/useMode";
import './log.css';
import Cookies from "js-cookie";
import axios from 'axios'
import Bar from '../../component/expandBar/bar';
import Dropdown from "../../component/dropdown/dropdown";
import SearchBar from "../../component/search-bar/searchBar";
import PageToggler from "../../component/pageToggeler/pageToggler";
import ScrollComponent from "../../component/infiniteScrollComponent/scrollComponent";
var newDate = new Date();
var numberOfDaysToAdd = 1;
const page={
    ALL:'ALL',
    FAVOURITE:'FAVOURITE'
}
const toggleIndex=['all','sent','processing','cancelled']
const status={
    PROCESSING:'PROCESSING',
    CANCELLED:'CANCELLED',
    SENT:'SENT',
}
newDate.setDate(newDate.getDate() + numberOfDaysToAdd);
const limit=10;
function Log(props) {
    let { uid, sid, did } = useParams();
    const firstTimePageChange = useRef(true)
    const firstTimeFilterChange = useRef(true)

    const [activePage, setActivePage] = useState(page.ALL)//page thats active

    const [loadingPercentage, setLoadingPercentage] = useState(0);
    const [selectedFilterIndex, setSelectedFilterIndex] = useState(0)//current selected filter index
    const allPageSelectedIndex = useRef(0)//current selected filter index for all page
    const allPageNumber = useRef(1) 
    const favouritePageSelectedIndex = useRef(0)//current selected filter index for favourite index
    const favouritePageNumber = useRef(1)
    const [mode, changeMode, MODETYPE, updateMode] = useMode();
    const [hasMoreHistoryData, setHasMoreHistoryData] = useState(false);
    const [hasMoreFavouriteData, setHasMoreFavouriteData] = useState(false);
    const [historyData, setHistoryData] = useState([]);
    const [favouriteData, setFavouriteData] = useState([]);
    const [imageSource, setImageSource] = useState(
        sid === "null" && Cookies.get("avatar") ? Cookies.get("avatar") : null
    );
    const [userName, setUserName] = useState(
        sid === "null" && Cookies.get("userName") ? Cookies.get("userName") : false
    );
    const [userTag, setUserTag] = useState(
        sid === "null" && Cookies.get("userTag") ? Cookies.get("userTag") : false
    );
    const [status, setStatus] = useState(
        sid === "null" && Cookies.get("id") ? true : false
    ); //logged in
    const [isTemp, setIsTemp] = useState(
        sid === "null" && Cookies.get("id") ? false : true
    ); //logged in
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
    const fetchHistoryData=()=>{
        axios.get(`http://localhost:5000/log/getinfo?did=${did}&type=${toggleIndex[selectedFilterIndex]}&limit=${limit}&page=${allPageNumber.current}&fav=${false}`).then((res)=>{
            if(res.data.length<limit)
            {
                setHasMoreHistoryData(false);
            }
            else
            {
                setHasMoreHistoryData(true)
            }
            setHistoryData((s)=>[...s,...res.data])
            allPageNumber.current+=1;//increase the page number
        }).catch((err)=>{
            console.log(err);
        })
    }
    const fetchFavouriteDate=()=>{
        axios.get(`http://localhost:5000/log/getinfo?did=${did}&type=${toggleIndex[selectedFilterIndex]}&limit=${limit}&page=${favouritePageNumber.current}&fav=${true}`).then((res) => {
            if (res.data.length < limit) {
                setHasMoreFavouriteData(false);
            }
            else {
                setHasMoreFavouriteData(true)
            }
            setFavouriteData((s) => [...s, ...res.data])
            favouritePageNumber.current += 1;//increase the page number
        }).catch((err) => {
            console.log(err);
        })
    }
    // making a api call for the favourite page for just one time
    useEffect(() => {
        axios.get(`http://localhost:5000/log/getinfo?did=${did}&type=${toggleIndex[selectedFilterIndex]}&limit=${limit}&page=${favouritePageNumber.current}&fav=${false}`).then((res) => {
            if (res.data.length < limit) {
                setHasMoreHistoryData(false);
            }
            else {
                setHasMoreHistoryData(true)
            }
            setHistoryData(res.data)
            allPageNumber.current += 1;//increase the page number
        }).catch((err) => {
            console.log(err);
        })
        allPageSelectedIndex.current = 0;
        axios.get(`http://localhost:5000/log/getinfo?did=${did}&type=${toggleIndex[selectedFilterIndex]}&limit=${limit}&page=${favouritePageNumber.current}&fav=${true}`).then((res) => {
            if (res.data.length < limit) {
                setHasMoreFavouriteData(false);
            }
            else {
                setHasMoreFavouriteData(true)
            }
            setFavouriteData(res.data)
            favouritePageNumber.current += 1;//increase the page number
        }).catch((err) => {
            console.log(err);
        })
        favouritePageSelectedIndex.current = 0;
    }, [])
    useEffect(() => {
        if(firstTimePageChange.current)
        {
            firstTimePageChange.current=false;
            return;
        }
        if(activePage===page.ALL)
        {
            if (selectedFilterIndex != allPageSelectedIndex.current) {
                allPageNumber.current=1;
                axios.get(`http://localhost:5000/log/getinfo?did=${did}&type=${toggleIndex[selectedFilterIndex]}&limit=${limit}&page=${allPageNumber.current}&fav=${false}`).then((res) => {
                    if (res.data.length < limit) {
                        setHasMoreHistoryData(false);
                    }
                    else {
                        setHasMoreHistoryData(true);
                    }
                    setHistoryData(res.data)
                    allPageNumber.current+=1;//increase the page number
                    allPageSelectedIndex.current = selectedFilterIndex;
                }).catch((err) => {
                })
            }
        }
        else
        {
            if(selectedFilterIndex!=favouritePageSelectedIndex.current)
            {
                console.log(favouritePageSelectedIndex.current);
                favouritePageNumber.current=1;
                axios.get(`http://localhost:5000/log/getinfo?did=${did}&type=${toggleIndex[selectedFilterIndex]}&limit=${limit}&page=${favouritePageNumber.current}&fav=${true}`).then((res) => {
                    if (res.data.length < limit) {
                        setHasMoreFavouriteData(false);
                    }
                    else {
                        setHasMoreFavouriteData(true)
                    }
                    setFavouriteData(res.data)
                    favouritePageNumber.current += 1;//increase the page number
                    favouritePageSelectedIndex.current = selectedFilterIndex;
                }).catch((err) => {
                    console.log(err);
                })
            }
        }
    }, [activePage])
    useEffect(() => {
        if(firstTimeFilterChange.current)//skip the first time run
        {
            firstTimeFilterChange.current=false
            return;
        }
        if (activePage === page.ALL) {
            allPageNumber.current=1;//resetting the page number
            axios.get(`http://localhost:5000/log/getinfo?did=${did}&type=${toggleIndex[selectedFilterIndex]}&limit=${limit}&page=${allPageNumber.current}&fav=${false}`).then((res) => {
                if (res.data.length < limit) {
                    setHasMoreHistoryData(false);
                }
                else {
                    setHasMoreHistoryData(true)
                }
                setHistoryData(res.data)
                allPageNumber.current += 1;//increase the page number
                allPageSelectedIndex.current=selectedFilterIndex;
            }).catch((err) => {
                console.log(err);
            })
        }
        else
        {
            favouritePageNumber.current=1;//resetting the page number
            axios.get(`http://localhost:5000/log/getinfo?did=${did}&type=${toggleIndex[selectedFilterIndex]}&limit=${limit}&page=${favouritePageNumber.current}&fav=${true}`).then((res) => {
                if (res.data.length < limit) {
                    setHasMoreFavouriteData(false);
                }
                else {
                    setHasMoreFavouriteData(true)
                }
                setFavouriteData(res.data)
                favouritePageNumber.current += 1;//increase the page number
                favouritePageSelectedIndex.current=selectedFilterIndex;
            }).catch((err) => {
                console.log(err);
            })
        }

    }, [selectedFilterIndex])
    
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
            <div className='log-body' style={{backgroundColor: mode === MODETYPE.DARK ? "#444" : "#EEEEEE",}}>
                <div className='log-history' >
                    <div className='log-history-setting' style={{borderColor: mode === MODETYPE.DARK ? "#cacaca" : "#333",}}>
                        <div className='log-history-setting-sort-div' style={{color: mode === MODETYPE.DARK ? "#fff" : "#444",}}>
                            <PageToggler onChange={(s)=>{s==='LEFT'?setActivePage(page.ALL):setActivePage(page.FAVOURITE)}}/>
                            <span >Sort By</span>
                            <Dropdown mode={mode} MODETYPE={MODETYPE} onChange={(e)=>{setSelectedFilterIndex(e)}} options={toggleIndex}/>
                        </div>
                        <div className='log-guild-search-div'>
                            <SearchBar mode={mode} MODETYPE={MODETYPE} />
                        </div>
                    </div>
                    <div className='log-history-output' style={{ backgroundColor: mode === MODETYPE.DARK ? "#444" : "#EEEEEE", }}>
                        <div className='log-history-output-history' style={{ zIndex: activePage === page.ALL ? '2' : '1', backgroundColor: mode === MODETYPE.DARK ? "#444" : "#EEEEEE" }}>
                            <ScrollComponent className='log-history-output-history-content' onIntersect={fetchHistoryData} hasMore={hasMoreHistoryData}>
                                {historyData.map((e, i) => <Bar mode={mode} key={i} MODETYPE={MODETYPE} status={e.status} time={e.time} title={e.title} />)}
                            </ScrollComponent>
                        </div>
                        <div className='log-history-output-favourite' style={{zIndex:activePage===page.FAVOURITE?'2':'1',backgroundColor: mode === MODETYPE.DARK ? "#444" : "#EEEEEE"}}>
                            <ScrollComponent className='log-history-output-history-content' onIntersect={fetchFavouriteDate} hasMore={hasMoreFavouriteData}>
                                {favouriteData.map((e, i) => <Bar mode={mode} key={i} MODETYPE={MODETYPE} status={e.status} time={e.time} title={e.title} />)}
                            </ScrollComponent>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Log
