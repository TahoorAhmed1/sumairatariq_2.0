import { MoreHorizontal, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect, useState } from "react";
import { API } from "@/services";

function OrderTrack() {
  const [order, setOrder] = useState([]);
  const getCustomerOrder = async (id) => {
    try {
      let res = await API.getCustomerSale(id);
      if (res?.data) {
        setOrder([...res.data]);
      } else {
        setOrder([]);
      }
    } catch (error) {}
  };
  useEffect(() => {
    let id = JSON.parse(localStorage.getItem("user_id"));
    if (id) {
      getCustomerOrder(id);
    }
  }, []);

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader className="px-6  py-6">
        <CardTitle>Track Order</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-100">
              <TableHead className="hidden w-[100px] sm:table-cell">
                Product
              </TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Canceled</TableHead>
              <TableHead className="hidden md:table-cell">Received</TableHead>
              <TableHead className="hidden md:table-cell">Delivered</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order?.map((data, index) => (
              <TableRow key={index}>
                <TableCell className="hidden sm:table-cell">
                  <Plus className="bg-slate-100/50 p-2 w-8 h-8 rounded-full"></Plus>
                </TableCell>
                <TableCell className="font-medium">{data?.Location}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {data?.isCanceled == 1 ? "true" : "false"}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="outline">
                    {data?.isRecived == 1 ? "true" : "false"}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="outline">
                    {data?.isDelivered == 1 ? "true" : "false"}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {data?.total}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {data?.saleitems?.length}
                </TableCell>
                <TableCell>
                  <DropdownMenu className="z-10 bg-white">
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="z-10 bg-white" align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Canceled Order</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default OrderTrack;
