import SearchBar from "@/components/SearchBar";
import StatusPage from "@/components/StatusPage/StatusPage";
import api from "@/utils/api";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Status = () => {
  const [searchQuery, setSearchQuery] = useState<{
    identificationNumber: string;
    name: string;
  }>({
    identificationNumber: "",
    name: "",
  });

  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    console.log({ name, value });
    setSearchQuery({
      ...searchQuery,
      [e.target.name]: e.target.value,
    });
  };

  const [data, setData] = useState<
    Array<{
      id: string;
      identificationNumber: string;
      name: string;
      lastName: string;
      dateOfBirth: string;
      dateOfExpiry: string;
      dateOfIssue: string;
    }>
  >([]);

  const handleQuery = async () => {
    try {
      console.log({ searchQuery });
      const data = await api.post<{
        data: {
          id: number;
          name: string | null;
          thaiIdNumber: string;
          dateOfBirth: Date | null;
          dateOfExpiry: Date | null;
          dateOfIssue: Date | null;
          lastName: string | null;
        }[];
      }>("/read", searchQuery, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const payload = data.data.data;

      const newData = payload.map((data) => ({
        id: data.id.toString(),
        identificationNumber: data.thaiIdNumber,
        name: data.name ?? "",
        lastName: data.lastName ?? "",
        dateOfBirth: data.dateOfBirth?.toString() ?? "",
        dateOfExpiry: data.dateOfExpiry?.toString() ?? "",
        dateOfIssue: data.dateOfIssue?.toString() ?? "",
      }));

      setData(newData);

      console.log(data);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    handleQuery().catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <div className="relative">
      <div className="grid min-h-screen w-full place-content-center bg-black text-white">
        <p className="mb-2 text-center font-mono text-2xl">Search</p>
        <SearchBar
          handleQuery={handleQuery}
          handleSearchQuery={handleSearchQuery}
          identificationNumber={searchQuery.identificationNumber}
          name={searchQuery.name}
        />
        <StatusPage ocrData={data} />
      </div>
    </div>
  );
};

export default Status;
