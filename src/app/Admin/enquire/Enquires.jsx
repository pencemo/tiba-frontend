import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { format } from "date-fns";
import Loader from "@/components/ui/loader";
import { useAllMessage } from "@/hooks/QueryHooks/useMessage";

export function Enquires() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading } = useAllMessage(currentPage, 10);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    if (data) {
      setTotalPage(data.totalPages);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="w-full h-full">
        <Loader />
      </div>
    );
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="max-w-[85rem] w-full p-3 mx-auto overflow-x-auto">
      <div className="space-y-4">
        <div>
          <h1 className="text-xl font-bold">All Enquires</h1>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="">Email</TableHead>
                <TableHead className="">Contact</TableHead>
                <TableHead className="w-[500px] ">Message</TableHead>
                <TableHead className=" ">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.map((message, i) => (
                <TableRow key={i} >
                  <TableCell className="font-medium h-14">{i + 1}</TableCell>
                  <TableCell className="font-medium">{message.name}</TableCell>
                  <TableCell>{message.email}</TableCell>
                  <TableCell>{message.contact}</TableCell>
                  <TableCell className=''>{message.message}</TableCell>
                  <TableCell className="">
                    {format(new Date(message.createdAt), "PPP")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
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
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPage))
            }
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
      </div>
    </div>
  );
}
