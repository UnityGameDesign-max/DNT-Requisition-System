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
import { formatDate, getInitials } from "@/lib/utils";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Profile } from "@/components/common/profile";


  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
  export function RequisitionSummary() {

    const [requisitionSummary, setRequistionSummary] = useState([])

    useEffect(() => {
        const fetchRequisitionSummary = async () => {
            try{
                const res = await axios.get(`${API_BASE_URL}/allRequisitionForms`);

                const sortedData = res.data.sort((a: any, b: any) => {
                 
                  return new Date(b.date).getTime() - new Date(a.date).getTime();
                });
                setRequistionSummary(sortedData)
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
          {requisitionSummary.map((requisition: any, index:number) => (
            <TableRow className="text-customTheme-muted" key={index}>
              <TableCell><p>{requisition.id}</p></TableCell>
              <TableCell><p>{requisition.formType}</p></TableCell>
              <TableCell>
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <Avatar className="bg-gray-100 cursor-pointer">
                            <AvatarFallback>{getInitials(requisition.requesterName)}</AvatarFallback>
                        </Avatar>
                    </HoverCardTrigger>
                    <HoverCardContent className="bg-white w-30">
                      <Profile name={requisition.requesterName} role={"employee"}/>
                    </HoverCardContent>
                </HoverCard>
               
            
              </TableCell>
              <TableCell><p>{requisition.division}</p></TableCell>
              <TableCell>
                {requisition.status === "Approved" ? 

                <div className="flex">
                  <div className="bg-green-500/10 p-1 rounded-full w-[90px]">
                    <p className="text-green-500 ml-1.5 font-medium">{ requisition.status }</p>
                  </div> 

                  {
                    requisition.approvers.length > 0 ?
                    
                    requisition.approvers.map((req: any) => (
                      <div className="flex -space-x-2 *:ring *:ring-white">
                        <HoverCard>
                          <HoverCardTrigger>
                            <Avatar className="w-8 h-8">
                              <AvatarFallback>{getInitials(req.name)}</AvatarFallback>
                            </Avatar>
                          </HoverCardTrigger>
                          <HoverCardContent className="bg-white w-30 flex gap-3">

                           <Profile name={req.name} role={req.role}/>
                           
                          </HoverCardContent>
                        </HoverCard>
                      </div>
                    ))  
                    :
                    null
                   }
  
                </div>
                
                
                
                : requisition.status === "Rejected" ? 
                
                  <div className="flex gap-2">
                      <div className="bg-red-500/10 p-1 rounded-full w-[75px]">
                        <p className="text-red-500 font-medium ml-1">{requisition.status}</p>
                      </div>
                      <HoverCard>
                          <HoverCardTrigger>
                            <Avatar className="w-8 h-8">
                              <AvatarFallback>{getInitials(requisition.rejectBy.name)}</AvatarFallback>
                            </Avatar>
                          </HoverCardTrigger>
                          <HoverCardContent className="bg-white w-30 flex gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="text-customTheme-primary">{getInitials(requisition.rejectBy.name)}</AvatarFallback>
                            </Avatar>
                           <div>
                            <p className="font-medium text-black">{requisition.rejectBy.name}</p>
                            <p className="text-customTheme-secondary text-sm">{requisition.rejectBy.role}</p>
                           </div>
                           
                          </HoverCardContent>
                        </HoverCard>
                      
                  </div>
                     
                  :  requisition.status === "Pending" || requisition.approvers.length === 0
                ? 
                
                <div className="flex">

                  <div className="bg-yellow-500/10 p-1 rounded-full w-[75px]">
                    <p className="text-yellow-500 font-medium ml-1">{requisition.status || "Pending"}</p>
                  </div> 

                  {
                    requisition.approvers.length > 0 ?
                    
                    requisition.approvers.map((req: any) => (
                      <div className="flex -space-x-2 *:ring *:ring-white">
                        <HoverCard>
                          <HoverCardTrigger>
                            <Avatar className="w-8 h-8">
                              <AvatarFallback>{getInitials(req.name)}</AvatarFallback>
                            </Avatar>
                          </HoverCardTrigger>
                          <HoverCardContent className="bg-white w-30 flex gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="text-customTheme-primary">{getInitials(req.name)}</AvatarFallback>
                            </Avatar>
                           <div>
                            <p className="font-medium text-black">{req.name}</p>
                            <p className="text-customTheme-secondary text-sm">{req.role}</p>
                           </div>
                           
                          </HoverCardContent>
                        </HoverCard>
                      </div>
                    ))  
                    :
                    null
                   }
                 
                </div>
                  : null}
              </TableCell>
              <TableCell><p>{formatDate(requisition.date)}</p></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  