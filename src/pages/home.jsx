import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from '../components/ui/navbar'
import { Card } from '../components/ui/card'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import { Button } from "../components/ui/button"
import DatePicker from '../components/ui/datepicker'
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronDownIcon, Circle } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Plus } from 'lucide-react';
import { Search } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Eraser } from 'lucide-react';
import { useState } from 'react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import DataTableDemo from "../components/ui/datatable"
import axios from 'axios';

const home = () => {
    const filterData = JSON.parse(localStorage.getItem('filterData'));
    console.log('filterData: ', filterData);
    const filterRef = React.useRef({
        date: filterData?.date || "",
        priceband: filterData?.priceband || "",
        parameter: filterData?.parameter || "",
        series: filterData?.series || "",
        entity: filterData?.entity || "",
        standard: filterData?.standard || "",
        comparison: filterData?.comparison || "",
        greater: filterData?.greater || "",
        lesser: filterData?.lesser || "",
        symbol: [],
    });

    const [showDataTableDemo, setShowDataTableDemo] = useState(false);
    const [apiFilterData, setApiFilterData] = useState([]);
    const [stockData, setStockData] = useState([]);
    const [page, setPage] = useState(1);
    const [comparison, setComparison] = useState(filterData?.comparison || null);
    const [lesser, setLesser] = useState(filterData?.lesser || null);
    const [greater, setGreater] = useState(filterData?.greater || null);



    
    const getData = async (filter) => {
        const getCachedData = localStorage.getItem('apiCachedData');
        if(getCachedData){
            setApiFilterData(JSON.parse(getCachedData));
            setShowDataTableDemo(true);
            return;
        }
        try {
            const responseFilter = await axios.post("http://localhost:3020/api/filterstockdata",
                {
                    "date": "2024-01-19T00:00:00.000Z",
                    "series": "EQ",
                    "band": "20",
                    "turnover": "200-1000",
                    "ma": [
                        "TQ-GT-4",
                        "DQ-GT-7"
                    ],
                    "per": [
                        "CPER-GT-6"
                    ],
                    "abs": [
                        "CPER-GT-300",
                        "DPER-GT-30"
                    ]
                },
                {
                    "Content-type": "application/json",
                });

            if (responseFilter) {

                console.log(responseFilter);
                setShowDataTableDemo(true);
                setApiFilterData(responseFilter?.data?.data?.data);
                localStorage.setItem('apiCachedData', JSON.stringify(responseFilter?.data?.data?.data));
                //totalPages = Math.ceil(responseFilter?.data?.data?.data.length()/10);
                //console.log(totalPages);

            }
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const handleSubmit = async () => {
        localStorage.setItem('filterData', JSON.stringify(filterRef.current));
        console.log('filterRef.current: ', filterRef.current);
        await getData(filterRef.current);

    };
    const totalPages = 3;
    const handleClear = () => {
        localStorage.removeItem('filterData');
        window.location.reload();
    };

    const handleAddFilter = async() => {
        if (apiFilterData?.length > 0) {
            const symbols = apiFilterData.map((item) => item.symbol);
            filterRef.current.symbol = symbols;
        }
        console.log('filterRef.current: ', filterRef.current);
        await getData(filterRef.current);
    }
    const _apiFilterData = paginateData(page,apiFilterData)

    function paginateData(pageNumber, data, itemsPerPage = 10) {
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = pageNumber * itemsPerPage;
        const slicedData = data.slice(startIndex, endIndex);
        return slicedData;
    }

    const handleAddStock = ({ symbol }) => async () => {
        try {

            const response = await axios.delete(`http://localhost:3020/api/deletestock?stock=${symbol}`, {
                "Content-type": "application/json",
            });


            const updateWatchlistResponse = await fetch('http://localhost:3020/api/allwatchliststock');
            const data = await updateWatchlistResponse.json();
            setApiData(data?.data?.data);


        } catch (error) {
            console.error('Error fetching data:', error);
        }

    };

    useEffect(() => {
        
    },[]);

    const handleLastDaysData = ({ symbol }) => async () => {
        
        //setIsPending(true);
        const response = await axios.post(`http://localhost:3020/api/getlastdaysstock`, {
            "count": frequency,
            "script": symbol
        }, {
            "Content-type": "application/json",
        });

        // setStockData(response?.data?.data?.data);
        // setOpenDialog(true);
        // setIsPending(false);
    };

    const stockDataCol = ['addaction','symbol', 'series', 'openprice', 'highprice', 'lowprice', 'closeprice',
        'prevclose', 'totaltradeqty', 'deliveryqty', 'deliverypercent', 'turnover'];
    return (

        <div className="p-10 bg-slate-100 space-y-10">
            <div className="flex flex-col justify-center p-4 border-0 ring-0 border-slate-100">
                <Card className="bg-white p-4 flex flex-row justify-between">
                    <div className="flex flex-row m-0 p-0 gap-10">
                        <DatePicker className="bg-stone-300 text-lg" filterRef={filterRef} />
                        <Select onValueChange={(e) => filterRef.current.priceband = e} defaultValue={filterRef.current.priceband}>
                            <SelectTrigger className="w-[210px] font-semibold rounded-full bg-slate-100 px-5">
                                <SelectValue placeholder="Priceband : " className="text-lg" />
                            </SelectTrigger>
                            <SelectContent align="start" className="rounded-md " >
                                <SelectItem className="bg-white hover:bg-slate-100 font-semibold " value="5">5</SelectItem>
                                <SelectItem className="bg-white hover:bg-slate-100 font-semibold " value="15" >15</SelectItem>
                                <SelectItem className="bg-white hover:bg-slate-100 font-semibold " value="20" >20</SelectItem>
                                <SelectItem className="bg-white hover:bg-slate-100 font-semibold " value="0" >No Band</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select onValueChange={(e) => filterRef.current.series = e} defaultValue={filterRef.current.series}>
                            <SelectTrigger className="w-[210px] font-semibold rounded-full bg-slate-100 px-5">
                                <SelectValue placeholder="Series : " />
                            </SelectTrigger>
                            <SelectContent align="start" className="rounded-md " >
                                <SelectItem className="bg-white hover:bg-slate-100 font-semibold " value="eq">EQ</SelectItem>
                                <SelectItem className="bg-white hover:bg-slate-100 font-semibold " value="be">BE</SelectItem>
                            </SelectContent>
                        </Select>

                    </div>
                    <div className="flex flex-col justify-end  gap-5">
                        <Button className="text-white  bg-slate-900 font-semibold rounded-full gap-2 hover:bg-slate-500 w-[150px]" variant="outline" onClick={handleSubmit}> <Search /> Search</Button>
                    </div>

                </Card>
                <Card className="bg-white p-4 flex flex-wrap gap-4 flex-row justify-between">
                    <div className="flex flex-row m-0 p-0 gap-10">
                        <div className="flex flex-col space-y-4">
                            <Label className="font-bold text-left text-lg"> Parameter </Label>
                            <Select onValueChange={(e) => filterRef.current.parameter = e} defaultValue={filterRef.current.parameter} className="m-0 p-0">
                                <SelectTrigger className="w-[210px] font-semibold rounded-full bg-slate-100">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent align="start" className="rounded-md " >
                                    <SelectItem className="bg-white hover:bg-slate-100 font-semibold " value="ma">Moving Average</SelectItem>
                                    <SelectItem className="bg-white hover:bg-slate-100 font-semibold " value="cp">Close %tage</SelectItem>
                                    <SelectItem className="bg-white hover:bg-slate-100 font-semibold " value="av">Absolute Value</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col space-y-4">
                            <Label className="font-bold text-left text-lg"> Entity </Label>
                            <Select onValueChange={(e) => filterRef.current.entity = e} defaultValue={filterRef.current.entity} className="m-0 p-0">
                                <SelectTrigger placeholder="Priceband : " className="w-[210px] font-semibold rounded-full bg-slate-100">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent align="start" className="rounded-md " >
                                    <SelectItem className="bg-white hover:bg-slate-100 font-semibold " value="cp">Close Price</SelectItem>
                                    <SelectItem className="bg-white hover:bg-slate-100 font-semibold " value="dq">Delivery Quantity</SelectItem>
                                    <SelectItem className="bg-white hover:bg-slate-100 font-semibold " value="tq">Traded Quantity</SelectItem>
                                    <SelectItem className="bg-white hover:bg-slate-100 font-semibold " value="cper">Close Percentage</SelectItem>
                                    <SelectItem className="bg-white hover:bg-slate-100 font-semibold " value="clper">Delivery Percentage</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col space-y-4">
                            <Label className="font-bold text-left text-lg"> Standard </Label>
                            <Select onValueChange={(e) => filterRef.current.standard = e} defaultValue={filterRef.current.standard} className="m-0 p-0">
                                <SelectTrigger placeholder="" className="w-[210px] font-semibold rounded-full bg-slate-100">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent align="start" className="rounded-md ">
                                    <SelectItem className="bg-white hover:bg-slate-100 font-semibold " value="g">Greater than</SelectItem>
                                    <SelectItem className="bg-white hover:bg-slate-100 font-semibold " value="l">Lesser than</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col space-y-4">
                            <Label className="font-bold text-left text-lg"> Comparison </Label>
                            <Input onBlur={(e) => filterRef.current.comparison = e.target.value} onChange={(e) => setComparison(e.target.value)} value={comparison} className="m-0 p-0 bg-slate-100 font-semibold rounded-full px-4 w-[210px]">
                            </Input>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <Label className="font-bold text-left text-lg"> Turnover (in lacs) </Label>
                            <div className="flex flex-row gap-2">
                                <Input placeholder="greater" onBlur={(e) => filterRef.current.greater = e.target.value} onChange={(e) => setGreater(e.target.value)} value={greater} className="m-0 p-0 bg-slate-100 font-semibold rounded-full px-4 w-[100px]" >
                                </Input>
                                <Input placeholder="lesser" onBlur={(e) => filterRef.current.lesser = e.target.value} onChange={(e) => setLesser(e.target.value)} value={lesser} className="m-0 p-0 bg-slate-100 font-semibold rounded-full px-4 w-[100px]">
                                </Input>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-end  gap-5">
                        <Button className="text-stone-900 font-semibold rounded-full gap-2 border-slate-900 hover:bg-slate-500 w-[150px]" variant="outline" onClick={handleAddFilter}> <Plus /> Add Filter</Button>
                        <Button className="text-stone-900 font-semibold rounded-full gap-2 border-slate-900 hover:bg-slate-500 w-[150px]" variant="outline" onClick={handleClear}> < Eraser /> Clear Filter</Button>
                    </div>
                </Card>
                <div className="bg-slate-100">
                    <div>{showDataTableDemo && <DataTableDemo hideKeys={true} handleAdd={handleAddStock} handleData={handleLastDaysData}  stockDataCol={stockDataCol} data={_apiFilterData} showPagination ={true} setPage={setPage} totalPages= {totalPages} className="flex flex-wrap mt-[1.5%]" classNames={{ root :"mt-[1.5%]"} }  
                    />}</div>
                </div>
            </div>

        </div>

    )
}

export default home;