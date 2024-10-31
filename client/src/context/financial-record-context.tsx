import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useState, useEffect } from "react";

interface FinancialRecod {
  id?: string;
  userId: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  paymentMethod: string;
}

interface FinancialRecordContextType {
  records: FinancialRecod[];
  addRecord: (record: FinancialRecod) => void;
  // updateRecord: (id: string, newRecord: FinancialRecod) => void;
  // deleteRecord: (id: string) => void;
}

export const FinancialRecordContext = createContext<
  FinancialRecordContextType | undefined
>(undefined);

export const FinancialRecordsProvider = ({children}: {children: React.ReactNode}) => {

  const [records, setRecords] = useState<FinancialRecod[]>([]);
  const {user} = useUser()

  const fetchrecord = async() => {
    if(!user) return;
    const response = await fetch(`http://localhost:3000/financial-records/getAllbyUserId/user_2nezBpvdvNMndGbv7COnPdRUh1c`)
    if(response.ok) {
      const records = await response.json()
      console.log(records);
      setRecords(records)
    }
  }

  useEffect(() => {
    fetchrecord()
  }, [user]);

  const addRecord = async (record: FinancialRecod) => {
    const response = await fetch("http://localhost:3000/financial-records", {
      method: "POST",
      body: JSON.stringify(record),
      headers: {
        "Content-Type": "application/json",
      },
    });
    try {
      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prev) => [...prev, newRecord]);
      }
    } catch (error) {}
  };

  return (
    <FinancialRecordContext.Provider value={{ records, addRecord }}>
      {children}
    </FinancialRecordContext.Provider>
  );
};

export const useFinancialRecords = () => {
  const context = useContext<FinancialRecordContextType | undefined>(
    FinancialRecordContext
  );

  if (!context) {
    throw new Error(
      "useFinancialRecords must be used withing a FinancialRecordsProvider"
    );
  }

  return context;
};
