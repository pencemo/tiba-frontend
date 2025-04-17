import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import {format} from 'date-fns'
import { useAllBookings, useBookingSatusChange } from "@/hooks/QueryHooks/useBookings"
import { Badge } from "@/components/ui/badge"
import Loader from "@/components/ui/loader"
import { StatusChange } from "./status-change"
import { usePorfile } from "@/Context/ProfileContext"
import AdminCard from "./admin-cards"
import NoData from "@/components/Error/NoData"

export function AllBooking() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, error, isLoading } = useAllBookings(currentPage, limit);
  const [filteredData, setFilteredData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const {mutate, isPending}=useBookingSatusChange()
  const {profile}=usePorfile()

  useEffect(() => {
    if (data && data.data) {
      setFilteredData(data.data);
    }
    if (data){
      setTotalPage(data.totalPages);
    }
  }, [data]);

  const handelFilter = (term) => {
    if (data && data.data) {
      const filtered = data.data.filter(
        (item) =>
          item.name.toLowerCase().includes(term.toLowerCase()) ||
          item.carId.make.toLowerCase().includes(term.toLowerCase()) ||
          item.carId.model.toLowerCase().includes(term.toLowerCase()) ||
          item._id.toLowerCase().includes(term.toLowerCase()),
      );
      setFilteredData(filtered);
    }
  };

  const handleStatusChenge = (id, status) => {
    mutate({id, status})
  }
  

  if (isLoading) {
    return <div className="w-full h-full"><Loader/></div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="max-w-[85rem] w-full p-3 mx-auto ">
      <AdminCard data={data.data} bookings={data.totalBookings}/>
      {data?.data?.length > 0 ? <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handelFilter(e.target.value);
            }}
            className="max-w-sm"
          />
          <Select value={limit.toString()} onValueChange={(value) => setLimit(Number(value))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select rows per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 per page</SelectItem>
              <SelectItem value="10">10 per page</SelectItem>
              <SelectItem value="20">20 per page</SelectItem>
              <SelectItem value="50">50 per page</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="rounded-md border w-full ">
          <Table className='w-full'>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">No</TableHead>
                <TableHead className=""> Car </TableHead>
                <TableHead> User </TableHead>
                <TableHead> Contact </TableHead>
                <TableHead> Booking date </TableHead>
                <TableHead> Total Cost </TableHead>
                {profile && profile.role === "admin" && <TableHead> Showroom </TableHead>}
                <TableHead> </TableHead>
                <TableHead> </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, i) => (
                <TableRow key={i}>
                  <TableCell >{i+1}</TableCell>
                  
                  <TableCell >
                    <div className="flex flex-col">
                      <span className="font-medium">{item?.carId?.make || 'No car data'}</span>
                      <span className="text-sm text-gray-500">{item?.carId?.model || ''}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-gray-500">{item.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.contact}</TableCell>
                  <TableCell>{format(new Date(item.date.from), "dd MMM, yy")} - {format(new Date(item.date.to), "dd MMM, yy")}</TableCell>
                  <TableCell className="text-base font-medium">{item.totalCost.$numberDecimal} <span className="text-xs font-normal text-gray-500">AED</span></TableCell>
                  {profile && profile.role === "admin" && <TableHead> {item.showroomId?.name || 'No showroom data'} </TableHead>}
                  <TableCell className="capitalize">
                    {item.status === "pending" ? (
                      <Badge variant="destructive">
                        {item.status}
                      </Badge>
                    ) : item.status === "completed" ? (
                      <Badge variant="success">
                        {item.status}
                      </Badge>
                    ): <Badge variant="outline">
                    {item.status}
                  </Badge>}
                  </TableCell>
                  <TableCell className="capitalize">
                    <StatusChange disabled={item.status === "completed"} loading={isPending} submit={()=>handleStatusChenge(item._id, item.status)}/>
                    {/* <button onClick={()=>handleStatusChenge(item._id, item.status)} className="text-sm py-1 px-2 rounded-md bg-zinc-800 text-white">Change Status</button> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button variant="outline" size="sm" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPage}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPage))}
            disabled={currentPage === totalPage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(totalPage)}
            disabled={currentPage === totalPage}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>:
      <NoData/>
      }
    </div>
  );
}


