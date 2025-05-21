import React, { useEffect } from "react";
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
import { useNavigate } from "react-router-dom";

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
    const [loading, setLoading] = React.useState(true);

    const navigate = useNavigate();

    const { getAllSupportTicketsList} = useSupportTicket();

    useEffect(() => {
      const fetchTickets = async () => {
        try {
          const response = await getAllSupportTicketsList();
          setTickets(response);
        } catch (error) {
          console.error("Error fetching support tickets:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchTickets();
    }, []);

  return (
    <div>
      <div>
        <div  className="w-full flex justify-between items-center">
        <h1 className="text-2xl font-bold">Support Tickets</h1>
          <Button variant="outline" onClick={()=>navigate("new")} className="mt-4">
            New Ticket
          </Button>
        </div>
        <div className="mt-4">
          <Table>
            <TableHeader className="bg-gray-800 ">
              <TableRow >
                <TableHead className="w-[15%] text-white">Ticket Number</TableHead>
                <TableHead className="text-white">Subject</TableHead>
                <TableHead className="text-white w-[10%]">Status</TableHead>
                <TableHead className="text-white w-[15%]">Created At</TableHead>
                <TableHead className="text-white w-[10%]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket._id} className="h-16 bg-gray-50 hover:bg-gray-100 border">
                    <TableCell>{ticket.ticket_number}</TableCell>
                    <TableCell>{ticket.title}</TableCell>
                    <TableCell>{ticket.status}</TableCell>
                    <TableCell>{new Date(ticket.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button variant="link">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ListTickets;
