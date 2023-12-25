import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

export type Props = {
  ocrData: Array<{
    id: string;
    identificationNumber: string;
    name: string;
    lastName: string;
    dateOfBirth: string;
    dateOfExpiry: string;
    dateOfIssue: string;
  }>;
};

const StatusPage: React.FC<Props> = ({ ocrData }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="font-mono">
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead className="w-[100px]">Identication Number</TableHead>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead className="w-[100px]">Last Name</TableHead>
          <TableHead className="w-[100px]">Date of Birth</TableHead>
          <TableHead className="w-[100px]">Date of Expiry</TableHead>
          <TableHead className="w-[100px]">Date Of Issue</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ocrData.map((data) => (
          <TableRow
            key={data.id}
            className="cursor-default text-center font-mono"
          >
            <TableCell className="font-medium">{data.id}</TableCell>
            <TableCell>{data.identificationNumber}</TableCell>
            <TableCell>{data.name}</TableCell>
            <TableCell className="text-right">{data.lastName}</TableCell>
            <TableCell className="text-right">{data.dateOfBirth}</TableCell>
            <TableCell className="text-right">{data.dateOfIssue}</TableCell>
            <TableCell className="text-right">{data.dateOfExpiry}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StatusPage;
