import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import useSupportTicket from "../../hooks/useSupportTicket";
import { Link, useNavigate } from "react-router-dom";
import CustomTooltip from "../../components/custom/CustomToolTip";
import { FilePenLine, FileText, Trash2 } from "lucide-react";

interface Ticket {
  _id: string;
  ticket_number: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
}

const ListTickets = () => {
  const [tickets, setTickets] = React.useState<Ticket[]>([]);
  const [filteredTickets,setFilteredTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = React.useState(true);
  const [filter,setFilter] = useState("Open")

  const navigate = useNavigate();

  const { getAllSupportTicketsList, deleteSupportTicket } = useSupportTicket();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await getAllSupportTicketsList();
        setTickets(response);
        setFilteredTickets(response.filter(ticket=>ticket.status == "Open"))
      } catch (error) {
        console.error("Error fetching support tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);


  const handleChangeFilter = (newFilter) => {
    setFilter(newFilter)
    setFilteredTickets(tickets.filter(ticket => ticket.status == newFilter))
  }

  const handleEditTicket = (ticketNumber) => {
    console.log("Edit clicked")
    navigate(`${ticketNumber}/edit`)
  }

  return (
    <div>
      <div>
        <div className="w-full bg-white flex justify-between items-center p-4 shadow-sm">
          <h1 className="text-2xl font-bold">Support Tickets</h1>
          <Button
            variant="outline"
            onClick={() => navigate("new")}
            className=""
          >
            New Ticket
          </Button>
        </div>
        <div className="mt-4 p-4  ">
          <div className="flex bg-white rounded-t-md overflow-hidden shadow-md p-4 w-full justify-between items-center">
            <div className="flex  bg-gray-100 rounded-sm overflow-hidden p-1">
              <button onClick={()=>handleChangeFilter("Open")} className={`rounded-sm px-4 py-1 text-gray-600 cursor-pointer ${filter=="Open" ? "bg-white text-gray-700 font-semibold" :""}`}>Open</button>
              <button onClick={()=>handleChangeFilter("In Progress")} className={`rounded-sm px-4 py-1 text-gray-600 cursor-pointer ${filter=="In Progress" ? "bg-white text-gray-700 font-semibold" :""}`}>In Progress</button>
              <button onClick={()=>handleChangeFilter("Closed")} className={`rounded-sm px-4 py-1 text-gray-600 cursor-pointer ${filter=="Closed" ? "bg-white text-gray-700 font-semibold" :""}`}>Closed</button>

            </div>
            <div>
              <p>Ticket Filters</p>
            </div>
          </div>
          <div className="shadow-sm rounded-b-md overflow-hidden">
          <Table className="">
            <TableHeader className="bg-gray-700 ">
              <TableRow>
                <TableHead className="pl-4 w-[15%] text-white">
                  Ticket Number
                </TableHead>
                <TableHead className="text-white">Subject</TableHead>
                <TableHead className="text-white w-[10%]">Status</TableHead>
                <TableHead className="text-white w-[15%]">Created At</TableHead>
                <TableHead className="text-white w-[10%]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets?.length < 1 ? <TableRow><TableCell className="p-4">No tickets</TableCell></TableRow> : filteredTickets.map((ticket) => (
                <TableRow
                  key={ticket._id}
                  className="h-16 bg-gray-50 hover:bg-gray-100 border"
                >
                  <TableCell className="pl-4">{ticket.ticket_number}</TableCell>
                  <TableCell>{ticket.title}</TableCell>
                  <TableCell>{ticket.status}</TableCell>
                  <TableCell>
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <CustomTooltip content="Details">
                      <Button variant="outline" size="icon">
                        <Link
                          to={`/support/${ticket.ticket_number}`}
                          state={{ data: ticket }}
                          key={ticket._id}
                        >
                          <FileText />
                        </Link>
                      </Button>
                    </CustomTooltip>
                    <CustomTooltip content="Edit">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEditTicket(ticket.ticket_number)}
                      >
                        <FilePenLine />
                      </Button>
                    </CustomTooltip>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListTickets;
