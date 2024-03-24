
import { Button } from "@/components/ui/button"
import DataTableDemo from "../components/ui/datatable"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
const Watchlist = () => {
    const [apiData, setApiData] = useState([]);
    const [frequency, setFrequency] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [stockData, setStockData] = useState([]);
    const [page , setPage] = useState(1);
    

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3020/api/allwatchliststock');
            const data = await response.json();
            setApiData(data?.data?.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDeleteStock = ({ symbol }) => async () => {
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

    const handleLastDaysData = ({ symbol }) => async () => {
        
        setIsPending(true);
        const response = await axios.post(`http://localhost:3020/api/getlastdaysstock`, {
            "count": frequency,
            "script": symbol
        }, {
            "Content-type": "application/json",
        });

        setStockData(response?.data?.data?.data);
        setOpenDialog(true);
        setIsPending(false);
    };

    const totalPages = Math.ceil(frequency/5);
    console.log(totalPages);
    
    const stockDataCol = ['symbol', 'series', 'percentage_change', 'openprice', 'highprice', 'lowprice', 'closeprice',
        'prevclose', 'totaltradeqty', 'deliveryqty', 'deliverypercent', 'turnover'];

    const stockData_ = paginateData(page,stockData)

    useEffect(() => {
        fetchData();
    }, []);

    function paginateData(pageNumber, data, itemsPerPage = 5) {
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = pageNumber * itemsPerPage;
        const slicedData = data.slice(startIndex, endIndex);
        return slicedData;
    }

    return (
        <div className="p-10 bg-white space-y-10">
            <div><DataTableDemo hideKeys={true}  data={apiData} handleDelete={handleDeleteStock} handleData={handleLastDaysData} setFrequency={setFrequency} frequency={frequency} showPagination ={false} /></div>
            <Dialog open={openDialog} className="bg-white m-0 h-4/6 ">
                <DialogContent className="bg-white flex flex-wrap h-3.5/5 " setOpen={setOpenDialog}>
                    <DataTableDemo  hideKeys={false} data={stockData_} stockDataCol={stockDataCol} className="flex flex-wrap mt-[1.5%]" classNames={{ root :"mt-[1.5%]"} } showPagination ={true} setPage={setPage} totalPages= {totalPages}/>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Watchlist