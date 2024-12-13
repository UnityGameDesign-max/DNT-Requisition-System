import { useEffect, useState } from "react"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import axios from "axios";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";


  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
  export function TableDemo() {

    const [requisitionSummary, setRequistionSummary] = useState([])

    useEffect(() => {
        const fetchRequisitionSummary = async () => {
            try{
                const res = await axios.get(`${API_BASE_URL}/allRequisitionForms`);
                setRequistionSummary(res.data)
            }catch(err){
                throw err
            }
        }

        fetchRequisitionSummary();
      },[])

    return (
      <Table>
        <TableHeader>
          <TableRow className="font-bold">
            <TableHead >Form ID</TableHead>
            <TableHead>Form Type</TableHead>
            <TableHead>Requester name</TableHead>
            <TableHead>Division</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requisitionSummary.map((requisition: any) => (
            <TableRow className="text-customTheme-muted" key={requisition.formID}>
              <TableCell><p>{requisition.formID}</p></TableCell>
              <TableCell><p>{requisition.formType}</p></TableCell>
              <TableCell>
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <Avatar className="bg-gray-100 cursor-pointer">
                            <AvatarFallback>{getInitials(requisition.requesterName)}</AvatarFallback>
                        </Avatar>
                    </HoverCardTrigger>
                    <HoverCardContent className="bg-white w-30">
                        {requisition.requesterName}
                    </HoverCardContent>
                </HoverCard>
               
            
              </TableCell>
              <TableCell><p>{requisition.division}</p></TableCell>
              <TableCell>
                {requisition.status === "Approved" ? 
                <div className="bg-green-500/10 p-1 rounded-full w-[90px]">
                    <p className="text-green-500 ml-1.5 font-medium">{ requisition.status }</p>
                </div> : requisition.status === "Pending" 
                ? <div className="bg-yellow-500/10 p-1 rounded-full w-[70px]">
                    <p className="text-yellow-500 font-medium ml-1">{requisition.status}</p>
                  </div> : requisition.status === "Rejected" ? <div className="bg-red-500/10 p-1 rounded-full w-[75px]">
                  <p className="text-red-500 font-medium ml-1">{requisition.status}</p>
                  </div> : null}
              </TableCell>
              <TableCell><p>{requisition.createdAt}</p></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  