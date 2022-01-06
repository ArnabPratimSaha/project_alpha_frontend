import React, { useEffect, useReducer, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import './log.css';
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
newDate.setDate(newDate.getDate() + numberOfDaysToAdd);
const limit=15;//limit of requesting logs per request
let cancelSearchReq;
function Log({mode,MODETYPE}) {
    let { uid, did } = useParams();
    const firstTimePageChange = useRef(true)
    const firstTimeFilterChange = useRef(true)
    const [activePage, setActivePage] = useState(page.ALL)//page thats active
    const [selectedFilterIndex, setSelectedFilterIndex] = useState(0)//current selected filter index
    const allPageSelectedIndex = useRef(0)//current selected filter index for all page
    const allPageNumber = useRef(1) 
    const favouritePageSelectedIndex = useRef(0)//current selected filter index for favourite index
    const favouritePageNumber = useRef(1)
    const [hasMoreHistoryData, setHasMoreHistoryData] = useState(false);
    const [hasMoreFavouriteData, setHasMoreFavouriteData] = useState(false);
    const [historyData, setHistoryData] = useState([]);
    const [favouriteData, setFavouriteData] = useState([]);
    const [query, setQuery] = useState('')

    const fetchHistoryData=()=>{
        axios.get(`${process.env.REACT_APP_BACKENDAPI}log/searchinfo?did=${did}&type=${toggleIndex[selectedFilterIndex]}&limit=${limit}&page=${allPageNumber.current}&fav=${false}&query=${query.trim()}`).then((res)=>{
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
        })
    }
    const fetchFavouriteDate=()=>{
        axios.get(`${process.env.REACT_APP_BACKENDAPI}log/searchinfo?did=${did}&type=${toggleIndex[selectedFilterIndex]}&limit=${limit}&page=${favouritePageNumber.current}&fav=${true}&query=${query.trim()}`).then((res) => {
            if (res.data.length < limit) {
                setHasMoreFavouriteData(false);
            }
            else {
                setHasMoreFavouriteData(true)
            }
            setFavouriteData((s) => [...s, ...res.data])
            favouritePageNumber.current += 1;//increase the page number
        }).catch((err) => {
        })
    }
    // making a api call for the favourite page for just one time
    useEffect(() => {
        allPageNumber.current=1;
        axios.get(`${process.env.REACT_APP_BACKENDAPI}log/searchinfo?did=${did}&type=${toggleIndex[selectedFilterIndex]}&limit=${limit}&page=${allPageNumber.current}&fav=${false}&query=${query.trim()}`).then((res) => {
            if (res.data.length < limit) {
                setHasMoreHistoryData(false);
            }
            else {
                setHasMoreHistoryData(true)
            }
            setHistoryData(res.data)
            allPageNumber.current += 1;//increase the page number
        }).catch((err) => {
        })
        favouritePageNumber.current=1;
        axios.get(`${process.env.REACT_APP_BACKENDAPI}log/searchinfo?did=${did}&type=${toggleIndex[selectedFilterIndex]}&limit=${limit}&page=${favouritePageNumber.current}&fav=${true}&query=${query.trim()}`).then((res) => {
            if (res.data.length < limit) {
                setHasMoreFavouriteData(false);
            }
            else {
                setHasMoreFavouriteData(true)
            }
            setFavouriteData(res.data)
            favouritePageNumber.current += 1;//increase the page number
        }).catch((err) => {
        })
    }, [query])
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
                axios.get(`${process.env.REACT_APP_BACKENDAPI}log/searchinfo?did=${did}&type=${toggleIndex[selectedFilterIndex]}&limit=${limit}&page=${allPageNumber.current}&fav=${false}&query=${query.trim()}`).then((res) => {
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
                axios.get(`${process.env.REACT_APP_BACKENDAPI}log/searchinfo?did=${did}&type=${toggleIndex[selectedFilterIndex]}&limit=${limit}&page=${favouritePageNumber.current}&fav=${true}&query=${query.trim()}`).then((res) => {
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
            axios.get(`${process.env.REACT_APP_BACKENDAPI}log/searchinfo?did=${did}&type=${toggleIndex[selectedFilterIndex]}&limit=${limit}&page=${allPageNumber.current}&fav=${false}&query=${query.trim()}`).then((res) => {
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
            })
        }
        else
        {
            favouritePageNumber.current=1;//resetting the page number
            axios.get(`${process.env.REACT_APP_BACKENDAPI}log/searchinfo?did=${did}&type=${toggleIndex[selectedFilterIndex]}&limit=${limit}&page=${favouritePageNumber.current}&fav=${true}&query=${query.trim()}`).then((res) => {
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
            })
        }

    }, [selectedFilterIndex])
    const handleStartClick = async (mid, isFav) => {
        try {
            await axios.patch(`${process.env.REACT_APP_BACKENDAPI}log?mid=${mid}`)
        } catch (error) {

        }
    }
    return (
        <>
            <div className='log-body' style={{backgroundColor: mode === MODETYPE.DARK ? "#333" : "#cacaca",}}>
                <div className='log-history' >
                    <div className='log-history-setting' style={{borderColor: mode === MODETYPE.DARK ? "#cacaca" : "#333",}}>
                        <div className='log-history-setting-sort-div' style={{color: mode === MODETYPE.DARK ? "#fff" : "#444",}}>
                            <PageToggler onChange={(s)=>{s==='LEFT'?setActivePage(page.ALL):setActivePage(page.FAVOURITE)}}/>
                            <span >Sort By</span>
                            <Dropdown mode={mode} MODETYPE={MODETYPE} onChange={(e)=>{setSelectedFilterIndex(e)}} options={toggleIndex}/>
                        </div>
                        <div className='log-guild-search-div'>
                            <SearchBar mode={mode} MODETYPE={MODETYPE} onChange={(v)=>{setQuery(v)}}/>
                        </div>
                    </div>
                    <div className='log-history-output' style={{ backgroundColor: mode === MODETYPE.DARK ? "#444" : "#EEEEEE", }}>
                        <div className='log-history-output-history' style={{ zIndex: activePage === page.ALL ? '2' : '1', backgroundColor: mode === MODETYPE.DARK ? "#444" : "#EEEEEE" }}>
                            {historyData&&<ScrollComponent className='log-history-output-history-content' onIntersect={fetchHistoryData} hasMore={hasMoreHistoryData}>
                                {historyData.map((e, i) => <Bar mode={mode} key={i} MODETYPE={MODETYPE} status={e.status} time={e.time} title={e.title} mid={e.messageId} guildName={e.guildName} icon={e.guildAvatar} fav={e.favourite} onStarClick={handleStartClick} uid={uid} did={did}/>)}
                            </ScrollComponent>}
                            {favouriteData.length===0&&<div className='log-empty-result-div'>
                                <h1>NO DATA FOUND</h1>
                            </div>}
                        </div>
                        <div className='log-history-output-favourite' style={{zIndex:activePage===page.FAVOURITE?'2':'1',backgroundColor: mode === MODETYPE.DARK ? "#444" : "#EEEEEE"}}>
                            {favouriteData&&<ScrollComponent className='log-history-output-history-content' onIntersect={fetchFavouriteDate} hasMore={hasMoreFavouriteData}>
                                {favouriteData.map((e, i) => <Bar mode={mode} key={i} MODETYPE={MODETYPE} status={e.status} time={e.time} title={e.title} guildName={e.guildName} mid={e.messageId} icon={e.guildAvatar} fav={e.favourite} onStarClick={handleStartClick} uid={uid} did={did}/>)}
                            </ScrollComponent>}
                            {favouriteData.length===0&&<div className='log-empty-result-div'>
                                <h1>NO DATA FOUND</h1>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Log
